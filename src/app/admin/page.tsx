'use client';

import { LogoutButton } from '@/components/layout/logout-button';
import { useAuth } from '@/hooks/use-auth';

export default function AdminPage() {
  const { user } = useAuth();

  return (
    <main className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>

          <p className="mt-2 text-muted-foreground">Bem-vindo, {user?.name}.</p>
        </div>

        <LogoutButton />
      </div>
    </main>
  );
}
