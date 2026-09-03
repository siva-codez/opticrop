from fastapi import UploadFile, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Dict, Any, List, Optional
import io
from PIL import Image

from app.schemas.disease import DiseasePredictionResponse, AlternativePrediction
from app.models.disease_prediction import DiseasePrediction
from app.services.ml.model_registry import ModelRegistry
from app.services.ml.disease_model_service import DiseaseModelService

DISEASE_PROFILES: Dict[str, Dict[str, Any]] = {
    "bacterialblight": {
        "disease": "Bacterial Blight",
        "common_name": "Bacterial Leaf Blight (BLB)",
        "pathogen": "Xanthomonas oryzae pv. oryzae",
        "severity": "High",
        "spread_risk": "High",
        "spread_risk_score": 80,
        "symptoms": [
            "Water-soaked to yellowish-green stripes along leaf margins",
            "Lesions develop wavy margins and advance toward leaf base",
            "Leaves wilt, roll up, and turn grayish-white (kresek phase in seedlings)",
            "Milky bacterial exudate droplets visible on young lesions in morning"
        ],
        "recommended_action": [
            "Foliar spray with Copper Oxychloride 50% WP (2.5 g/L) + Streptocycline (100 ppm)",
            "Temporarily drain standing water from affected plots to check bacterial movement",
            "Avoid top-dressing with nitrogen fertilizer until infection stabilizes"
        ],
        "products": [
            "Copper Oxychloride 50 WP",
            "Streptocycline (Streptomycin + Tetracycline)",
            "Plantomycin",
            "Neem Seed Kernel Extract (NSKE 5%)"
        ],
        "prevention": [
            "Use certified pathogen-free seeds treated with hot water (52-54°C for 30 min) or Agrosan GN",
            "Apply balanced NPK fertilizer with split nitrogen application (never overdose urea)",
            "Maintain proper spacing to allow aeration and reduce microclimate humidity",
            "Cultivate resistant rice cultivars such as IR64, Ajaya, or Improved Samba Mahsuri"
        ]
    },
    "blast": {
        "disease": "Rice Blast",
        "common_name": "Rice Blast (Leaf Blast)",
        "pathogen": "Magnaporthe oryzae (anamorph Pyricularia oryzae)",
        "severity": "High",
        "spread_risk": "High",
        "spread_risk_score": 85,
        "symptoms": [
            "Spindle-shaped or diamond-shaped lesions with pointed ends",
            "Lesions feature gray or whitish centers surrounded by dark brown or reddish borders",
            "Rapid coalescence of lesions causes leaves to dry up and blast entirely",
            "Collar rot or node discoloration may develop in severe attacks"
        ],
        "recommended_action": [
            "Spray Tricyclazole 75% WP @ 0.6 g/L or Isoprothiolane 40% EC @ 1.5 ml/L at first sign",
            "Alternate with Kasugamycin 3% SL (2 ml/L) for anti-resistance management",
            "Keep field flooded with a shallow layer (2-3 cm) of water to deter spore germination"
        ],
        "products": [
            "Tricyclazole 75 WP (Beam)",
            "Isoprothiolane 40 EC",
            "Azoxystrobin 18.2% + Difenoconazole 11.4% SC",
            "Kasugamycin 3 SL"
        ],
        "prevention": [
            "Avoid excessive nitrogen application; increase potassium to strengthen cell walls",
            "Seed dressing with Carbendazim 50% WP @ 2 g/kg of seed prior to nursery sowing",
            "Burn or compost infected stubble and crop residues after harvest",
            "Grow blast-tolerant varieties like Tetep, Rasi, or Swarna-Sub1"
        ]
    },
    "brownspot": {
        "disease": "Brown Spot",
        "common_name": "Brown Spot of Rice",
        "pathogen": "Bipolaris oryzae (Cochliobolus miyabeanus)",
        "severity": "Moderate",
        "spread_risk": "Medium",
        "spread_risk_score": 55,
        "symptoms": [
            "Small, circular to oval dark brown spots resembling sesame seeds on leaf blades",
            "Mature spots have light brown or grayish centers with a distinct yellow halo",
            "Severe infection leads to leaf blade yellowing, premature drying, and poor grain filling",
            "Infected seeds show dark brown blotches, drastically reducing germination"
        ],
        "recommended_action": [
            "Spray Mancozeb 75% WP @ 2 g/L or Propiconazole 25% EC @ 1 ml/L",
            "Apply Potassium (MOP) top-dressing (25-30 kg/ha) to overcome nutritional stress",
            "Provide foliar spray of micronutrient mixture (zinc sulphate 0.5% + urea 1%)"
        ],
        "products": [
            "Mancozeb 75 WP",
            "Propiconazole 25 EC (Tilt)",
            "Carbendazim 12% + Mancozeb 63% WP (Saaf)",
            "Muriate of Potash (MOP)"
        ],
        "prevention": [
            "Conduct soil testing and correct soil nutrient deficiencies, especially potassium and silica",
            "Treat seeds with Carbendazim 2g/kg or hot water before sowing",
            "Ensure uniform irrigation; avoid prolonged drought stress in sandy or low-fertility soils",
            "Apply organic compost or biochar to enhance soil water retention and microbial health"
        ]
    },
    "tungro": {
        "disease": "Tungro Disease",
        "common_name": "Rice Tungro Disease (RTD)",
        "pathogen": "Rice Tungro Bacilliform Virus (RTBV) + Spherical Virus (RTSV)",
        "severity": "Critical",
        "spread_risk": "Critical",
        "spread_risk_score": 92,
        "symptoms": [
            "Yellowish to deep orange-yellow discoloration beginning at the leaf tips",
            "Marked stunting of the entire rice hill and reduced tiller production",
            "Young leaves show mottling or faint interveinal chlorosis",
            "Delayed flowering, sterile spikelets, and partially exerted panicles"
        ],
        "recommended_action": [
            "Direct control on vector: Spray Imidacloprid 17.8% SL @ 0.3 ml/L or Thiamethoxam 25% WG @ 0.2 g/L",
            "Uproot (rogue) and bury severely infected hills to eradicate virus reservoirs",
            "Install yellow sticky traps or light traps (1 trap/acre) to monitor and catch Green Leafhoppers"
        ],
        "products": [
            "Imidacloprid 17.8 SL (Confidor)",
            "Thiamethoxam 25 WG",
            "Dinotefuran 20 SG",
            "Neem Seed Kernel Extract 5% (repellent)"
        ],
        "prevention": [
            "Synchronized planting in the command area to break the vector life cycle",
            "Eliminate grassy weed hosts and volunteer rice plants along bunds and canals",
            "Plow under ratoon rice stubbles immediately following harvest",
            "Select green leafhopper-resistant cultivars like IR36, IR64, or Vikramarya"
        ]
    }
}

