"""
OptiCrop Machine Learning Pipeline
Fertilizer Recommendation Dataset Generator & Model Training Script
"""

import os
import json
import joblib
import pandas as pd
import numpy as np
from datetime import datetime

from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, OneHotEncoder, LabelEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

SOIL_TYPES = ["Sandy", "Loamy", "Black", "Red", "Clayey"]
CROP_TYPES = [
    "Maize", "Sugarcane", "Cotton", "Tobacco", "Paddy", "Barley", 
    "Wheat", "Millets", "Oil seeds", "Pulses", "Ground Nuts", "Coffee"
]
FERTILIZERS = ["Urea", "DAP", "14-35-14", "28-28", "17-17-17", "20-20", "10-26-26"]

def generate_fertilizer_dataset(n_samples_per_class: int = 500, random_state: int = 42) -> pd.DataFrame:
    np.random.seed(random_state)
    records = []

    for fert in FERTILIZERS:
        for _ in range(n_samples_per_class):
            soil = np.random.choice(SOIL_TYPES)
            crop = np.random.choice(CROP_TYPES)
            temp = round(np.random.uniform(18.0, 38.0), 1)
            humidity = round(np.random.uniform(30.0, 88.0), 1)
            moisture = round(np.random.uniform(20.0, 70.0), 1)

            if fert == "Urea":
                # Severe nitrogen deficiency
                n = round(np.random.uniform(5.0, 22.0), 1)
                p = round(np.random.uniform(35.0, 65.0), 1)
                k = round(np.random.uniform(35.0, 65.0), 1)
            elif fert == "DAP":
                # Severe phosphorus deficiency
                n = round(np.random.uniform(35.0, 65.0), 1)
                p = round(np.random.uniform(5.0, 20.0), 1)
                k = round(np.random.uniform(35.0, 65.0), 1)
            elif fert == "10-26-26":
                # Severe potassium deficiency
                n = round(np.random.uniform(35.0, 65.0), 1)
                p = round(np.random.uniform(35.0, 65.0), 1)
                k = round(np.random.uniform(5.0, 20.0), 1)
            elif fert == "14-35-14":
                # Low phosphorus & low potassium
                n = round(np.random.uniform(35.0, 60.0), 1)
                p = round(np.random.uniform(8.0, 22.0), 1)
                k = round(np.random.uniform(8.0, 22.0), 1)
            elif fert == "28-28":
                # Low nitrogen & low phosphorus
                n = round(np.random.uniform(8.0, 22.0), 1)
                p = round(np.random.uniform(8.0, 22.0), 1)
                k = round(np.random.uniform(35.0, 65.0), 1)
            elif fert == "20-20":
                # Moderate N & P deficiency with pulses/oilseeds
                n = round(np.random.uniform(18.0, 32.0), 1)
                p = round(np.random.uniform(18.0, 32.0), 1)
                k = round(np.random.uniform(30.0, 55.0), 1)
            else: # "17-17-17"
                # Balanced deficiency across all 3
                n = round(np.random.uniform(10.0, 25.0), 1)
                p = round(np.random.uniform(10.0, 25.0), 1)
                k = round(np.random.uniform(10.0, 25.0), 1)

            records.append({
                "temparature": temp,
                "humidity": humidity,
                "moisture": moisture,
                "soil type": soil,
                "crop type": crop,
                "nitrogen": n,
                "phosphorous": p,
                "potassium": k,
                "fertilizer name": fert
            })

    return pd.DataFrame(records)

def train():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    ml_root = os.path.dirname(script_dir)
    project_root = os.path.dirname(ml_root)

    dataset_dir = os.path.join(ml_root, "datasets")
    os.makedirs(dataset_dir, exist_ok=True)
    dataset_path = os.path.join(dataset_dir, "fertilizer_prediction.csv")

    print("[*] Generating Fertilizer dataset...")
    df = generate_fertilizer_dataset(n_samples_per_class=600, random_state=42)
    df.to_csv(dataset_path, index=False)
    print(f"[+] Saved dataset ({len(df)} rows) to: {dataset_path}")

    num_cols = ["temparature", "humidity", "moisture", "nitrogen", "phosphorous", "potassium"]
    cat_cols = ["soil type", "crop type"]
    target_col = "fertilizer name"

    X = df[num_cols + cat_cols]
    y_raw = df[target_col].str.strip()

    label_encoder = LabelEncoder()
    y = label_encoder.fit_transform(y_raw)
    classes = list(label_encoder.classes_)

    print(f"[*] Target Classes: {classes}")

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", StandardScaler(), num_cols),
            ("cat", OneHotEncoder(handle_unknown="ignore", sparse_output=False), cat_cols),
        ]
    )

    classifier = RandomForestClassifier(
        n_estimators=100,
        max_depth=16,
        min_samples_split=4,
        random_state=42,
        n_jobs=-1
    )

    pipeline = Pipeline(steps=[
        ("preprocessor", preprocessor),
        ("classifier", classifier)
    ])

    print("[*] Training Fertilizer Recommendation Pipeline...")
    pipeline.fit(X_train, y_train)

    y_pred = pipeline.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred, average="weighted")
    rec = recall_score(y_test, y_pred, average="weighted")
    f1 = f1_score(y_test, y_pred, average="weighted")

    cv_scores = cross_val_score(pipeline, X, y, cv=5)
    cv_mean = float(cv_scores.mean())
    cv_std = float(cv_scores.std())

    print(f"[+] Test Accuracy: {acc * 100:.2f}%")
    print(f"[+] 5-Fold CV Mean: {cv_mean * 100:.2f}% (+/- {cv_std * 100:.2f}%)")

    metadata = {
        "model_name": "OptiCrop Fertilizer Recommendation Engine",
        "algorithm": "Random Forest Classifier",
        "training_samples": len(X_train),
        "testing_samples": len(X_test),
        "features": num_cols + cat_cols,
        "numerical_features": num_cols,
        "categorical_features": cat_cols,
        "classes": classes,
        "accuracy": round(float(acc), 4),
        "precision": round(float(prec), 4),
        "recall": round(float(rec), 4),
        "f1_score": round(float(f1), 4),
        "cv_mean": round(cv_mean, 4),
        "cv_std": round(cv_std, 4),
        "training_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }

    export_dirs = [
        os.path.join(project_root, "backend", "models", "fertilizer_prediction"),
        os.path.join(ml_root, "models", "fertilizer_prediction"),
    ]

    for export_dir in export_dirs:
        os.makedirs(export_dir, exist_ok=True)
        joblib.dump(pipeline, os.path.join(export_dir, "fertilizer_pipeline.pkl"), compress=3)
        joblib.dump(label_encoder, os.path.join(export_dir, "label_encoder.pkl"))
        joblib.dump(num_cols + cat_cols, os.path.join(export_dir, "feature_names.pkl"))
        with open(os.path.join(export_dir, "metadata.json"), "w", encoding="utf-8") as f:
            json.dump(metadata, f, indent=4)
        print(f"[+] Exported fertilizer model artifacts to: {export_dir}")

    print("[SUCCESS] Fertilizer Model Training & Export Completed Successfully!")

if __name__ == "__main__":
    train()
