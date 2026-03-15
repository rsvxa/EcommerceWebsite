import axios from 'axios';
import type { Product } from '@/types/product';

const API_URL = 'http://localhost:5000/api/products';

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(API_URL);
    const data = response.data;

    // តេស្តមើលក្នុង Console សិន
    console.log("ទិន្នន័យពី DB:", data);

    return data.map((p: any) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      stocks: p.stocks,
      // ដោយសាររូបភាពជា Base64 យើងអាចប្រើវាផ្ទាល់បានតែម្តង
      image: p.image || 'https://via.placeholder.com/500', 
      description: p.description,
      color: p.color,
      size: p.size,
      type: p.type
    }));
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
};
/**
 * ២. បន្ថែមផលិតផលថ្មី (CREATE)
 */
export const createProduct = async (productData: Partial<Product>): Promise<Product | null> => {
  try {
    const response = await axios.post(API_URL, productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    return null;
  }
};

/**
 * ៣. កែប្រែផលិតផល (UPDATE)
 */
export const updateProduct = async (id: number, productData: Partial<Product>): Promise<Product | null> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
};

/**
 * ៤. លុបផលិតផល (DELETE)
 */
export const deleteProduct = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
};

/**
 * ៥. មុខងារ Filter (Client-side)
 */
export function filterProducts(products: Product[], filters: any): Product[] {
  return products.filter((product) => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.minPrice !== undefined && product.price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) return false;
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return product.name.toLowerCase().includes(query) || product.description?.toLowerCase().includes(query);
    }
    return true;
  });
}

/**
 * ៦. មុខងារ Sort (Client-side)
 */
export function sortProducts(products: Product[], sortBy: string): Product[] {
  const sorted = [...products];
  if (sortBy === 'price-asc') return sorted.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') return sorted.sort((a, b) => b.price - a.price);
  if (sortBy === 'newest') return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return sorted;
}
export const mockProducts: Product[] = [];