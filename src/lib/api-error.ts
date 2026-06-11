import axios from 'axios';

/** Best-effort human-readable message from an unknown thrown value. */
export function getErrorMessage(
  error: unknown,
  fallback = 'Something went wrong. Please try again.'
): string {
  if (axios.isAxiosError(error)) {
    const result = (error.response?.data as { result?: string } | undefined)?.result;
    return result ?? error.message ?? fallback;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}
