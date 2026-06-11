import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(3, 'Password must be at least 3 characters'),
});

export type LoginValues = z.infer<typeof loginSchema>;


export const loginResponseSchema = z.object({
  token: z.string().optional(),
  result: z.string(),
});


export const usernameResponseSchema = z.object({
  username: z.string(),
  result: z.string(),
});
