from fastapi import APIRouter
from app.schemas.common import APIResponse

router = APIRouter()

@router.get("/me", response_model=APIResponse)
async def get_me():
    return APIResponse(data={"id": 1, "name": "Test User"})

@router.put("/me", response_model=APIResponse)
async def update_me():
    return APIResponse(data={"id": 1, "name": "Updated User"})
