export interface DiseaseResult {
  diseaseName: string;
  confidence: number;
  treatment: string[];
  prevention: string[];
}

export interface DiseasePredictionResponse {
  results: DiseaseResult[];
  imageAnalyzed: boolean;
}
