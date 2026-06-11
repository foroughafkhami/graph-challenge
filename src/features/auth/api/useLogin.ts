import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

import { publicApi } from '@/lib/api-client';
import { loginResponseSchema, type LoginValues } from '@/features/auth/schema';
import { tokenAtom } from '@/features/auth/state/auth';

async function login(values: LoginValues): Promise<string> {
  const body = new URLSearchParams({
    username: values.username,
    password: values.password,
  });
  const { data } = await publicApi.post('/login', body);
  const parsed = loginResponseSchema.parse(data);

  // Wrong credentials come back as HTTP 200 `{ result: "wrong_pass" }`, so we
  // turn that into a thrown error for React Query / the error modal to surface.
  if (parsed.result !== 'success' || !parsed.token) {
    throw new Error('Username or password is incorrect.');
  }
  return parsed.token;
}

export function useLogin() {
  const setToken = useSetAtom(tokenAtom);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (token) => {
      setToken(token);
      navigate('/', { replace: true });
    },
  });
}
