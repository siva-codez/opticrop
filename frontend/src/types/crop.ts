export interface CropPredictionRequest {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
  season?: string;
  location?: string;
  soil_type?: string;
}

export interface CropRecommendationItem {
  crop: string;
  confidence: number;
  emoji: string;
  reasons: string[];
  npk_compatibility: number;
  temp_compatibility: number;
  rainfall_compatibility: number;
  ph_compatibility: number;
  season_compatibility: number;
  description: string;
  yield_estimate: string;
}

export interface CropPredictionResponse {
  top_recommendations: CropRecommendationItem[];
  model_name?: string;
  accuracy?: number;
}
