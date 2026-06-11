import { createBrowserRouter, Navigate } from 'react-router-dom';

import { LoginPage } from '@/pages/LoginPage';

export const router = createBrowserRouter([
  // Public routes — reachable without authentication.
  { path: '/login', element: <LoginPage /> },

  { path: '*', element: <Navigate to="/login" replace /> },
]);
