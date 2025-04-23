// Tipos para requisição de login
export interface LoginRequest {
  email: string;
  password: string;
}

// Tipos para resposta de login
export interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  token_type?: string;
  expires_in?: number;
}
