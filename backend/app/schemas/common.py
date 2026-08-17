from pydantic import BaseModel
from typing import Any, Optional

class APIResponse(BaseModel):
    success: bool = True
    data: Any = None
    message: Optional[str] = None

class ErrorDetail(BaseModel):
    code: str
    message: str

class ErrorResponse(BaseModel):
    success: bool = False
    error: ErrorDetail

class PaginatedResponse(BaseModel):
    success: bool = True
    data: list[Any] = []
    total: int = 0
    page: int = 1
    per_page: int = 20
