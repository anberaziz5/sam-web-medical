<div align="center">

# 🩺 SAM Web Medical

### Enterprise AI-powered Medical Image Segmentation using Meta's Segment Anything Model (SAM)

*Interactive, browser-based medical image segmentation powered by Next.js, FastAPI, ONNX Runtime, and Meta AI's Segment Anything Model.*

<br>

<p align="center">
<img src="https://img.shields.io/github/license/anberaziz5/sam-web-medical?style=for-the-badge">
<img src="https://img.shields.io/github/stars/anberaziz5/sam-web-medical?style=for-the-badge">
<img src="https://img.shields.io/github/forks/anberaziz5/sam-web-medical?style=for-the-badge">
<img src="https://img.shields.io/github/watchers/anberaziz5/sam-web-medical?style=for-the-badge">
<img src="https://img.shields.io/github/issues/anberaziz5/sam-web-medical?style=for-the-badge">
<img src="https://img.shields.io/github/last-commit/anberaziz5/sam-web-medical?style=for-the-badge">
</p>

<p align="center">
<img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs">
<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react">
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript">
<img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi">
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python">
<img src="https://img.shields.io/badge/ONNX_Runtime-005CED?style=for-the-badge">
</p>

<p align="center">
<img src="https://img.shields.io/badge/Segment%20Anything-Meta%20AI-blueviolet?style=for-the-badge">
<img src="https://img.shields.io/badge/ONNX-Quantized-success?style=for-the-badge">
<img src="https://img.shields.io/badge/Tailwind-v4-38BDF8?style=for-the-badge&logo=tailwindcss">
<img src="https://img.shields.io/badge/App_Router-Enabled-success?style=for-the-badge">
<img src="https://img.shields.io/badge/REST-API-orange?style=for-the-badge">
<img src="https://img.shields.io/badge/Open_Source-MIT-success?style=for-the-badge">
</p>

<p align="center">
<img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,python,fastapi,docker,git,github,vscode" />
</p>

---

### 🚀 Live Demo

Coming Soon

### 📄 Documentation

Coming Soon

### 📦 Model

Meta AI Segment Anything Model (SAM)

---

</div>

# 📸 Preview

> Replace these with actual screenshots once deployed.

```
docs/

├── homepage.png

├── upload.png

├── segmentation.gif

└── architecture.png
```

---

# 📖 Table of Contents

- Overview
- Features
- Why SAM Web Medical?
- Architecture
- AI Pipeline
- Request Lifecycle
- Technology Stack
- Frontend Architecture
- Backend Architecture
- Project Structure
- Performance Highlights

---

# 🩺 Overview

SAM Web Medical is an enterprise-grade web application for **interactive medical image segmentation** powered by **Meta AI's Segment Anything Model (SAM)**.

Instead of running heavy deep learning inference directly in the browser, the application leverages a **FastAPI inference server** with an optimized **quantized ONNX encoder**, enabling fast, scalable, and production-ready segmentation workflows.

The project demonstrates how modern AI foundation models can be deployed efficiently using a clean separation between a high-performance backend and an intuitive React frontend.

---

# ✨ Key Features

## 🧠 AI

- Segment Anything Model (SAM)
- Quantized ONNX Encoder
- Interactive Point Prompting
- High-resolution Image Embeddings
- Real-time Segmentation
- Foundation Vision Model

---

## ⚡ Performance

- Quantized ONNX Runtime
- Low-latency inference
- Lightweight backend
- Efficient preprocessing
- Browser rendering
- Optimized tensor pipeline

---

## 🌐 Frontend

- Next.js App Router
- React 19
- TypeScript
- TailwindCSS
- Responsive Design
- Interactive Canvas
- Modern UI

---

## ⚙ Backend

- FastAPI
- Python
- Async API
- REST Architecture
- Image Processing
- ONNX Runtime

---

## 🚀 Deployment Ready

- Docker Support
- Cloud Ready
- Modular Architecture
- Production APIs
- REST Services

---

# 💡 Why SAM Web Medical?

