from pydantic import BaseModel
from typing import Optional

class ChatRequest(BaseModel):
    message: str
    language: str = "en"
    session_id: Optional[int] = None

class ChatResponse(BaseModel):
    response: str
    session_id: int
    language: str
