import { Button } from '@/components/ui/button';
import { ErrorState } from '@/components/common/ErrorState';
import { FlightCard } from '@/features/flights/components/FlightCard';
import { FlightListSkeleton } from '@/features/flights/components/FlightList.skeleton';
import { FLIGHTS_PAGE_SIZE, useFlights } from '@/features/flights/api/useFlights';

export function DashboardPage() {
  const {
    data,
    error,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFlights();

  if (isLoading) {
    return <FlightListSkeleton />;
  }

  if (isError) {
    return <ErrorState error={error} onRetry={() => refetch()} />;
  }

  const pages = data?.pages ?? [];
  const total = pages[0]?.total ?? 0;
  const flights = pages.flatMap((page, pageIndex) =>
    page.result.map((flight, index) => ({ flight, key: `${pageIndex}-${index}` }))
  );
  const viewed = flights.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Available flights</h2>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          <span className="font-semibold text-foreground">{viewed}</span> / {total} viewed
        </p>
      </div>

      {flights.map(({ flight, key }) => (
        <FlightCard key={key} flight={flight} />
      ))}

      {hasNextPage && (
        <Button
          className="mt-2 self-center"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading…' : `Load ${FLIGHTS_PAGE_SIZE} more`}
        </Button>
      )}
    </div>
  );
}
