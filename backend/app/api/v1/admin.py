from fastapi import APIRouter, Depends
from app.schemas.common import APIResponse
from app.services.admin_service import AdminService
from app.core.dependencies import DbSession

router = APIRouter()

@router.get("/analytics", response_model=APIResponse)
async def analytics(db: DbSession):
    result = await AdminService.get_analytics(db)
    return APIResponse(data=result)

@router.get("/users", response_model=APIResponse)
async def users(db: DbSession):
    result = await AdminService.get_users(db)
    return APIResponse(data=result)

@router.get("/predictions", response_model=APIResponse)
async def predictions(db: DbSession):
    result = await AdminService.get_predictions(db)
    return APIResponse(data=result)
