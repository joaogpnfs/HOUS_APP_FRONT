// Interface para o modelo de usuário
export interface User {
  id: number | string;
  name: string;
  email: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
  avatar?: string;
}

// Interface para criação de usuário
export interface UserCreateRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
}

// Interface para atualização de usuário
export interface UserUpdateRequest {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

// Propriedades para filtrar usuários
export interface GetUsersProps {
  page?: number;
  limit?: number;
  orderBy?: 'asc' | 'desc';
  searchTerm?: string;
  role?: string;
}
