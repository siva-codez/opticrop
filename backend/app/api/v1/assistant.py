from fastapi import APIRouter
from app.schemas.assistant import ChatRequest, ChatResponse
from app.schemas.common import APIResponse
from app.services.openai_service import OpenAIService

router = APIRouter()

@router.post("/chat", response_model=APIResponse)
async def chat(data: ChatRequest):
    response = await OpenAIService.chat(data.message, data.language)
    return APIResponse(data=ChatResponse(response=response, session_id=data.session_id or 1, language=data.language))

@router.get("/history", response_model=APIResponse)
async def history():
    return APIResponse(data=[])

@router.delete("/history", response_model=APIResponse)
async def delete_history():
    return APIResponse(message="Deleted successfully")
