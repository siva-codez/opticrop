from fastapi import APIRouter
from app.schemas.fertilizer import FertilizerRequest
from app.schemas.common import APIResponse
from app.services.fertilizer_service import FertilizerService

router = APIRouter()

@router.post("/recommend", response_model=APIResponse)
async def recommend(data: FertilizerRequest):
    result = await FertilizerService.recommend(data)
    return APIResponse(data=result)
