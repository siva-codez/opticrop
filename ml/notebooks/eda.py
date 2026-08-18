# ===========================================
# AI Crop Recommendation System
# Exploratory Data Analysis (EDA)
# ===========================================

# Import Libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Try to import seaborn
try:
    import seaborn as sns
except ImportError:
    print("Seaborn is not installed.")
    print("Run: pip install seaborn")
    exit()

# -----------------------------
# Load Dataset 
# -----------------------------

dataset_path = "D:\opticrop\ml\datasets\Crop_recommendation.csv"

df = pd.read_csv(dataset_path)

print("=" * 60)
print("DATASET LOADED SUCCESSFULLY")
print("=" * 60)

# -----------------------------
# First 5 Rows
# -----------------------------

print("\nFirst Five Records")
print(df.head())

# -----------------------------
# Last 5 Rows
# -----------------------------

print("\nLast Five Records")
print(df.tail())

# -----------------------------
# Shape
# -----------------------------

print("\nDataset Shape")
print(df.shape)

print("\nRows :", df.shape[0])
print("Columns :", df.shape[1])

# -----------------------------
# Column Names
# -----------------------------

print("\nColumn Names")
print(df.columns.tolist())

# -----------------------------
# Data Information
# -----------------------------

print("\nDataset Information")
print(df.info())

# -----------------------------
# Statistical Summary
# -----------------------------

print("\nStatistical Summary")
print(df.describe())

# -----------------------------
# Missing Values
# -----------------------------

print("\nMissing Values")
print(df.isnull().sum())

# -----------------------------
# Duplicate Values
# -----------------------------

print("\nDuplicate Records")
print(df.duplicated().sum())

# -----------------------------
# Unique Crop Names
# -----------------------------

print("\nCrop Classes")
print(df["label"].unique())

print("\nNumber of Crops")
print(df["label"].nunique())

# -----------------------------
# Crop Count
# -----------------------------

print("\nCrop Distribution")
print(df["label"].value_counts())

# =====================================================
# VISUALIZATION
# =====================================================

# ----------------------------------
# Crop Distribution
# ----------------------------------

plt.figure(figsize=(12,6))

sns.countplot(
    data=df,
    x="label",
    order=df["label"].value_counts().index
)

plt.xticks(rotation=90)
plt.title("Crop Distribution")
plt.tight_layout()
plt.show()

# ----------------------------------
# Histograms
# ----------------------------------

features = [
    "N",
    "P",
    "K",
    "temperature",
    "humidity",
    "ph",
    "rainfall"
]

for feature in features:

    plt.figure(figsize=(8,4))

    sns.histplot(
        df[feature],
        bins=20,
        kde=True
    )

    plt.title(f"{feature} Distribution")

    plt.tight_layout()

    plt.show()

# ----------------------------------
# Correlation Heatmap
# ----------------------------------

plt.figure(figsize=(10,8))

sns.heatmap(
    df.drop("label", axis=1).corr(),
    annot=True,
    cmap="coolwarm"
)

plt.title("Correlation Matrix")

plt.tight_layout()

plt.show()

# ----------------------------------
# Boxplot
# ----------------------------------

plt.figure(figsize=(12,6))

sns.boxplot(
    data=df.drop("label", axis=1)
)

plt.xticks(rotation=45)

plt.title("Feature Boxplot")

plt.tight_layout()

plt.show()

# ----------------------------------
# Pairplot
# ----------------------------------

sns.pairplot(
    df,
    hue="label",
    corner=True
)

plt.show()

# ----------------------------------
# Feature & Target
# ----------------------------------

X = df.drop("label", axis=1)

y = df["label"]

print("\nFeature Shape")
print(X.shape)

print("\nTarget Shape")
print(y.shape)

print("\nFeature Sample")
print(X.head())

print("\nTarget Sample")
print(y.head())

# ----------------------------------
# Save Clean Dataset
# ----------------------------------

df.to_csv(
    "D:\opticrop\ml\datasets\Crop_recommendation.csv",
    index=False
)

print("\nClean dataset saved successfully!")

print("=" * 60)
print("EDA COMPLETED SUCCESSFULLY")
print("=" * 60) 