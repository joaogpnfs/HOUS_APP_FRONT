import { useEffect, useRef } from 'react';
import api from '../lib/api';

/**
 * Hook para tratar erros de autenticação e outros erros da API
 * @param onLogout Função que será chamada quando ocorrer um erro de autenticação
 */
export const useApiErrorHandler = (onLogout?: () => void) => {
  const unauthorizedErrorShown = useRef(false);

  useEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status;

        // Caso seja erro de autenticação
        if (status === 401 && !unauthorizedErrorShown.current) {
          unauthorizedErrorShown.current = true;

          // Alerta o usuário
          console.error('Sessão expirada. Por favor, faça login novamente.');

          // Chama a função de logout se fornecida
          if (onLogout) {
            onLogout();
          }
        }

        return Promise.reject(error);
      },
    );

    // Limpeza do interceptor quando o componente for desmontado
    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [onLogout]);
};
