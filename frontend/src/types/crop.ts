export interface CropPredictionRequest {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

export interface CropPredictionResponse {
  prediction: string;
  confidence: number;
  alternatives: Array<{ crop: string; confidence: number }>;
}

export interface CropRecommendation {
  cropName: string;
  reason: string;
}

export interface CropSuitabilityRequest {
  crop: string;
  locationData: any; // Placeholder for more specific typing
}

export interface CropSuitabilityResponse {
  isSuitable: boolean;
  score: number;
  details: string;
}
