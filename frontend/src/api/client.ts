import axios from 'axios';
import { getToken, removeToken } from '../services/authService';

const defaultApiUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://opticrop-backend.onrender.com' : 'http://localhost:8000');

const apiClient = axios.create({
  baseURL: defaultApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
