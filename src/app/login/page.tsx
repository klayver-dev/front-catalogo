'use client';

import { LoginForm } from '@/components/forms/login-form';
import { useGuest } from '@/hooks/use-guest';

export default function LoginPage() {
  const { loading } = useGuest();

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
        <p className="text-sm text-muted-foreground">Verificando autenticação...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <LoginForm />
    </main>
  );
}
