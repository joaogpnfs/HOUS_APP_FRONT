import api from '../lib/api';
import {
  User,
  UserCreateRequest,
  UserUpdateRequest,
  GetUsersProps,
  PaginatedResponse,
} from '../types';

export const getUsersService = async ({
  page = 1,
  limit = 10,
  orderBy = 'desc',
  searchTerm,
  role,
}: GetUsersProps = {}) => {
  try {
    const response = await api.get<PaginatedResponse<User>>('/users', {
      params: {
        page,
        limit,
        orderBy,
        searchTerm,
        ...(role && { role }),
      },
    });

    if (!response || !response.data) {
      return {
        data: [],
        totalPages: 0,
        totalResults: 0,
      };
    }

    const responseData = response.data;

    // Garante que a resposta siga o formato esperado
    if (Array.isArray(responseData)) {
      return {
        data: responseData,
        totalPages: 1,
        totalResults: responseData.length,
      };
    }

    if (responseData.data !== undefined) {
      return {
        data: responseData.data,
        totalPages: responseData.totalPages,
        totalResults: responseData.totalResults,
      };
    }

    return {
      data: [],
      totalPages: 0,
      totalResults: 0,
    };
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

/**
 * Busca informações do usuário autenticado
 */
export const getUserProfileService = async () => {
  try {
    const response = await api.get<User>('/users/me');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    throw error;
  }
};

/**
 * Busca um usuário pelo ID
 */
export const getUserByIdService = async (id: string | number) => {
  try {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar usuário ${id}:`, error);
    throw error;
  }
};

/**
 * Cria um novo usuário
 */
export const createUserService = async (userData: UserCreateRequest) => {
  try {
    const response = await api.post<User>('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
};

/**
 * Atualiza dados de um usuário
 */
export const updateUserService = async (
  id: string | number,
  userData: UserUpdateRequest,
) => {
  try {
    const response = await api.put<User>(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar usuário ${id}:`, error);
    throw error;
  }
};

/**
 * Remove um usuário
 */
export const deleteUserService = async (id: string | number) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao excluir usuário ${id}:`, error);
    throw error;
  }
};
