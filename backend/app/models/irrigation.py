from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Float, String, ForeignKey, JSON
from app.models.base import Base, TimestampMixin

class IrrigationRecommendation(Base, TimestampMixin):
    __tablename__ = "irrigation_recommendations"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    crop: Mapped[str] = mapped_column(String(100))
    soil_type: Mapped[str] = mapped_column(String(100))
    temperature: Mapped[float] = mapped_column(Float)
    humidity: Mapped[float] = mapped_column(Float)
    rainfall: Mapped[float] = mapped_column(Float)
    growth_stage: Mapped[str] = mapped_column(String(100))
    recommendations: Mapped[dict] = mapped_column(JSON)
