import apiClient from './client';
import type { DiseasePredictionResponse } from '../types/disease';

export const predictDisease = async (formData: FormData): Promise<DiseasePredictionResponse> => {
  const response = await apiClient.post('/disease/predict', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getDiseaseHistory = async () => {
  const response = await apiClient.get('/disease/history');
  return response.data;
};
