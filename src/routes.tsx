import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ProtectedRoute, RedirectIfAuthenticated } from '@/app/guards';
import { DashboardPage } from '@/pages/DashboardPage';
import { LoginPage } from '@/pages/LoginPage';

export const router = createBrowserRouter([
  // Public-only: signed-in users are redirected away from /login.
  {
    element: <RedirectIfAuthenticated />,
    children: [{ path: '/login', element: <LoginPage /> }],
  },
  // Protected: redirected to /login when unauthenticated.
  {
    element: <ProtectedRoute />,
    children: [{ path: '/', element: <DashboardPage /> }],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
