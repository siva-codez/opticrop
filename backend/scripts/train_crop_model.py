"""
OptiCrop Machine Learning Pipeline
Crop Recommendation Model Training Script
"""

import os
import json
import joblib
import pandas as pd
import numpy as np
from datetime import datetime

from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, f1_score, precision_score, recall_score

def train():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    ml_root = os.path.dirname(script_dir)
    project_root = os.path.dirname(ml_root)

    dataset_path = os.path.join(ml_root, "datasets", "Crop_recommendation.csv")
    if not os.path.exists(dataset_path):
        raise FileNotFoundError(f"Dataset not found at {dataset_path}")

    print(f"[*] Loading dataset from: {dataset_path}")
    df = pd.read_csv(dataset_path)
    
    # Standardize column names to lowercase
    df.columns = [c.strip().lower() for c in df.columns]
    
    feature_cols = ["n", "p", "k", "temperature", "humidity", "ph", "rainfall"]
    target_col = "label"

    X = df[feature_cols]
    y_raw = df[target_col].str.strip().str.lower()

    # Encode labels
    label_encoder = LabelEncoder()
    y = label_encoder.fit_transform(y_raw)
    classes = list(label_encoder.classes_)

    print(f"[*] Total samples: {len(df)}, Classes ({len(classes)}): {classes[:5]}...")

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )

    # Preprocessing with ColumnTransformer
    preprocessor = ColumnTransformer(
        transformers=[
            ("num", StandardScaler(), feature_cols),
        ],
        remainder="passthrough"
    )

    # Classifier
    classifier = RandomForestClassifier(
        n_estimators=120,
        max_depth=18,
        min_samples_split=6,
        random_state=42,
        n_jobs=-1
    )

    # Pipeline
    pipeline = Pipeline(steps=[
        ("preprocessor", preprocessor),
        ("classifier", classifier)
    ])

    print("[*] Training Random Forest Pipeline...")
    pipeline.fit(X_train, y_train)

    # Evaluate
    y_pred = pipeline.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred, average="weighted")
    rec = recall_score(y_test, y_pred, average="weighted")
    f1 = f1_score(y_test, y_pred, average="weighted")

    cv_scores = cross_val_score(pipeline, X, y, cv=5)
    cv_mean = float(cv_scores.mean())
    cv_std = float(cv_scores.std())

    print(f"[+] Test Accuracy: {acc * 100:.2f}%")
    print(f"[+] 5-Fold CV Mean Accuracy: {cv_mean * 100:.2f}% (+/- {cv_std * 100:.2f}%)")

    # Metadata
    import sklearn
    metadata = {
        "model_name": "OptiCrop Crop Recommendation Model",
        "algorithm": "Random Forest",
        "dataset_name": "Crop_recommendation.csv",
        "training_samples": len(X_train),
        "testing_samples": len(X_test),
        "number_of_features": len(feature_cols),
        "features": feature_cols,
        "target": target_col,
        "classes": classes,
        "accuracy": round(float(acc), 4),
        "precision": round(float(prec), 4),
        "recall": round(float(rec), 4),
        "f1_score": round(float(f1), 4),
        "cv_mean": round(cv_mean, 4),
        "cv_std": round(cv_std, 4),
        "random_state": 42,
        "training_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "sklearn_version": sklearn.__version__,
        "python_version": os.sys.version.split()[0]
    }

    export_dirs = [
        os.path.join(project_root, "backend", "models", "crop_prediction"),
        os.path.join(ml_root, "models", "crop_prediction"),
    ]

    for export_dir in export_dirs:
        os.makedirs(export_dir, exist_ok=True)
        joblib.dump(pipeline, os.path.join(export_dir, "crop_pipeline.pkl"))
        joblib.dump(label_encoder, os.path.join(export_dir, "label_encoder.pkl"))
        joblib.dump(feature_cols, os.path.join(export_dir, "feature_names.pkl"))
        with open(os.path.join(export_dir, "metadata.json"), "w", encoding="utf-8") as f:
            json.dump(metadata, f, indent=4)
        print(f"[+] Exported model artifacts to: {export_dir}")

    print("[SUCCESS] Model Training & Export Completed Successfully!")

if __name__ == "__main__":
    train()
