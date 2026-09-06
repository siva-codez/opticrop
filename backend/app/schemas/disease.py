from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class AlternativePrediction(BaseModel):
    disease: str
    confidence: float

class RecoveryMilestone(BaseModel):
    phase: str
    timeline: str
    action: str

class DiseasePredictionResponse(BaseModel):
    plant: str = "Rice / Paddy"
    disease: str
    common_name: Optional[str] = None
    pathogen: Optional[str] = None
    pathogen_type: Optional[str] = "Fungal"
    confidence: float
    severity: str
    spread_risk: Optional[str] = "Medium"
    spread_risk_score: Optional[int] = 50
    symptoms: List[str] = []
    immediate_actions: Optional[List[str]] = []
    recommended_action: List[str] = []
    products: List[str] = []
    organic_remedies: Optional[List[str]] = []
    chemical_remedies: Optional[List[str]] = []
    prevention: List[str] = []
    resistant_varieties: Optional[List[str]] = []
    recovery_milestones: Optional[List[RecoveryMilestone]] = []
    top_predictions: Optional[List[AlternativePrediction]] = []
    ai_solution: Optional[str] = None
    model_source: Optional[str] = None
    disclaimer: str = "This is an AI-powered diagnostic advisory based on deep learning visual analysis. Confirm critical diagnoses with your regional agricultural extension officer or agronomist before initiating broad chemical applications."
