import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  login: async (credentials: any) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  register: async (data: any) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  logout: async () => {
    await AsyncStorage.removeItem('token');
  },
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  getToken: async () => {
    return await AsyncStorage.getItem('token');
  },
  setToken: async (token: string) => {
    await AsyncStorage.setItem('token', token);
  },
  removeToken: async () => {
    await AsyncStorage.removeItem('token');
  }
};
