import { useInfiniteQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import { api } from '@/lib/api-client';
import { isAuthenticatedAtom } from '@/features/auth/state/auth';
import { flightKeys } from '@/features/flights/api/keys';
import { flightListResponseSchema, type FlightListResponse } from '@/features/flights/schema';

export const FLIGHTS_PAGE_SIZE = 3;

async function fetchFlights(page: number, size: number): Promise<FlightListResponse> {
  const { data } = await api.get('/list', { params: { page, size } });
  return flightListResponseSchema.parse(data);
}

export function useFlights() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  return useInfiniteQuery({
    queryKey: flightKeys.list(FLIGHTS_PAGE_SIZE),
    queryFn: ({ pageParam }) => fetchFlights(pageParam, FLIGHTS_PAGE_SIZE),
    enabled: isAuthenticated,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const viewed = allPages.reduce((count, page) => count + page.result.length, 0);
      return viewed < lastPage.total ? allPages.length + 1 : undefined;
    },
  });
}
