import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import ErrorBoundary from './components/common/ErrorBoundary';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import CropPrediction from './pages/CropPrediction';
import CropSuitability from './pages/CropSuitability';
import LeafDiagnosis from './pages/LeafDiagnosis';
import Assistant from './pages/Assistant';
import Weather from './pages/Weather';
import Fertilizer from './pages/Fertilizer';
import Irrigation from './pages/Irrigation';
import History from './pages/History';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorBoundary><NotFound /></ErrorBoundary>,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },

      // Auth Routes
      {
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
          { path: 'forgot-password', element: <ForgotPassword /> },
        ],
      },

      // Protected Routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: 'dashboard', element: <Dashboard /> },
              { path: 'crop-prediction', element: <CropPrediction /> },
              { path: 'crop-suitability', element: <CropSuitability /> },
              { path: 'leaf-diagnosis', element: <LeafDiagnosis /> },
              { path: 'assistant', element: <Assistant /> },
              { path: 'weather', element: <Weather /> },
              { path: 'fertilizer', element: <Fertilizer /> },
              { path: 'irrigation', element: <Irrigation /> },
              { path: 'history', element: <History /> },
              { path: 'reports', element: <Reports /> },
              { path: 'profile', element: <Profile /> },
              { path: 'settings', element: <Settings /> },
              { path: 'admin', element: <Admin /> },
            ],
          },
        ],
      },

      // Catch-all
      { path: '*', element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