Traditional medical image segmentation tools often require expensive desktop software, specialized hardware, or complex workflows.

SAM Web Medical brings foundation-model-powered segmentation directly into the browser through a lightweight and scalable architecture.

## Benefits

- Interactive segmentation
- Modern web interface
- Fast AI inference
- Clean architecture
- Easy deployment
- Modular backend
- Open-source
- Extensible

---

# 🏗 System Architecture

```mermaid
flowchart LR

A["🖼 Medical Image"]
B["⚛ Next.js Frontend"]
C["📡 FastAPI Backend"]
D["⚙ Image Preprocessing"]
E["🧠 Quantized SAM Encoder"]
F["⚡ ONNX Runtime"]
G["📊 Image Embeddings"]
H["🎯 Interactive Segmentation"]

A --> B
B --> C
C --> D
D --> E
E --> F
F --> G
G --> H

style A fill:#DBEAFE,stroke:#2563EB,color:#000
style B fill:#DCFCE7,stroke:#16A34A,color:#000
style C fill:#FDE68A,stroke:#CA8A04,color:#000
style D fill:#FECACA,stroke:#DC2626,color:#000
style E fill:#DDD6FE,stroke:#7C3AED,color:#000
style F fill:#CFFAFE,stroke:#0891B2,color:#000
style G fill:#FBCFE8,stroke:#DB2777,color:#000
style H fill:#BBF7D0,stroke:#15803D,color:#000
```

---

# 🧠 AI Inference Pipeline

```mermaid
graph TD

Upload["📤 Upload Medical Image"]

Resize["📏 Resize to 1024×1024"]

Normalize["🎨 RGB + Normalize"]

Tensor["📦 Tensor Conversion"]

ONNX["⚡ ONNX Runtime"]

Encoder["🧠 SAM Encoder"]

Embedding["📊 Image Embeddings"]

Prompt["🖱 User Prompt"]

Mask["🎯 Segmentation Mask"]

Browser["🌐 Browser Visualization"]

Upload --> Resize
Resize --> Normalize
Normalize --> Tensor
Tensor --> ONNX
ONNX --> Encoder
Encoder --> Embedding
Embedding --> Prompt
Prompt --> Mask
Mask --> Browser

style Upload fill:#4ade80
style Resize fill:#22d3ee
style Normalize fill:#facc15
style Tensor fill:#fb7185
style ONNX fill:#818cf8
style Encoder fill:#a855f7
style Embedding fill:#14b8a6
style Prompt fill:#f97316
style Mask fill:#60a5fa
style Browser fill:#ec4899
```

---

# 🔄 Request Lifecycle

```mermaid
sequenceDiagram

actor User

participant Frontend

participant FastAPI

participant ONNX

participant Browser

User->>Frontend: Upload Medical Image

Frontend->>FastAPI: POST Image

FastAPI->>ONNX: Generate Embeddings

ONNX-->>FastAPI: Embeddings

FastAPI-->>Frontend: JSON Response

User->>Frontend: Click Prompt

Frontend->>Browser: Generate Mask

Browser-->>User: Interactive Segmentation
```

---

# 🏛 High-Level Architecture

```mermaid
graph LR

subgraph Client

A[React Components]

B[Canvas]

C[Image Viewer]

end

subgraph Server

D[FastAPI]

E[Image Processing]

F[ONNX Runtime]

end

subgraph AI

G[Segment Anything Model]

end

A --> D

B --> D

C --> D

D --> E

E --> F

F --> G

style Client fill:#EFF6FF
style Server fill:#F0FDF4
style AI fill:#FEF3C7
```

---

# 🛠 Technology Stack

| Layer | Technologies |
|---------|-------------|
| Frontend | Next.js 16 |
| UI | React 19 |
| Language | TypeScript |
| Styling | TailwindCSS v4 |
| Icons | Lucide React |
| Backend | FastAPI |
| Runtime | Python |
| AI Runtime | ONNX Runtime |
| Deep Learning | Segment Anything Model |
| Image Processing | Pillow |
| Numerical Computing | NumPy |
| API | REST |
| Server | Uvicorn |
| Version Control | Git |
| Repository | GitHub |
| Containerization | Docker |

