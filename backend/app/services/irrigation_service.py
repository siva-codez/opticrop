from app.schemas.irrigation import IrrigationRequest, IrrigationResponse

class IrrigationService:
    @staticmethod
    async def recommend(data: IrrigationRequest) -> IrrigationResponse:
        # Mock behavior
        return IrrigationResponse(
            recommendation="Irrigate every 3 days",
            frequency="Every 3 days",
            water_requirement=15.0,
            rainfall_adjustment="Reduce if rainfall exceeds 10mm",
            tips=["Water in the evening", "Check soil moisture before watering"]
        )
