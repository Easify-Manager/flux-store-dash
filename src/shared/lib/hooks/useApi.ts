/**
 * React hooks for API integration
 * These hooks provide easy-to-use interfaces for consuming the backend API
 */

import { useState, useEffect, useCallback } from "react";
import { productApi, agentApi } from "@/shared/lib/api";
import {
  Product,
  ProductCreateDto,
  PaginatedResponse,
  SearchParams,
  PaginationParams,
  Inventory,
} from "@/shared/types";

// Custom hook for fetching products with pagination
export function useProducts(params?: PaginationParams) {
  const [data, setData] = useState<PaginatedResponse<Product> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await productApi.getAll(params);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { data, loading, error, refetch: fetchProducts };
}

// Custom hook for fetching active products
export function useActiveProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await productApi.getActive();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { data, loading, error, refetch: fetchProducts };
}

// Custom hook for fetching a single product
export function useProduct(id?: number) {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await productApi.getById(id);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { data, loading, error, refetch: fetchProduct };
}

// Custom hook for searching products
export function useProductSearch(params: SearchParams) {
  const [data, setData] = useState<PaginatedResponse<Product> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const search = useCallback(async () => {
    if (!params.query) {
      setData(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await productApi.search(params);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      search();
    }, 300); // Debounce search by 300ms

    return () => clearTimeout(debounceTimer);
  }, [search]);

  return { data, loading, error, refetch: search };
}

// Custom hook for featured products
export function useFeaturedProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await productApi.getFeatured();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { data, loading, error, refetch: fetchProducts };
}

// Custom hook for low stock products
export function useLowStockProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await productApi.getLowStock();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { data, loading, error, refetch: fetchProducts };
}

// Custom hook for inventory check
export function useInventory(productId?: number) {
  const [data, setData] = useState<Inventory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchInventory = useCallback(async () => {
    if (!productId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await agentApi.checkInventory(productId);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  return { data, loading, error, refetch: fetchInventory };
}

// Custom hook for product mutations (create, update, delete)
export function useProductMutations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createProduct = async (
    productData: ProductCreateDto
  ): Promise<Product | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await productApi.create(productData);
      return result;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (
    id: number,
    productData: ProductCreateDto
  ): Promise<Product | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await productApi.update(id, productData);
      return result;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await productApi.delete(id);
      return true;
    } catch (err) {
      setError(err as Error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addImage = async (
    productId: number,
    file: File,
    altText?: string,
    isPrimary?: boolean
  ): Promise<Product | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await productApi.addImage(
        productId,
        file,
        altText,
        isPrimary
      );
      return result;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (
    productId: number,
    imageId: number
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await productApi.deleteImage(productId, imageId);
      return true;
    } catch (err) {
      setError(err as Error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createProduct,
    updateProduct,
    deleteProduct,
    addImage,
    deleteImage,
    loading,
    error,
  };
}