---

# 🖥 Frontend Architecture

```mermaid
graph TD

App

App --> Upload

App --> Canvas

App --> Controls

App --> API

API --> FastAPI

Canvas --> Mask

Controls --> Prompt

Prompt --> Mask

style App fill:#dbeafe
style Upload fill:#bbf7d0
style Canvas fill:#fde68a
style Controls fill:#fbcfe8
style API fill:#ddd6fe
style FastAPI fill:#fecaca
style Mask fill:#cffafe
```

---

# 🐍 Backend Architecture

```mermaid
graph TD

Request

Request --> Upload

Upload --> Validation

Validation --> Resize

Resize --> Normalize

Normalize --> Tensor

Tensor --> ONNX

ONNX --> Embeddings

Embeddings --> JSON

JSON --> Response

style Request fill:#dbeafe
style Upload fill:#dcfce7
style Validation fill:#fde68a
style Resize fill:#fecaca
style Normalize fill:#ddd6fe
style Tensor fill:#cffafe
style ONNX fill:#fbcfe8
style Embeddings fill:#bbf7d0
style JSON fill:#fdba74
style Response fill:#a7f3d0
```

---

# 📂 Project Structure

```text
sam-web-medical/

├── app/
├── components/
├── public/
├── backend/
├── models/
├── docs/
├── app.py
├── package.json
├── requirements.txt
├── Dockerfile
├── README.md
└── LICENSE
```

---

# 🚀 Performance Highlights

- ⚡ Quantized ONNX model for reduced latency
- 🧠 Foundation model–powered segmentation
- 📉 Lightweight inference pipeline
- 🖼️ Interactive browser-based workflow
- 📦 Efficient image embedding generation
- 🚀 Production-ready REST architecture
- 🔄 Async FastAPI backend
- 🌐 Modern React App Router frontend
- 🛠️ Modular and extensible codebase
- ☁️ Cloud deployment ready

---

# ⚙️ Installation

## 📋 Prerequisites

Before getting started, ensure your development environment includes:

| Requirement | Version |
|-------------|----------|
| Node.js | 20+ |
| npm | Latest |
| Python | 3.10+ |
| Git | Latest |
| Docker *(Optional)* | Latest |

---

# 📥 Clone Repository

```bash
git clone https://github.com/anberaziz5/sam-web-medical.git

cd sam-web-medical
```

---

# 📦 Install Frontend Dependencies

```bash
npm install
```

or

```bash
pnpm install
```

or

```bash
yarn
```

---

# 🐍 Backend Setup

Create a virtual environment

```bash
python -m venv .venv
```

Activate

### Windows

```bash
.venv\Scripts\activate
```

### macOS / Linux

```bash
source .venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

---

# ▶ Running the Frontend

```bash
npm run dev
```

Application runs at

```
http://localhost:3000
```

---

# ▶ Running the Backend

```bash
uvicorn app:app --reload
```

Backend API

```
http://localhost:8000
```

Swagger Documentation

```
http://localhost:8000/docs
```

ReDoc Documentation

```
http://localhost:8000/redoc
```

---

# 🌍 Environment Variables

## Frontend

Create

```
.env.local
```

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Backend

Create

```
.env
```

```env
MODEL_PATH=models/sam_encoder_quantized.onnx

MAX_UPLOAD_SIZE=20MB

HOST=0.0.0.0

PORT=8000
```

---

# 🏗 Development Workflow

```mermaid
flowchart LR

A["👨‍💻 Developer"]

B["💻 VS Code"]

C["⚛ Next.js"]

D["🐍 FastAPI"]

E["🧠 ONNX Runtime"]

F["🌐 Browser"]

A --> B

B --> C

B --> D

D --> E

C --> F

F --> D

style A fill:#dbeafe
style B fill:#bbf7d0
style C fill:#fde68a
style D fill:#fecaca
style E fill:#ddd6fe
style F fill:#cffafe
```

---

# 🔄 Application Workflow

```mermaid
graph TD

