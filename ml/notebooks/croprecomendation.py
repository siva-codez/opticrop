# ==========================================================
# AI Crop Recommendation System
# Machine Learning Model Training
# ==========================================================

# ===========================
# Import Libraries
# ===========================

import os
import joblib
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

# ==========================================================
# Load Dataset
# ==========================================================

print("=" * 60)
print("Loading Dataset...")
print("=" * 60)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

dataset_path = os.path.join(BASE_DIR, "..", "dataset", "Crop_recommendation.csv")

df = pd.read_csv(dataset_path)
df = pd.read_csv(dataset_path)

print("Dataset Loaded Successfully")
print(df.head())

# ==========================================================
# Features and Target
# ==========================================================

X = df.drop("label", axis=1)

y = df["label"]

print("\nFeature Shape :", X.shape)
print("Target Shape :", y.shape)

# ==========================================================
# Train Test Split
# ==========================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print("\nTraining Samples :", X_train.shape[0])
print("Testing Samples :", X_test.shape[0])

# ==========================================================
# Feature Scaling
# ==========================================================

scaler = StandardScaler()

X_train_scaled = scaler.fit_transform(X_train)

X_test_scaled = scaler.transform(X_test)

# ==========================================================
# Machine Learning Models
# ==========================================================

models = {

    "Logistic Regression":
        LogisticRegression(max_iter=1000),

    "Decision Tree":
        DecisionTreeClassifier(random_state=42),

    "Random Forest":
        RandomForestClassifier(
            n_estimators=200,
            random_state=42
        ),

    "KNN":
        KNeighborsClassifier(n_neighbors=5)

}

results = {}

best_model = None
best_model_name = ""
best_accuracy = 0

print("\n")
print("=" * 60)
print("TRAINING MODELS")
print("=" * 60)

# ==========================================================
# Train Models
# ==========================================================

for name, model in models.items():

    print("\n")
    print("=" * 50)
    print(name)
    print("=" * 50)

    if name in ["Logistic Regression", "KNN"]:

        model.fit(X_train_scaled, y_train)

        predictions = model.predict(X_test_scaled)

    else:

        model.fit(X_train, y_train)

        predictions = model.predict(X_test)

    accuracy = accuracy_score(y_test, predictions)

    results[name] = accuracy

    print("Accuracy :", round(accuracy * 100, 2), "%")

    print("\nClassification Report")

    print(classification_report(y_test, predictions))

    if accuracy > best_accuracy:

        best_accuracy = accuracy

        best_model = model

        best_model_name = name

# ==========================================================
# Model Comparison
# ==========================================================

print("\n")
print("=" * 60)
print("MODEL COMPARISON")
print("=" * 60)

for model, score in results.items():

    print(f"{model:<25} : {score*100:.2f}%")

# ==========================================================
# Best Model
# ==========================================================

print("\n")
print("=" * 60)

print("BEST MODEL :", best_model_name)

print("BEST ACCURACY :", round(best_accuracy * 100, 2), "%")

print("=" * 60)

# ==========================================================
# Save Model
# ==========================================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

save_folder = os.path.join(BASE_DIR, "saved_model")

os.makedirs(save_folder, exist_ok=True)

os.makedirs(save_folder, exist_ok=True)

joblib.dump(
    best_model,
    os.path.join(save_folder, "crop_model.pkl")
)

joblib.dump(
    scaler,
    os.path.join(save_folder, "scaler.pkl")
)

print("\nModel Saved Successfully")

# ==========================================================
# Confusion Matrix
# ==========================================================

if best_model_name in ["Logistic Regression", "KNN"]:

    y_pred = best_model.predict(X_test_scaled)

else:

    y_pred = best_model.predict(X_test)

cm = confusion_matrix(y_test, y_pred)

plt.figure(figsize=(12, 10))

sns.heatmap(
    cm,
    cmap="Blues",
    fmt="d"
)

plt.title("Confusion Matrix")

plt.xlabel("Predicted")

plt.ylabel("Actual")

plt.tight_layout()

plt.savefig("D:\opticrop\ml\datasets\Crop_recommendation.csv ")

#plt.show()

# ==========================================================
# Feature Importance
# ==========================================================

if best_model_name == "Random Forest":

    importance = pd.DataFrame({

        "Feature": X.columns,

        "Importance": best_model.feature_importances_

    })

    importance = importance.sort_values(
        by="Importance",
        ascending=False
    )

    print("\nFeature Importance")

    print(importance)

    plt.figure(figsize=(10,6))

    sns.barplot(
        data=importance,
        x="Importance",
        y="Feature"
    )

    plt.title("Feature Importance")

    plt.tight_layout()

    plt.savefig("D:\opticrop\ml\datasets\Crop_recommendation.csv")

    #plt.show()

# ==========================================================
# Sample Prediction
# ==========================================================

print("\n")
print("=" * 60)
print("SAMPLE PREDICTION")
print("=" * 60)

sample = [[90,42,43,20.8,82.0,6.5,202]]

if best_model_name in ["Logistic Regression", "KNN"]:

    sample = scaler.transform(sample)

prediction = best_model.predict(sample)

probability = best_model.predict_proba(sample)

print("Recommended Crop :", prediction[0])

print("Confidence :", round(probability.max()*100,2), "%")

print("\nTraining Completed Successfully")

print("=" * 60)