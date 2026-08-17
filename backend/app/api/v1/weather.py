from fastapi import APIRouter
from app.schemas.common import APIResponse
from app.services.weather_service import WeatherService

router = APIRouter()

@router.get("/", response_model=APIResponse)
async def get_current(location: str):
    result = await WeatherService.get_current(location)
    return APIResponse(data=result)

@router.get("/forecast", response_model=APIResponse)
async def get_forecast(location: str):
    result = await WeatherService.get_forecast(location)
    return APIResponse(data=result)
