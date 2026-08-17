from app.schemas.fertilizer import FertilizerRequest, FertilizerResponse

class FertilizerService:
    @staticmethod
    async def recommend(data: FertilizerRequest) -> FertilizerResponse:
        # Mock behavior
        return FertilizerResponse(
            nitrogen_rec=50.0,
            phosphorus_rec=30.0,
            potassium_rec=20.0,
            organic_options=["Compost", "Manure"],
            suggestions=["Apply in split doses"],
            timing="Early morning"
        )
