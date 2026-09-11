import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app.core.config import get_settings
from app.core.exceptions import register_exception_handlers
from app.api.router import api_router
from app.services.ml.model_registry import ModelRegistry
from app.services.ml.crop_model_service import CropModelService
from app.services.ml.disease_model_service import DiseaseModelService
from app.services.ml.fertilizer_model_service import FertilizerModelService

settings = get_settings()
limiter = Limiter(key_func=get_remote_address)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    
    registry = ModelRegistry()
    crop_service = CropModelService()
    disease_service = DiseaseModelService()
    fertilizer_service = FertilizerModelService()
    
    try:
        crop_service.load_model()
        disease_service.load_model()
        fertilizer_service.load_model()
    except Exception as e:
        print(f"Warning: Could not load models: {e}")
        
    registry.register("crop_model", crop_service)
    registry.register("disease_model", disease_service)
    registry.register("fertilizer_model", fertilizer_service)
    
    yield
    # Shutdown
    pass

app = FastAPI(title="OptiCrop API", lifespan=lifespan)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Configure CORS to permit local development, Vercel deployments, and production URLs
allowed_origins = [
    origin.strip()
    for origin in [
        settings.FRONTEND_URL,
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "https://opticrop-ochre.vercel.app",
    ]
    if origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=list(set(allowed_origins)),
    allow_origin_regex=r"^https:\/\/.*\.vercel\.app$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_exception_handlers(app)
app.include_router(api_router)
app.include_router(api_router, prefix="/api")

@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/docs")
