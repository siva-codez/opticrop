"""
AgriAI Weather API Module
Integrated Open-Meteo Weather & Agromet Advisory Service
Provides endpoints and CLI helpers for live agromet weather feeds, hourly forecasts, and 7-day agricultural forecasts.
"""

import asyncio
from typing import Optional
from fastapi import APIRouter, Query
from app.schemas.common import APIResponse
from app.services.weather_service import WeatherService

router = APIRouter()

@router.get("/", response_model=APIResponse, summary="Get full live weather and agromet advisory for a location")
async def get_weather(
    location: str = Query("Chennai, Tamil Nadu", description="City, district, or address query"),
    lat: Optional[float] = Query(None, description="Optional latitude coordinate"),
    lon: Optional[float] = Query(None, description="Optional longitude coordinate")
):
    """
    Fetch comprehensive weather conditions, next 24h hourly trends,
    7-day agricultural forecasts, and smart agromet crop advisories.
    """
    if lat is not None and lon is not None:
        result = await WeatherService.get_weather_by_coords(lat, lon, location_name=location)
    else:
        result = await WeatherService.get_current(location)
    return APIResponse(data=result)

@router.get("/current", response_model=APIResponse, summary="Get current weather data")
async def get_current_weather(
    location: str = Query("Chennai, Tamil Nadu", description="Location name"),
    lat: Optional[float] = Query(None),
    lon: Optional[float] = Query(None)
):
    if lat is not None and lon is not None:
        result = await WeatherService.get_weather_by_coords(lat, lon, location_name=location)
    else:
        result = await WeatherService.get_current(location)
    return APIResponse(data=result)

@router.get("/forecast", response_model=APIResponse, summary="Get 7-day agricultural forecast")
async def get_weather_forecast(location: str = Query("Chennai, Tamil Nadu")):
    result = await WeatherService.get_forecast(location)
    return APIResponse(data=result)

@router.get("/coords", response_model=APIResponse, summary="Get weather data by GPS coordinates")
async def get_weather_by_coords(
    lat: float = Query(..., description="Latitude"),
    lon: float = Query(..., description="Longitude"),
    name: Optional[str] = Query(None, description="Optional name label")
):
    result = await WeatherService.get_weather_by_coords(lat, lon, location_name=name)
    return APIResponse(data=result)

# Allow standalone execution: python weather_api.py
if __name__ == "__main__":
    async def main():
        print("Fetching Live Weather for Chennai...")
        data = await WeatherService.get_current("Chennai, Tamil Nadu")
        print(f"Location: {data.location}")
        print(f"Temperature: {data.temperature}°C (Feels like: {data.feels_like}°C)")
        print(f"Condition: {data.condition} - {data.description}")
        print(f"Humidity: {data.humidity}% | Wind: {data.wind_speed} km/h | Rain: {data.rainfall} mm")
        print(f"Advisories: {len(data.advisories or [])} generated.")
        for adv in (data.advisories or []):
            print(f"  [{adv.level.upper()}] {adv.title}: {adv.advice}")

    asyncio.run(main())
