from fastapi import APIRouter, UploadFile, File
from app.schemas.common import APIResponse
from app.services.disease_service import DiseaseService

router = APIRouter()

@router.post("/predict", response_model=APIResponse)
async def predict(file: UploadFile = File(...)):
    result = await DiseaseService.predict(file)
    return APIResponse(data=result)

@router.get("/history", response_model=APIResponse)
async def history():
    return APIResponse(data=[])
