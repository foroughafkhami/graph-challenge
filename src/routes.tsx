import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ProtectedRoute, RedirectIfAuthenticated } from '@/app/guards';
import { AppLayout } from '@/components/common/AppLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { LoginPage } from '@/pages/LoginPage';

export const router = createBrowserRouter([
  // Public-only: signed-in users are redirected away from /login.
  {
    element: <RedirectIfAuthenticated />,
    children: [{ path: '/login', element: <LoginPage /> }],
  },
  // Protected: auth guard → shared layout → page.
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [{ path: '/', element: <DashboardPage /> }],
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
