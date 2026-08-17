from app.schemas.weather import WeatherResponse

class WeatherService:
    @staticmethod
    async def get_current(location: str) -> WeatherResponse:
        # Mock behavior
        return WeatherResponse(
            location=location,
            temperature=28.5,
            humidity=60.0,
            rainfall=0.0,
            wind_speed=12.5,
            condition="Clear",
            description="Clear sky",
            icon="01d",
            forecast=[]
        )

    @staticmethod
    async def get_forecast(location: str) -> list:
        return []
