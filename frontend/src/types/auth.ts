export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  farmSize?: number;
  soilType?: string;
  role: 'user' | 'admin';
}

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface RegisterRequest extends LoginRequest {
  name: string;
  phone?: string;
  location?: string;
  language?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface TokenPayload {
  sub: string;
  exp: number;
}
