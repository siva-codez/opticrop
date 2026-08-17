from pydantic import BaseModel, ConfigDict
from typing import List, Any
from app.schemas.auth import UserResponse

class AdminAnalyticsResponse(BaseModel):
    total_users: int
    active_users: int
    total_crop_predictions: int
    total_disease_predictions: int
    total_chat_messages: int
    most_recommended_crops: List[str]
    most_detected_diseases: List[str]
    daily_activity: List[dict]

class AdminUserResponse(UserResponse):
    pass
