import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { AUTH_TOKEN_COOKIE, cookieStorage } from '@/features/auth/token';

// Source of truth for the session token.
export const tokenAtom = atomWithStorage<string | null>(AUTH_TOKEN_COOKIE, null, cookieStorage, {
  getOnInit: true,
});

/** Derived auth state — read this instead of checking the token directly. */
export const isAuthenticatedAtom = atom((get) => Boolean(get(tokenAtom)));
