'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getMe } from '@/services/auth-service';

export function useGuest() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        await getMe();

        router.replace('/admin');
      } catch {
        setLoading(false);
      }
    }

    checkAuthentication();
  }, [router]);

  return {
    loading,
  };
}
