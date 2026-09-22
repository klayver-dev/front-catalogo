'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ArrowLeft, Loader2, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from '@/schemas/forgot-password-schema';
import { forgotPassword } from '@/services/auth-service';

export function ForgotPasswordForm() {
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordFormData) {
    try {
      setServerError('');
      setSuccessMessage('');

      const response = await forgotPassword(data.email);

      setSuccessMessage(response.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ?? 'Não foi possível solicitar a recuperação da senha.';

        setServerError(message);
        return;
      }

      setServerError('Não foi possível solicitar a recuperação da senha.');
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Esqueci minha senha</CardTitle>

        <CardDescription>
          Informe seu e-mail e enviaremos um link para redefinir sua senha.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {successMessage ? (
          <div className="space-y-5">
            <div className="rounded-md border border-green-500/30 bg-green-500/10 px-3 py-3 text-sm">
              {successMessage}
            </div>

            <Button className="w-full">
              <Link href="/login">Voltar para o login</Link>
            </Button>
          </div>
        ) : (
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

            {serverError && (
              <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {serverError}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}

              {isSubmitting ? 'Enviando...' : 'Enviar link de recuperação'}
            </Button>

            <Button aria-activedescendant="" type="button" variant="ghost" className="w-full">
              <Link href="/login">
                <ArrowLeft className="size-4" />
                Voltar para o login
              </Link>
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
