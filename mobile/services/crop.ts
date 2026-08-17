import api from './api';

export const cropService = {
  predictCrop: async (data: any) => {
    const response = await api.post('/crops/predict', data);
    return response.data;
  },
  checkSuitability: async (data: any) => {
    const response = await api.post('/crops/suitability', data);
    return response.data;
  },
  getCropHistory: async () => {
    const response = await api.get('/crops/history');
    return response.data;
  }
};
