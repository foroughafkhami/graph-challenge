import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginSchema, type LoginValues } from '@/features/auth/schema';

type LoginFormProps = {
  onSubmit: (values: LoginValues) => void;
  isPending?: boolean;
};

export function LoginForm({ onSubmit, isPending = false }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  const submit = handleSubmit((values) => onSubmit(values));

  return (
    <form className="flex flex-col gap-5" onSubmit={submit} noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          autoComplete="username"
          placeholder="admin"
          aria-invalid={Boolean(errors.username)}
          {...register('username')}
        />
        {errors.username && (
          <p role="alert" className="text-sm text-destructive">
            {errors.username.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••"
            aria-invalid={Boolean(errors.password)}
            className="pr-10"
            {...register('password')}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            tabIndex={-1}
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </Button>
        </div>
        {errors.password && (
          <p role="alert" className="text-sm text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button type="submit" className="mt-1 w-full" disabled={isPending}>
        {isPending && <Loader2 className="size-4 animate-spin" />}
        {isPending ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  );
}
