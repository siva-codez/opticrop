export interface Report {
  id: string;
  title: string;
  date: string;
  content: string;
  type: string;
}

export interface ReportGenerateRequest {
  type: string;
  dateRange: { start: string; end: string };
}
