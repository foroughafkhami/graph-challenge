import { useAtomValue } from 'jotai';
import { Navigate, Outlet } from 'react-router-dom';

import { isAuthenticatedAtom } from '@/features/auth/state/auth';

/** Wraps protected routes — redirects to /login when unauthenticated. */
export function ProtectedRoute() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

/** Wraps public-only routes (e.g. /login) — sends signed-in users to the app. */
export function RedirectIfAuthenticated() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}
