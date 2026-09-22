'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ArrowLeft, KeyRound, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { resetPasswordSchema, type ResetPasswordFormData } from '@/schemas/reset-password-schema';
import { resetPassword } from '@/services/auth-service';

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  async function onSubmit(data: ResetPasswordFormData) {
    if (!token) {
      setServerError('Link de recuperação inválido.');
      return;
    }

    try {
      setServerError('');

      await resetPassword(token, data.password);

      setSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message ?? 'Não foi possível redefinir sua senha.';

        setServerError(message);
        return;
      }

      setServerError('Não foi possível redefinir sua senha.');
    }
  }

  if (success) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Senha redefinida</CardTitle>

          <CardDescription>Sua senha foi alterada com sucesso.</CardDescription>
        </CardHeader>

        <CardContent>
          <Button className="w-full">
            <Link href="/login">Ir para o login</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Redefinir senha</CardTitle>

        <CardDescription>
          Digite sua nova senha para recuperar o acesso à sua conta.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="password">Nova senha</Label>

            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar nova senha</Label>

            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="pl-9"
                {...register('confirmPassword')}
              />
            </div>

            {errors.confirmPassword && (
              <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>

          {serverError && (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {serverError}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}

            {isSubmitting ? 'Redefinindo...' : 'Redefinir senha'}
          </Button>

          <Button type="button" variant="ghost" className="w-full">
            <Link href="/login">
              <ArrowLeft className="size-4" />
              Voltar para o login
            </Link>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
