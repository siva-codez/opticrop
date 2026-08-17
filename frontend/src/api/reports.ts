import apiClient from './client';
import type { Report, ReportGenerateRequest } from '../types/report';

export const generateReport = async (data: ReportGenerateRequest): Promise<Report> => {
  const response = await apiClient.post('/reports/generate', data);
  return response.data;
};

export const getReports = async (): Promise<Report[]> => {
  const response = await apiClient.get('/reports');
  return response.data;
};

export const getReportById = async (id: string): Promise<Report> => {
  const response = await apiClient.get(`/reports/${id}`);
  return response.data;
};
