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

settings = get_settings()
limiter = Limiter(key_func=get_remote_address)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    
    registry = ModelRegistry()
    crop_service = CropModelService()
    disease_service = DiseaseModelService()
    
    try:
        crop_service.load_model()
        disease_service.load_model()
    except Exception as e:
        print(f"Warning: Could not load models: {e}")
        
    registry.register("crop_model", crop_service)
    registry.register("disease_model", disease_service)
    
    yield
    # Shutdown
    pass

app = FastAPI(title="OptiCrop API", lifespan=lifespan)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
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
