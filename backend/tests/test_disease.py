import pytest
import io
from PIL import Image

@pytest.mark.asyncio
async def test_disease_predict(client):
    # Generate test JPEG leaf image in-memory
    img = Image.new("RGB", (224, 224), color=(34, 139, 34))
    buf = io.BytesIO()
    img.save(buf, format="JPEG")
    buf.seek(0)

    files = {"file": ("test_leaf.jpg", buf, "image/jpeg")}
    response = await client.post("/v1/disease/predict", files=files)

    assert response.status_code == 200
    json_data = response.json()
    assert json_data.get("success") is True
    data = json_data.get("data")
    assert data is not None
    assert "Rice" in data["plant"]
    assert "disease" in data
    assert data["confidence"] > 0.0
    assert len(data["symptoms"]) > 0
    assert len(data["recommended_action"]) > 0
    assert len(data["prevention"]) > 0
    assert "disclaimer" in data

@pytest.mark.asyncio
async def test_disease_history(client):
    response = await client.get("/v1/disease/history")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data.get("success") is True

@pytest.mark.asyncio
async def test_disease_predict_alias(client):
    img = Image.new("RGB", (224, 224), color=(180, 100, 30))
    buf = io.BytesIO()
    img.save(buf, format="JPEG")
    buf.seek(0)

    files = {"file": ("test_leaf2.jpg", buf, "image/jpeg")}
    response = await client.post("/disease/predict", files=files)
    assert response.status_code == 200
    assert response.json()["success"] is True
