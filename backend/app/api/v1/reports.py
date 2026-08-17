from fastapi import APIRouter, Depends
from app.schemas.report import ReportGenerateRequest
from app.schemas.common import APIResponse
from app.services.report_service import ReportService
from app.core.dependencies import DbSession

router = APIRouter()

@router.post("/generate", response_model=APIResponse)
async def generate(data: ReportGenerateRequest, db: DbSession):
    # hardcoded user_id for mock
    result = await ReportService.generate(db, 1, data)
    return APIResponse(data=result)

@router.get("/", response_model=APIResponse)
async def get_all(db: DbSession):
    result = await ReportService.get_reports(db, 1)
    return APIResponse(data=result)

@router.get("/{report_id}", response_model=APIResponse)
async def get_one(report_id: int, db: DbSession):
    result = await ReportService.get_report(db, report_id)
    return APIResponse(data=result)
