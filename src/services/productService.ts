import api from '../lib/api';
import { Product, ProductList } from '../types';

export interface GetProductsParams {
  page?: number;
  limit?: number;
  orderBy?: string;
  searchTerm?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

// Obtém a lista de produtos
export const getProductsService = async (params: GetProductsParams = {}) => {
  try {
    const response = await api.get<ProductList>('/products', {
      params,
    });

    // Garante que o retorno sempre tenha o formato esperado
    if (!response.data) {
      return {
        data: [],
        meta: {
          total: 0,
          pagination: {
            total: 0,
            current: 1,
            pageSize: 10,
          },
        },
      };
    }

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};

// Obtém um produto pelo ID
export const getProductByIdService = async (id: string) => {
  try {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar produto ${id}:`, error);
    throw error;
  }
};

// Cria um novo produto
export const createProductService = async (productData: Partial<Product>) => {
  try {
    const response = await api.post<Product>('/products', productData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    throw error;
  }
};

// Atualiza um produto existente
export const updateProductService = async (id: string, productData: Partial<Product>) => {
  try {
    const response = await api.put<Product>(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar produto ${id}:`, error);
    throw error;
  }
};

// Remove um produto pelo ID
export const deleteProductService = async (id: string) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao excluir produto ${id}:`, error);
    throw error;
  }
};
