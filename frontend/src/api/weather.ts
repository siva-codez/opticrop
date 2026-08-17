import apiClient from './client';
import type { WeatherData, WeatherForecast } from '../types/weather';

export const getWeather = async (location: string): Promise<WeatherData> => {
  const response = await apiClient.get(`/weather/current?location=${location}`);
  return response.data;
};

export const getWeatherForecast = async (location: string): Promise<WeatherForecast[]> => {
  const response = await apiClient.get(`/weather/forecast?location=${location}`);
  return response.data;
};
