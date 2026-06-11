import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import { api } from '@/lib/api-client';
import { authKeys } from '@/features/auth/api/keys';
import { usernameResponseSchema } from '@/features/auth/schema';
import { isAuthenticatedAtom } from '@/features/auth/state/auth';

async function fetchUsername(): Promise<string> {
  const { data } = await api.get('/username');
  return usernameResponseSchema.parse(data).username;
}

export function useUsername() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  return useQuery({
    queryKey: authKeys.username(),
    queryFn: fetchUsername,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });
}
