# Easify Backend Integration

This project is integrated with the Easify backend API. The integration includes type-safe API clients and React hooks for easy data fetching.

## 🔧 Configuration

### Setting up the Backend URL

The default API base URL is set to `http://localhost:8080`. To change it:

1. **For Development:** Create a `.env` file in the project root:

   ```bash
   VITE_API_BASE_URL=http://localhost:8080
   ```

2. **For Production:** Update the environment variable:

   ```bash
   VITE_API_BASE_URL=https://api.easify.com
   ```

3. **Or directly in code:** Edit `src/shared/lib/api.ts` and update the `API_BASE_URL` constant.

## 📁 Project Structure

```
src/shared/
├── types/
│   └── index.ts              # TypeScript types matching backend models
├── lib/
│   ├── api.ts                # API client functions (productApi, agentApi)
│   ├── config.ts             # Application configuration
│   └── hooks/
│       └── useApi.ts         # React hooks for API consumption
```

## 🚀 Usage Examples

### Using API Clients Directly

```typescript
import { productApi, agentApi } from "@/shared/lib/api";

// Fetch all products (paginated)
const products = await productApi.getAll({ page: 0, size: 20 });

// Create a new product
const newProduct = await productApi.create({
  name: "Classic T-Shirt",
  sku: "TSHIRT-001",
  price: 24.99,
  quantity: 100,
});

// Search products
const results = await productApi.search({
  query: "shirt",
  minPrice: 10,
  maxPrice: 50,
});

// Check inventory (AI Agent API)
const inventory = await agentApi.checkInventory(productId);
```

### Using React Hooks

```typescript
import {
  useProducts,
  useActiveProducts,
  useFeaturedProducts,
  useProductSearch,
  useProductMutations,
} from "@/shared/lib/hooks/useApi";

// In your component
function ProductList() {
  const { data, loading, error, refetch } = useProducts({ page: 0, size: 20 });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.content.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

// For mutations
function CreateProduct() {
  const { createProduct, loading, error } = useProductMutations();

  const handleSubmit = async (formData) => {
    const product = await createProduct({
      name: formData.name,
      sku: formData.sku,
      price: formData.price,
      quantity: formData.quantity,
    });

    if (product) {
      console.log("Product created:", product);
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

## 📚 Available API Methods

### Product Management API (`productApi`)

- `create(data)` - Create a new product
- `update(id, data)` - Update a product
- `getById(id)` - Get product by ID
- `getBySku(sku)` - Get product by SKU
- `getAll(params)` - Get all products (paginated)
- `getActive()` - Get active products only
- `getByCategory(categoryId)` - Get products by category
- `getFeatured()` - Get featured products
- `search(params)` - Search products with filters
- `getLowStock()` - Get low stock products
- `getOutOfStock()` - Get out of stock products
- `addImage(productId, file, altText, isPrimary)` - Add product image
- `deleteImage(productId, imageId)` - Delete product image
- `delete(id)` - Delete product (soft delete)

### AI Agent API (`agentApi`)

Read-only endpoints optimized for AI consumption:

- `healthCheck()` - API health check
- `getProducts()` - Get all available products
- `getProductById(id)` - Get product details
- `getProductBySku(sku)` - Get product by SKU
- `searchProducts(params)` - Search products
- `getProductsByCategory(categoryId)` - Get products by category
- `getFeaturedProducts()` - Get featured products
- `checkInventory(productId)` - Check product inventory
- `getLowStockProducts()` - Get low stock products

### React Hooks

- `useProducts(params)` - Fetch paginated products
- `useActiveProducts()` - Fetch active products
- `useProduct(id)` - Fetch single product
- `useProductSearch(params)` - Search products with debouncing
- `useFeaturedProducts()` - Fetch featured products
- `useLowStockProducts()` - Fetch low stock products
- `useInventory(productId)` - Check product inventory
- `useProductMutations()` - Create, update, delete products

## 🔐 Authentication

Currently, the API is open for development. For production, API key authentication will be required:

```typescript
// In api.ts, update fetch calls to include:
headers: {
  "Content-Type": "application/json",
  "X-API-Key": "your-api-key-here"
}
```

## 📝 Type Definitions

All API responses are fully typed. Key types include:

- `Product` - Product entity with inventory and images
- `ProductCreateDto` - Data transfer object for creating/updating products
- `Inventory` - Inventory information
- `ProductImage` - Product image metadata
- `ApiResponse<T>` - Standard API response wrapper
- `PaginatedResponse<T>` - Paginated response structure
- `SearchParams` - Search parameters
- `PaginationParams` - Pagination parameters

## 🐛 Error Handling

All API calls return typed errors. Handle them appropriately:

```typescript
try {
  const product = await productApi.getById(123);
} catch (error) {
  console.error("Failed to fetch product:", error.message);
  // Show user-friendly error message
}
```

## 📖 Full API Documentation

For complete API documentation, see `API_GUIDE.md` which includes:

- All endpoint details
- Request/response examples
- Validation rules
- cURL examples
- Postman collection

## 🔄 Syncing with Backend Changes

When the backend API changes:

1. Update types in `src/shared/types/index.ts`
2. Update API methods in `src/shared/lib/api.ts`
3. Update hooks in `src/shared/lib/hooks/useApi.ts` if needed
4. Test all affected components

## 🚧 Current Status

✅ Type definitions created
✅ API client implemented
✅ React hooks created
✅ Error handling configured
⏳ Awaiting actual backend URL

**Next Steps:**

1. Replace `http://localhost:8080` with your actual backend URL
2. Test all endpoints
3. Add authentication headers if required
4. Update mock data files if needed
