// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

// Paginated response
export interface PaginatedResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: { sorted: boolean };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

// Product Image
export interface ProductImage {
  id: number;
  fileName: string;
  fileUrl: string;
  contentType: string;
  fileSize: number;
  altText?: string;
  displayOrder: number;
  isPrimary: boolean;
  createdAt: string;
}

// Inventory
export interface Inventory {
  id: number;
  productId: number;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  lowStockThreshold: number;
  trackInventory: boolean;
  allowBackorder: boolean;
  inStock: boolean;
  lowStock: boolean;
  updatedAt?: string;
}

// Product (matches backend structure)
export interface Product {
  id: number;
  name: string;
  description?: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  cost?: number;
  categoryId?: number;
  categoryName?: string;
  inventory?: Inventory;
  images: ProductImage[];
  weight?: number;
  weightUnit?: string;
  active: boolean;
  featured: boolean;
  tags?: string;
  createdAt: string;
  updatedAt: string;
}

// Product Create/Update DTO
export interface ProductCreateDto {
  name: string;
  description?: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  cost?: number;
  categoryId?: number;
  quantity: number;
  lowStockThreshold?: number;
  trackInventory?: boolean;
  allowBackorder?: boolean;
  weight?: number;
  weightUnit?: string;
  active?: boolean;
  featured?: boolean;
  tags?: string;
}

// Category
export interface Category {
  id: number;
  name: string;
  description?: string;
  photo?: string;
}

// Sale
export interface Sale {
  id: string;
  productId: number;
  price: number;
  quantity: number;
  createdAt: Date;
}

// Search parameters
export interface SearchParams {
  query: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  size?: number;
}

// Pagination parameters
export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
}
