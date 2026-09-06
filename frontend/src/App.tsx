import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AuthLayout from './layouts/AuthLayout';
import PublicLayout from './layouts/PublicLayout';
import ErrorBoundary from './components/common/ErrorBoundary';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// Marketing & Information Pages
import Home from './pages/Home';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Features from './pages/Features';
import Faq from './pages/Faq';

// Service Pages
import Services from './pages/Services';
import CropPrediction from './pages/CropPrediction';
import LeafDiagnosis from './pages/LeafDiagnosis';
import Fertilizer from './pages/Fertilizer';
import Weather from './pages/Weather';
import Assistant from './pages/Assistant';
import FarmAdvisory from './pages/FarmAdvisory';

// Utility / Legacy Pages
import History from './pages/History';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
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
      // ── Auth Routes ──
      {
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
          { path: 'forgot-password', element: <ForgotPassword /> },
        ],
      },

      // ── Public SaaS Application Shell (Navbar + Content + Footer) ──
      {
        element: <PublicLayout />,
        children: [
          // Home
          { index: true, element: <Home /> },
          { path: 'dashboard', element: <Navigate to="/" replace /> },

          // Services Directory
          { path: 'services', element: <Services /> },

          // Dedicated Service Pages
          { path: 'services/crop-recommendation', element: <CropPrediction /> },
          { path: 'services/disease-diagnosis', element: <LeafDiagnosis /> },
          { path: 'services/fertilizer-recommendation', element: <Fertilizer /> },
          { path: 'services/weather', element: <Weather /> },
          { path: 'services/assistant', element: <Assistant /> },
          { path: 'services/farm-advisory', element: <FarmAdvisory /> },

          // Information Pages
          { path: 'about', element: <About /> },
          { path: 'how-it-works', element: <HowItWorks /> },
          { path: 'features', element: <Features /> },
          { path: 'faq', element: <Faq /> },

          // Backward-compatibility Aliases
          { path: 'crop-prediction', element: <Navigate to="/services/crop-recommendation" replace /> },
          { path: 'leaf-diagnosis', element: <Navigate to="/services/disease-diagnosis" replace /> },
          { path: 'fertilizer', element: <Navigate to="/services/fertilizer-recommendation" replace /> },
          { path: 'weather', element: <Navigate to="/services/weather" replace /> },
          { path: 'assistant', element: <Navigate to="/services/assistant" replace /> },
          { path: 'farm-advisory', element: <Navigate to="/services/farm-advisory" replace /> },

          // Secondary Pages
          { path: 'history', element: <History /> },
          { path: 'reports', element: <Reports /> },
          { path: 'profile', element: <Profile /> },
          { path: 'settings', element: <Settings /> },
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
    </QueryClientProvider>
  );
}

export default App;

