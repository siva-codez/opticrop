import axios from 'axios';
import { Config } from '../constants/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: Config.API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      await AsyncStorage.removeItem('token');
      // Additional redirect logic could go here
    }
    return Promise.reject(error);
  }
);

export default api;
