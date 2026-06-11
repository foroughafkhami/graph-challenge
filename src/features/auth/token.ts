import Cookies from 'js-cookie';

export const AUTH_TOKEN_COOKIE = 'graph_token';

/**
 * The backend returns the token in the response body
 */
const COOKIE_ATTRS: Cookies.CookieAttributes = {
  expires: 7,
  sameSite: 'lax',
  secure: import.meta.env.PROD,
  path: '/',
};

/** Read the raw token outside React (used by the axios request interceptor). */
export function getToken(): string | null {
  return Cookies.get(AUTH_TOKEN_COOKIE) ?? null;
}

/** Remove the token outside React (used by the axios 401 interceptor). */
export function clearToken(): void {
  Cookies.remove(AUTH_TOKEN_COOKIE, { path: COOKIE_ATTRS.path });
}

export const cookieStorage = {
  getItem: (key: string, initialValue: string | null): string | null =>
    Cookies.get(key) ?? initialValue,
  setItem: (key: string, value: string | null): void => {
    if (value == null) Cookies.remove(key, { path: COOKIE_ATTRS.path });
    else Cookies.set(key, value, COOKIE_ATTRS);
  },
  removeItem: (key: string): void => Cookies.remove(key, { path: COOKIE_ATTRS.path }),
};
