from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class FertilizerPredictionRequest(BaseModel):
    temperature: float = Field(..., description="Ambient temperature in °C", example=26.0)
    humidity: float = Field(..., description="Relative humidity in %", example=52.0)
    moisture: float = Field(..., description="Soil moisture level in %", example=38.0)
    soil_type: str = Field(..., description="Soil classification: Black, Clayey, Loamy, Red, Sandy", example="Sandy")
    crop_type: str = Field(..., description="Crop type: Barley, Cotton, Ground Nuts, Maize, Millets, Oil seeds, Paddy, Pulses, Sugarcane, Tobacco, Wheat", example="Maize")
    nitrogen: float = Field(..., description="Soil Nitrogen level (N) in ppm or kg/ha", example=37.0)
    phosphorous: float = Field(..., description="Soil Phosphorous level (P) in ppm or kg/ha", example=0.0)
    potassium: float = Field(..., description="Soil Potassium level (K) in ppm or kg/ha", example=0.0)
    land_area_acres: Optional[float] = Field(1.0, description="Farm land size in acres", example=1.0)
    growth_stage: Optional[str] = Field("Vegetative", description="Current growth stage of the crop")

# Compatibility alias for existing /recommend endpoint
class FertilizerRequest(BaseModel):
    temperature: Optional[float] = 26.0
    humidity: Optional[float] = 52.0
    moisture: Optional[float] = 38.0
    soil_type: Optional[str] = "Sandy"
    crop_type: Optional[str] = "Maize"
    crop: Optional[str] = None
    nitrogen: float = 37.0
    phosphorus: Optional[float] = 0.0
    phosphorous: Optional[float] = 0.0
    potassium: float = 0.0
    soil_ph: Optional[float] = 6.5
    growth_stage: Optional[str] = "vegetative"
    land_area_acres: Optional[float] = 1.0

class SplitScheduleItem(BaseModel):
    phase: str
    percentage: str
    amount_kg: float
    action: str

class OrganicAlternativeItem(BaseModel):
    name: str
    rate: str
    desc: str

class AlternativeFertilizerItem(BaseModel):
    fertilizer: str
    npk_ratio: str
    confidence: float
    reason: str

class FertilizerPredictionResponse(BaseModel):
    fertilizer_name: str
    npk_ratio: str
    category: str
    confidence: float
    color: Optional[str] = "#10b981"
    bg_color: Optional[str] = "rgba(16, 185, 129, 0.15)"
    dosage_kg_per_hectare: float
    dosage_kg_per_acre: float
    total_recommended_kg: float
    land_area_acres: float
    application_method: str
    application_timing: str
    key_benefits: List[str]
    precautions: List[str]
    split_schedule: List[SplitScheduleItem]
    organic_alternatives: List[OrganicAlternativeItem]
    top_alternatives: List[AlternativeFertilizerItem]
    soil_insights: str
    model_name: Optional[str] = "OptiCrop Random Forest Fertilizer Recommendation Engine"
    features_used: Optional[Dict[str, Any]] = None

# Backward compatibility response
class FertilizerResponse(BaseModel):
    nitrogen_rec: Optional[float] = 50.0
    phosphorus_rec: Optional[float] = 30.0
    potassium_rec: Optional[float] = 20.0
    organic_options: Optional[List[str]] = []
    suggestions: Optional[List[str]] = []
    timing: Optional[str] = "Early morning"
    prediction: Optional[FertilizerPredictionResponse] = None
