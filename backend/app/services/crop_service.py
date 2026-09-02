from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.schemas.crop import (
    CropPredictionRequest,
    CropPredictionResponse,
    CropRecommendation,
)
from app.models.crop_prediction import CropPrediction
from app.services.ml.model_registry import ModelRegistry
from app.services.ml.crop_model_service import CropModelService, CROP_PROFILES

class CropService:
    @staticmethod
    async def predict(data: CropPredictionRequest) -> CropPredictionResponse:
        registry = ModelRegistry()
        model_service: CropModelService = registry.get("crop_model")
        
        if not model_service:
            model_service = CropModelService()
            model_service.load_model()
            registry.register("crop_model", model_service)

        features = data.model_dump()
        raw_recommendations = model_service.predict(features, top_n=3)
        
        recommendations = [CropRecommendation(**rec) for rec in raw_recommendations]
        return CropPredictionResponse(
            top_recommendations=recommendations,
            model_name="OptiCrop Random Forest Classifier (99.55% Accuracy)",
            accuracy=0.9955
        )

    @staticmethod
    async def get_history(db: AsyncSession, user_id: int) -> list:
        return []
