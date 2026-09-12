import os
import sys
import io
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from PIL import Image
import numpy as np
from app.services.ml.plant_validator import PlantValidator
from app.services.ml.disease_model_service import DiseaseModelService

def test_valid_green_leaf():
    # Green crop leaf image
    img = Image.new("RGB", (224, 224), color=(34, 139, 34))
    is_valid, msg, meta = PlantValidator.validate_crop_image(img)
    assert is_valid is True, f"Expected green leaf to be valid, got: {msg}"
    assert meta["green_ratio"] > 0.5

def test_valid_diseased_rust_leaf():
    # Rust / brown lesion leaf image
    img = Image.new("RGB", (224, 224), color=(180, 100, 30))
    is_valid, msg, meta = PlantValidator.validate_crop_image(img)
    assert is_valid is True, f"Expected rust leaf to be valid, got: {msg}"

def test_valid_chlorotic_yellow_leaf():
    # Yellow / chlorotic leaf (Tungro / Yellow Rust)
    img = Image.new("RGB", (224, 224), color=(210, 190, 40))
    is_valid, msg, meta = PlantValidator.validate_crop_image(img)
    assert is_valid is True, f"Expected chlorotic leaf to be valid, got: {msg}"

def test_invalid_human_against_blue_wall():
    # Simulates human portrait against cyan/blue wall (like user's test image)
    # Background: cyan/blue wall (color 0, 180, 230)
    arr = np.zeros((224, 224, 3), dtype=np.uint8)
    arr[:, :] = [0, 180, 230] # Blue wall
    # Center: human skin/clothing
    arr[40:190, 70:150] = [210, 150, 120] # Skin tone
    arr[100:200, 70:150] = [30, 30, 35] # Dark shirt
    img = Image.fromarray(arr, mode="RGB")
    
    is_valid, msg, meta = PlantValidator.validate_crop_image(img)
    print("test_invalid_human_against_blue_wall returned:", is_valid, "msg:", repr(msg), "meta:", meta)
    assert is_valid is False, "Expected human against blue wall to be rejected as non-plant"
    assert ("No crop plant" in msg) or ("No plant" in msg) or ("Unable" in msg)

def test_invalid_pure_blue_background():
    img = Image.new("RGB", (224, 224), color=(0, 160, 240))
    is_valid, msg, meta = PlantValidator.validate_crop_image(img)
    assert is_valid is False

def test_invalid_synthetic_magenta():
    img = Image.new("RGB", (224, 224), color=(255, 0, 180))
    is_valid, msg, meta = PlantValidator.validate_crop_image(img)
    assert is_valid is False

def test_disease_model_service_rejection():
    service = DiseaseModelService()
    service.load_model()
    # Should raise ValueError when given a blue wall / non-plant image
    img = Image.new("RGB", (224, 224), color=(0, 160, 240))
    buf = io.BytesIO()
    img.save(buf, format="JPEG")
    try:
        service.predict(buf.getvalue())
        assert False, "Should have raised ValueError for non-plant image"
    except ValueError as e:
        assert "No" in str(e) or "plant" in str(e)

if __name__ == "__main__":
    test_valid_green_leaf()
    test_valid_diseased_rust_leaf()
    test_valid_chlorotic_yellow_leaf()
    test_invalid_human_against_blue_wall()
    test_invalid_pure_blue_background()
    test_invalid_synthetic_magenta()
    test_disease_model_service_rejection()
    print("[PASS] ALL 7 PLANT VALIDATION TESTS PASSED SUCCESSFULLY!")
