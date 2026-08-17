from pydantic import BaseModel
from typing import List

class IrrigationRequest(BaseModel):
    crop: str
    soil_type: str
    temperature: float
    humidity: float
    rainfall: float
    growth_stage: str

class IrrigationResponse(BaseModel):
    recommendation: str
    frequency: str
    water_requirement: float
    rainfall_adjustment: str
    tips: List[str]
