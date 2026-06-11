
import axios from 'axios';

import { clearToken, getToken } from '@/features/auth/token';

/** All requests go through the Vite dev proxy at `/api` (same-origin, CORS-safe). */
const baseURL = '/api';

/**
 * Unauthenticated client — used only for `/login`. It never attaches a token
 * and never redirects on 401, keeping the public path fully separate.
 */
export const publicApi = axios.create({ baseURL });

/**
 * Authenticated client — used for every protected endpoint. It attaches the
 * `Bearer` token and, on a 401, clears the local session and bounces to login.
 */
export const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // The server token is gone or invalid: drop ours and return to login.
      clearToken();
      if (window.location.pathname !== '/login') {
        window.location.assign('/login');
      }
    }
    return Promise.reject(error);
  }
);
