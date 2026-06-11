import { LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useLogout } from '@/features/auth/api/useLogout';
import { useUsername } from '@/features/auth/api/useUsername';
import { FlightCard } from '@/features/flights/components/FlightCard';
import { MOCK_FLIGHTS } from '@/features/flights/mock';

/**
 * Protected dashboard. Currently renders the flight ticket UI against mock
 * fixtures; the paginated `/list` query and full user menu land in later tasks.
 */
export function DashboardPage() {
  const { data: username, isLoading } = useUsername();
  const logout = useLogout();

  return (
    <main className="min-h-svh bg-background px-4 py-8">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Flights</h1>
            <p className="text-sm text-muted-foreground">
              Signed in as {isLoading ? '…' : (username ?? 'unknown')}
            </p>
          </div>
          <Button variant="outline" onClick={() => logout.mutate()} disabled={logout.isPending}>
            <LogOut className="size-4" />
            {logout.isPending ? 'Logging out…' : 'Log out'}
          </Button>
        </header>

        <div className="flex flex-col gap-4">
          {MOCK_FLIGHTS.map((flight) => (
            <FlightCard
              key={`${flight.src.iso3}-${flight.dst.iso3}-${flight.src.time}`}
              flight={flight}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