Start

Start --> Upload

Upload --> Backend

Backend --> Encoder

Encoder --> Embedding

Embedding --> Browser

Browser --> Click

Click --> Decoder

Decoder --> Mask

Mask --> Finish

style Start fill:#dbeafe
style Upload fill:#dcfce7
style Backend fill:#fde68a
style Encoder fill:#ddd6fe
style Embedding fill:#fecaca
style Browser fill:#bbf7d0
style Click fill:#fdba74
style Decoder fill:#fbcfe8
style Mask fill:#a7f3d0
style Finish fill:#93c5fd
```

---

# 🌐 REST API

## Health Check

### GET

```
/
```

Returns

```json
{
  "status":"healthy"
}
```

---

## Generate Image Embeddings

### Endpoint

```
POST /api/encode
```

Content Type

```
multipart/form-data
```

Request

```
image=image.png
```

Successful Response

```json
{
  "embedding":[...]
}
```

---

## Example cURL

```bash
curl -X POST \
-F "image=@scan.png" \
http://localhost:8000/api/encode
```

---

# 📡 API Architecture

```mermaid
sequenceDiagram

actor User

participant Browser

participant FastAPI

participant Encoder

participant ONNX

User->>Browser: Upload Image

Browser->>FastAPI: POST

FastAPI->>Encoder: Preprocess

Encoder->>ONNX: Inference

ONNX-->>Encoder: Embeddings

Encoder-->>FastAPI: Tensor

FastAPI-->>Browser: JSON

Browser-->>User: Interactive Segmentation
```

---

# 📂 Complete Folder Structure

```text
sam-web-medical/

├── app/
│
│   ├── layout.tsx
│
│   ├── page.tsx
│
│   ├── globals.css
│
│
├── components/
│
│   ├── Segmenter.tsx
│
│   ├── Canvas.tsx
│
│   ├── Toolbar.tsx
│
│
├── backend/
│
│   ├── app.py
│
│   ├── inference.py
│
│   ├── preprocess.py
│
│   ├── utils.py
│
│
├── models/
│
│   ├── sam_encoder_quantized.onnx
│
│
├── public/
│
├── docs/
│
├── Dockerfile
│
├── requirements.txt
│
├── package.json
│
├── tsconfig.json
│
└── README.md
```

---

# 🐳 Docker

## Build

```bash
docker build -t sam-web-medical .
```

Run

```bash
docker run -p 8000:8000 sam-web-medical
```

Detached Mode

```bash
docker run -d \
-p 8000:8000 \
sam-web-medical
```

---

# ☁ Deployment Architecture

```mermaid
flowchart LR

User

User --> Cloudflare

Cloudflare --> Vercel

Vercel --> FastAPI

FastAPI --> ONNX

ONNX --> SAM

style User fill:#dbeafe
style Cloudflare fill:#fde68a
style Vercel fill:#bbf7d0
style FastAPI fill:#fecaca
style ONNX fill:#ddd6fe
style SAM fill:#cffafe
```

---

# 🚀 Production Architecture

```mermaid
graph TD

Users

Users --> CDN

CDN --> NextJS

NextJS --> API

API --> LoadBalancer

LoadBalancer --> FastAPI1

LoadBalancer --> FastAPI2

FastAPI1 --> ONNX

FastAPI2 --> ONNX

ONNX --> Models

Models --> Storage

style Users fill:#dbeafe
style CDN fill:#bbf7d0
style NextJS fill:#fde68a
style API fill:#fecaca
style LoadBalancer fill:#ddd6fe
style FastAPI1 fill:#fbcfe8
style FastAPI2 fill:#fdba74
style ONNX fill:#93c5fd
style Models fill:#a7f3d0
style Storage fill:#bae6fd
```

---

# 🔐 Security Considerations

✅ Input validation

✅ File type validation

✅ Image size limits

✅ REST API isolation

✅ Async request handling

✅ CORS configuration

✅ Secure deployment ready

✅ Dependency isolation

---

# 📈 Scalability

```mermaid
graph LR

