export interface IrrigationRequest {
  crop: string;
  soilMoisture: number;
  temperature: number;
}

export interface IrrigationResponse {
  schedule: string;
  waterAmount: number;
}
