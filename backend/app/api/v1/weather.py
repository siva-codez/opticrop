from typing import Optional
from fastapi import APIRouter, Query
from app.schemas.common import APIResponse
from app.services.weather_service import WeatherService

router = APIRouter()

@router.get("/", response_model=APIResponse)
async def get_weather(
    location: str = Query("Chennai, Tamil Nadu", description="Location name"),
    lat: Optional[float] = Query(None),
    lon: Optional[float] = Query(None)
):
    if lat is not None and lon is not None:
        result = await WeatherService.get_weather_by_coords(lat, lon, location_name=location)
    else:
        result = await WeatherService.get_current(location)
    return APIResponse(data=result)

@router.get("/current", response_model=APIResponse)
async def get_current(
    location: str = Query("Chennai, Tamil Nadu", description="Location name"),
    lat: Optional[float] = Query(None),
    lon: Optional[float] = Query(None)
):
    if lat is not None and lon is not None:
        result = await WeatherService.get_weather_by_coords(lat, lon, location_name=location)
    else:
        result = await WeatherService.get_current(location)
    return APIResponse(data=result)

@router.get("/forecast", response_model=APIResponse)
async def get_forecast(location: str = Query("Chennai, Tamil Nadu")):
    result = await WeatherService.get_forecast(location)
    return APIResponse(data=result)

@router.get("/coords", response_model=APIResponse)
async def get_coords(
    lat: float = Query(..., description="Latitude"),
    lon: float = Query(..., description="Longitude"),
    name: Optional[str] = Query(None, description="Location display name")
):
    result = await WeatherService.get_weather_by_coords(lat, lon, location_name=name)
    return APIResponse(data=result)
