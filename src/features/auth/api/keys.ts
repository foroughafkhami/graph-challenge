export const authKeys = {
  all: ['auth'] as const,
  username: () => [...authKeys.all, 'username'] as const,
};