Client

Client --> API

API --> Queue

Queue --> Worker1

Queue --> Worker2

Queue --> Worker3

Worker1 --> ONNX

Worker2 --> ONNX

Worker3 --> ONNX

ONNX --> Storage

style Client fill:#dbeafe
style API fill:#bbf7d0
style Queue fill:#fde68a
style Worker1 fill:#fecaca
style Worker2 fill:#ddd6fe
style Worker3 fill:#cffafe
style ONNX fill:#fbcfe8
style Storage fill:#93c5fd
```

---

# ⚡ Performance Optimizations

| Optimization | Benefit |
|--------------|---------|
| Quantized ONNX | Reduced model size |
| ONNX Runtime | Faster inference |
| Async FastAPI | High concurrency |
| React 19 | Efficient rendering |
| Next.js App Router | Optimized routing |
| Browser Canvas | Interactive UI |
| Image Embeddings | One-time encoding |
| Modular Components | Better maintainability |
| TypeScript | Type safety |
| TailwindCSS | Small CSS bundle |

---

# 💻 Development Commands

## Frontend

```bash
npm run dev

npm run build

npm run lint

npm run start
```

---

## Backend

```bash
uvicorn app:app --reload
```

---

---

# 🧠 AI Model Architecture

SAM Web Medical is powered by **Meta AI's Segment Anything Model (SAM)**, one of the largest foundation models for image segmentation.

Unlike traditional semantic segmentation models trained for a specific task, SAM is capable of **zero-shot segmentation** using interactive prompts.

The application uses a **quantized ONNX encoder**, allowing inference to be performed efficiently without requiring the original PyTorch model during runtime.

---

## 🏗 Model Pipeline

```mermaid
flowchart TD

Image["🖼 Input Medical Image"]

Resize["📐 Resize"]

Normalize["🎨 Normalize"]

Encoder["🧠 SAM Image Encoder"]

Embedding["📊 Image Embedding"]

Prompt["🖱 User Prompt"]

Decoder["🎯 Mask Decoder"]

Mask["🩺 Segmentation Mask"]

Image --> Resize
Resize --> Normalize
Normalize --> Encoder
Encoder --> Embedding
Embedding --> Prompt
Prompt --> Decoder
Decoder --> Mask

style Image fill:#DBEAFE
style Resize fill:#BBF7D0
style Normalize fill:#FDE68A
style Encoder fill:#DDD6FE
style Embedding fill:#FBCFE8
style Prompt fill:#FCA5A5
style Decoder fill:#CFFAFE
style Mask fill:#A7F3D0
```

---

# 🧩 System Components

```mermaid
graph LR

subgraph Client

Upload

Canvas

Toolbar

React

end

subgraph Backend

FastAPI

Preprocess

ONNX

end

subgraph AI

Encoder

Embeddings

end

Upload --> FastAPI

React --> FastAPI

Canvas --> FastAPI

Toolbar --> FastAPI

FastAPI --> Preprocess

Preprocess --> ONNX

ONNX --> Encoder

Encoder --> Embeddings

style Client fill:#EFF6FF
style Backend fill:#F0FDF4
style AI fill:#FEF3C7
```

---

# ⚙ Image Processing Pipeline

```mermaid
graph TD

Upload

RGB

Resize

Normalize

Tensor

Float32

ONNX

Embedding

Upload --> RGB
RGB --> Resize
Resize --> Normalize
Normalize --> Tensor
Tensor --> Float32
Float32 --> ONNX
ONNX --> Embedding

style Upload fill:#dbeafe
style RGB fill:#dcfce7
style Resize fill:#fde68a
style Normalize fill:#fecaca
style Tensor fill:#ddd6fe
style Float32 fill:#fbcfe8
style ONNX fill:#fdba74
style Embedding fill:#a7f3d0
```

---

# 🧠 Embedding Lifecycle

```mermaid
sequenceDiagram

participant User

participant Frontend

participant API

participant Encoder

participant Browser

User->>Frontend: Upload Image

