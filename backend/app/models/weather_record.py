from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Float, String, ForeignKey, JSON
from app.models.base import Base, TimestampMixin

class WeatherRecord(Base, TimestampMixin):
    __tablename__ = "weather_records"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    location: Mapped[str] = mapped_column(String(255))
    temperature: Mapped[float] = mapped_column(Float)
    humidity: Mapped[float] = mapped_column(Float)
    rainfall: Mapped[float] = mapped_column(Float)
    wind_speed: Mapped[float] = mapped_column(Float)
    condition: Mapped[str] = mapped_column(String(100))
    forecast_data: Mapped[dict] = mapped_column(JSON)
