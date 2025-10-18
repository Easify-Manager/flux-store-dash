import { Product } from "@/shared/types";

// Dummy API base URL - replace with actual backend URL
const API_BASE_URL = "https://api.example.com";

export const productApi = {
  // Create product (returns product with ID)
  create: async (productData: Omit<Product, "id" | "photo">): Promise<Product> => {
    // Dummy implementation
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    
    // For now, return mock response
    return {
      id: Date.now().toString(),
      ...productData,
      photo: [],
    };
  },

  // Upload images for a product
  uploadImages: async (productId: string, files: File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    // Dummy implementation
    const response = await fetch(`${API_BASE_URL}/products/${productId}/images`, {
      method: "POST",
      body: formData,
    });

    // For now, return mock image URLs
    return files.map((file) => URL.createObjectURL(file));
  },

  // Get all products
  getAll: async (): Promise<Product[]> => {
    // Dummy implementation
    const response = await fetch(`${API_BASE_URL}/products`);
    return [];
  },

  // Update product
  update: async (id: string, productData: Partial<Product>): Promise<Product> => {
    // Dummy implementation
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    return productData as Product;
  },

  // Delete product
  delete: async (id: string): Promise<void> => {
    // Dummy implementation
    await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
  },
};
