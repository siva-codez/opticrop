from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.crop import CropPredictionRequest, CropPredictionResponse, CropSuitabilityRequest, CropSuitabilityResponse, CropRecommendation
from app.models.crop_prediction import CropPrediction

class CropService:
    @staticmethod
    async def predict(data: CropPredictionRequest) -> CropPredictionResponse:
        # Mock behavior
        rec = CropRecommendation(
            crop="Rice", confidence=0.92, reasons=["Good NPK", "Ideal Temp"],
            npk_compatibility=0.9, temp_compatibility=0.95, rainfall_compatibility=0.85,
            ph_compatibility=0.9, season_compatibility=1.0
        )
        return CropPredictionResponse(top_recommendations=[rec])

    @staticmethod
    async def check_suitability(data: CropSuitabilityRequest) -> CropSuitabilityResponse:
        return CropSuitabilityResponse(
            suitability_level="High", score=0.88, positive_factors=["Good Temp"],
            limiting_factors=["Low Rainfall"], suggestions=["Irrigate frequently"]
        )

    @staticmethod
    async def get_history(db: AsyncSession, user_id: int) -> list:
        return []
