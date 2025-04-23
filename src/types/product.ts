export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  stock?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductList {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}
