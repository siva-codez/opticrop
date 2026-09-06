from fastapi import UploadFile, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Dict, Any, List, Optional
import io
from PIL import Image

from app.schemas.disease import DiseasePredictionResponse, AlternativePrediction, RecoveryMilestone
from app.services.ml.model_registry import ModelRegistry
from app.services.ml.disease_model_service import DiseaseModelService
from app.services.openai_service import OpenAIService

DISEASE_PROFILES: Dict[str, Dict[str, Any]] = {
    # ─────────────────────────────────────────────────────────────
    # RICE CROPS
    # ─────────────────────────────────────────────────────────────
    "blast": {
        "plant": "Rice / Paddy",
        "disease": "Rice Blast",
        "common_name": "Rice Leaf Blast (Pyricularia)",
        "pathogen": "Magnaporthe oryzae (Pyricularia oryzae)",
        "pathogen_type": "Fungal",
        "severity": "High",
        "spread_risk": "High",
        "spread_risk_score": 88,
        "symptoms": [
            "Spindle-shaped or diamond-shaped lesions with acute pointed ends on leaf blades",
            "Lesions feature gray or whitish centers surrounded by dark brown or reddish-brown borders",
            "Rapid coalescence of lesions causes leaves to desiccate and whole hills to blast",
            "Collar rot or panicle neck rot in advanced stages causing severe grain yield loss"
        ],
        "immediate_actions": [
            "Immediately spray Tricyclazole 75% WP @ 0.6 g/L or Isoprothiolane 40% EC @ 1.5 ml/L across affected and adjacent plots",
            "Cease any top-dressing of urea / nitrogen fertilizers immediately to stop fueling spore growth",
            "Maintain a shallow (2–3 cm) water layer in the field to suppress airborne spore germination"
        ],
        "recommended_action": [
            "Foliar spray with Tricyclazole 75% WP (0.6 g/L) or Azoxystrobin 18.2% + Difenoconazole 11.4% SC (1 ml/L)",
            "Alternate with Kasugamycin 3% SL (2 ml/L) for anti-resistance management",
            "Increase potassium (MOP) application to thicken and strengthen leaf epidermal cell walls"
        ],
        "products": [
            "Tricyclazole 75 WP (Beam)",
            "Azoxystrobin + Difenoconazole (Amistar Top)",
            "Isoprothiolane 40 EC (Fuji-One)",
            "Kasugamycin 3 SL",
            "Muriate of Potash (MOP)"
        ],
        "organic_remedies": [
            "Foliar spray with Pseudomonas fluorescens 1% WP @ 10 g/L (or 2.5 kg/acre in water)",
            "Neem Seed Kernel Extract (NSKE 5%) spray @ 50 ml/L to inhibit spore proliferation",
            "Bio-formulation of Trichoderma viride @ 5 g/L applied in early morning hours"
        ],
        "chemical_remedies": [
            "Tricyclazole 75% WP @ 120 g in 200 liters of water per acre",
            "Isoprothiolane 40% EC @ 300 ml in 200 liters of water per acre",
            "Kasugamycin 3% SL @ 400 ml in 200 liters of water per acre"
        ],
        "prevention": [
            "Seed treatment with Carbendazim 50% WP @ 2 g/kg seed before nursery sowing",
            "Avoid excessive nitrogenous fertilizer application; maintain balanced 4:2:1 NPK ratio",
            "Destroy infected stubble and straw after harvesting by composting or deep plowing",
            "Cultivate blast-tolerant cultivars such as IR64, Tetep, Swarna-Sub1, or Rasi"
        ],
        "resistant_varieties": ["IR64", "Tetep", "Swarna-Sub1", "Rasi", "Improved Samba Mahsuri"],
        "recovery_milestones": [
            {"phase": "Day 1–3", "timeline": "Immediate Suppression", "action": "Foliar fungicide application; withhold nitrogen top-dressing."},
            {"phase": "Day 4–7", "timeline": "Lesion Stabilization", "action": "Monitor lesion margins; verify cessation of new spindle lesion formation."},
            {"phase": "Day 8–14", "timeline": "Canopy Recovery", "action": "Apply micronutrient / potassium spray (1% KNO3) to stimulate fresh tillers."}
        ]
    },
    "bacterialblight": {
        "plant": "Rice / Paddy",
        "disease": "Bacterial Blight",
        "common_name": "Bacterial Leaf Blight (BLB)",
        "pathogen": "Xanthomonas oryzae pv. oryzae",
        "pathogen_type": "Bacterial",
        "severity": "High",
        "spread_risk": "High",
        "spread_risk_score": 82,
        "symptoms": [
            "Water-soaked to yellowish-green stripes initiating along leaf margins",
            "Lesions develop characteristic wavy margins and advance downward toward leaf base",
            "Infected leaves wilt, roll up, and turn grayish-white (kresek phase in vegetative stage)",
            "Milky bacterial exudate droplets ooze from young lesions in early morning dews"
        ],
        "immediate_actions": [
            "Spray Copper Oxychloride 50% WP (2.5 g/L) combined with Streptocycline (100 ppm / 6 g in 60 L water)",
            "Drain standing floodwater temporarily from infected bunds to prevent bacterial water transmission",
            "Stop walking through wet fields during morning hours to prevent mechanical bacterial spread"
        ],
        "recommended_action": [
            "Foliar spray with Copper Oxychloride 50 WP (2.5 g/L) + Streptocycline (100 ppm)",
            "Apply Plantomycin or Bacterimycin at recommended agronomical dosages",
            "Apply extra Potash (MOP @ 20 kg/acre) in two split doses to boost plant immunity"
        ],
        "products": [
            "Copper Oxychloride 50 WP (Blitox)",
            "Streptocycline (Streptomycin + Tetracycline)",
            "Plantomycin",
            "Bacterimycin",
            "Potassium Chloride (MOP)"
        ],
        "organic_remedies": [
            "Foliar spray of fresh cow dung slurry extract (20%) filtered through muslin cloth",
            "Pseudomonas fluorescens 1% WP foliar spray @ 10 g/L for induced systemic resistance",
            "Neem cake application in soil @ 100 kg/acre to suppress soil bacterial inoculum"
        ],
        "chemical_remedies": [
            "Copper Oxychloride 50% WP (500 g) + Streptocycline (18 g) in 200 L water per acre",
            "Plantomycin @ 100 g in 200 L water per acre",
            "Zinc sulphate foliar spray (0.5%) to alleviate micronutrient stress"
        ],
        "prevention": [
            "Soak seeds in hot water (52–54°C) for 30 minutes or treat with Streptocycline (0.01%)",
            "Avoid deep planting and clipping of seedling leaf tips during transplantation",
            "Adopt alternate wetting and drying (AWD) water management",
            "Cultivate BLB-resistant varieties such as Improved Samba Mahsuri (RP-Bio-226), Ajaya, or IRBB55"
        ],
        "resistant_varieties": ["Improved Samba Mahsuri", "Ajaya", "IRBB21", "IRBB55", "Swarna"],
        "recovery_milestones": [
            {"phase": "Day 1–3", "timeline": "Bacteriostatic Control", "action": "Apply copper + bactericide tank mix; drain stagnant standing water."},
            {"phase": "Day 4–7", "timeline": "Vector / Spread Check", "action": "Verify lesions turn straw-colored and dry out with no active ooze."},
            {"phase": "Day 8–14", "timeline": "Vegetative Renewal", "action": "Top-dress with Muriate of Potash (MOP) to accelerate healthy leaf emergence."}
        ]
    },
    "brownspot": {
        "plant": "Rice / Paddy",
        "disease": "Brown Spot",
        "common_name": "Brown Spot of Rice",
        "pathogen": "Bipolaris oryzae (Cochliobolus miyabeanus)",
        "pathogen_type": "Fungal",
        "severity": "Moderate",
        "spread_risk": "Medium",
        "spread_risk_score": 58,
        "symptoms": [
            "Small, circular to oval dark brown spots resembling sesame seeds across leaf blades",
            "Mature spots exhibit light brown to grayish centers surrounded by a distinct yellow chlorotic halo",
            "Severe attacks lead to premature leaf blade yellowing, lodging, and poor grain filling",
            "Infected seed glumes develop dark brown blotches, causing discoloration and poor seed germination"
        ],
        "immediate_actions": [
            "Foliar spray with Mancozeb 75% WP @ 2 g/L or Propiconazole 25% EC @ 1 ml/L",
            "Correct acute potassium and zinc deficiency with foliar nutrient spray (1% Potassium Nitrate + 0.5% ZnSO4)",
            "Ensure uniform soil irrigation; avoid drought stress especially in sandy loam soils"
        ],
        "recommended_action": [
            "Spray Mancozeb 75% WP (2 g/L) or Propiconazole 25% EC (1 ml/L) at 10-day intervals",
            "Top-dress with Potash (MOP @ 25 kg/acre) to restore soil fertility balance",
            "Soil application of bio-fertilizers and organic compost to revitalize degraded soils"
        ],
        "products": [
            "Mancozeb 75 WP (Indofil M-45)",
            "Propiconazole 25 EC (Tilt)",
            "Carbendazim 12% + Mancozeb 63% WP (Saaf)",
            "Zinc Sulphate (ZnSO4 21%)",
            "Muriate of Potash"
        ],
        "organic_remedies": [
            "Trichoderma harzianum @ 10 g/L foliar spray plus 2.5 kg/acre soil enrichment",
            "Panchagavya (3%) foliar spray to boost photosynthetic vigor and leaf strength",
            "Neem oil 10,000 ppm @ 3 ml/L with liquid soap surfactant"
        ],
        "chemical_remedies": [
            "Propiconazole 25% EC @ 200 ml in 200 L water per acre",
            "Carbendazim + Mancozeb (Saaf) @ 400 g in 200 L water per acre",
            "Mancozeb 75% WP @ 500 g in 200 L water per acre"
        ],
        "prevention": [
            "Treat seed with Carbendazim 2 g/kg or Thiram 3 g/kg before sowing",
            "Conduct comprehensive soil testing to correct potassium, manganese, and zinc deficits",
            "Avoid cultivating in nutrient-depleted, heavily leached soils without organic manure",
            "Grow tolerant varieties like Aditya, Annada, or Naveen"
        ],
        "resistant_varieties": ["Aditya", "Annada", "Naveen", "CR Dhan 310", "IR36"],
        "recovery_milestones": [
            {"phase": "Day 1–3", "timeline": "Nutrient & Fungicide Intervention", "action": "Spray systemic triazole fungicide combined with foliar micronutrients."},
            {"phase": "Day 4–7", "timeline": "Halo Cessation", "action": "Observe yellow halos around spots turning inactive and crisp."},
            {"phase": "Day 8–14", "timeline": "Grain Filling Support", "action": "Ensure uninterrupted irrigation during panicle emergence."}
        ]
    },
    "tungro": {
        "plant": "Rice / Paddy",
        "disease": "Tungro Disease",
        "common_name": "Rice Tungro Disease (RTD)",
        "pathogen": "Rice Tungro Bacilliform Virus (RTBV) + Spherical Virus (RTSV)",
        "pathogen_type": "Viral",
        "severity": "Critical",
        "spread_risk": "Critical",
        "spread_risk_score": 94,
        "symptoms": [
            "Distinct yellowish to deep orange discoloration starting from leaf tips downwards",
            "Marked stunting of the entire rice hill and severe reduction in productive tillers",
            "Young leaves display mottled interveinal chlorosis and spiraled growth",
            "Delayed flowering with sterile, empty spikelets and partially exerted panicles"
        ],
        "immediate_actions": [
            "Direct emergency insecticide spray against Green Leafhopper vector: Imidacloprid 17.8% SL @ 0.3 ml/L",
            "Uproot (rogue) and burn severely stunted orange hills immediately to eradicate virus reservoirs",
            "Install yellow sticky traps or light traps (1 trap/acre) to monitor vector population"
        ],
        "recommended_action": [
            "Spray Imidacloprid 17.8% SL (0.3 ml/L) or Thiamethoxam 25% WG (0.2 g/L) for vector eradication",
            "Alternate with Dinotefuran 20% SG (0.4 g/L) to prevent vector insecticide tolerance",
            "Foliar spray of micronutrient mixture with urea (1%) to boost surviving hills"
        ],
        "products": [
            "Imidacloprid 17.8 SL (Confidor)",
            "Thiamethoxam 25 WG (Actara)",
            "Dinotefuran 20 SG (Token / Osheen)",
            "Neem Seed Kernel Extract 5%"
        ],
        "organic_remedies": [
            "Neem oil 10,000 ppm @ 5 ml/L as an anti-feedant against Green Leafhopper vector",
            "Beauveria bassiana entomopathogenic fungus @ 5 g/L to parasitise leafhopper nymphs",
            "Removal and destruction of grassy weed hosts around bunds and field irrigation channels"
        ],
        "chemical_remedies": [
            "Imidacloprid 17.8% SL @ 60 ml in 200 L water per acre",
            "Thiamethoxam 25% WG @ 40 g in 200 L water per acre",
            "Dinotefuran 20% SG @ 80 g in 200 L water per acre"
        ],
        "prevention": [
            "Synchronized planting in the command area to break the green leafhopper life cycle",
            "Eliminate volunteer rice ratoons and alternate graminaceous weed hosts",
            "Plow under rice stubble immediately after harvest",
            "Cultivate GLH/Tungro-resistant varieties like IR36, IR64, Vikramarya, or Bharani"
        ],
        "resistant_varieties": ["Vikramarya", "Bharani", "IR36", "IR64", "Kasturi"],
        "recovery_milestones": [
            {"phase": "Day 1–3", "timeline": "Vector Knockdown", "action": "Apply systemic neonicotinoid; rogue infected reservoir hills."},
            {"phase": "Day 4–7", "timeline": "Vector Count Monitoring", "action": "Inspect sticky traps; ensure leafhopper counts drop to zero."},
            {"phase": "Day 8–14", "timeline": "Nutritional Booster", "action": "Apply foliar NPK + Zinc spray to accelerate vegetative recovery of uninfected tillers."}
        ]
    },

    # ─────────────────────────────────────────────────────────────
    # POTATO CROPS
    # ─────────────────────────────────────────────────────────────
    "potato_earlyblight": {
        "plant": "Potato",
        "disease": "Potato Early Blight",
        "common_name": "Early Blight of Potato",
        "pathogen": "Alternaria solani",
        "pathogen_type": "Fungal",
        "severity": "Moderate",
        "spread_risk": "Medium",
        "spread_risk_score": 65,
        "symptoms": [
            "Dark brown to black concentric circular rings (target board / bullseye pattern) on older lower leaves",
            "Lesions surrounded by a narrow chlorotic yellow ring",
            "Premature defoliation starting from the base of the plant moving upwards",
            "Tubers develop sunken, dark, leathery corky lesions causing storage rot"
        ],
        "immediate_actions": [
            "Foliar spray with Mancozeb 75% WP @ 2.5 g/L or Azoxystrobin 23% SC @ 1 ml/L",
            "Prune and safely discard heavily infected lower canopy leaves to reduce spore dispersal",
            "Switch to morning drip irrigation; avoid overhead sprinkler watering that keeps leaves wet"
        ],
        "recommended_action": [
            "Spray Chlorothalonil 75% WP (2 g/L) or Mancozeb 75% WP (2.5 g/L) at 7–10 day intervals",
            "Alternate with systemic fungicides like Difenoconazole 25% EC (0.5 ml/L)",
            "Maintain balanced nitrogen and potassium fertilization to prevent premature canopy senescence"
        ],
        "products": [
            "Mancozeb 75 WP (Dithane M-45)",
            "Chlorothalonil 75 WP (Kavach)",
            "Difenoconazole 25 EC (Score)",
            "Azoxystrobin 23 SC (Amistar)",
            "Copper Hydroxide 53.8 DF"
        ],
        "organic_remedies": [
            "Bordeaux mixture (1%) or Copper Oxychloride @ 2.5 g/L",
            "Bacillus subtilis bio-fungicide @ 5 g/L applied to foliage",
            "Neem oil 10,000 ppm foliar spray @ 3 ml/L"
        ],
        "chemical_remedies": [
            "Mancozeb 75% WP @ 600 g in 200 L water per acre",
            "Difenoconazole 25% EC @ 100 ml in 200 L water per acre",
            "Azoxystrobin 23% SC @ 200 ml in 200 L water per acre"
        ],
        "prevention": [
            "Plant certified disease-free seed tubers treated with Mancozeb (2 g/kg)",
            "Follow 3-year crop rotation with non-solanaceous crops (e.g., legumes or cereals)",
            "Avoid overhead irrigation during late afternoon and evening",
            "Select tolerant cultivars like Kufri Pukhraj, Kufri Jyoti, or Kufri Badshah"
        ],
        "resistant_varieties": ["Kufri Jyoti", "Kufri Pukhraj", "Kufri Badshah", "Kufri Bahar", "Atlantic"],
        "recovery_milestones": [
            {"phase": "Day 1–3", "timeline": "Target Ring Arrest", "action": "Apply protective contact + systemic fungicide mix."},
            {"phase": "Day 4–7", "timeline": "Canopy Protection", "action": "Inspect upper leaves to ensure target lesions do not climb up the canopy."},
            {"phase": "Day 8–14", "timeline": "Tuber Bulking Care", "action": "Maintain optimal soil moisture for smooth tuber bulking."}
        ]
    },
    "potato_lateblight": {
        "plant": "Potato",
        "disease": "Potato Late Blight",
        "common_name": "Late Blight of Potato (Irish Famine Pathogen)",
        "pathogen": "Phytophthora infestans",
        "pathogen_type": "Oomycete / Water Mold",
        "severity": "Critical",
        "spread_risk": "Critical",
        "spread_risk_score": 96,
        "symptoms": [
            "Water-soaked, dark brown to purplish-black irregular lesions on leaf tips and petioles",
            "Fine white cottony fungal-like mildew growth visible on the undersides of leaves during high humidity",
            "Entire foliage collapses and rots rapidly with a characteristic foul odor within 48–72 hours",
            "Infected tubers show irregular brown dry rot on skin and copper-brown granular rot inside flesh"
        ],
        "immediate_actions": [
            "Emergency foliar spray with Cymoxanil 8% + Mancozeb 64% WP @ 2.5 g/L or Metalaxyl-M 4% + Mancozeb 64% WP @ 2.5 g/L",
            "Destroy and bury severely collapsed plants immediately to halt aerial sporangia spread",
            "Stop all irrigation immediately until weather dries out and relative humidity drops"
        ],
        "recommended_action": [
            "Foliar spray of Dimethomorph 50% WP (1 g/L) + Mancozeb 75% WP (2 g/L)",
            "Alternate with Fluopicolide 5.56% + Propamocarb HCl 62.5% SC (2 ml/L) for curative knockdown",
            "High ridging (earthing up) to protect underground tubers from waterborne sporangia washed from foliage"
        ],
        "products": [
            "Cymoxanil + Mancozeb (Curzate M8)",
            "Metalaxyl + Mancozeb (Ridomil Gold)",
            "Dimethomorph 50 WP (Acrobat)",
            "Fluopicolide + Propamocarb (Infinito)",
            "Copper Hydroxide (Kocide 2000)"
        ],
        "organic_remedies": [
            "Preventative foliar spray of Bordeaux mixture (1%) before disease outbreak",
            "Copper soap (Copper Octanoate) foliar spray @ 5 ml/L",
            "Trichoderma harzianum soil and foliar drench to protect root zone"
        ],
        "chemical_remedies": [
            "Cymoxanil 8% + Mancozeb 64% WP @ 600 g in 200 L water per acre",
            "Metalaxyl 8% + Mancozeb 64% WP @ 500 g in 200 L water per acre",
            "Dimethomorph 50% WP @ 250 g in 200 L water per acre"
        ],
        "prevention": [
            "Use certified disease-free seed tubers from certified seed farms (CPRI)",
            "Proper earthing up to create a 10–12 cm soil barrier over growing tubers",
            "Eliminate cull potato piles near fields that serve as primary infection sources",
            "Plant resistant potato cultivars such as Kufri Girdhari, Kufri Himalini, or Kufri Mohan"
        ],
        "resistant_varieties": ["Kufri Girdhari", "Kufri Himalini", "Kufri Mohan", "Kufri FryoM", "Kufri Surya"],
        "recovery_milestones": [
            {"phase": "Day 1–2", "timeline": "Emergency Sporangia Knockdown", "action": "Apply systemic oomycete fungicide; suspend all irrigation."},
            {"phase": "Day 3–6", "timeline": "Foliage Drying", "action": "Check leaf undersides for complete disappearance of white downy sporulation."},
            {"phase": "Day 7–14", "timeline": "Tuber Protection", "action": "Perform final protective earthing up before vine desiccation and harvesting."}
        ]
    },

    # ─────────────────────────────────────────────────────────────
    # CORN / MAIZE CROPS
    # ─────────────────────────────────────────────────────────────
    "corn_commonrust": {
        "plant": "Corn / Maize",
        "disease": "Common Rust",
        "common_name": "Common Rust of Maize",
        "pathogen": "Puccinia sorghi",
        "pathogen_type": "Fungal",
        "severity": "Moderate",
        "spread_risk": "High",
        "spread_risk_score": 76,
        "symptoms": [
            "Small, oval to elongate cinnamon-brown or golden-brown powdery pustules on both upper and lower leaf surfaces",
            "Pustules rupture epidermal tissue, releasing powdery rust-colored urediniospores when touched",
            "Pustules turn dark brownish-black late in the season as overwintering teliospores form",
            "Severe infection leads to leaf chlorosis, premature desiccation, and reduced ear size"
        ],
        "immediate_actions": [
            "Spray Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L or Pyraclostrobin 20% WG @ 0.8 g/L",
            "Avoid overhead irrigation during cool, humid morning hours to minimize leaf wetness duration",
            "Inspect upper leaves (ear leaf and above) to safeguard photosynthetic grain filling"
        ],
        "recommended_action": [
            "Apply systemic strobilurin + triazole fungicide combination at first symptom detection",
            "Maintain optimal plant spacing to promote airflow through dense corn canopy",
            "Foliar potassium application to strengthen stalk and leaf tissue against lodging"
        ],
        "products": [
            "Azoxystrobin + Difenoconazole (Amistar Top)",
            "Pyraclostrobin 20 WG (Headline)",
            "Propiconazole 25 EC (Tilt)",
            "Mancozeb 75 WP"
        ],
        "organic_remedies": [
            "Bio-fungicide spray with Bacillus amyloliquefaciens @ 5 g/L",
            "Neem oil 10,000 ppm @ 3 ml/L with liquid surfactant",
            "Sulfur 80% WDG @ 2.5 g/L during early vegetative stages"
        ],
        "chemical_remedies": [
            "Azoxystrobin + Difenoconazole @ 200 ml in 200 L water per acre",
            "Propiconazole 25% EC @ 200 ml in 200 L water per acre",
            "Mancozeb 75% WP @ 600 g in 200 L water per acre"
        ],
        "prevention": [
            "Plant resistant corn hybrids with Rp-resistance genes (e.g. Pioneer 3396, DKC 9108)",
            "Early planting to avoid mid-season cool, humid spore showers",
            "Rotate crops with non-host legumes (soybean, chickpea, or groundnut)",
            "Destroy infected maize stubble by deep tillage after harvest"
        ],
        "resistant_varieties": ["DKC 9108", "Pioneer 3396", "HQPM 1", "Pusa HM 4", "PAC 740"],
        "recovery_milestones": [
            {"phase": "Day 1–3", "timeline": "Pustule Sporulation Halting", "action": "Foliar systemic fungicide spray targeting ear leaf and upper canopy."},
            {"phase": "Day 4–7", "timeline": "Pustule Necrosis", "action": "Confirm pustules turn dark and stop shedding powdery orange spores."},
            {"phase": "Day 8–14", "timeline": "Grain Filling Protection", "action": "Support tassel and silk development with balanced irrigation."}
        ]
    },
    "corn_grayleafspot": {
        "plant": "Corn / Maize",
        "disease": "Gray Leaf Spot",
        "common_name": "Gray Leaf Spot (GLS) of Maize",
        "pathogen": "Cercospora zeae-maydis",
        "pathogen_type": "Fungal",
        "severity": "High",
        "spread_risk": "High",
        "spread_risk_score": 84,
        "symptoms": [
            "Distinct rectangular, blocky lesions strictly delimited by parallel leaf veins",
            "Lesions start tan to grayish-brown, eventually turning pale gray with sporulation",
            "Extensive lesion expansion leads to complete blighting of leaf tissue above the ear",
            "Premature plant death and severe stalk lodging due to carbohydrate depletion"
        ],
        "immediate_actions": [
            "Spray Pyraclostrobin + Fluxapyroxad or Azoxystrobin + Difenoconazole @ 1 ml/L",
            "Inspect ear leaf and top 3 canopy leaves to determine economic threshold (>5% leaf area)",
            "Ensure field drainage to reduce stagnant humidity in low-lying field sections"
        ],
        "recommended_action": [
            "Apply systemic dual-action fungicide between V10 and R1 (tasseling/silking) stages",
            "Avoid planting continuous corn-on-corn in high-tillage residue fields",
            "Top-dress with potassium to reinforce stalk cellulose against premature lodging"
        ],
        "products": [
            "Pyraclostrobin + Fluxapyroxad (Priaxor)",
            "Azoxystrobin + Difenoconazole (Amistar Top)",
            "Trifloxystrobin + Tebuconazole (Nativo)",
            "Propiconazole 25 EC"
        ],
        "organic_remedies": [
            "Trichoderma harzianum foliar application @ 5 g/L",
            "Compost tea spray rich in beneficial antagonistic bacteria",
            "Copper hydroxide @ 2 g/L for protective boundary coverage"
        ],
        "chemical_remedies": [
            "Priaxor (Pyraclostrobin + Fluxapyroxad) @ 120 ml in 200 L water per acre",
            "Nativo (Trifloxystrobin + Tebuconazole) @ 150 g in 200 L water per acre",
            "Propiconazole 25% EC @ 200 ml in 200 L water per acre"
        ],
        "prevention": [
            "Cultivate GLS-resistant commercial maize hybrids (e.g. DKC 9144, Pioneer P3501)",
            "Rotate fields with soybean or sorghum for at least 1–2 years",
            "Shred and incorporate corn crop residue into the soil to hasten fungal degradation"
        ],
        "resistant_varieties": ["DKC 9144", "Pioneer P3501", "Syngenta NK 6240", "CP 333", "Bio 9681"],
        "recovery_milestones": [
            {"phase": "Day 1–3", "timeline": "Rectangular Lesion Containment", "action": "Apply systemic strobilurin-triazole blend."},
            {"phase": "Day 4–7", "timeline": "Vein Boundary Check", "action": "Verify lesions remain restricted within vein boundaries without crossing."},
            {"phase": "Day 8–14", "timeline": "Ear Filling Security", "action": "Ensure ear leaf stays green and photosynthetically functional through milk stage."}
        ]
    },

    # ─────────────────────────────────────────────────────────────
    # WHEAT CROPS
    # ─────────────────────────────────────────────────────────────
    "wheat_yellowrust": {
        "plant": "Wheat",
        "disease": "Yellow (Stripe) Rust",
        "common_name": "Stripe Rust of Wheat",
        "pathogen": "Puccinia striiformis f. sp. tritici",
        "pathogen_type": "Fungal",
        "severity": "Critical",
        "spread_risk": "Critical",
        "spread_risk_score": 93,
        "symptoms": [
            "Bright yellow to orange pustules arranged in conspicuous linear stripes along leaf veins",
            "Pustules release masses of yellow powdery urediniospores when brushed",
            "Severe infection attacks glumes and awns, resulting in shriveled, unmarketable grain",
            "Yellow stripe chlorosis causes leaves to dry up prematurely like scorched paper"
        ],
        "immediate_actions": [
            "Spray Propiconazole 25% EC (Tilt @ 1 ml/L) or Tebuconazole 25.9% EC (Folicur @ 1 ml/L) immediately",
            "Scout whole field systematically in zigzag pattern to pinpoint infection focal spots",
            "Notify local agricultural university / KVK extension office of stripe rust presence"
        ],
        "recommended_action": [
            "Apply systemic triazole fungicide (Propiconazole @ 200 ml/acre or Tebuconazole @ 200 ml/acre)",
            "Repeat spray after 12–15 days if cool, humid or drizzling conditions persist",
            "Apply foliar Zinc (0.5%) + Urea (2%) after disease arrest to revitalize ear heads"
        ],
        "products": [
            "Propiconazole 25 EC (Tilt)",
            "Tebuconazole 25.9 EC (Folicur)",
            "Azoxystrobin 18.2% + Difenoconazole 11.4% SC",
            "Mancozeb 75 WP"
        ],
        "organic_remedies": [
            "Foliar spray of Bacillus subtilis bio-formulation @ 10 g/L",
            "Neem Seed Kernel Extract (NSKE 5%) as an initial repellent",
            "Sulfur 80% WDG @ 2.5 g/L"
        ],
        "chemical_remedies": [
            "Propiconazole 25% EC @ 200 ml in 200 L water per acre",
            "Tebuconazole 25.9% EC @ 200 ml in 200 L water per acre",
            "Azoxystrobin + Difenoconazole @ 200 ml in 200 L water per acre"
        ],
        "prevention": [
            "Sow stripe rust-resistant wheat varieties (e.g. DBW 187, DBW 222, HD 3226, PBW 725)",
            "Timely sowing in November to escape high-pressure late winter spore showers",
            "Avoid sowing susceptible varieties (like HD 2967 or PBW 343) in yellow rust hotspot zones"
        ],
        "resistant_varieties": ["DBW 187 (Karan Vandana)", "DBW 222", "HD 3226", "PBW 725", "HD 3086"],
        "recovery_milestones": [
            {"phase": "Day 1–3", "timeline": "Stripe Spore Lockdown", "action": "Foliar triazole fungicide application across field boundaries."},
            {"phase": "Day 4–7", "timeline": "Urediniospore Inactivation", "action": "Yellow stripes turn dull brown and cease shedding powdery spores."},
            {"phase": "Day 8–14", "timeline": "Flag Leaf Maintenance", "action": "Preserve flag leaf green area for optimal grain filling weight."}
        ]
    },
    "wheat_brownrust": {
        "plant": "Wheat",
        "disease": "Brown (Leaf) Rust",
        "common_name": "Leaf Rust of Wheat",
        "pathogen": "Puccinia triticina",
        "pathogen_type": "Fungal",
        "severity": "High",
        "spread_risk": "High",
        "spread_risk_score": 80,
        "symptoms": [
            "Round to oval orange-brown powdery pustules scattered randomly across upper leaf surfaces",
            "Pustules do not form organized linear stripes (distinguishing it from yellow stripe rust)",
            "Severely attacked leaves turn yellow, curl up, and dry out prematurely",
            "Causes reduced tiller survival, decreased grain weight, and shriveled kernels"
        ],
        "immediate_actions": [
            "Foliar spray with Propiconazole 25% EC @ 1 ml/L or Mancozeb 75% WP @ 2.5 g/L",
            "Scout canopy focusing on upper 2 leaves during warm, humid spring weather (20–25°C)",
            "Maintain optimal soil moisture to mitigate grain weight penalties"
        ],
        "recommended_action": [
            "Apply Propiconazole 25% EC (1 ml/L) or Tebuconazole 25.9% EC (1 ml/L)",
            "Ensure complete coverage of flag leaves and sub-flag leaves during spraying",
            "Apply balanced fertilizer with adequate potassium to fortify cell walls"
        ],
        "products": [
            "Propiconazole 25 EC (Tilt)",
            "Tebuconazole 25.9 EC",
            "Mancozeb 75 WP (Indofil M-45)",
            "Saaf (Carbendazim + Mancozeb)"
        ],
        "organic_remedies": [
            "Pseudomonas fluorescens 1% WP @ 10 g/L foliar spray",
            "Neem oil 10,000 ppm @ 3 ml/L",
            "Wettable sulfur (80% WP) @ 2.5 g/L"
        ],
        "chemical_remedies": [
            "Propiconazole 25% EC @ 200 ml in 200 L water per acre",
            "Tebuconazole 25.9% EC @ 200 ml in 200 L water per acre",
            "Mancozeb 75% WP @ 500 g in 200 L water per acre"
        ],
        "prevention": [
            "Grow brown rust-resistant wheat varieties such as HD 3249, DBW 303, or PBW 824",
            "Eradicate volunteer wheat plants and wild grass hosts during off-season",
            "Adopt recommended seed rate and row spacing to ensure adequate light penetration"
        ],
        "resistant_varieties": ["HD 3249", "DBW 303", "PBW 824", "HD 3086", "GW 496"],
        "recovery_milestones": [
            {"phase": "Day 1–3", "timeline": "Spore Inactivation", "action": "Foliar systemic spray covering the entire canopy."},
            {"phase": "Day 4–7", "timeline": "Pustule Browning", "action": "Pustules become dark, dry, and non-viable."},
            {"phase": "Day 8–14", "timeline": "Grain Maturation Support", "action": "Maintain soil moisture through milk and dough grain stages."}
        ]
    },

    # ─────────────────────────────────────────────────────────────
    # HEALTHY CROPS
    # ─────────────────────────────────────────────────────────────
    "healthy": {
        "plant": "Crop Plant",
        "disease": "Healthy Leaf",
        "common_name": "Normal Plant Physiology",
        "pathogen": "None (No Pathogens Detected)",
        "pathogen_type": "Healthy / Physiological",
        "severity": "Healthy",
        "spread_risk": "None",
        "spread_risk_score": 0,
        "symptoms": [
            "Vibrant, uniform green foliage with active chlorophyll density",
            "No necrotic lesions, yellow halos, fungal pustules, or water-soaked streaks",
            "Intact leaf epidermal integrity with healthy, turgid cellular structure",
            "Optimal photosynthetic activity and robust vascular leaf vein network"
        ],
        "immediate_actions": [
            "No chemical or therapeutic fungicide application needed",
            "Continue routine farm scouting and record crop growth milestone stage",
            "Maintain scheduled balanced irrigation and organic soil amendments"
        ],
        "recommended_action": [
            "Maintain current irrigation schedule and balanced NPK fertility",
            "Apply preventative bio-stimulants or seaweed extract for enhanced stress tolerance",
            "Perform weekly scouting during peak vegetative and flowering stages"
        ],
        "products": [
            "Organic Compost / Vermicompost",
            "Seaweed Extract Bio-stimulant",
            "Balanced Micronutrient Mixture",
            "Bio-fertilizers (Azotobacter / PSB)"
        ],
        "organic_remedies": [
            "Panchagavya (3%) foliar spray every 15 days to sustain photosynthetic vigor",
            "Jeevamrutha soil drenching (200 L/acre) to enrich beneficial soil microbiome",
            "Neem cake soil application @ 50 kg/acre for natural soil pest deterrence"
        ],
        "chemical_remedies": [
            "No chemical pesticides required. Maintain standard micronutrient foliar spray (0.2%) if soil analysis suggests."
        ],
        "prevention": [
            "Follow scientific crop rotation and avoid monoculture depletion",
            "Ensure well-drained field channels to prevent root asphyxiation during heavy rains",
            "Implement Integrated Pest Management (IPM) practices"
        ],
        "resistant_varieties": ["Cultivate regionally certified high-yielding resistant cultivars"],
        "recovery_milestones": [
            {"phase": "Current", "timeline": "Optimal Health", "action": "Crop foliage is in prime vegetative / reproductive condition."},
            {"phase": "Ongoing", "timeline": "Preventative Scouting", "action": "Routine weekly checks for microclimate changes or pest vector arrivals."},
            {"phase": "Harvest", "timeline": "Yield Maximization", "action": "Follow good harvest and post-harvest drying protocols."}
        ]
    }
}

