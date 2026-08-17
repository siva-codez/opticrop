import apiClient from './client';
import type { CropPredictionRequest, CropPredictionResponse, CropSuitabilityRequest, CropSuitabilityResponse } from '../types/crop';

export const predictCrop = async (data: CropPredictionRequest): Promise<CropPredictionResponse> => {
  const response = await apiClient.post('/crop/predict', data);
  return response.data;
};

export const checkSuitability = async (data: CropSuitabilityRequest): Promise<CropSuitabilityResponse> => {
  const response = await apiClient.post('/crop/suitability', data);
  return response.data;
};

export const getCropHistory = async () => {
  const response = await apiClient.get('/crop/history');
  return response.data;
};
