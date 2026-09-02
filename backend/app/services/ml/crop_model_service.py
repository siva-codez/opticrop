import os
import json
import joblib
import pandas as pd
import numpy as np
from typing import List, Dict, Any, Tuple
from app.core.config import get_settings
from app.core.exceptions import ModelNotAvailableError

settings = get_settings()

CROP_PROFILES: Dict[str, Dict[str, Any]] = {
    "rice": {
        "name": "Rice",
        "emoji": "🌾",
        "yield_estimate": "4.5–6.0 t/ha",
        "seasons": ["kharif", "whole_year"],
        "n_range": (60, 100), "p_range": (35, 60), "k_range": (35, 50),
        "temp_range": (20.0, 35.0), "humidity_range": (70.0, 95.0), "ph_range": (5.5, 7.5), "rainfall_range": (150.0, 300.0),
        "description": "Rice thrives in high humidity and warm temperatures with heavy moisture or irrigation.",
    },
    "maize": {
        "name": "Maize",
        "emoji": "🌽",
        "yield_estimate": "3.5–5.2 t/ha",
        "seasons": ["kharif", "rabi", "zaid"],
        "n_range": (60, 100), "p_range": (35, 60), "k_range": (15, 25),
        "temp_range": (18.0, 32.0), "humidity_range": (50.0, 80.0), "ph_range": (5.8, 7.2), "rainfall_range": (60.0, 120.0),
        "description": "Maize performs well in warm weather and well-drained loamy soils.",
    },
    "chickpea": {
        "name": "Chickpea",
        "emoji": "🌱",
        "yield_estimate": "1.5–2.5 t/ha",
        "seasons": ["rabi"],
        "n_range": (20, 60), "p_range": (55, 80), "k_range": (70, 85),
        "temp_range": (15.0, 25.0), "humidity_range": (14.0, 20.0), "ph_range": (6.0, 8.5), "rainfall_range": (65.0, 95.0),
        "description": "Chickpea is a protein-rich pulse crop ideal for cool, dry winter seasons.",
    },
    "kidneybeans": {
        "name": "Kidney Beans",
        "emoji": "🫘",
        "yield_estimate": "1.2–2.0 t/ha",
        "seasons": ["rabi", "kharif"],
        "n_range": (15, 40), "p_range": (55, 80), "k_range": (15, 25),
        "temp_range": (15.0, 26.0), "humidity_range": (18.0, 30.0), "ph_range": (5.5, 6.0), "rainfall_range": (60.0, 150.0),
        "description": "Kidney beans require moderate warmth and nutrient-rich, well-aerated soil.",
    },
    "pigeonpeas": {
        "name": "Pigeon Peas",
        "emoji": "🌿",
        "yield_estimate": "1.0–1.8 t/ha",
        "seasons": ["kharif"],
        "n_range": (10, 30), "p_range": (55, 75), "k_range": (15, 25),
        "temp_range": (20.0, 35.0), "humidity_range": (30.0, 70.0), "ph_range": (5.0, 7.5), "rainfall_range": (90.0, 200.0),
        "description": "Pigeonpea is drought-tolerant, deep-rooted, and enriches soil nitrogen.",
    },
    "mothbeans": {
        "name": "Moth Beans",
        "emoji": "🌾",
        "yield_estimate": "0.5–1.0 t/ha",
        "seasons": ["kharif"],
        "n_range": (0, 30), "p_range": (35, 60), "k_range": (15, 25),
        "temp_range": (24.0, 32.0), "humidity_range": (40.0, 70.0), "ph_range": (3.5, 9.5), "rainfall_range": (30.0, 75.0),
        "description": "Mothbean is an extremely drought-hardy legume suitable for arid regions.",
    },
    "mungbean": {
        "name": "Mung Bean",
        "emoji": "🫘",
        "yield_estimate": "0.8–1.5 t/ha",
        "seasons": ["kharif", "zaid"],
        "n_range": (10, 30), "p_range": (35, 60), "k_range": (15, 25),
        "temp_range": (25.0, 32.0), "humidity_range": (80.0, 90.0), "ph_range": (6.2, 7.5), "rainfall_range": (35.0, 60.0),
        "description": "Mungbean matures quickly, requiring low water and returning organic matter to soil.",
    },
    "blackgram": {
        "name": "Black Gram",
        "emoji": "🌾",
        "yield_estimate": "0.7–1.4 t/ha",
        "seasons": ["kharif", "rabi"],
        "n_range": (30, 60), "p_range": (55, 80), "k_range": (15, 25),
        "temp_range": (25.0, 35.0), "humidity_range": (60.0, 75.0), "ph_range": (6.5, 7.8), "rainfall_range": (60.0, 75.0),
        "description": "Blackgram thrives in fertile loam and clay soils with moderate humidity.",
    },
    "lentil": {
        "name": "Lentil",
        "emoji": "🍲",
        "yield_estimate": "1.0–1.8 t/ha",
        "seasons": ["rabi"],
        "n_range": (10, 30), "p_range": (55, 80), "k_range": (15, 25),
        "temp_range": (15.0, 30.0), "humidity_range": (60.0, 70.0), "ph_range": (6.0, 7.5), "rainfall_range": (35.0, 55.0),
        "description": "Lentil is a cold-season pulse that requires light, well-drained soils.",
    },
    "pomegranate": {
        "name": "Pomegranate",
        "emoji": "🍎",
        "yield_estimate": "10.0–15.0 t/ha",
        "seasons": ["whole_year"],
        "n_range": (15, 40), "p_range": (10, 30), "k_range": (35, 45),
        "temp_range": (18.0, 26.0), "humidity_range": (85.0, 95.0), "ph_range": (5.5, 7.2), "rainfall_range": (100.0, 115.0),
        "description": "Pomegranate yields high commercial returns in semi-arid, sunny climates.",
    },
    "banana": {
        "name": "Banana",
        "emoji": "🍌",
        "yield_estimate": "30.0–50.0 t/ha",
        "seasons": ["whole_year"],
        "n_range": (80, 120), "p_range": (70, 95), "k_range": (45, 55),
        "temp_range": (25.0, 30.0), "humidity_range": (75.0, 85.0), "ph_range": (5.5, 6.5), "rainfall_range": (90.0, 120.0),
        "description": "Banana is a heavy feeder requiring high potassium, steady moisture, and warm temperatures.",
    },
    "mango": {
        "name": "Mango",
        "emoji": "🥭",
        "yield_estimate": "8.0–12.0 t/ha",
        "seasons": ["whole_year"],
        "n_range": (10, 30), "p_range": (15, 35), "k_range": (25, 35),
        "temp_range": (27.0, 36.0), "humidity_range": (45.0, 55.0), "ph_range": (4.5, 7.0), "rainfall_range": (85.0, 105.0),
        "description": "Mango flourishes in tropical frost-free regions with distinct dry flowering periods.",
    },
    "grapes": {
        "name": "Grapes",
        "emoji": "🍇",
        "yield_estimate": "20.0–25.0 t/ha",
        "seasons": ["whole_year"],
        "n_range": (15, 35), "p_range": (120, 145), "k_range": (195, 205),
        "temp_range": (8.0, 42.0), "humidity_range": (80.0, 85.0), "ph_range": (5.5, 6.5), "rainfall_range": (65.0, 75.0),
        "description": "Grapes demand high potassium and phosphorus with dry harvest conditions.",
    },
    "watermelon": {
        "name": "Watermelon",
        "emoji": "🍉",
        "yield_estimate": "25.0–35.0 t/ha",
        "seasons": ["zaid"],
        "n_range": (80, 120), "p_range": (10, 30), "k_range": (45, 55),
        "temp_range": (24.0, 28.0), "humidity_range": (80.0, 90.0), "ph_range": (6.0, 7.0), "rainfall_range": (40.0, 60.0),
        "description": "Watermelon flourishes in warm sunshine, sandy soils, and controlled drip irrigation.",
    },
    "muskmelon": {
        "name": "Muskmelon",
        "emoji": "🍈",
        "yield_estimate": "15.0–22.0 t/ha",
        "seasons": ["zaid"],
        "n_range": (80, 120), "p_range": (10, 30), "k_range": (45, 55),
        "temp_range": (27.0, 30.0), "humidity_range": (90.0, 95.0), "ph_range": (6.0, 6.8), "rainfall_range": (20.0, 30.0),
        "description": "Muskmelon thrives in warm weather, high relative humidity, and sandy loam soil.",
    },
    "apple": {
        "name": "Apple",
        "emoji": "🍏",
        "yield_estimate": "12.0–18.0 t/ha",
        "seasons": ["rabi"],
        "n_range": (15, 35), "p_range": (120, 145), "k_range": (195, 205),
        "temp_range": (21.0, 24.0), "humidity_range": (90.0, 95.0), "ph_range": (5.5, 6.5), "rainfall_range": (100.0, 130.0),
        "description": "Apple trees require temperate climates with cool winters and rich loamy soil.",
    },
    "orange": {
        "name": "Orange",
        "emoji": "🍊",
        "yield_estimate": "15.0–20.0 t/ha",
        "seasons": ["whole_year"],
        "n_range": (10, 30), "p_range": (10, 30), "k_range": (5, 15),
        "temp_range": (10.0, 35.0), "humidity_range": (90.0, 95.0), "ph_range": (6.0, 8.0), "rainfall_range": (100.0, 120.0),
        "description": "Orange requires well-drained soil, abundant sunlight, and moderate subtropical moisture.",
    },
    "papaya": {
        "name": "Papaya",
        "emoji": "🍈",
        "yield_estimate": "40.0–60.0 t/ha",
        "seasons": ["whole_year"],
        "n_range": (40, 60), "p_range": (55, 75), "k_range": (45, 55),
        "temp_range": (23.0, 44.0), "humidity_range": (90.0, 95.0), "ph_range": (6.0, 7.0), "rainfall_range": (140.0, 250.0),
        "description": "Papaya grows rapidly and delivers high fruit yield in warm tropical climates.",
    },
    "coconut": {
        "name": "Coconut",
        "emoji": "🥥",
        "yield_estimate": "8,000–12,000 nuts/ha",
        "seasons": ["whole_year"],
        "n_range": (15, 35), "p_range": (10, 30), "k_range": (25, 35),
        "temp_range": (25.0, 30.0), "humidity_range": (95.0, 100.0), "ph_range": (5.5, 6.5), "rainfall_range": (130.0, 230.0),
        "description": "Coconut thrives in coastal, humid tropical environments with rich sandy loams.",
    },
    "cotton": {
        "name": "Cotton",
        "emoji": "🧶",
        "yield_estimate": "2.0–3.5 t/ha",
        "seasons": ["kharif"],
        "n_range": (100, 140), "p_range": (35, 60), "k_range": (15, 25),
        "temp_range": (22.0, 26.0), "humidity_range": (75.0, 85.0), "ph_range": (6.0, 8.0), "rainfall_range": (60.0, 100.0),
        "description": "Cotton is an essential cash crop thriving in deep black soils and abundant warmth.",
    },
    "jute": {
        "name": "Jute",
        "emoji": "🌿",
        "yield_estimate": "2.5–3.5 t/ha",
        "seasons": ["kharif"],
        "n_range": (60, 100), "p_range": (35, 60), "k_range": (35, 45),
        "temp_range": (23.0, 26.0), "humidity_range": (70.0, 90.0), "ph_range": (6.0, 7.5), "rainfall_range": (150.0, 200.0),
        "description": "Jute requires warm, humid climate and alluvial soil with substantial monsoon rainfall.",
    },
    "coffee": {
        "name": "Coffee",
        "emoji": "☕",
        "yield_estimate": "1.0–2.0 t/ha",
        "seasons": ["whole_year"],
        "n_range": (80, 120), "p_range": (15, 35), "k_range": (25, 35),
        "temp_range": (23.0, 28.0), "humidity_range": (50.0, 70.0), "ph_range": (6.0, 7.0), "rainfall_range": (120.0, 180.0),
        "description": "Coffee thrives on shaded hill slopes with well-drained, organically rich loams.",
    },
}

