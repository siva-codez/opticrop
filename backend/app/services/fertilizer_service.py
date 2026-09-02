from app.schemas.fertilizer import (
    FertilizerPredictionRequest,
    FertilizerPredictionResponse,
    FertilizerRequest,
    FertilizerResponse
)
from app.services.ml.model_registry import ModelRegistry
from app.services.ml.fertilizer_model_service import FertilizerModelService

class FertilizerService:
    @staticmethod
    def _get_model_service() -> FertilizerModelService:
        registry = ModelRegistry()
        service: FertilizerModelService = registry.get("fertilizer_model")
        if not service:
            service = FertilizerModelService()
            service.load_model()
            registry.register("fertilizer_model", service)
        return service

    @classmethod
    async def predict(cls, data: FertilizerPredictionRequest) -> FertilizerPredictionResponse:
        model_service = cls._get_model_service()
        features = data.model_dump()
        acres = data.land_area_acres or 1.0
        result = model_service.predict(features, acres=acres)
        return FertilizerPredictionResponse(**result)

    @classmethod
    async def recommend(cls, data: FertilizerRequest) -> FertilizerPredictionResponse:
        model_service = cls._get_model_service()
        
        # Normalize inputs from legacy or new form
        crop = data.crop_type or data.crop or "Maize"
        p_val = data.phosphorous if data.phosphorous is not None else (data.phosphorus or 0.0)
        
        features = {
            "temperature": data.temperature if data.temperature is not None else 26.0,
            "humidity": data.humidity if data.humidity is not None else 52.0,
            "moisture": data.moisture if data.moisture is not None else 38.0,
            "soil_type": data.soil_type or "Sandy",
            "crop_type": crop,
            "nitrogen": data.nitrogen,
            "phosphorous": p_val,
            "potassium": data.potassium
        }
        acres = data.land_area_acres or 1.0
        result = model_service.predict(features, acres=acres)
        return FertilizerPredictionResponse(**result)
