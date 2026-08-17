from typing import Annotated
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
# This will be updated later when models are available
# from app.models.user import User

DbSession = Annotated[AsyncSession, Depends(get_db)]

# CurrentUser will be defined after user model is created
