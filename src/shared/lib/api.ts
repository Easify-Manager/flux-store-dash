import {
  Product,
  ProductCreateDto,
  ApiResponse,
  PaginatedResponse,
  SearchParams,
  PaginationParams,
  Inventory,
} from "@/shared/types";

// Dummy API base URL - Update this when your actual backend is ready
// You can also set VITE_API_BASE_URL in your .env file
const API_BASE_URL = "http://localhost:8080";

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
}

// Helper function to build query string
function buildQueryString(params: PaginationParams | SearchParams): string {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });
  return query.toString();
}

// Product Management API
export const productApi = {
  // Create product
  create: async (productData: ProductCreateDto): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    const result = await handleResponse<Product>(response);
    return result.data;
  },

  // Update product
  update: async (
    id: number,
    productData: ProductCreateDto
  ): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    const result = await handleResponse<Product>(response);
    return result.data;
  },

  // Get product by ID
  getById: async (id: number): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
    const result = await handleResponse<Product>(response);
    return result.data;
  },

  // Get product by SKU
  getBySku: async (sku: string): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/api/products/sku/${sku}`);
    const result = await handleResponse<Product>(response);
    return result.data;
  },

  // Get all products (paginated)
  getAll: async (
    params?: PaginationParams
  ): Promise<PaginatedResponse<Product>> => {
    const queryString = params ? buildQueryString(params) : "";
    const url = `${API_BASE_URL}/api/products${
      queryString ? `?${queryString}` : ""
    }`;
    const response = await fetch(url);
    const result = await handleResponse<PaginatedResponse<Product>>(response);
    return result.data;
  },

  // Get active products
  getActive: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/api/products/active`);
    const result = await handleResponse<Product[]>(response);
    return result.data;
  },

  // Get products by category
  getByCategory: async (categoryId: number): Promise<Product[]> => {
    const response = await fetch(
      `${API_BASE_URL}/api/products/category/${categoryId}`
    );
    const result = await handleResponse<Product[]>(response);
    return result.data;
  },

  // Get featured products
  getFeatured: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/api/products/featured`);
    const result = await handleResponse<Product[]>(response);
    return result.data;
  },

  // Search products
  search: async (params: SearchParams): Promise<PaginatedResponse<Product>> => {
    const queryString = buildQueryString(params);
    const response = await fetch(
      `${API_BASE_URL}/api/products/search?${queryString}`
    );
    const result = await handleResponse<PaginatedResponse<Product>>(response);
    return result.data;
  },

  // Get low stock products
  getLowStock: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/api/products/low-stock`);
    const result = await handleResponse<Product[]>(response);
    return result.data;
  },

  // Get out of stock products
  getOutOfStock: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/api/products/out-of-stock`);
    const result = await handleResponse<Product[]>(response);
    return result.data;
  },

  // Add product image
  addImage: async (
    productId: number,
    file: File,
    altText?: string,
    isPrimary?: boolean
  ): Promise<Product> => {
    const formData = new FormData();
    formData.append("file", file);
    if (altText) formData.append("altText", altText);
    if (isPrimary !== undefined)
      formData.append("isPrimary", String(isPrimary));

    const response = await fetch(
      `${API_BASE_URL}/api/products/${productId}/images`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await handleResponse<Product>(response);
    return result.data;
  },

  // Delete product image
  deleteImage: async (productId: number, imageId: number): Promise<void> => {
    const response = await fetch(
      `${API_BASE_URL}/api/products/${productId}/images/${imageId}`,
      { method: "DELETE" }
    );
    await handleResponse<null>(response);
  },

  // Delete product (soft delete)
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: "DELETE",
    });
    await handleResponse<null>(response);
  },
};

// AI Agent API (read-only, optimized for AI consumption)
export const agentApi = {
  // Health check
  healthCheck: async (): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/api/agent/health`);
    const result = await handleResponse<string>(response);
    return result.data;
  },

  // Get available products
  getProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/api/agent/products`);
    const result = await handleResponse<Product[]>(response);
    return result.data;
  },

  // Get product by ID
  getProductById: async (id: number): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/api/agent/products/${id}`);
    const result = await handleResponse<Product>(response);
    return result.data;
  },

  // Get product by SKU
  getProductBySku: async (sku: string): Promise<Product> => {
    const response = await fetch(
      `${API_BASE_URL}/api/agent/products/sku/${sku}`
    );
    const result = await handleResponse<Product>(response);
    return result.data;
  },

  // Search products
  searchProducts: async (params: SearchParams): Promise<Product[]> => {
    const queryString = buildQueryString(params);
    const response = await fetch(
      `${API_BASE_URL}/api/agent/products/search?${queryString}`
    );
    const result = await handleResponse<Product[]>(response);
    return result.data;
  },

  // Get products by category
  getProductsByCategory: async (categoryId: number): Promise<Product[]> => {
    const response = await fetch(
      `${API_BASE_URL}/api/agent/products/category/${categoryId}`
    );
    const result = await handleResponse<Product[]>(response);
    return result.data;
  },

  // Get featured products
  getFeaturedProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/api/agent/products/featured`);
    const result = await handleResponse<Product[]>(response);
    return result.data;
  },

  // Check product inventory
  checkInventory: async (productId: number): Promise<Inventory> => {
    const response = await fetch(
      `${API_BASE_URL}/api/agent/inventory/${productId}`
    );
    const result = await handleResponse<Inventory>(response);
    return result.data;
  },

  // Get low stock products
  getLowStockProducts: async (): Promise<Product[]> => {
    const response = await fetch(
      `${API_BASE_URL}/api/agent/inventory/low-stock`
    );
    const result = await handleResponse<Product[]>(response);
    return result.data;
  },
};

// Export API base URL for reference
export { API_BASE_URL };
