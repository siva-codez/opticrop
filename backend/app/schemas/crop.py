from pydantic import BaseModel
from typing import List, Optional

class CropPredictionRequest(BaseModel):
    nitrogen: float
    phosphorus: float
    potassium: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float
    season: Optional[str] = "kharif"
    location: Optional[str] = None
    soil_type: Optional[str] = None
    irrigation: Optional[str] = None

class CropRecommendation(BaseModel):
    crop: str
    confidence: float
    emoji: str = "🌱"
    reasons: List[str] = []
    npk_compatibility: float = 0.90
    temp_compatibility: float = 0.90
    rainfall_compatibility: float = 0.90
    ph_compatibility: float = 0.90
    season_compatibility: float = 0.90
    description: str = ""
    yield_estimate: str = ""

class CropPredictionResponse(BaseModel):
    top_recommendations: List[CropRecommendation]
    model_name: Optional[str] = "OptiCrop Random Forest Classifier"
    accuracy: Optional[float] = 0.9955
