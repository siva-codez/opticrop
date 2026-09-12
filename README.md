<h1 align="center">🌾 OptiCrop</h1>
<h3 align="center">Smart Agricultural Production Optimization Engine</h3>
<p align="center">🌱 Smarter Farming • Better Decisions • AI-Powered Agriculture</p>

<p align="center">
  <a href="https://opticrop-ochre.vercel.app">
    <img src="https://img.shields.io/badge/🌐%20Live%20Demo-OptiCrop-success?style=for-the-badge" alt="Live Demo"/>
  </a>
</p>

---

## 🌱 About OptiCrop

**OptiCrop** is an AI-powered agricultural decision-support platform designed to help farmers make smarter, more informed farming decisions.

The platform combines **Machine Learning, Computer Vision, Generative AI, Weather Intelligence, and agricultural data** to deliver practical recommendations for crop selection, plant disease identification, fertilizer guidance, and agricultural assistance.

> 🌾 *From agricultural data to intelligent farming decisions.*

---

## 🌐 Live Demo

<p align="center">🔗 <a href="https://opticrop-ochre.vercel.app">Live OptiCrop Website </a></p>

---

## 📸 Application Preview


<table>
<tr>
<td align="center" width="50%">
<b>🏠 Home Dashboard</b><br/><br/>
<img src="docs/screenshots/opticrop_home.png" width="100%" alt="OptiCrop Home Dashboard">
</td>
<td align="center" width="50%">
<b>🌱 Crop Recommendation</b><br/><br/>
<img src="docs/screenshots/opticrop_diseas_recomm.png" width="100%" alt="OptiCrop Crop Recommendation">
</td>
</tr>
<tr>
<td align="center" width="50%">
<b>🍃 Disease Detection</b><br/><br/>
<img src="docs/screenshots/opticrop_diseas.png" width="100%" alt="OptiCrop Disease Detection">
</td>
<td align="center" width="50%">
<b>🤖 AI Agricultural Assistant</b><br/><br/>
<img src="docs/screenshots/opticrop_chatbot.png" width="100%" alt="OptiCrop AI Assistant">
</td>
</tr>
<tr>
<td align="center" width="50%">
<b>🌦️ Fertilizer Recommendatiom</b><br/><br/>
<img src="docs/screenshots/opticrop_fertili_recom" width="100%" alt="OptiCrop Weather Intelligence">
</td>
<td align="center" width="50%">
<b>🌦️ Weather Intelligence</b><br/><br/>
<img src="docs/screenshots/Opticrop_weather" width="100%" alt="OptiCrop Weather Intelligence">
</td>
</tr>
</table>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌱 **Crop Recommendation** | ML-powered crop recommendations based on soil and environmental parameters |
| 🍃 **Disease Detection** | CNN-based plant leaf disease classification using computer vision |
| 🤖 **AI Agricultural Assistant** | AI-powered agricultural chatbot with multilingual support |
| 🌦️ **Weather Intelligence** | Weather information used as additional agricultural context |
| 🧪 **Fertilizer Guidance** | Provides practical fertilizer-related recommendations |
| 📊 **Prediction Confidence** | Displays confidence information for ML predictions |
| 🌐 **Responsive Web Application** | Designed for desktop, tablet, and mobile screens |

---

## 🌱 Crop Recommendation

OptiCrop analyzes key agricultural parameters to recommend suitable crops.

**Input Parameters:** Nitrogen (N) • Phosphorus (P) • Potassium (K) • Temperature • Humidity • Soil pH • Rainfall • Season

```text
Agricultural Parameters
        ↓
   Data Validation
        ↓
  Data Preprocessing
        ↓
     ML Model
        ↓
  Crop Prediction
        ↓
Top Recommended Crops
        ↓
Confidence & Suitability
```

---

## 🍃 Plant Disease Detection

The disease detection module uses Computer Vision and CNN-based Deep Learning to analyze crop leaf images.

```text
Upload Leaf Image
        ↓
Image Preprocessing
        ↓
     CNN Model
        ↓
Disease Classification
        ↓
   Prediction Result
        ↓
Agricultural Information
```

---

## 🤖 AI Agricultural Assistant

OptiCrop includes an AI-powered agricultural assistant that answers farming-related questions.

**Supported Languages:** 🇬🇧 English • 🇮🇳 Tamil • 🇮🇳 Malayalam

The assistant provides conversational guidance on crops, plant diseases, fertilizers, weather, and farming practices.

---

## 🌦️ Weather Intelligence

OptiCrop integrates weather data to add environmental context to agricultural decisions — including temperature, humidity, rain conditions, current weather, and forecast information.

---

## 🧠 Artificial Intelligence Architecture

