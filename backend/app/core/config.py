from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "postgresql+asyncpg://opticrop:opticrop_dev@localhost:5432/opticrop"
    
    # JWT
    JWT_SECRET_KEY: str = "change-this-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # AI / LLM Chatbot
    HF_TOKEN: str = ""
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o-mini"
    AI_BASE_URL: str = "https://router.huggingface.co/v1"
    AI_MODEL: str = "Qwen/Qwen2.5-7B-Instruct:featherless-ai"
    
    # Weather
    WEATHER_API_KEY: str = ""
    
    # App
    FRONTEND_URL: str = "http://localhost:5173"
    ENVIRONMENT: str = "development"
    MOCK_ML: bool = True
    
    # File Storage
    UPLOAD_DIR: str = "./uploads"
    MAX_FILE_SIZE_MB: int = 10
    
    # Crop Disease Detection (Hugging Face / Vision Transformer Pipeline)
    DISEASE_MODEL_NAME: str = "wambugu71/crop_leaf_diseases_vit"
    USE_HF_DISEASE_PIPELINE: bool = True
    
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

@lru_cache()
def get_settings() -> Settings:
    return Settings()
