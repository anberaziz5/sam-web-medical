'use client';

import React, { useState, useRef, useEffect } from 'react';
import * as ort from 'onnxruntime-web';
import { Upload, Activity, Crosshair } from 'lucide-react';

ort.env.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/";

// >>> PUT YOUR HUGGING FACE URL HERE <<<
const API_URL = "https://anberaziz5-sam-medical-backend.hf.space/api/encode"; 
const DECODER_URL = "https://huggingface.co/AnberAziz5/sam-web-models/resolve/main/sam_mask_decoder_quantized.onnx";
export default function Segmenter() {
    const [status, setStatus] = useState("SYSTEM STANDBY");
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [decoderSession, setDecoderSession] = useState<ort.InferenceSession | null>(null);
    const [imageEmbedding, setImageEmbedding] = useState<ort.Tensor | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const maskCanvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        async function loadDecoder() {
            try {
                setStatus("INITIALIZING DECODER ENGINE...");
                const decSession = await ort.InferenceSession.create(DECODER_URL, {
                    executionProviders: ['wasm']
                });
                setDecoderSession(decSession);
                setStatus("READY. AWAITING SCAN UPLOAD.");
            } catch (error: any) {
                console.error("Decoder Init Error:", error);
                setStatus(`ERR: DECODER FAILED. ${error.message || error}`);
            }
        }
        loadDecoder();
    }, []);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        const img = new Image();
        img.src = url;
        img.onload = async () => {
            setImage(img);
            
            // Force React to render the image to the screen immediately
            await new Promise(resolve => setTimeout(resolve, 50));

            const canvas = canvasRef.current;
            const maskCanvas = maskCanvasRef.current;
            if (!canvas || !maskCanvas) return;
            
            canvas.width = img.width;
            canvas.height = img.height;
            maskCanvas.width = img.width;
            maskCanvas.height = img.height;
            
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);
            maskCanvas.getContext('2d')?.clearRect(0, 0, img.width, img.height);

            await sendToCloudEngine(file);
        };
    };

    const sendToCloudEngine = async (file: File) => {
        setIsProcessing(true);
        setStatus("UPLOADING TO CLOUD COMPUTE CLUSTER...");

        try {
            console.log("1. Preparing FormData");
            const formData = new FormData();
            formData.append("file", file);

            setStatus("EXECUTING LORA VISION TRANSFORMER...");
            console.log("2. Sending POST request to:", API_URL);
            
            const response = await fetch(API_URL, {
                method: 'POST',
                body: formData,
            });

            console.log("3. Received response. Status:", response.status);

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Server returned ${response.status}: ${errText}`);
            }
            
            setStatus("DECODING TENSOR MATRIX...");
            console.log("4. Parsing JSON");
            const data = await response.json();
            
            if (!data.embedding_b64) {
                throw new Error("No embedding_b64 found in server response.");
            }

            console.log("5. Converting Base64 to ArrayBuffer (This takes a second)");
            // Safer memory conversion
            const binaryString = window.atob(data.embedding_b64);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const floatArray = new Float32Array(bytes.buffer);
            
            console.log("6. Creating ONNX Tensor");
            const tensor = new ort.Tensor('float32', floatArray, [1, 256, 64, 64]);
            setImageEmbedding(tensor);
            
            setStatus("TARGET ACQUIRED. CLICK SCAN TO SEGMENT.");
            console.log("7. Success. Ready for clicks.");

        } catch (error: any) {
            console.error("Cloud Compute Error:", error);
            alert(`CLOUD ERROR: ${error.message || error}`);
            setStatus("ERR: CLOUD COMPUTE DISCONNECTED.");
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

        setStatus(`COMPUTING SEGMENTATION AT COORDS [${Math.round(x)}, ${Math.round(y)}]...`);

        const maskCtx = canvas.getContext('2d');
        if (!maskCtx) return;

        maskCtx.fillStyle = '#f97316'; 
        maskCtx.beginPath();
        maskCtx.arc(x, y, 4, 0, 2 * Math.PI);
        maskCtx.fill();
        
        try {
            const pointCoords = new Float32Array([x, y]);
            const pointLabels = new Float32Array([1]); 
            const feeds = {
                image_embeddings: imageEmbedding,
                point_coords: new ort.Tensor('float32', pointCoords, [1, 1, 2]),
                point_labels: new ort.Tensor('float32', pointLabels, [1, 1]),
                mask_input: new ort.Tensor('float32', new Float32Array(256 * 256), [1, 1, 256, 256]),
                has_mask_input: new ort.Tensor('float32', new Float32Array([0]), [1]),
                orig_im_size: new ort.Tensor('float32', new Float32Array([image.height, image.width]), [2])
            };

            const results = await decoderSession.run(feeds);
            const maskTensor = results.masks; 
            const maskData = maskTensor.data as Float32Array;
            const h = maskTensor.dims[2];
            const w = maskTensor.dims[3];
            
            const imgData = maskCtx.createImageData(w, h);
            for(let i = 0; i < h * w; i++) {
                if(maskData[i] > 0.0) { 
                    imgData.data[i * 4 + 0] = 249; 
                    imgData.data[i * 4 + 1] = 115; 
                    imgData.data[i * 4 + 2] = 22;  
                    imgData.data[i * 4 + 3] = 160; 
                } else {
                    imgData.data[i * 4 + 3] = 0;    
                }
            }
            maskCtx.putImageData(imgData, 0, 0);
            setStatus("SEGMENTATION COMPLETE. AWAITING NEXT TARGET.");

        } catch (err: any) {
            console.error("Decoder Error:", err);
            alert(`DECODER ERROR: ${err.message || err}`);
            setStatus("ERR: DECODER CORE FAULT.");
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans tracking-tight p-8 flex flex-col items-center">
            
            <div className="w-full max-w-5xl mb-12 border-b border-zinc-800 pb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-medium text-white tracking-tight">Diagnostic <span className="text-orange-500 font-normal">Engine</span></h1>
                    <p className="text-zinc-500 text-sm mt-2 uppercase tracking-widest font-mono">Medical Segmentation / LoRA Architecture</p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono">
                    <Activity className={`w-4 h-4 ${isProcessing ? 'text-orange-500 animate-pulse' : 'text-zinc-600'}`} />
                    <span className={isProcessing ? 'text-orange-500' : 'text-zinc-600'}>{status}</span>
                </div>
            </div>

            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <div className="col-span-1 space-y-6">
                    <div className="bg-[#0A0A0A] border border-zinc-800 p-6 rounded-sm">
                        <h2 className="text-white text-sm uppercase tracking-widest mb-4 border-b border-zinc-800 pb-2">Data Input</h2>
                        
                        <label className="flex flex-col items-center justify-center w-full h-32 border border-zinc-700 border-dashed hover:border-orange-500 cursor-pointer transition-colors bg-[#0f0f0f] hover:bg-[#141414] rounded-sm group">
                            <Upload className="w-5 h-5 text-zinc-500 group-hover:text-orange-500 transition-colors mb-2" />
                            <span className="text-xs text-zinc-400 group-hover:text-zinc-300">SELECT MEDICAL SCAN</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </label>
                    </div>

                    <div className="bg-[#0A0A0A] border border-zinc-800 p-6 rounded-sm">
                        <h2 className="text-white text-sm uppercase tracking-widest mb-4 border-b border-zinc-800 pb-2">Telemetry</h2>
                        <div className="space-y-3 text-xs font-mono text-zinc-500">
                            <div className="flex justify-between">
                                <span>Engine:</span>
                                <span className={imageEmbedding ? "text-orange-500" : "text-zinc-600"}>{imageEmbedding ? "ONLINE" : "STANDBY"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Decoder:</span>
                                <span className={decoderSession ? "text-green-500" : "text-zinc-600"}>{decoderSession ? "LOADED" : "PENDING"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Latency:</span>
                                <span className="text-zinc-400">{'< 50ms (Edge)'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 md:col-span-2">
                    <div className="bg-[#0A0A0A] border border-zinc-800 rounded-sm p-1 min-h-[500px] flex items-center justify-center relative overflow-hidden">
                        
                        {!image && (
                            <div className="flex flex-col items-center justify-center text-zinc-600">
                                <Crosshair className="w-12 h-12 mb-4 opacity-50" strokeWidth={1} />
                                <p className="text-sm uppercase tracking-widest font-mono">No Active Target</p>
                            </div>
                        )}

                        <div className={`relative inline-block max-w-full shadow-2xl ${isProcessing && 'opacity-50 transition-opacity'}`}>
                            <canvas ref={canvasRef} className="block max-w-full h-auto" />
                            <canvas 
                                ref={maskCanvasRef} 
                                onClick={handleCanvasClick}
                                className={`absolute top-0 left-0 w-full h-full ${imageEmbedding && !isProcessing ? 'cursor-crosshair' : 'cursor-not-allowed'}`} 
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}