import apiClient from './client';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth';

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/register', data);
  return response.data;
};

export const refreshToken = async (): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/refresh');
  return response.data;
};

export const getMe = async () => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};
