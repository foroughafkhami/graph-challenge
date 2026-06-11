import { LogOut } from 'lucide-react';
import { Outlet } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { useLogout } from '@/features/auth/api/useLogout';
import { useUsername } from '@/features/auth/api/useUsername';

/** Shared shell for all authenticated pages. Renders the top nav then the page via <Outlet />. */
export function AppLayout() {
  const { data: username, isLoading } = useUsername();
  const logout = useLogout();

  return (
    <div className="min-h-svh bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-card px-4 py-3 shadow-sm">
        <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-4">
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
        </div>
      </header>

      <main className="px-4 py-8">
        <div className="mx-auto w-full max-w-2xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
