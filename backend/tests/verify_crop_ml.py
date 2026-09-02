import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient
from app.main import app
from app.services.ml.crop_model_service import CropModelService

def test_crop_service_direct():
    service = CropModelService()
    service.load_model()
    assert service.is_available(), "Crop model service should be available"

    # Test Paddy / Rice sample
    rice_input = {
        "nitrogen": 90, "phosphorus": 42, "potassium": 43,
        "temperature": 20.8, "humidity": 82.0, "ph": 6.5, "rainfall": 202.9,
        "season": "kharif"
    }
    recs = service.predict(rice_input, top_n=3)
    assert len(recs) == 3, f"Expected 3 recommendations, got {len(recs)}"
    assert recs[0]["crop"] == "Rice", f"Expected top recommendation to be Rice, got {recs[0]['crop']}"
    assert recs[0]["confidence"] > 0.80, f"Expected high confidence for Rice, got {recs[0]['confidence']}"

    # Test Chickpea sample
    chickpea_input = {
        "nitrogen": 40, "phosphorus": 68, "potassium": 79,
        "temperature": 18.5, "humidity": 16.5, "ph": 7.3, "rainfall": 80.0,
        "season": "rabi"
    }
    chickpea_recs = service.predict(chickpea_input, top_n=3)
    assert chickpea_recs[0]["crop"] == "Chickpea", f"Expected top recommendation to be Chickpea, got {chickpea_recs[0]['crop']}"

    # Test Cotton sample
    cotton_input = {
        "nitrogen": 118, "phosphorus": 45, "potassium": 20,
        "temperature": 24.0, "humidity": 80.0, "ph": 6.8, "rainfall": 80.0,
        "season": "kharif"
    }
    cotton_recs = service.predict(cotton_input, top_n=3)
    assert cotton_recs[0]["crop"] == "Cotton", f"Expected top recommendation to be Cotton, got {cotton_recs[0]['crop']}"

    print("[PASS] Direct ML Crop Service Tests Passed Successfully!")

def test_fastapi_crop_endpoint():
    client = TestClient(app)
    response = client.post("/v1/crop/predict", json={
        "nitrogen": 90,
        "phosphorus": 42,
        "potassium": 43,
        "temperature": 20.8,
        "humidity": 82.0,
        "ph": 6.5,
        "rainfall": 202.9,
        "season": "kharif"
    })
    assert response.status_code == 200, f"Status code was {response.status_code}: {response.text}"
    body = response.json()
    assert body["success"] is True, "Expected success to be True"
    data = body["data"]
    assert len(data["top_recommendations"]) == 3
    assert data["top_recommendations"][0]["crop"] == "Rice"
    print("[PASS] FastAPI /v1/crop/predict Endpoint Test Passed Successfully!")

if __name__ == "__main__":
    test_crop_service_direct()
    test_fastapi_crop_endpoint()
    print("\n[ALL TESTS PASSED]")
