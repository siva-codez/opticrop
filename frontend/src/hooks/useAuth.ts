import { useState } from 'react';
import { isAuthenticated as checkAuth, removeToken } from '../services/authService';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());
  const [user, setUser] = useState(null); // Stub

  const login = () => {
    // Stub
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  const register = () => {
    // Stub
  };

  return { user, isAuthenticated, login, logout, register };
};
