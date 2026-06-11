export const flightKeys = {
  all: ['flights'] as const,
  list: (size: number) => [...flightKeys.all, 'list', { size }] as const,
};
