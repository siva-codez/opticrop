import apiClient from './client';
import type { FertilizerPredictionRequest, FertilizerPredictionResponse } from '../types/fertilizer';

export const getFertilizerPrediction = async (data: FertilizerPredictionRequest): Promise<FertilizerPredictionResponse> => {
  const response = await apiClient.post('/fertilizer/predict', data);
  return response.data?.data || response.data;
};

export const getRecommendation = async (data: FertilizerPredictionRequest): Promise<FertilizerPredictionResponse> => {
  const response = await apiClient.post('/fertilizer/recommend', data);
  return response.data?.data || response.data;
};
