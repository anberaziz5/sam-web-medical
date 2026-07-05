import base64
import numpy as np
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import onnxruntime as ort
from PIL import Image
import io

app = FastAPI()

# Allow your frontend to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Loading 95MB Encoder into Cloud RAM...")
session = ort.InferenceSession("sam_image_encoder_quantized.onnx")
print("Engine Ready.")

@app.post("/api/encode")
async def encode_image(file: UploadFile = File(...)):
    # 1. Read and resize image
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((1024, 1024))
    
    # 2. Normalize for the Vision Transformer
    img_arr = np.array(image).astype(np.float32) / 255.0
    mean = np.array([0.485, 0.456, 0.406])
    std = np.array([0.229, 0.224, 0.225])
    img_arr = (img_arr - mean) / std
    
    # 3. Reformat array for ONNX
    img_arr = np.transpose(img_arr, (2, 0, 1))
    input_tensor = np.expand_dims(img_arr, axis=0).astype(np.float32)
    
    # 4. Run the heavy inference
    outputs = session.run(["image_embeddings"], {"input_image": input_tensor})
    embedding = outputs[0]
    
    # 5. Compress the float array to Base64
    embedding_bytes = embedding.tobytes()
    encoded_b64 = base64.b64encode(embedding_bytes).decode('utf-8')
    
    return {"embedding_b64": encoded_b64}