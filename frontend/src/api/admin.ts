import apiClient from './client';
import type { AdminAnalytics, AdminUser } from '../types/admin';

export const getAnalytics = async (): Promise<AdminAnalytics> => {
  const response = await apiClient.get('/admin/analytics');
  return response.data;
};

export const getUsers = async (): Promise<AdminUser[]> => {
  const response = await apiClient.get('/admin/users');
  return response.data;
};

export const getPredictions = async () => {
  const response = await apiClient.get('/admin/predictions');
  return response.data;
};
