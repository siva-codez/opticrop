from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Float, String, ForeignKey, JSON
from app.models.base import Base, TimestampMixin

class DiseasePrediction(Base, TimestampMixin):
    __tablename__ = "disease_predictions"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    image_path: Mapped[str] = mapped_column(String(255))
    plant_name: Mapped[str] = mapped_column(String(100))
    disease_name: Mapped[str] = mapped_column(String(100))
    confidence: Mapped[float] = mapped_column(Float)
    severity: Mapped[str] = mapped_column(String(50))
    recommendations: Mapped[list] = mapped_column(JSON)