class DiseaseService:
    @staticmethod
    async def predict(image_file: UploadFile) -> DiseasePredictionResponse:
        # Validate MIME type
        content_type = image_file.content_type or ""
        if not (content_type.startswith("image/") or image_file.filename.lower().endswith((".jpg", ".jpeg", ".png", ".webp", ".bmp"))):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Uploaded file must be a valid image (JPEG, PNG, WEBP)."
            )

        content = await image_file.read()
        if len(content) == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Uploaded image file is empty."
            )

        # Validate that image can be opened
        try:
            pil_img = Image.open(io.BytesIO(content))
            pil_img.verify()
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or corrupt image file."
            )

        # Get ML service
        registry = ModelRegistry()
        ml_service: Optional[DiseaseModelService] = registry.get("disease_model")
        if not ml_service:
            ml_service = DiseaseModelService()
            ml_service.load_model()
            registry.register("disease_model", ml_service)

        try:
            prediction_raw = ml_service.predict(content)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Inference execution failed: {str(e)}"
            )

        raw_disease = prediction_raw.get("disease", "Blast")
        confidence = float(prediction_raw.get("confidence", 0.90))

        # Match key in profile database
        norm_key = raw_disease.lower().replace(" ", "").replace("_", "")
        profile = DISEASE_PROFILES.get(norm_key, DISEASE_PROFILES["blast"])

        # Format alternative predictions
        alt_preds = []
        for p in prediction_raw.get("top_predictions", []):
            label = p.get("disease", "")
            alt_preds.append(AlternativePrediction(
                disease=DISEASE_PROFILES.get(label.lower().replace(" ", ""), {}).get("disease", label),
                confidence=float(p.get("confidence", 0.0))
            ))

        return DiseasePredictionResponse(
            plant="Rice / Paddy (Oryza sativa)",
            disease=profile["disease"],
            common_name=profile["common_name"],
            pathogen=profile["pathogen"],
            confidence=confidence,
            severity=profile["severity"],
            spread_risk=profile["spread_risk"],
            spread_risk_score=profile["spread_risk_score"],
            symptoms=profile["symptoms"],
            recommended_action=profile["recommended_action"],
            products=profile["products"],
            prevention=profile["prevention"],
            top_predictions=alt_preds,
            disclaimer="This is an AI-powered diagnostic advisory based on deep learning visual analysis. Confirm critical diagnoses with your regional agricultural extension officer or agronomist before initiating broad chemical applications."
        )

    @staticmethod
    async def get_history(db: AsyncSession, user_id: int) -> list:
        return []
