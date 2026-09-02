export interface FertilizerPredictionRequest {
  temperature: number;
  humidity: number;
  moisture: number;
  soil_type: string;
  crop_type: string;
  nitrogen: number;
  phosphorous: number;
  potassium: number;
  land_area_acres?: number;
  growth_stage?: string;
}

export interface SplitScheduleItem {
  phase: string;
  percentage: string;
  amount_kg: number;
  action: string;
}

export interface OrganicAlternativeItem {
  name: string;
  rate: string;
  desc: string;
}

export interface AlternativeFertilizerItem {
  fertilizer: string;
  npk_ratio: string;
  confidence: number;
  reason: string;
}

export interface FertilizerPredictionResponse {
  fertilizer_name: string;
  npk_ratio: string;
  category: string;
  confidence: number;
  color?: string;
  bg_color?: string;
  dosage_kg_per_hectare: number;
  dosage_kg_per_acre: number;
  total_recommended_kg: number;
  land_area_acres: number;
  application_method: string;
  application_timing: string;
  key_benefits: string[];
  precautions: string[];
  split_schedule: SplitScheduleItem[];
  organic_alternatives: OrganicAlternativeItem[];
  top_alternatives: AlternativeFertilizerItem[];
  soil_insights: string;
  model_name?: string;
  features_used?: Record<string, any>;
}

// Backward compatibility alias
export type FertilizerRequest = FertilizerPredictionRequest;
export type FertilizerResponse = FertilizerPredictionResponse;
