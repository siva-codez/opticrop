class OpenAIService:
    @staticmethod
    async def chat(message: str, language: str, history: list = None) -> str:
        # Mock behavior
        return f"This is a mock response from the AI assistant in {language}. You said: {message}"
