from pydantic import BaseModel
from typing import List, Optional

class WeatherResponse(BaseModel):
    location: str
    temperature: float
    humidity: float
    rainfall: float
    wind_speed: float
    condition: str
    description: str
    icon: str
    forecast: Optional[List[dict]] = None