# Aliases for matching various model label outputs
DISEASE_PROFILES["rice_healthy"] = {**DISEASE_PROFILES["healthy"], "plant": "Rice / Paddy", "disease": "Healthy Rice Leaf"}
DISEASE_PROFILES["potato_healthy"] = {**DISEASE_PROFILES["healthy"], "plant": "Potato", "disease": "Healthy Potato Leaf"}
DISEASE_PROFILES["corn_healthy"] = {**DISEASE_PROFILES["healthy"], "plant": "Corn / Maize", "disease": "Healthy Corn Leaf"}
DISEASE_PROFILES["wheat_healthy"] = {**DISEASE_PROFILES["healthy"], "plant": "Wheat", "disease": "Healthy Wheat Leaf"}
DISEASE_PROFILES["tomato_healthy"] = {**DISEASE_PROFILES["healthy"], "plant": "Tomato", "disease": "Healthy Tomato Leaf"}
DISEASE_PROFILES["grape_healthy"] = {**DISEASE_PROFILES["healthy"], "plant": "Grape / Vineyard", "disease": "Healthy Grape Leaf"}
DISEASE_PROFILES["apple_healthy"] = {**DISEASE_PROFILES["healthy"], "plant": "Apple", "disease": "Healthy Apple Leaf"}