class CropModelService:
    def __init__(self):
        self.pipeline = None
        self.encoder = None
        self.feature_names = ["n", "p", "k", "temperature", "humidity", "ph", "rainfall"]
        self.metadata = {}
        self.available = False

    def load_model(self):
        candidate_dirs = [
            os.path.join(os.path.dirname(__file__), "..", "..", "..", "models", "crop_prediction"),
            os.path.join(os.getcwd(), "models", "crop_prediction"),
            os.path.join(os.getcwd(), "backend", "models", "crop_prediction"),
        ]
        
        target_dir = None
        for path in candidate_dirs:
            abs_path = os.path.abspath(path)
            if os.path.exists(os.path.join(abs_path, "crop_pipeline.pkl")):
                target_dir = abs_path
                break
                
        if target_dir:
            try:
                pipeline_path = os.path.join(target_dir, "crop_pipeline.pkl")
                encoder_path = os.path.join(target_dir, "label_encoder.pkl")
                meta_path = os.path.join(target_dir, "metadata.json")
                
                self.pipeline = joblib.load(pipeline_path)
                if os.path.exists(encoder_path):
                    self.encoder = joblib.load(encoder_path)
                if os.path.exists(meta_path):
                    with open(meta_path, "r", encoding="utf-8") as f:
                        self.metadata = json.load(f)
                
                self.available = True
                print(f"Loaded Crop ML Model from: {target_dir}")
            except Exception as e:
                print(f"Error loading Crop ML model: {e}")
                self.available = bool(settings.MOCK_ML)
        else:
            print("Crop ML model artifacts not found on disk.")
            self.available = bool(settings.MOCK_ML)

    def is_available(self) -> bool:
        return self.available

    def _calc_score(self, val: float, target_min: float, target_max: float) -> float:
        if target_min <= val <= target_max:
            return 1.0
        dist = min(abs(val - target_min), abs(val - target_max))
        span = max(target_max - target_min, 1.0)
        return max(0.40, round(1.0 - (dist / (span * 2.0)), 2))

    def predict(self, features: dict, top_n: int = 3) -> List[Dict[str, Any]]:
        n = float(features.get("n", features.get("nitrogen", 0)))
        p = float(features.get("p", features.get("phosphorus", 0)))
        k = float(features.get("k", features.get("potassium", 0)))
        temp = float(features.get("temp", features.get("temperature", 0)))
        humidity = float(features.get("humidity", 0))
        ph = float(features.get("ph", 7.0))
        rainfall = float(features.get("rainfall", 0))
        season = str(features.get("season", "kharif")).lower()

        if not self.pipeline:
            # Mock fallback if real model unavailable
            return self._generate_fallback(n, p, k, temp, humidity, ph, rainfall, season, top_n)

        # Build feature DataFrame with exact column names expected by ColumnTransformer
        df = pd.DataFrame([{
            "n": n,
            "p": p,
            "k": k,
            "temperature": temp,
            "humidity": humidity,
            "ph": ph,
            "rainfall": rainfall,
        }])

        probs = self.pipeline.predict_proba(df)[0]
        top_indices = probs.argsort()[-top_n:][::-1]

        results = []
        for idx in top_indices:
            raw_crop_key = self.encoder.classes_[idx] if self.encoder else self.pipeline.classes_[idx]
            crop_key = str(raw_crop_key).lower().strip()
            confidence = round(float(probs[idx]), 4)
            
            profile = CROP_PROFILES.get(crop_key, {
                "name": crop_key.capitalize(),
                "emoji": "🌱",
                "yield_estimate": "3.0–5.0 t/ha",
                "seasons": ["kharif", "whole_year"],
                "n_range": (30, 90), "p_range": (30, 70), "k_range": (20, 60),
                "temp_range": (18.0, 35.0), "humidity_range": (50.0, 90.0),
                "ph_range": (5.5, 7.5), "rainfall_range": (60.0, 200.0),
                "description": f"{crop_key.capitalize()} is well-suited for the given soil and climate conditions.",
            })

            # Calculate individual agronomic compatibilities
            npk_score = round((
                self._calc_score(n, *profile["n_range"]) * 0.35 +
                self._calc_score(p, *profile["p_range"]) * 0.35 +
                self._calc_score(k, *profile["k_range"]) * 0.30
            ), 2)
            temp_score = self._calc_score(temp, *profile["temp_range"])
            rain_score = self._calc_score(rainfall, *profile["rainfall_range"])
            ph_score = self._calc_score(ph, *profile["ph_range"])
            
            season_matched = season in profile["seasons"] or "whole_year" in profile["seasons"] or season == "whole_year"
            season_score = 1.0 if season_matched else 0.75

            reasons = []
            if npk_score >= 0.85:
                reasons.append("Optimal soil NPK nutrient balance")
            if temp_score >= 0.85:
                reasons.append(f"Temperature ({temp}°C) is ideal for vegetative growth")
            if rain_score >= 0.80:
                reasons.append(f"Rainfall ({rainfall}mm) meets water requirements")
            if ph_score >= 0.85:
                reasons.append(f"Soil pH ({ph}) fits root absorption range")
            if season_matched:
                reasons.append(f"Well-suited for the {season.capitalize()} season")
            if not reasons:
                reasons.append("High overall environmental alignment with crop requirements")

            results.append({
                "crop": profile["name"],
                "confidence": confidence,
                "emoji": profile["emoji"],
                "reasons": reasons,
                "npk_compatibility": npk_score,
                "temp_compatibility": temp_score,
                "rainfall_compatibility": rain_score,
                "ph_compatibility": ph_score,
                "season_compatibility": season_score,
                "description": profile["description"],
                "yield_estimate": profile["yield_estimate"],
            })

        return results

    def _generate_fallback(self, n, p, k, temp, humidity, ph, rainfall, season, top_n) -> List[Dict[str, Any]]:
        # Deterministic fallback when model is not loaded
        candidates = ["rice", "maize", "jute"]
        results = []
        for i, crop_key in enumerate(candidates[:top_n]):
            profile = CROP_PROFILES[crop_key]
            results.append({
                "crop": profile["name"],
                "confidence": round(0.95 - (i * 0.05), 2),
                "emoji": profile["emoji"],
                "reasons": ["Good soil balance", "Adequate temperature and humidity"],
                "npk_compatibility": 0.90,
                "temp_compatibility": 0.92,
                "rainfall_compatibility": 0.88,
                "ph_compatibility": 0.90,
                "season_compatibility": 1.0,
                "description": profile["description"],
                "yield_estimate": profile["yield_estimate"],
            })
        return results

