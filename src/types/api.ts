import { AxiosResponse } from 'axios';

// Estende o tipo de resposta do Axios para incluir a propriedade success
export interface ApiResponse<T = any> extends AxiosResponse<T> {
  success: boolean;
}

// Tipo para paginação
export interface PaginatedResponse<T> {
  data: T[];
  totalPages: number;
  totalResults: number;
}
