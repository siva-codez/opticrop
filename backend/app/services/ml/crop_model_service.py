import os
from typing import List, Tuple
from app.core.config import get_settings
from app.core.exceptions import ModelNotAvailableError

settings = get_settings()

class CropModelService:
    def __init__(self):
        self.model = None
        self.pipeline = None
        self.encoder = None
        self.available = False

    def load_model(self):
        # Stub for loading models
        model_path = os.path.join("models", "crop_model.joblib")
        if os.path.exists(model_path):
            self.available = True
        elif settings.MOCK_ML:
            self.available = True

    def predict(self, features: dict) -> List[Tuple[str, float]]:
        if not self.is_available():
            raise ModelNotAvailableError("Crop prediction model is not available")
        if not self.model and settings.MOCK_ML:
            return [("Rice", 0.92), ("Wheat", 0.85)]
        # Actual ML prediction would go here
        return []

    def is_available(self) -> bool:
        return self.available
