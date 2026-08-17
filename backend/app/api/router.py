from fastapi import APIRouter
from app.api.health import router as health_router
from app.api.v1.auth import router as auth_router
from app.api.v1.crop import router as crop_router
from app.api.v1.disease import router as disease_router
from app.api.v1.assistant import router as assistant_router
from app.api.v1.weather import router as weather_router
from app.api.v1.fertilizer import router as fertilizer_router
from app.api.v1.irrigation import router as irrigation_router
from app.api.v1.reports import router as reports_router
from app.api.v1.users import router as users_router
from app.api.v1.admin import router as admin_router

api_router = APIRouter()

api_router.include_router(health_router, tags=["health"])
api_router.include_router(auth_router, prefix="/v1/auth", tags=["auth"])
api_router.include_router(crop_router, prefix="/v1/crop", tags=["crop"])
api_router.include_router(disease_router, prefix="/v1/disease", tags=["disease"])
api_router.include_router(assistant_router, prefix="/v1/assistant", tags=["assistant"])
api_router.include_router(weather_router, prefix="/v1/weather", tags=["weather"])
api_router.include_router(fertilizer_router, prefix="/v1/fertilizer", tags=["fertilizer"])
api_router.include_router(irrigation_router, prefix="/v1/irrigation", tags=["irrigation"])
api_router.include_router(reports_router, prefix="/v1/reports", tags=["reports"])
api_router.include_router(users_router, prefix="/v1/users", tags=["users"])
api_router.include_router(admin_router, prefix="/v1/admin", tags=["admin"])
