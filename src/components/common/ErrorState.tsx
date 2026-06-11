import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getErrorMessage } from '@/lib/api-error';

type ErrorStateProps = {
  /** Any thrown value; normalized to a readable message via `getErrorMessage`. */
  error?: unknown;
  /** Optional heading shown above the message. */
  title?: string;
  /** When provided, renders a retry button wired to this handler. */
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
};

/**
 * Inline error panel for failed page/section loads — the non-modal counterpart
 * to {@link ErrorDialog}. Drop it in any `isError` branch with an optional
 * `onRetry` to surface a "Try again" action.`.
 */
export function ErrorState({
  error,
  title,
  onRetry,
  retryLabel = 'Try again',
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center',
        className
      )}
    >
      {title ? <h2 className="text-sm font-semibold text-destructive">{title}</h2> : null}
      <p className={cn('text-sm text-destructive', title && 'mt-1')}>{getErrorMessage(error)}</p>
      {onRetry ? (
        <Button variant="outline" className="mt-4" onClick={onRetry}>
          {retryLabel}
        </Button>
      ) : null}
    </div>
  );
}
