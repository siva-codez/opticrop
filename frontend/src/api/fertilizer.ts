import apiClient from './client';
import type { FertilizerRequest, FertilizerResponse } from '../types/fertilizer';

export const getRecommendation = async (data: FertilizerRequest): Promise<FertilizerResponse> => {
  const response = await apiClient.post('/fertilizer/recommend', data);
  return response.data;
};
