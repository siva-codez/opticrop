export interface AdminAnalytics {
  totalUsers: number;
  activeUsers: number;
  predictionsMade: number;
}

export interface AdminUser {
  id: string;
  name: string;
  role: string;
  status: string;
}