Frontend->>API: Encode

API->>Encoder: Generate Embedding

Encoder-->>API: Embedding Tensor

API-->>Frontend: JSON

Frontend->>Browser: Store Embedding

User->>Browser: Click Prompt

Browser-->>User: Instant Mask
```

---

# ⚡ Why Quantized ONNX?

| Feature | Benefit |
|----------|----------|
| Smaller Model | Lower memory usage |
| Faster Inference | Reduced latency |
| CPU Optimized | No GPU required |
| Portable | Runs almost anywhere |
| Production Ready | Easier deployment |
| Lightweight | Faster startup |
| Efficient | Lower compute cost |

---

# 📊 Performance Overview

| Metric | Approximate |
|----------|-------------|
| Frontend Load | < 1 sec |
| Backend Startup | < 3 sec |
| Image Upload | < 500 ms |
| Image Encoding | Depends on hardware |
| Embedding Generation | Optimized with ONNX |
| Interactive Prompting | Near real-time |
| Memory Usage | Reduced via Quantization |

---

# 📈 AI Inference Flow

```mermaid
flowchart LR

Client

Client --> Upload

Upload --> FastAPI

FastAPI --> Encoder

Encoder --> Embeddings

Embeddings --> Browser

Browser --> Prompt

Prompt --> Decoder

Decoder --> Mask

Mask --> UI

style Client fill:#BFDBFE
style Upload fill:#86EFAC
style FastAPI fill:#FDE68A
style Encoder fill:#DDD6FE
style Embeddings fill:#FBCFE8
style Browser fill:#CFFAFE
style Prompt fill:#FDBA74
style Decoder fill:#FCA5A5
style Mask fill:#BBF7D0
style UI fill:#93C5FD
```

---

# 🧪 Testing Strategy

## Frontend

- Component Testing
- UI Testing
- Type Checking
- ESLint
- Responsive Testing
- Browser Compatibility

---

## Backend

- API Testing
- Endpoint Validation
- File Upload Testing
- Integration Testing
- Error Handling
- Performance Testing

---

## AI

- Embedding Validation
- Output Consistency
- Tensor Shape Verification
- Image Processing Validation
- ONNX Runtime Verification

---

# 📂 Engineering Principles

✅ Modular Components

✅ Separation of Concerns

✅ Reusable Architecture

✅ Clean APIs

✅ Stateless Backend

✅ Type Safety

✅ Functional Components

✅ RESTful Services

---

# 🏭 Production Readiness

```mermaid
graph TD

Developer

GitHub

Actions

Build

Docker

Registry

Server

Users

Developer --> GitHub

GitHub --> Actions

Actions --> Build

Build --> Docker

Docker --> Registry

Registry --> Server

Server --> Users

style Developer fill:#dbeafe
style GitHub fill:#dcfce7
style Actions fill:#fde68a
style Build fill:#fecaca
style Docker fill:#ddd6fe
style Registry fill:#fbcfe8
style Server fill:#bbf7d0
style Users fill:#93c5fd
```

---

# 🔄 CI/CD Pipeline

```mermaid
flowchart LR

Commit

Push

GitHub

Tests

Build

Docker

Deploy

Production

Commit --> Push

Push --> GitHub

GitHub --> Tests

Tests --> Build

Build --> Docker

Docker --> Deploy

Deploy --> Production

style Commit fill:#DBEAFE
style Push fill:#BBF7D0
style GitHub fill:#FDE68A
style Tests fill:#FECACA
style Build fill:#DDD6FE
style Docker fill:#FBCFE8
style Deploy fill:#CFFAFE
style Production fill:#A7F3D0
```

---

# 📋 Project Roadmap

```mermaid
journey

title SAM Web Medical Roadmap

section Current

Frontend : 5: Complete

Backend : 5: Complete

ONNX Integration : 5: Complete

Interactive Segmentation : 5: Complete

section Next

Authentication : 3: Planned

DICOM Support : 2: Planned

Cloud Storage : 2: Planned

Batch Processing : 2: Planned

section Future

