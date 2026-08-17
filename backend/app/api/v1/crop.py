from fastapi import APIRouter
from app.schemas.crop import CropPredictionRequest, CropSuitabilityRequest
from app.schemas.common import APIResponse
from app.services.crop_service import CropService

router = APIRouter()

@router.post("/predict", response_model=APIResponse)
async def predict(data: CropPredictionRequest):
    result = await CropService.predict(data)
    return APIResponse(data=result)

@router.post("/suitability", response_model=APIResponse)
async def suitability(data: CropSuitabilityRequest):
    result = await CropService.check_suitability(data)
    return APIResponse(data=result)

@router.get("/history", response_model=APIResponse)
async def history():
    return APIResponse(data=[])
