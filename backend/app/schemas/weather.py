from pydantic import BaseModel, Field
from typing import List, Optional, Any

class CurrentWeather(BaseModel):
    location: str
    latitude: float
    longitude: float
    temperature: float
    feels_like: float
    humidity: float
    rainfall: float
    precipitation_probability: float = 0.0
    wind_speed: float
    wind_direction: float = 0.0
    pressure: float = 1013.0
    uv_index: float = 0.0
    condition: str
    description: str
    icon: str
    is_day: bool = True
    timestamp: str

class HourlyForecast(BaseModel):
    time: str
    datetime: str
    temperature: float
    humidity: float
    precipitation_probability: float
    condition: str
    icon: str
    wind_speed: float

class DailyForecast(BaseModel):
    date: str
    day: str
    temp_max: float
    temp_min: float
    condition: str
    icon: str
    precipitation_sum: float
    precipitation_probability: float
    wind_speed_max: float
    uv_index_max: float

class AgrometAdvisory(BaseModel):
    category: str
    title: str
    level: str  # optimal, warning, critical, info
    advice: str

class WeatherResponse(BaseModel):
    location: str
    temperature: float
    humidity: float
    rainfall: float
    wind_speed: float
    condition: str
    description: str
    icon: str
    feels_like: Optional[float] = None
    pressure: Optional[float] = None
    uv_index: Optional[float] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    timestamp: Optional[str] = None
    current: Optional[CurrentWeather] = None
    hourly: Optional[List[HourlyForecast]] = None
    forecast: Optional[List[DailyForecast]] = None
    advisories: Optional[List[AgrometAdvisory]] = None

