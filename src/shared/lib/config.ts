/**
 * Application Configuration
 *
 * Update the API_BASE_URL when your backend is ready
 */

// API Configuration
export const config = {
  // Backend API base URL - Update this with your actual backend URL
  apiBaseUrl: "http://localhost:8080",

  // Default pagination settings
  defaultPageSize: 20,

  // File upload settings
  maxImageSize: 5 * 1024 * 1024, // 5MB
  allowedImageTypes: ["image/jpeg", "image/png", "image/webp", "image/jpg"],

  // Feature flags
  features: {
    enableAgentApi: true,
    enableImageUpload: true,
    enableBackorder: true,
  },
} as const;

// API endpoints structure for reference
export const apiEndpoints = {
  products: {
    base: "/api/products",
    create: "/api/products",
    update: (id: number) => `/api/products/${id}`,
    getById: (id: number) => `/api/products/${id}`,
    getBySku: (sku: string) => `/api/products/sku/${sku}`,
    getAll: "/api/products",
    getActive: "/api/products/active",
    getByCategory: (categoryId: number) =>
      `/api/products/category/${categoryId}`,
    getFeatured: "/api/products/featured",
    search: "/api/products/search",
    getLowStock: "/api/products/low-stock",
    getOutOfStock: "/api/products/out-of-stock",
    addImage: (id: number) => `/api/products/${id}/images`,
    deleteImage: (productId: number, imageId: number) =>
      `/api/products/${productId}/images/${imageId}`,
    delete: (id: number) => `/api/products/${id}`,
  },
  agent: {
    health: "/api/agent/health",
    products: "/api/agent/products",
    getProductById: (id: number) => `/api/agent/products/${id}`,
    getProductBySku: (sku: string) => `/api/agent/products/sku/${sku}`,
    search: "/api/agent/products/search",
    getByCategory: (categoryId: number) =>
      `/api/agent/products/category/${categoryId}`,
    getFeatured: "/api/agent/products/featured",
    checkInventory: (productId: number) => `/api/agent/inventory/${productId}`,
    getLowStock: "/api/agent/inventory/low-stock",
  },
} as const;

export default config;
