from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Float, String, ForeignKey, JSON
from app.models.base import Base, TimestampMixin

class FertilizerRecommendation(Base, TimestampMixin):
    __tablename__ = "fertilizer_recommendations"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    crop: Mapped[str] = mapped_column(String(100))
    soil_ph: Mapped[float] = mapped_column(Float)
    nitrogen: Mapped[float] = mapped_column(Float)
    phosphorus: Mapped[float] = mapped_column(Float)
    potassium: Mapped[float] = mapped_column(Float)
    growth_stage: Mapped[str] = mapped_column(String(100))
    recommendations: Mapped[dict] = mapped_column(JSON)
