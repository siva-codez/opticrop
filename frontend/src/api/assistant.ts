import apiClient from './client';
import type { ChatRequest } from '../types/assistant';

export const sendMessage = async (data: ChatRequest): Promise<string> => {
  const response = await apiClient.post('/assistant/chat', data);
  const result =
    response.data?.data?.response ||
    response.data?.response ||
    response.data?.data?.reply ||
    response.data?.reply ||
    '';
  return result;
};

export const getChatHistory = async () => {
  const response = await apiClient.get('/assistant/history');
  return response.data?.data || response.data || [];
};

export const clearChatHistory = async () => {
  const response = await apiClient.delete('/assistant/history');
  return response.data;
};
