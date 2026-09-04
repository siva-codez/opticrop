import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';

import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import ErrorBoundary from './components/common/ErrorBoundary';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import CropPrediction from './pages/CropPrediction';
import LeafDiagnosis from './pages/LeafDiagnosis';
import Assistant from './pages/Assistant';
import Weather from './pages/Weather';
import Fertilizer from './pages/Fertilizer';
import History from './pages/History';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

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
              { path: 'leaf-diagnosis', element: <LeafDiagnosis /> },
              { path: 'assistant', element: <Assistant /> },
              { path: 'weather', element: <Weather /> },
              { path: 'fertilizer', element: <Fertilizer /> },
              { path: 'history', element: <History /> },
              { path: 'reports', element: <Reports /> },
              { path: 'profile', element: <Profile /> },
              { path: 'settings', element: <Settings /> },
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
  return <RouterProvider router={router} />;
}

export default App;

