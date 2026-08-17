from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.admin import AdminAnalyticsResponse

class AdminService:
    @staticmethod
    async def get_analytics(db: AsyncSession) -> AdminAnalyticsResponse:
        return AdminAnalyticsResponse(
            total_users=10,
            active_users=8,
            total_crop_predictions=100,
            total_disease_predictions=50,
            total_chat_messages=500,
            most_recommended_crops=["Rice", "Wheat"],
            most_detected_diseases=["Blight"],
            daily_activity=[]
        )

    @staticmethod
    async def get_users(db: AsyncSession) -> list:
        return []

    @staticmethod
    async def get_predictions(db: AsyncSession) -> list:
        return []
