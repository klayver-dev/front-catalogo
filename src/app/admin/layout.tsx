'use client';

import { useAuth } from '@/hooks/use-auth';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">Carregando painel...</p>
      </div>
    );
  }

  return <div className="min-h-screen bg-background">{children}</div>;
}
