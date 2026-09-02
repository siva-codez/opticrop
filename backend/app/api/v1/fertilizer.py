from fastapi import APIRouter
from app.schemas.fertilizer import FertilizerPredictionRequest, FertilizerRequest
from app.schemas.common import APIResponse
from app.services.fertilizer_service import FertilizerService

router = APIRouter()

@router.post("/predict", response_model=APIResponse)
async def predict_fertilizer(data: FertilizerPredictionRequest):
    result = await FertilizerService.predict(data)
    return APIResponse(data=result)

@router.post("/recommend", response_model=APIResponse)
async def recommend_fertilizer(data: FertilizerRequest):
    result = await FertilizerService.recommend(data)
    return APIResponse(data=result)