class DiseaseService:
    @staticmethod
    async def predict(image_file: UploadFile) -> DiseasePredictionResponse:
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

        try:
            pil_img = Image.open(io.BytesIO(content))
            pil_img.verify()
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or corrupt image file."
            )

        # Get or initialize ML service
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

        raw_disease = prediction_raw.get("disease", "Healthy Leaf")
        plant_name = prediction_raw.get("plant", "Crop Plant")
        profile_key = prediction_raw.get("profile_key", raw_disease.lower().replace(" ", "").replace("_", ""))
        confidence = float(prediction_raw.get("confidence", 0.92))
        model_source = prediction_raw.get("model_source", "Vision Transformer (wambugu71/crop_leaf_diseases_vit)")

        # Match profile
        profile = None
        # 1. Exact match
        if profile_key in DISEASE_PROFILES:
            profile = DISEASE_PROFILES[profile_key]
        else:
            # 2. Key search
            norm_key = profile_key.lower().replace(" ", "").replace("_", "").replace("-", "")
            for k in DISEASE_PROFILES:
                k_clean = k.lower().replace(" ", "").replace("_", "")
                if k_clean in norm_key or norm_key in k_clean:
                    profile = DISEASE_PROFILES[k]
                    break

        if not profile:
            # Dynamic adaptive profile
            is_healthy = "healthy" in raw_disease.lower()
            profile = {
                "plant": plant_name,
                "disease": raw_disease,
                "common_name": f"{plant_name} {raw_disease}",
                "pathogen": "Natural Plant Physiology" if is_healthy else "Pathogenic Fungus / Bacteria",
                "pathogen_type": "Healthy / Physiological" if is_healthy else "Fungal / Bacterial",
                "severity": "Healthy" if is_healthy else "Moderate",
                "spread_risk": "None" if is_healthy else "Medium",
                "spread_risk_score": 0 if is_healthy else 60,
                "symptoms": [
                    "Optimal leaf chlorophyll and cell turgor" if is_healthy else "Visible foliar lesions, spots, or discoloration on leaf surface",
                    "Uniform leaf texture without necrotic decay" if is_healthy else "Degradation of photosynthetic leaf area"
                ],
                "immediate_actions": [
                    "Maintain current irrigation and organic fertility schedule" if is_healthy else "Apply protective broad-spectrum bio-fungicide or systemic spray",
                    "Continue routine weekly field monitoring" if is_healthy else "Isolate and sanitize severely blighted foliage to prevent spore spread"
                ],
                "recommended_action": [
                    "Maintain current soil moisture and nutrition" if is_healthy else "Spray Mancozeb 75% WP (2 g/L) or Azoxystrobin (1 ml/L)",
                    "Continue routine crop scouting" if is_healthy else "Remove infected leaf debris and maintain proper row aeration"
                ],
                "products": [
                    "Organic Compost", "Bio-stimulants"
                ] if is_healthy else [
                    "Mancozeb 75% WP", "Azoxystrobin 23% SC", "Neem Oil 10,000 ppm", "Copper Oxychloride 50% WP"
                ],
                "organic_remedies": [
                    "Panchagavya (3%) foliar spray", "Neem cake soil application"
                ] if is_healthy else [
                    "Neem Seed Kernel Extract (NSKE 5%) @ 50 ml/L",
                    "Trichoderma viride bio-fungicide @ 5 g/L",
                    "Pseudomonas fluorescens 1% WP foliar spray @ 10 g/L"
                ],
                "chemical_remedies": [
                    "No chemical remedies needed."
                ] if is_healthy else [
                    "Mancozeb 75% WP @ 500 g in 200 L water per acre",
                    "Azoxystrobin 23% SC @ 200 ml in 200 L water per acre"
                ],
                "prevention": [
                    "Crop rotation and balanced organic fertilization",
                    "Optimal plant spacing for proper canopy aeration"
                ],
                "resistant_varieties": ["Certified disease-tolerant hybrid seed varieties"],
                "recovery_milestones": [
                    {"phase": "Day 1–3", "timeline": "Pathogen Suppression", "action": "Apply targeted fungicide; regulate irrigation."},
                    {"phase": "Day 4–7", "timeline": "Lesion Stabilization", "action": "Confirm lesions cease active radial expansion."},
                    {"phase": "Day 8–14", "timeline": "Vegetative Recovery", "action": "Foliar nutrient booster to stimulate fresh foliage."}
                ]
            }

        # Format alternative predictions
        alt_preds = []
        for p in prediction_raw.get("top_predictions", []):
            label = p.get("disease", "")
            alt_preds.append(AlternativePrediction(
                disease=label,
                confidence=float(p.get("confidence", 0.0))
            ))

        # Format recovery milestones
        milestones = []
        for m in profile.get("recovery_milestones", []):
            milestones.append(RecoveryMilestone(
                phase=m["phase"],
                timeline=m["timeline"],
                action=m["action"]
            ))

        # Integrate AI Agronomist for Tailored Solution
        ai_recommendation = await OpenAIService.suggest_disease_solution(
            disease=profile["disease"],
            plant=profile.get("plant", plant_name),
            severity=profile["severity"],
            symptoms=profile["symptoms"]
        )

        return DiseasePredictionResponse(
            plant=profile.get("plant", plant_name),
            disease=profile["disease"],
            common_name=profile.get("common_name", profile["disease"]),
            pathogen=profile.get("pathogen"),
            pathogen_type=profile.get("pathogen_type", "Fungal"),
            confidence=confidence,
            severity=profile.get("severity", "Moderate"),
            spread_risk=profile.get("spread_risk", "Medium"),
            spread_risk_score=profile.get("spread_risk_score", 60),
            symptoms=profile.get("symptoms", []),
            immediate_actions=profile.get("immediate_actions", []),
            recommended_action=profile.get("recommended_action", []),
            products=profile.get("products", []),
            organic_remedies=profile.get("organic_remedies", ai_recommendation.get("organic_remedies", [])),
            chemical_remedies=profile.get("chemical_remedies", ai_recommendation.get("chemical_remedies", [])),
            prevention=profile.get("prevention", []),
            resistant_varieties=profile.get("resistant_varieties", []),
            recovery_milestones=milestones,
            top_predictions=alt_preds,
            ai_solution=ai_recommendation.get("ai_solution"),
            model_source=model_source,
            disclaimer="This is an AI-powered diagnostic advisory based on deep learning visual analysis. Confirm critical diagnoses with your regional agricultural extension officer or agronomist before initiating broad chemical applications."
        )

    @staticmethod
    async def get_history(db: AsyncSession, user_id: int) -> list:
        return []
