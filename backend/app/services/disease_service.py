from fastapi import UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.disease import DiseasePredictionResponse
from app.models.disease_prediction import DiseasePrediction

class DiseaseService:
    @staticmethod
    async def predict(image_file: UploadFile) -> DiseasePredictionResponse:
        # Mock behavior
        return DiseasePredictionResponse(
            plant="Tomato",
            disease="Blight",
            confidence=0.89,
            symptoms=["Brown spots on leaves"],
            severity="Medium",
            recommended_action=["Apply fungicide"],
            prevention=["Rotate crops", "Ensure proper spacing"],
            disclaimer="This is an AI prediction. Please consult an expert."
        )

    @staticmethod
    async def get_history(db: AsyncSession, user_id: int) -> list:
        return []
