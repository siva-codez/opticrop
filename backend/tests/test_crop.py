import pytest

@pytest.mark.asyncio
async def test_crop_predict(client):
    response = await client.post("/v1/crop/predict", json={
        "nitrogen": 50,
        "phosphorus": 30,
        "potassium": 20,
        "temperature": 25,
        "humidity": 60,
        "ph": 6.5,
        "rainfall": 100,
        "season": "kharif"
    })
    assert response.status_code == 200
    assert response.json()["success"] == True
    assert len(response.json()["data"]["top_recommendations"]) > 0
