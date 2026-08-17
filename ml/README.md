# OptiCrop ML Models

This directory contains machine learning model development resources.

## Structure

```
ml/
├── notebooks/          # Jupyter notebooks for model training
│   ├── crop_recommendation.ipynb
│   └── disease_detection.ipynb
├── models/             # Trained model artifacts
│   ├── crop_model.joblib
│   ├── crop_pipeline.joblib
│   ├── crop_label_encoder.joblib
│   ├── disease_model.keras
│   └── disease_labels.json
└── datasets/           # Training datasets
```

## Models

### Crop Recommendation Model
- **Type**: Classification (Random Forest / XGBoost)
- **Framework**: scikit-learn
- **Input Features**: N, P, K, temperature, humidity, pH, rainfall, season
- **Output**: Top-3 crop recommendations with confidence scores
- **Artifacts**: `crop_model.joblib`, `crop_pipeline.joblib`, `crop_label_encoder.joblib`

### Disease Detection Model
- **Type**: Image Classification (CNN)
- **Framework**: TensorFlow/Keras
- **Architecture**: EfficientNetB0 / MobileNetV3 (transfer learning)
- **Input**: Leaf image (224×224 RGB)
- **Output**: Disease class with confidence
- **Artifacts**: `disease_model.keras`, `disease_labels.json`

## Development Mode

When `MOCK_ML=true` in the backend `.env`, the API returns realistic mock predictions without requiring trained model files. This enables frontend/backend development before ML integration.

## Adding Trained Models

1. Train models using the notebooks in `notebooks/`
2. Save artifacts to `models/`
3. Copy model files to `backend/models/`
4. Set `MOCK_ML=false` in `backend/.env`
5. Restart the backend server