GPU Inference : 1: Future

Multi-user Workspace : 1: Future

Annotation Tools : 1: Future

Clinical Dashboard : 1: Future
```

---

# 🚀 Future Features

- 🔐 Authentication
- 👥 Multi-user collaboration
- ☁ Cloud storage
- 🩻 DICOM viewer
- 📁 NIfTI support
- 📤 Export masks
- 🎨 Mask editing
- 📊 Analytics dashboard
- 🤖 Multi-model support
- ⚡ GPU acceleration
- 🌍 Multi-language UI
- 📱 Progressive Web App
- 🐳 Kubernetes deployment
- ☸ Horizontal autoscaling
- 🔔 Notifications
- 📑 Annotation history

---

# 📚 Coding Standards

- ESLint
- TypeScript Strict Mode
- Functional Components
- Async APIs
- REST Best Practices
- Clean Folder Structure
- Reusable Components
- Consistent Naming
- Git Flow
- Conventional Commits

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes

```bash
git commit -m "feat: add amazing feature"
```

4. Push your branch

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request

---

# 📝 Pull Request Checklist

- [ ] Code compiles successfully
- [ ] Lint checks pass
- [ ] Documentation updated
- [ ] Tested locally
- [ ] No breaking changes
- [ ] Follows project conventions

---
---

# 📊 Benchmark Overview

> **Note:** Benchmark values below are representative and will vary depending on hardware, CPU architecture, image resolution, and deployment environment.

| Metric | Value |
|----------|------:|
| Frontend Bundle | Optimized |
| API Response | Low Latency |
| Image Upload | < 500 ms |
| ONNX Loading | One-time |
| Embedding Generation | Hardware Dependent |
| Interactive Prompt Response | Near Real-time |
| CPU Support | ✅ |
| GPU Required | ❌ |
| Browser Support | Modern Browsers |
| Deployment | Cloud Ready |

---

# 📈 System Characteristics

```mermaid
mindmap
root((SAM Web Medical))

  AI
    Segment Anything
    ONNX Runtime
    Quantized Model
    Image Embeddings

  Frontend
    React 19
    Next.js
    TypeScript
    TailwindCSS

  Backend
    FastAPI
    Python
    REST API
    Async

  DevOps
    Docker
    GitHub
    Cloud Deployment

  Future
    DICOM
    Authentication
    Multi-user
    GPU Support
```

---

# 🔄 End-to-End Data Flow

```mermaid
flowchart LR

User["👨‍⚕️ User"]

Browser["🌐 Browser"]

Frontend["⚛ Next.js"]

API["🐍 FastAPI"]

Preprocess["📦 Image Processing"]

Encoder["🧠 SAM Encoder"]

Embedding["📊 Embeddings"]

Canvas["🎯 Interactive Canvas"]

Mask["🩺 Segmentation"]

User --> Browser

Browser --> Frontend

Frontend --> API

API --> Preprocess

Preprocess --> Encoder

Encoder --> Embedding

Embedding --> Frontend

Frontend --> Canvas

Canvas --> Mask

Mask --> User

