import { Category, Product, Sale } from "../types";

export const mockCategories: Category[] = [
  { id: "1", name: "Electronics", photo: "📱" },
  { id: "2", name: "Clothing", photo: "👕" },
  { id: "3", name: "Books", photo: "📚" },
  { id: "4", name: "Home & Garden", photo: "🏡" },
];

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Smartphone X",
    photo: "📱",
    categoryId: "1",
    description: "Latest smartphone with advanced features",
    price: 999,
    quantity: 45,
  },
  {
    id: "2",
    name: "Laptop Pro",
    photo: "💻",
    categoryId: "1",
    description: "High-performance laptop for professionals",
    price: 1499,
    quantity: 23,
  },
  {
    id: "3",
    name: "Wireless Earbuds",
    photo: "🎧",
    categoryId: "1",
    description: "Premium wireless earbuds with noise cancellation",
    price: 199,
    quantity: 78,
  },
  {
    id: "4",
    name: "Cotton T-Shirt",
    photo: "👕",
    categoryId: "2",
    description: "Comfortable cotton t-shirt",
    price: 29,
    quantity: 120,
  },
  {
    id: "5",
    name: "Denim Jeans",
    photo: "👖",
    categoryId: "2",
    description: "Classic denim jeans",
    price: 79,
    quantity: 65,
  },
  {
    id: "6",
    name: "JavaScript Guide",
    photo: "📘",
    categoryId: "3",
    description: "Comprehensive JavaScript programming guide",
    price: 49,
    quantity: 34,
  },
];

const today = new Date();
const getRandomDate = (daysBack: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
  return date;
};

export const mockSales: Sale[] = [
  { id: "1", productId: "1", price: 999, quantity: 2, createdAt: getRandomDate(0) },
  { id: "2", productId: "3", price: 199, quantity: 5, createdAt: getRandomDate(0) },
  { id: "3", productId: "4", price: 29, quantity: 8, createdAt: getRandomDate(1) },
  { id: "4", productId: "2", price: 1499, quantity: 1, createdAt: getRandomDate(2) },
  { id: "5", productId: "5", price: 79, quantity: 3, createdAt: getRandomDate(3) },
  { id: "6", productId: "6", price: 49, quantity: 6, createdAt: getRandomDate(5) },
  { id: "7", productId: "1", price: 999, quantity: 3, createdAt: getRandomDate(7) },
  { id: "8", productId: "3", price: 199, quantity: 4, createdAt: getRandomDate(10) },
  { id: "9", productId: "4", price: 29, quantity: 12, createdAt: getRandomDate(15) },
  { id: "10", productId: "2", price: 1499, quantity: 2, createdAt: getRandomDate(20) },
  { id: "11", productId: "5", price: 79, quantity: 7, createdAt: getRandomDate(25) },
  { id: "12", productId: "6", price: 49, quantity: 9, createdAt: getRandomDate(28) },
];
