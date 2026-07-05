'use client';

import React, { useState, useRef, useEffect } from 'react';
import * as ort from 'onnxruntime-web';
import { UploadCloud, Loader2, MousePointer2 } from 'lucide-react';

// Configure ONNX Runtime
ort.env.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/";
ort.env.wasm.numThreads = 1; // Prevents Web Worker memory spikes in Codespaces

// URLs pointing directly to your final quantized model
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

    // 1. Clean, native model loading with aggressive memory optimizations
    useEffect(() => {
        async function loadModels() {
            try {
                setStatus("Downloading Quantized Encoder (~95MB)...");
                const encSession = await ort.InferenceSession.create(ENCODER_URL, {
                    // Try GPU acceleration first, fallback to WASM
                    executionProviders: ['webgl', 'wasm'],
                    // Aggressive memory optimizations to prevent tab crashing
                    graphOptimizationLevel: 'all',
                    enableCpuMemArena: true,
                    enableMemPattern: true,
                    executionMode: 'sequential'
                });
                setEncoderSession(encSession);

                setStatus("Downloading & Compiling Decoder...");
                const decSession = await ort.InferenceSession.create(DECODER_URL, {
                    executionProviders: ['webgl', 'wasm']
                });
                setDecoderSession(decSession);

                setStatus("Models loaded. Ready for medical image.");
            } catch (error) {
                console.error("Model loading failed:", error);
                setStatus("Error loading models. Check console.");
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
        setStatus("Processing image through LoRA Encoder... (This takes heavy RAM)");

        // Give the browser 100ms to visually update the UI before freezing the thread with heavy math
        await new Promise(resolve => setTimeout(resolve, 100));

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
            
            // Execute the model inference
            const results = await encoderSession.run({ input_image: inputTensor });
            
            setImageEmbedding(results.image_embeddings);
            setStatus("Ready! Click anywhere on the image to segment polyps/tumors.");
        } catch (error) {
            console.error("Encoder failed:", error);
            setStatus("Encoder failed. Check DevTools console (F12) for the exact memory error.");
        }
        setIsProcessing(false);
    };

    const handleCanvasClick = async (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!decoderSession || !imageEmbedding || !image || isProcessing) return;
        
        const canvas = maskCanvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        setStatus(`Segmenting at (${Math.round(x)}, ${Math.round(y)})...`);
        
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
            
            const maskCtx = canvas.getContext('2d');
            if (!maskCtx) return;
            
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

        } catch (err) {
            console.error(err);
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

                <div className="relative flex justify-center w-full overflow-hidden rounded-lg bg-black border border-gray-700">
                    <canvas ref={canvasRef} className="max-w-full h-auto z-10" />
                    <canvas 
                        ref={maskCanvasRef} 
                        onClick={handleCanvasClick}
                        className={`absolute top-0 max-w-full h-auto z-20 ${imageEmbedding && !isProcessing ? 'cursor-crosshair' : 'cursor-wait'}`} 
                    />
                </div>
            </div>
        </div>
    );
}