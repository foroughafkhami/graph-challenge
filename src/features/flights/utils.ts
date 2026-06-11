/**
 * Presentation helpers for flight data. Times are formatted in UTC so the
 * displayed clock matches the backend payload regardless of the viewer's zone.
 */

function toClock(date: Date): string {
  const hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

/** `"2023-06-12T06:20:00Z"` -> `"6:20"`. */
export function formatClock(iso: string): string {
  return toClock(new Date(iso));
}

/** `"2023-06-12T06:20:00Z"` -> `"June 12"`. */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/** Departure -> arrival span as `"2h 25min"`. */
export function formatDuration(fromIso: string, toIso: string): string {
  const totalMinutes = Math.max(0, Math.round((Date.parse(toIso) - Date.parse(fromIso)) / 60_000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return [hours ? `${hours}h` : null, minutes ? `${minutes}min` : null].filter(Boolean).join(' ');
}

/** Boarding clock = departure minus the boarding lead time (seconds). */
export function formatBoarding(departureIso: string, boardingSeconds: string): string {
  const departureMs = Date.parse(departureIso);
  const leadMs = Number(boardingSeconds) * 1000;
  return toClock(new Date(departureMs - leadMs));
}
