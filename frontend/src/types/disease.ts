export interface AlternativePrediction {
  disease: string;
  confidence: number;
}

export interface DiseasePredictionResponse {
  plant: string;
  disease: string;
  common_name?: string;
  pathogen?: string;
  confidence: number;
  severity: string;
  spread_risk?: string;
  spread_risk_score?: number;
  symptoms: string[];
  recommended_action: string[];
  products?: string[];
  prevention: string[];
  top_predictions?: AlternativePrediction[];
  disclaimer: string;
}

export interface DiseaseResult {
  diseaseName: string;
  confidence: number;
  treatment: string[];
  prevention: string[];
}