style User fill:#DBEAFE
style Browser fill:#DCFCE7
style Frontend fill:#FDE68A
style API fill:#FECACA
style Preprocess fill:#DDD6FE
style Encoder fill:#CFFAFE
style Embedding fill:#FBCFE8
style Canvas fill:#BBF7D0
style Mask fill:#93C5FD
```

---

# 🔐 Security Best Practices

The project follows modern backend and frontend engineering practices to ensure reliability and maintainability.

### Backend

- ✅ Request validation
- ✅ Input sanitization
- ✅ Image type validation
- ✅ File size restrictions
- ✅ Error handling
- ✅ Async request processing
- ✅ RESTful API design
- ✅ Stateless architecture

### Frontend

- ✅ TypeScript strict mode
- ✅ Component isolation
- ✅ Responsive layout
- ✅ Client-side validation
- ✅ Modular architecture

---

# 🌍 Browser Support

| Browser | Supported |
|----------|-----------|
| Chrome | ✅ |
| Edge | ✅ |
| Firefox | ✅ |
| Safari | ✅ |
| Brave | ✅ |

---

# ☁ Deployment Options

| Platform | Status |
|-----------|--------|
| Vercel | ✅ |
| Docker | ✅ |
| Railway | ✅ |
| Render | ✅ |
| Azure | ✅ |
| AWS | ✅ |
| Google Cloud | ✅ |
| DigitalOcean | ✅ |

---

# 📚 Frequently Asked Questions

<details>

<summary><b>Why use ONNX instead of PyTorch?</b></summary>

ONNX Runtime provides a lightweight, portable, and production-friendly inference engine with excellent CPU performance, making deployment simpler and reducing runtime overhead.

</details>

---

<details>

<summary><b>Why is only the encoder running on the backend?</b></summary>

The encoder generates reusable image embeddings once. These embeddings allow interactive segmentation with minimal repeated computation, improving responsiveness.

</details>

---

<details>

<summary><b>Can this project run without a GPU?</b></summary>

Yes. The quantized ONNX model is optimized for CPU inference, making it suitable for standard development machines and many production environments.

</details>

---

<details>

<summary><b>Is this suitable for clinical use?</b></summary>

No. This project is intended for research, experimentation, and educational purposes. It should not be used as a medical diagnostic tool without proper validation and regulatory approval.

</details>

---

# 🛠 Troubleshooting

### ONNX model not found

```bash
Check MODEL_PATH inside .env
```

---

### Backend not starting

```bash
pip install -r requirements.txt
```

---

### Frontend cannot connect to API

Verify

```env
NEXT_PUBLIC_API_URL
```

matches your backend URL.

---

### CORS errors

Enable the correct frontend origin in your FastAPI CORS configuration.

---

### Slow inference

Possible causes:

- Large image size
- Debug mode enabled
- Low-end CPU
- Unoptimized ONNX model

---

# 📦 Dependencies

### Frontend

- Next.js
- React
- TypeScript
- TailwindCSS
- Lucide React

### Backend

- FastAPI
- Uvicorn
- ONNX Runtime
- Pillow
- NumPy
- Python Multipart

---

# 📌 Project Goals

- Build a production-ready AI medical imaging application.
- Demonstrate efficient deployment of Meta's Segment Anything Model.
- Showcase modern full-stack engineering practices.
- Provide an extensible foundation for future medical AI workflows.
- Enable interactive browser-based segmentation with minimal latency.

---

# 🤝 Acknowledgements

This project builds upon the outstanding work of the open-source community.

Special thanks to:

- Meta AI for **Segment Anything Model (SAM)**
- ONNX Runtime contributors
- FastAPI community
- React team
- Next.js team
- TypeScript team
- Tailwind CSS team
- Python community

---

# 📜 License

This project is licensed under the **MIT License**.

Feel free to use, modify, and distribute it in accordance with the license terms.

---

# 🌟 Support

If you found this project useful:

⭐ Star the repository

🍴 Fork the project

🐛 Report bugs through GitHub Issues

💡 Submit feature requests

🤝 Open a Pull Request

---

# 👨‍💻 Author

<div align="center">

## **Anber Aziz**

**Software Engineer • AI Engineer • Full-Stack Developer**

Building modern AI-powered web applications, scalable backend systems, and intelligent developer tools.

<p align="center">

<a href="https://github.com/anberaziz5">
<img src="https://img.shields.io/badge/GitHub-anberaziz5-181717?style=for-the-badge&logo=github">
</a>

</p>

</div>

---

# ⭐ Show Your Support

If this repository helped you, consider giving it a ⭐.

It helps increase visibility and motivates continued development.

---

<div align="center">

# 🚀 Built With

<p>

<img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,python,fastapi,docker,git,github,vscode" />

</p>

### Powered by

**Meta Segment Anything Model (SAM)** • **ONNX Runtime** • **FastAPI** • **Next.js** • **React**

---

### Made with ❤️ by Anber Aziz

*"Building intelligent software, one model at a time."*

</div>

---
