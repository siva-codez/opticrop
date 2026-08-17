from typing import Optional
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Float, ForeignKey
from app.models.base import Base

class FarmerProfile(Base):
    __tablename__ = "farmer_profiles"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True)
    farm_size: Mapped[Optional[float]] = mapped_column(Float)
    soil_type: Mapped[Optional[str]] = mapped_column(String(100))
    main_crops: Mapped[Optional[str]] = mapped_column(String(255))
    irrigation_type: Mapped[Optional[str]] = mapped_column(String(100))

    user = relationship("User", back_populates="farmer_profile")
