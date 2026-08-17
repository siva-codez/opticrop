import api from './api';

export const diseaseService = {
  predictDisease: async (formData: FormData) => {
    const response = await api.post('/disease/predict', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  getDiseaseHistory: async () => {
    const response = await api.get('/disease/history');
    return response.data;
  }
};
