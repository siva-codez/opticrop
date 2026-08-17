from pydantic import BaseModel, ConfigDict
from typing import List

class CropPredictionRequest(BaseModel):
    nitrogen: float
    phosphorus: float
    potassium: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float
    season: str

class CropRecommendation(BaseModel):
    crop: str
    confidence: float
    reasons: List[str]
    npk_compatibility: float
    temp_compatibility: float
    rainfall_compatibility: float
    ph_compatibility: float
    season_compatibility: float

class CropPredictionResponse(BaseModel):
    top_recommendations: List[CropRecommendation]

class CropSuitabilityRequest(BaseModel):
    crop: str
    nitrogen: float
    phosphorus: float
    potassium: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float
    season: str

class CropSuitabilityResponse(BaseModel):
    suitability_level: str
    score: float
    positive_factors: List[str]
    limiting_factors: List[str]
    suggestions: List[str]
