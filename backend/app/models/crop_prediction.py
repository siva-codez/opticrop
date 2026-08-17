from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Float, String, ForeignKey, JSON
from app.models.base import Base, TimestampMixin

class CropPrediction(Base, TimestampMixin):
    __tablename__ = "crop_predictions"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    nitrogen: Mapped[float] = mapped_column(Float)
    phosphorus: Mapped[float] = mapped_column(Float)
    potassium: Mapped[float] = mapped_column(Float)
    temperature: Mapped[float] = mapped_column(Float)
    humidity: Mapped[float] = mapped_column(Float)
    ph: Mapped[float] = mapped_column(Float)
    rainfall: Mapped[float] = mapped_column(Float)
    season: Mapped[str] = mapped_column(String(50))
    predicted_crop: Mapped[str] = mapped_column(String(100))
    confidence: Mapped[float] = mapped_column(Float)
    top_recommendations: Mapped[list] = mapped_column(JSON)
