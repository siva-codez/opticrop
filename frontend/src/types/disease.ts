export interface AlternativePrediction {
  disease: string;
  confidence: number;
}

export interface RecoveryMilestone {
  phase: string;
  timeline: string;
  action: string;
}

export interface DiseasePredictionResponse {
  plant: string;
  disease: string;
  common_name?: string;
  pathogen?: string;
  pathogen_type?: string;
  confidence: number;
  severity: string;
  spread_risk?: string;
  spread_risk_score?: number;
  symptoms: string[];
  immediate_actions?: string[];
  recommended_action: string[];
  products?: string[];
  organic_remedies?: string[];
  chemical_remedies?: string[];
  prevention: string[];
  resistant_varieties?: string[];
  recovery_milestones?: RecoveryMilestone[];
  top_predictions?: AlternativePrediction[];
  ai_solution?: string;
  model_source?: string;
  disclaimer: string;
}

export interface DiseaseResult {
  diseaseName: string;
  confidence: number;
  treatment: string[];
  prevention: string[];
}
