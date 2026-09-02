import apiClient from './client';
import type { WeatherData, DailyForecast } from '../types/weather';

export const getWeather = async (location: string): Promise<WeatherData> => {
  const response = await apiClient.get(`/weather?location=${encodeURIComponent(location)}`);
  return response.data?.data || response.data;
};

export const getWeatherByCoords = async (lat: number, lon: number, locationName?: string): Promise<WeatherData> => {
  const params = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
  });
  if (locationName) {
    params.append('location', locationName);
  }
  const response = await apiClient.get(`/weather/coords?${params.toString()}`);
  return response.data?.data || response.data;
};

export const getWeatherForecast = async (location: string): Promise<DailyForecast[]> => {
  const response = await apiClient.get(`/weather/forecast?location=${encodeURIComponent(location)}`);
  return response.data?.data || response.data;
};
