import api from './api';

export const assistantService = {
  sendMessage: async (message: string) => {
    const response = await api.post('/assistant/message', { message });
    return response.data;
  },
  getChatHistory: async () => {
    const response = await api.get('/assistant/history');
    return response.data;
  },
  clearHistory: async () => {
    const response = await api.delete('/assistant/history');
    return response.data;
  }
};
