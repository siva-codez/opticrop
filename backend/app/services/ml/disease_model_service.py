import os
from app.core.config import get_settings
from app.core.exceptions import ModelNotAvailableError

settings = get_settings()

class DiseaseModelService:
    def __init__(self):
        self.model = None
        self.labels = None
        self.available = False

    def load_model(self):
        model_path = os.path.join("models", "disease_model.keras")
        if os.path.exists(model_path):
            self.available = True
        elif settings.MOCK_ML:
            self.available = True

    def preprocess(self, image):
        # Stub for preprocessing
        return image

    def predict(self, image) -> dict:
        if not self.is_available():
            raise ModelNotAvailableError("Disease prediction model is not available")
        if not self.model and settings.MOCK_ML:
            return {
                "plant": "Tomato",
                "disease": "Blight",
                "confidence": 0.89
            }
        # Actual ML prediction would go here
        return {}

    def is_available(self) -> bool:
        return self.available
