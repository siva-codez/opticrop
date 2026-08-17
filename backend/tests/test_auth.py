import pytest

@pytest.mark.asyncio
async def test_register(client, test_user):
    response = await client.post("/v1/auth/register", json={
        "full_name": "Test User",
        "email": test_user["email"],
        "password": test_user["password"],
        "confirm_password": test_user["password"]
    })
    assert response.status_code == 200
    assert response.json()["success"] == True

@pytest.mark.asyncio
async def test_login(client, test_user):
    response = await client.post("/v1/auth/login", json={
        "email": test_user["email"],
        "password": test_user["password"]
    })
    assert response.status_code == 200
    assert "access_token" in response.json()["data"]
