import { FLIGHTS_PAGE_SIZE } from '@/features/flights/api/useFlights';

/** Loading placeholder for the initial flight page — one block per upcoming card. */
export function FlightListSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-hidden>
      {Array.from({ length: FLIGHTS_PAGE_SIZE }).map((_, index) => (
        <div key={index} className="h-44 animate-pulse rounded-2xl bg-muted" />
      ))}
    </div>
  );
}
