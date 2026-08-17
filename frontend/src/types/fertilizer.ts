export interface FertilizerRequest {
  crop: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

export interface FertilizerResponse {
  recommendation: string;
  amount: number;
  unit: string;
}
