import { api } from '@/lib/api';
import type { LoginFormData } from '@/schemas/auth-schema';
import type { User } from '@/types/auth';

export async function login(data: LoginFormData) {
  const response = await api.post('/auth/login', data);

  return response.data;
}

export async function getMe() {
  const response = await api.get<User>('/auth/me');

  return response.data;
}

export async function logout() {
  const response = await api.post('/auth/logout');

  return response.data;
}

export async function forgotPassword(email: string) {
  const response = await api.post('/auth/forgot-password', {
    email,
  });

  return response.data;
}

export async function resetPassword(token: string, password: string) {
  const response = await api.post('/auth/reset-password', {
    token,
    password,
  });

  return response.data;
}
