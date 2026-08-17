import api from './api';

export const weatherService = {
  getWeather: async (lat: number, lon: number) => {
    const response = await api.get('/weather/current', { params: { lat, lon } });
    return response.data;
  },
  getForecast: async (lat: number, lon: number) => {
    const response = await api.get('/weather/forecast', { params: { lat, lon } });
    return response.data;
  }
};
