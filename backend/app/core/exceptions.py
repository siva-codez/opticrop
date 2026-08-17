from fastapi import Request, FastAPI
from fastapi.responses import JSONResponse

class AppError(Exception):
    def __init__(self, code: str, message: str, status_code: int = 400):
        self.code = code
        self.message = message
        self.status_code = status_code

class NotFoundError(AppError):
    def __init__(self, message: str = "Resource not found"):
        super().__init__("NOT_FOUND", message, 404)

class AuthenticationError(AppError):
    def __init__(self, message: str = "Authentication failed"):
        super().__init__("AUTHENTICATION_FAILED", message, 401)

class AuthorizationError(AppError):
    def __init__(self, message: str = "Not authorized"):
        super().__init__("NOT_AUTHORIZED", message, 403)

class ValidationError(AppError):
    def __init__(self, message: str = "Validation error"):
        super().__init__("VALIDATION_ERROR", message, 422)

class ModelNotAvailableError(AppError):
    def __init__(self, message: str = "ML model not available"):
        super().__init__("MODEL_NOT_AVAILABLE", message, 503)

class ExternalAPIError(AppError):
    def __init__(self, message: str = "External API error"):
        super().__init__("EXTERNAL_API_ERROR", message, 502)

def register_exception_handlers(app: FastAPI):
    @app.exception_handler(AppError)
    async def app_error_handler(request: Request, exc: AppError):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "success": False,
                "error": {
                    "code": exc.code,
                    "message": exc.message
                }
            }
        )
