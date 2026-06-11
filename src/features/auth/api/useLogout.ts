import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

import { api } from '@/lib/api-client';
import { tokenAtom } from '@/features/auth/state/auth';

export function useLogout() {
  const setToken = useSetAtom(tokenAtom);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.post('/logout');
    },
    // Clear the local session regardless of outcome
    onSettled: () => {
      setToken(null);
      queryClient.clear();
      navigate('/login', { replace: true });
    },
  });
}
