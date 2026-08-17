import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';

interface ProtectedRouteProps {
  isAuthenticated?: boolean; // In a real app, this would come from an auth context/hook
  redirectPath?: string;
}

export function ProtectedRoute({ isAuthenticated = true, redirectPath = '/login' }: ProtectedRouteProps) {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
