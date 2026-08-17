from fastapi import APIRouter
from typing import Dict

router = APIRouter()

@router.get("/health")
async def health_check() -> Dict[str, str]:
    return {"status": "healthy", "service": "OptiCrop API", "version": "1.0.0"}
