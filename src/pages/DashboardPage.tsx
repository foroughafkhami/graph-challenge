import { LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useLogout } from '@/features/auth/api/useLogout';
import { useUsername } from '@/features/auth/api/useUsername';

/**
 * Placeholder for the protected dashboard. The flight list and full user menu
 * land in a later task; for now it confirms auth wiring (username + logout).
 */
export function DashboardPage() {
  const { data: username, isLoading } = useUsername();
  const logout = useLogout();

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">
        Signed in as {isLoading ? '…' : (username ?? 'unknown')}
      </p>
      <Button variant="outline" onClick={() => logout.mutate()} disabled={logout.isPending}>
        <LogOut className="size-4" />
        {logout.isPending ? 'Logging out…' : 'Log out'}
      </Button>
    </main>
  );
}
