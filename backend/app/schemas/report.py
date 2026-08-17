from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ReportGenerateRequest(BaseModel):
    report_type: str
    parameters: dict

class ReportResponse(BaseModel):
    id: int
    title: str
    report_type: str
    file_path: str
    created_at: datetime
