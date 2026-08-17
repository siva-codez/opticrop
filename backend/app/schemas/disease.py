from pydantic import BaseModel, ConfigDict
from typing import List

class DiseasePredictionResponse(BaseModel):
    plant: str
    disease: str
    confidence: float
    symptoms: List[str]
    severity: str
    recommended_action: List[str]
    prevention: List[str]
    disclaimer: str
