'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2, LockKeyhole, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { loginSchema, type LoginFormData } from '@/schemas/auth-schema';
import { login } from '@/services/auth-service';

export function LoginForm() {
  const router = useRouter();

  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    try {
      setServerError('');

      await login(data);

      router.push('/admin');
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message ?? 'E-mail ou senha inválidos.';

        setServerError(message);
        return;
      }

      setServerError('Não foi possível realizar o login.');
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Entrar no painel</CardTitle>

        <CardDescription>
          Entre com suas credenciais para acessar o painel administrativo.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="pl-9"
                {...register('email')}
              />
            </div>

            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>

            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-9"
                {...register('password')}
              />
            </div>

            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          {serverError && (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {serverError}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}

            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
