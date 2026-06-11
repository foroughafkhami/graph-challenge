import { FlightCard } from '@/features/flights/components/FlightCard';
import { MOCK_FLIGHTS } from '@/features/flights/mock';

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      {MOCK_FLIGHTS.map((flight) => (
        <FlightCard
          key={`${flight.src.iso3}-${flight.dst.iso3}-${flight.src.time}`}
          flight={flight}
        />
      ))}
    </div>
  );
}
