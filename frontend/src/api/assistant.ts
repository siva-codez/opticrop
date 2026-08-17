import apiClient from './client';
import type { ChatRequest, ChatResponse } from '../types/assistant';

export const sendMessage = async (data: ChatRequest): Promise<ChatResponse> => {
  const response = await apiClient.post('/assistant/chat', data);
  return response.data;
};

export const getChatHistory = async () => {
  const response = await apiClient.get('/assistant/history');
  return response.data;
};

export const clearChatHistory = async () => {
  const response = await apiClient.delete('/assistant/history');
  return response.data;
};
