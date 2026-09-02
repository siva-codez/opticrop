from fastapi import APIRouter
from app.api.health import router as health_router
from app.api.v1.auth import router as auth_router
from app.api.v1.crop import router as crop_router
from app.api.v1.disease import router as disease_router
from app.api.v1.assistant import router as assistant_router
from app.api.v1.weather import router as weather_router
from app.api.v1.fertilizer import router as fertilizer_router
from app.api.v1.reports import router as reports_router
from app.api.v1.users import router as users_router

api_router = APIRouter()

# Health check
api_router.include_router(health_router, tags=["health"])

# Version 1 routes
api_router.include_router(auth_router, prefix="/v1/auth", tags=["auth"])
api_router.include_router(crop_router, prefix="/v1/crop", tags=["crop"])
api_router.include_router(disease_router, prefix="/v1/disease", tags=["disease"])
api_router.include_router(assistant_router, prefix="/v1/assistant", tags=["assistant"])
api_router.include_router(weather_router, prefix="/v1/weather", tags=["weather"])
api_router.include_router(fertilizer_router, prefix="/v1/fertilizer", tags=["fertilizer"])
api_router.include_router(reports_router, prefix="/v1/reports", tags=["reports"])
api_router.include_router(users_router, prefix="/v1/users", tags=["users"])

# Direct aliases for seamless frontend compatibility
api_router.include_router(auth_router, prefix="/auth", tags=["auth-alias"], include_in_schema=False)
api_router.include_router(crop_router, prefix="/crop", tags=["crop-alias"], include_in_schema=False)
api_router.include_router(disease_router, prefix="/disease", tags=["disease-alias"], include_in_schema=False)
api_router.include_router(assistant_router, prefix="/assistant", tags=["assistant-alias"], include_in_schema=False)
api_router.include_router(weather_router, prefix="/weather", tags=["weather-alias"], include_in_schema=False)
api_router.include_router(fertilizer_router, prefix="/fertilizer", tags=["fertilizer-alias"], include_in_schema=False)
api_router.include_router(reports_router, prefix="/reports", tags=["reports-alias"], include_in_schema=False)
api_router.include_router(users_router, prefix="/users", tags=["users-alias"], include_in_schema=False)
