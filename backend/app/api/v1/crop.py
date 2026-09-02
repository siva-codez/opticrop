from fastapi import APIRouter
from app.schemas.crop import CropPredictionRequest
from app.schemas.common import APIResponse
from app.services.crop_service import CropService

router = APIRouter()

@router.post("/predict", response_model=APIResponse)
async def predict(data: CropPredictionRequest):
    result = await CropService.predict(data)
    return APIResponse(data=result)

@router.get("/history", response_model=APIResponse)
async def history():
    return APIResponse(data=[])
