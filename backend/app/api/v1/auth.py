from fastapi import APIRouter
from app.schemas.auth import RegisterRequest, LoginRequest, TokenResponse, UserResponse
from app.schemas.common import APIResponse

router = APIRouter()

@router.post("/register", response_model=APIResponse)
async def register(data: RegisterRequest):
    return APIResponse(data={"id": 1, "email": data.email})

@router.post("/login", response_model=APIResponse)
async def login(data: LoginRequest):
    return APIResponse(data=TokenResponse(access_token="acc", refresh_token="ref"))

@router.post("/refresh", response_model=APIResponse)
async def refresh():
    return APIResponse(data=TokenResponse(access_token="acc2", refresh_token="ref2"))

@router.get("/me", response_model=APIResponse)
async def get_me():
    return APIResponse(data={"id": 1})
