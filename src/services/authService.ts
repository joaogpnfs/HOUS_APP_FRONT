import api, { setAuthToken, removeAuthToken } from '../lib/api';
import { LoginResponse } from '../types/auth';

// Realiza login do usuário
export const loginService = async (email: string, password: string) => {
  try {
    const response = await api.post<LoginResponse>('/login/access-token', {
      email,
      password,
    });

    if (response.data?.access_token) {
      await setAuthToken(response.data.access_token);
    }

    return response;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

// Verifica se o token atual é válido
export const validateTokenService = async () => {
  try {
    return await api.post('/login/test-token');
  } catch (error) {
    console.error('Erro ao validar token:', error);
    throw error;
  }
};

// Realiza logout do usuário
export const logoutService = async (): Promise<boolean> => {
  return await removeAuthToken();
};
