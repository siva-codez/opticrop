import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest_asyncio.fixture
async def client():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        yield ac

@pytest.fixture
def mock_db_session():
    # Mock database session for testing
    pass

@pytest.fixture
def test_user():
    return {"email": "test@example.com", "password": "password123"}
