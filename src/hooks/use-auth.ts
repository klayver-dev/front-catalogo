'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getMe } from '@/services/auth-service';
import type { User } from '@/types/auth';

export function useAuth() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getMe();

        setUser(currentUser);
      } catch {
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [router]);

  return {
    user,
    loading,
  };
}
