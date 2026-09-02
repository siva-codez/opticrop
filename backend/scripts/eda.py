"""
OptiCrop Machine Learning Pipeline
Exploratory Data Analysis (EDA) Script
"""

import os
import pandas as pd
import numpy as np

def run_eda():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    ml_root = os.path.dirname(script_dir)
    dataset_path = os.path.join(ml_root, "datasets", "Crop_recommendation.csv")

    if not os.path.exists(dataset_path):
        print(f"Dataset not found at {dataset_path}")
        return

    print("=" * 60)
    print("OPTICROP - CROP DATASET EXPLORATORY DATA ANALYSIS")
    print("=" * 60)

    df = pd.read_csv(dataset_path)
    df.columns = [c.strip().lower() for c in df.columns]

    print("\n[+] First 5 Records:")
    print(df.head())

    print("\n[+] Dataset Dimensions:")
    print(f"    Rows: {df.shape[0]}, Columns: {df.shape[1]}")

    print("\n[+] Features:", df.columns.tolist())

    print("\n[+] Missing Values Check:")
    print(df.isnull().sum())

    print("\n[+] Duplicate Records:", df.duplicated().sum())

    print("\n[+] Crop Classes Summary:")
    classes = df["label"].unique()
    print(f"    Total Distinct Crops: {len(classes)}")
    print(f"    Crops: {', '.join(sorted(classes))}")

    print("\n[+] Statistical Summary:")
    print(df.describe().T[["mean", "std", "min", "50%", "max"]])

    print("=" * 60)
    print("EDA COMPLETED SUCCESSFULLY")
    print("=" * 60)

if __name__ == "__main__":
    run_eda()
