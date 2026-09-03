from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class AlternativePrediction(BaseModel):
    disease: str
    confidence: float

class DiseasePredictionResponse(BaseModel):
    plant: str = "Rice"
    disease: str
    common_name: Optional[str] = None
    pathogen: Optional[str] = None
    confidence: float
    severity: str
    spread_risk: Optional[str] = "Medium"
    spread_risk_score: Optional[int] = 50
    symptoms: List[str] = []
    recommended_action: List[str] = []
    products: List[str] = []
    prevention: List[str] = []
    top_predictions: Optional[List[AlternativePrediction]] = []
    disclaimer: str = "This is an AI prediction. Please consult an agricultural expert or extension office before applying chemical treatments."
