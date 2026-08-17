from fastapi import APIRouter
from app.schemas.irrigation import IrrigationRequest
from app.schemas.common import APIResponse
from app.services.irrigation_service import IrrigationService

router = APIRouter()

@router.post("/recommend", response_model=APIResponse)
async def recommend(data: IrrigationRequest):
    result = await IrrigationService.recommend(data)
    return APIResponse(data=result)
