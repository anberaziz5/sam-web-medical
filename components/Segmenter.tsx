'use client';

import React, { useState, useRef, useEffect } from 'react';
import * as ort from 'onnxruntime-web';
import { UploadCloud, Loader2, MousePointer2 } from 'lucide-react';

// Configure ONNX Runtime
ort.env.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/";
ort.env.wasm.numThreads = 1;

const ENCODER_URL = "https://huggingface.co/AnberAziz5/sam-web-models/resolve/main/sam_image_encoder_quantized.onnx";
const DECODER_URL = "https://huggingface.co/AnberAziz5/sam-web-models/resolve/main/sam_mask_decoder_final.onnx";

export default function Segmenter() {
    const [status, setStatus] = useState("Waiting for image...");
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [encoderSession, setEncoderSession] = useState<ort.InferenceSession | null>(null);
    const [decoderSession, setDecoderSession] = useState<ort.InferenceSession | null>(null);
    const [imageEmbedding, setImageEmbedding] = useState<ort.Tensor | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const maskCanvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        async function loadModels() {
            try {
                setStatus("Downloading Quantized Encoder (~95MB)...");
                const encSession = await ort.InferenceSession.create(ENCODER_URL, {
                    executionProviders: ['wasm'], // Cleaned up to stop WebGL console spam
                    graphOptimizationLevel: 'all',
                    enableCpuMemArena: true,
                    enableMemPattern: true,
                    executionMode: 'sequential'
                });
                setEncoderSession(encSession);

                setStatus("Downloading & Compiling Decoder...");
                const decSession = await ort.InferenceSession.create(DECODER_URL, {
                    executionProviders: ['wasm']
                });
                setDecoderSession(decSession);

                setStatus("Models loaded. Ready for medical image.");
            } catch (error: any) {
                console.error("Model loading failed:", error);
                setStatus(`Error loading models: ${error.message || error}`);
            }
        }
        loadModels();
    }, []);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        const img = new Image();
        img.src = url;
        img.onload = async () => {
            setImage(img);
            
            const canvas = canvasRef.current;
            const maskCanvas = maskCanvasRef.current;
            if (!canvas || !maskCanvas) return;
            
            canvas.width = img.width;
            canvas.height = img.height;
            maskCanvas.width = img.width;
            maskCanvas.height = img.height;
            
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);

            const maskCtx = maskCanvas.getContext('2d');
            maskCtx?.clearRect(0, 0, maskCanvas.width, maskCanvas.height);

            await runEncoder(img);
        };
    };

    const runEncoder = async (img: HTMLImageElement) => {
        if (!encoderSession) return;
        setIsProcessing(true);
        setStatus("Processing image through LoRA Encoder... (This takes heavy RAM, wait 15-30s)");

        // Force DOM to paint the status update before locking the CPU
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

        try {
            const offscreen = document.createElement('canvas');
            offscreen.width = 1024;
            offscreen.height = 1024;
            const ctx = offscreen.getContext('2d');
            if (!ctx) return;
            
            ctx.drawImage(img, 0, 0, 1024, 1024);
            const imgData = ctx.getImageData(0, 0, 1024, 1024);

            const tensorObj = new Float32Array(1 * 3 * 1024 * 1024);
            const mean = [0.485, 0.456, 0.406];
            const std = [0.229, 0.224, 0.225];

            for (let i = 0; i < 1024; i++) {
                for (let j = 0; j < 1024; j++) {
                    const idx = (i * 1024 + j) * 4;
                    const r = imgData.data[idx] / 255.0;
                    const g = imgData.data[idx + 1] / 255.0;
                    const b = imgData.data[idx + 2] / 255.0;
                    
                    tensorObj[i * 1024 + j] = (r - mean[0]) / std[0]; 
                    tensorObj[1024 * 1024 + i * 1024 + j] = (g - mean[1]) / std[1]; 
                    tensorObj[2 * 1024 * 1024 + i * 1024 + j] = (b - mean[2]) / std[2]; 
                }
            }

            const inputTensor = new ort.Tensor('float32', tensorObj, [1, 3, 1024, 1024]);
            const results = await encoderSession.run({ input_image: inputTensor });
            
            setImageEmbedding(results.image_embeddings);
            setStatus("Ready! Click anywhere on the image to segment polyps/tumors.");
        } catch (error: any) {
            console.error("Encoder failed:", error);
            alert(`Encoder failed: ${error.message || "Out of Memory"}`);
            setStatus("Encoder failed. Check DevTools console.");
        }
        setIsProcessing(false);
    };

    const handleCanvasClick = async (e: React.MouseEvent<HTMLCanvasElement>) => {
        // Prevent early exit silence: log exactly why it rejects the click
        if (!decoderSession || !imageEmbedding || !image || isProcessing) {
            console.log("Click ignored. State:", { hasDecoder: !!decoderSession, hasEmbedding: !!imageEmbedding, isProcessing });
            return;
        }
        
        const canvas = maskCanvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        setStatus(`Segmenting at (${Math.round(x)}, ${Math.round(y)})...`);

        const maskCtx = canvas.getContext('2d');
        if (!maskCtx) return;

        // Visual click confirmation (draws a tiny red dot so you know it registered)
        maskCtx.fillStyle = 'red';
        maskCtx.beginPath();
        maskCtx.arc(x, y, 5, 0, 2 * Math.PI);
        maskCtx.fill();
        
        try {
            const pointCoords = new Float32Array([x, y]);
            const pointLabels = new Float32Array([1]); 
            const pointCoordsTensor = new ort.Tensor('float32', pointCoords, [1, 1, 2]);
            const pointLabelsTensor = new ort.Tensor('float32', pointLabels, [1, 1]);
            
            const maskInput = new ort.Tensor('float32', new Float32Array(256 * 256), [1, 1, 256, 256]);
            const hasMaskInput = new ort.Tensor('float32', new Float32Array([0]), [1]);
            
            const origImSize = new ort.Tensor('float32', new Float32Array([image.height, image.width]), [2]);

            const feeds = {
                image_embeddings: imageEmbedding,
                point_coords: pointCoordsTensor,
                point_labels: pointLabelsTensor,
                mask_input: maskInput,
                has_mask_input: hasMaskInput,
                orig_im_size: origImSize
            };

            const results = await decoderSession.run(feeds);
            const maskTensor = results.masks; 

            const maskData = maskTensor.data as Float32Array;
            const h = maskTensor.dims[2];
            const w = maskTensor.dims[3];
            
            const imgData = maskCtx.createImageData(w, h);
            for(let i = 0; i < h * w; i++) {
                if(maskData[i] > 0.0) { 
                    imgData.data[i * 4 + 0] = 34;   
                    imgData.data[i * 4 + 1] = 197;  
                    imgData.data[i * 4 + 2] = 94;   
                    imgData.data[i * 4 + 3] = 150;  
                } else {
                    imgData.data[i * 4 + 3] = 0;    
                }
            }
            maskCtx.putImageData(imgData, 0, 0);
            setStatus("Ready! Click anywhere else to re-segment.");

        } catch (err: any) {
            console.error("DECODER ERROR:", err);
            alert(`Decoder failed: ${err.message || err}`);
            setStatus("Decoder failed. Check console.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl w-full bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                        Zero-Cost LoRA-Tuned Medical SAM
                    </h1>
                    <p className="text-gray-400 mt-2">Browser-native, $0 Inference via ONNX Runtime</p>
                </div>

                <div className="bg-gray-900 p-4 rounded-lg flex items-center justify-center space-x-3 mb-6 border border-gray-700">
                    {isProcessing ? <Loader2 className="animate-spin text-blue-400" /> : <MousePointer2 className="text-green-400" />}
                    <span className="font-mono text-sm">{status}</span>
                </div>

                {!image && (
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-all">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <UploadCloud className="w-12 h-12 text-gray-400 mb-3" />
                                <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> a medical scan</p>
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </label>
                    </div>
                )}

                {/* FIXED CSS WRAPPER: inline-block locks the container strictly to the canvas size */}
                <div className="flex justify-center w-full">
                    <div className="relative inline-block max-w-full overflow-hidden rounded-lg bg-black border border-gray-700 shadow-lg">
                        <canvas ref={canvasRef} className="block max-w-full h-auto z-10" />
                        <canvas 
                            ref={maskCanvasRef} 
                            onClick={handleCanvasClick}
                            className={`absolute top-0 left-0 w-full h-full z-20 ${imageEmbedding && !isProcessing ? 'cursor-crosshair' : 'cursor-wait'}`} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}