import { Plane } from 'lucide-react';

import { ErrorDialog } from '@/components/common/ErrorDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLogin } from '@/features/auth/api/useLogin';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { getErrorMessage } from '@/lib/api-error';

export function LoginPage() {
  const { mutate, isPending, isError, error, reset } = useLogin();

  return (
    <main className="flex min-h-svh items-center justify-center overflow-hidden bg-muted px-4 py-10">
      <Card className="relative z-10 w-full max-w-sm animate-in duration-500 zoom-in-95 fade-in">
        <CardHeader className="justify-items-center text-center">
          <div
            className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary
              text-primary-foreground shadow-sm"
          >
            <Plane className="size-6" />
          </div>
          <CardTitle className="text-2xl tracking-tight">Welcome back</CardTitle>
          <CardDescription>Sign in to your GRAPH flight dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmit={mutate} isPending={isPending} />
        </CardContent>
      </Card>

      <ErrorDialog
        open={isError}
        onClose={reset}
        title="Login failed"
        description={getErrorMessage(error, 'Unable to sign in. Please try again.')}
      />
    </main>
  );
}
