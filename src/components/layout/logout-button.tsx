'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { logout } from '@/services/auth-service';

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await logout();
    } finally {
      router.replace('/login');
      router.refresh();
    }
  }

  return (
    <Button type="button" variant="ghost" onClick={handleLogout}>
      <LogOut className="size-4" />
      Sair
    </Button>
  );
}
