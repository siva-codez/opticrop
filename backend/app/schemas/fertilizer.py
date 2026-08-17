from pydantic import BaseModel
from typing import List, Optional

class FertilizerRequest(BaseModel):
    crop: str
    soil_ph: float
    nitrogen: float
    phosphorus: float
    potassium: float
    growth_stage: str

class FertilizerResponse(BaseModel):
    nitrogen_rec: float
    phosphorus_rec: float
    potassium_rec: float
    organic_options: List[str]
    suggestions: List[str]
    timing: str
