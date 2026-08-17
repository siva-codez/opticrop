import apiClient from './client';
import type { IrrigationRequest, IrrigationResponse } from '../types/irrigation';

export const getRecommendation = async (data: IrrigationRequest): Promise<IrrigationResponse> => {
  const response = await apiClient.post('/irrigation/recommend', data);
  return response.data;
};