```text
                         ┌─────────────────────┐
                         │        FARMER        │
                         └───────────┬───────────┘
                                     │
                                     ▼
                    ┌────────────────────────────┐
                    │       OPTICROP WEB APP      │
                    │  React + TypeScript + Vite  │
                    │        Tailwind CSS         │
                    └──────────────┬─────────────┘
                                   │
                               REST API
                                   │
                                   ▼
                    ┌────────────────────────────┐
                    │       FASTAPI BACKEND       │
                    │           Python            │
                    └──────────────┬─────────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              │                    │                     │
              ▼                    ▼                     ▼
     ┌────────────────┐   ┌────────────────┐   ┌────────────────┐
     │  Crop ML Model  │   │  Disease Model  │   │  AI Assistant  │
     │  scikit-learn   │   │   TensorFlow    │   │   OpenAI API   │
     └────────────────┘   └────────────────┘   └────────────────┘
              │                    │                     │
              └────────────────────┼────────────────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │    Weather API     │
                         └───────────────────┘
```

---

## 🏗️ System Architecture

| Component | Technology | Deployment |
|---|---|---|
| 🎨 Web Frontend | React 19 + Vite + TypeScript + Tailwind CSS | Vercel |
| ⚙️ Backend API | Python + FastAPI | Render |
| 🗄️ Database | PostgreSQL | Cloud |
| 🤖 Crop ML | scikit-learn | Backend |
| 🍃 Disease Detection | TensorFlow / Keras | Backend |
| 🧠 AI Assistant | OpenAI API | Backend Proxy |
| 🌦️ Weather | Weather API | Backend |
| 🔐 Authentication | JWT | Backend |

---

## 🛠️ Technology Stack

**🎨 Frontend**

<p>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
</p>

**⚙️ Backend**

<p>
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
<img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI"/>
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
</p>

**🤖 AI / Machine Learning**

<p>
<img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white" alt="TensorFlow"/>
<img src="https://img.shields.io/badge/Keras-D00000?style=for-the-badge&logo=keras&logoColor=white" alt="Keras"/>
<img src="https://img.shields.io/badge/Scikit--Learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" alt="Scikit-learn"/>
<img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI"/>
</p>

**🧰 Tools**

<p>
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git"/>
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="Postman"/>
</p>

---

## 📁 Project Structure

```text
OptiCrop/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── utils/
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── core/
│   │   └── db/
│   ├── requirements.txt
│   └── .env.example
│
├── ml/
│   ├── notebooks/
│   ├── models/
│   └── datasets/
│
├── docs/
│   └── screenshots/
│       ├── home.png
│       ├── crop-recommendation.png
│       ├── disease-detection.png
│       ├── ai-assistant.png
│       └── weather.png
│
├── docker-compose.yml
└── README.md
```

---

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js 20+
- Python 3.12+
- PostgreSQL 16+
- Git
- *(Optional)* Docker & Docker Compose

### 1️⃣ Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd OptiCrop
```

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App runs at: `http://localhost:5173`

### 3️⃣ Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate — Windows
venv\Scripts\activate
# Activate — macOS / Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment file
cp .env.example .env

# Start backend
uvicorn app.main:app --reload
```

- Backend: `http://localhost:8000`
- Swagger API docs: `http://localhost:8000/docs`

### 4️⃣ Docker Setup (Optional)

```bash
docker-compose up -d
```

- Backend: `http://localhost:8000`
- PostgreSQL: `localhost:5432`

---

## 🔐 Environment Variables

**Backend** — create `backend/.env`:

```env
DATABASE_URL=your_postgresql_database_url
JWT_SECRET_KEY=your_secret_key
OPENAI_API_KEY=your_openai_api_key
WEATHER_API_KEY=your_weather_api_key
FRONTEND_URL=http://localhost:5173
ENVIRONMENT=development
MOCK_ML=false
```

**Frontend** — create `frontend/.env`:

```env
VITE_API_URL=http://localhost:8000
```

> ⚠️ Never commit `.env` files or API keys to GitHub.

---

## 🧪 Testing

**Backend**

```bash
cd backend
pytest tests/ -v
```

**Frontend**

```bash
cd frontend
npm run test
```

---

## 🧠 Machine Learning Workflow

```text
Agricultural Dataset
        ↓
   Data Cleaning
        ↓
   EDA Analysis
        ↓
Feature Selection
        ↓
Data Preprocessing
        ↓
  Model Training
        ↓
 Model Evaluation
        ↓
Model Serialization
        ↓
 FastAPI Backend
        ↓
 React Frontend
        ↓
     Farmer
```

### 📊 ML Model Components

**Crop Recommendation**
- `best_model.pkl`
- `standard_scaler.pkl`
- `label_encoder.pkl`
- `feature_names.pkl`
- `metadata.json`

**Disease Detection**
- `disease_model.keras`
- `disease_model.tflite`
- `class_names.json`
- `image_preprocessing.json`
- `metadata.json`
- `model_metrics.json`
- `disease_info.json`

> Model files may be excluded from the Git repository depending on their size and deployment requirements.

---

<p align="center">
🌾 <b>OptiCrop — Engineering Smarter Agriculture with AI.</b>
</p>
