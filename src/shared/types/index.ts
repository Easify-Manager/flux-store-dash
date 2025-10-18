export interface Category {
  id: string;
  name: string;
  photo: string;
}

export interface Product {
  id: string;
  name: string;
  photo: string;
  categoryId: string;
  description: string;
  price: number;
  quantity: number;
}

export interface Sale {
  id: string;
  productId: string;
  price: number;
  quantity: number;
  createdAt: Date;
}
