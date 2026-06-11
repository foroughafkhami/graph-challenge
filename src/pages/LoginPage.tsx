import { Plane } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from '@/features/auth/components/LoginForm';

export function LoginPage() {
  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-muted px-4 py-10">
      {/* Decorative aviation backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 size-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 size-72 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <Card className="relative z-10 w-full max-w-sm duration-500 animate-in fade-in zoom-in-95">
        <CardHeader className="justify-items-center text-center">
          <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Plane className="size-6" />
          </div>
          <CardTitle className="text-2xl tracking-tight">Welcome back</CardTitle>
          <CardDescription>Sign in to your GRAPH flight dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
