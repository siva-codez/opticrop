from pydantic import BaseModel, ConfigDict
from typing import Optional

class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    preferred_language: Optional[str] = None
    farm_size: Optional[float] = None
    soil_type: Optional[str] = None
    main_crops: Optional[str] = None

class UserProfileResponse(BaseModel):
    id: int
    full_name: str
    phone: Optional[str]
    location: Optional[str]
    preferred_language: str
    farm_size: Optional[float]
    soil_type: Optional[str]
    main_crops: Optional[str]
    
    model_config = ConfigDict(from_attributes=True)
