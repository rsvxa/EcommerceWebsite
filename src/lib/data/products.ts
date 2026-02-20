import type { Product } from '@/types/product';


export const mockProducts: Product[] = [
  // CLOTHES
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    description: 'Soft, breathable cotton t-shirt perfect for everyday wear. Features a classic fit and durable construction.',
    price: 49.99,
    images: ['https://images.unsplash.com/photo-1668934803414-010d2231fcde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzY5ODY2MDE0fDA&ixlib=rb-4.1.0&q=80&w=1080'],
    category: 'CLOTHES',
    subCategory: 'TSHIRTS',
    stock: 50,
    featured: true,
    variants: [
      { id: 'v1', size: 'S', color: 'White', colorHex: '#FFFFFF', sku: 'TSH-WHT-S', stock: 15 },
      { id: 'v2', size: 'M', color: 'White', colorHex: '#FFFFFF', sku: 'TSH-WHT-M', stock: 20 },
      { id: 'v3', size: 'L', color: 'White', colorHex: '#FFFFFF', sku: 'TSH-WHT-L', stock: 15 },
      { id: 'v4', size: 'S', color: 'Black', colorHex: '#000000', sku: 'TSH-BLK-S', stock: 10 },
      { id: 'v5', size: 'M', color: 'Black', colorHex: '#000000', sku: 'TSH-BLK-M', stock: 25 },
      { id: 'v6', size: 'L', color: 'Black', colorHex: '#000000', sku: 'TSH-BLK-L', stock: 20 },
    ],
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Elegant Evening Dress',
    description: 'Stunning evening dress with a flattering silhouette. Perfect for special occasions and formal events.',
    price: 189.99,
    images: ['https://images.unsplash.com/photo-1759893362613-8bb8bb057af1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZHJlc3MlMjBib3V0aXF1ZXxlbnwxfHx8fDE3Njk4MTk3Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080'],
    category: 'CLOTHES',
    subCategory: 'DRESSES',
    stock: 30,
    featured: true,
    variants: [
      { id: 'v7', size: 'XS', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-XS', stock: 5 },
      { id: 'v8', size: 'S', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-S', stock: 8 },
      { id: 'v9', size: 'M', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-M', stock: 10 },
      { id: 'v10', size: 'L', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-L', stock: 7 },
    ],
    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Elegant Evening Dress',
    description: 'Stunning evening dress with a flattering silhouette. Perfect for special occasions and formal events.',
    price: 189.99,
    images: ['https://images.unsplash.com/photo-1759893362613-8bb8bb057af1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZHJlc3MlMjBib3V0aXF1ZXxlbnwxfHx8fDE3Njk4MTk3Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080'],
    category: 'CLOTHES',
    subCategory: 'DRESSES',
    stock: 30,
    featured: true,
    variants: [
      { id: 'v7', size: 'XS', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-XS', stock: 5 },
      { id: 'v8', size: 'S', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-S', stock: 8 },
      { id: 'v9', size: 'M', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-M', stock: 10 },
      { id: 'v10', size: 'L', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-L', stock: 7 },
    ],
    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Elegant Evening Dress',
    description: 'Stunning evening dress with a flattering silhouette. Perfect for special occasions and formal events.',
    price: 189.99,
    images: ['https://images.unsplash.com/photo-1759893362613-8bb8bb057af1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZHJlc3MlMjBib3V0aXF1ZXxlbnwxfHx8fDE3Njk4MTk3Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080'],
    category: 'CLOTHES',
    subCategory: 'DRESSES',
    stock: 30,
    featured: true,
    variants: [
      { id: 'v7', size: 'XS', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-XS', stock: 5 },
      { id: 'v8', size: 'S', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-S', stock: 8 },
      { id: 'v9', size: 'M', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-M', stock: 10 },
      { id: 'v10', size: 'L', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-L', stock: 7 },
    ],
    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Elegant Evening Dress',
    description: 'Stunning evening dress with a flattering silhouette. Perfect for special occasions and formal events.',
    price: 189.99,
    images: ['https://images.unsplash.com/photo-1759893362613-8bb8bb057af1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZHJlc3MlMjBib3V0aXF1ZXxlbnwxfHx8fDE3Njk4MTk3Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080'],
    category: 'CLOTHES',
    subCategory: 'DRESSES',
    stock: 30,
    featured: true,
    variants: [
      { id: 'v7', size: 'XS', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-XS', stock: 5 },
      { id: 'v8', size: 'S', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-S', stock: 8 },
      { id: 'v9', size: 'M', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-M', stock: 10 },
      { id: 'v10', size: 'L', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-L', stock: 7 },
    ],
    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '3',
    name: 'Casual Denim Jacket',
    description: 'Classic denim jacket with a modern fit. A versatile piece that pairs well with any outfit.',
    price: 129.99,
    images: ['https://images.unsplash.com/photo-1632934330201-a641618914d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBqYWNrZXQlMjBmYXNoaW9ufGVufDF8fHx8MTc2OTkyNDM1Nnww&ixlib=rb-4.1.0&q=80&w=1080'],
    category: 'CLOTHES',
    subCategory: 'JACKETS',
    stock: 40,
    featured: false,
    variants: [
      { id: 'v11', size: 'M', color: 'Blue Denim', colorHex: '#1560BD', sku: 'JCK-DEN-M', stock: 12 },
      { id: 'v12', size: 'L', color: 'Blue Denim', colorHex: '#1560BD', sku: 'JCK-DEN-L', stock: 15 },
      { id: 'v13', size: 'XL', color: 'Blue Denim', colorHex: '#1560BD', sku: 'JCK-DEN-XL', stock: 13 },
    ],
    createdAt: '2025-01-18T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },

  // JEWELRY
  {
    id: '4',
    name: 'Gold Plated Necklace',
    description: 'Elegant 18k gold plated necklace with a delicate chain. Hypoallergenic and tarnish-resistant.',
    price: 79.99,
    images: ['https://images.unsplash.com/photo-1611012756377-05e2e4269fa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwamV3ZWxyeSUyMG5lY2tsYWNlfGVufDF8fHx8MTc2OTg1MDQ0Nnww&ixlib=rb-4.1.0&q=80&w=1080'],
    category: 'JEWELRY',
    subCategory: 'NECKLACES',
    stock: 25,
    featured: true,
    variants: [
      { id: 'v14', size: 'ONESIZE', color: 'Gold', colorHex: '#FFD700', sku: 'NKL-GLD-OS', stock: 25 },
    ],
    createdAt: '2025-01-22T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '5',
    name: 'Sterling Silver Earrings',
    description: 'Handcrafted sterling silver earrings with a contemporary design. Lightweight and comfortable for all-day wear.',
    price: 59.99,
    images: ['https://images.unsplash.com/photo-1656109801168-699967cf3ba9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWx2ZXIlMjBlYXJyaW5ncyUyMGpld2Vscnl8ZW58MXx8fHwxNzY5ODcyNTMxfDA&ixlib=rb-4.1.0&q=80&w=1080'],
    category: 'JEWELRY',
    subCategory: 'EARRINGS',
    stock: 35,
    featured: false,
    variants: [
      { id: 'v15', size: 'ONESIZE', color: 'Silver', colorHex: '#C0C0C0', sku: 'ERR-SLV-OS', stock: 35 },
    ],
    createdAt: '2025-01-25T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },

  // SHOES
  {
    id: '6',
    name: 'Leather Oxford Shoes',
    description: 'Premium leather oxford shoes with a timeless design. Features cushioned insoles for all-day comfort.',
    price: 159.99,
    images: ['https://images.unsplash.com/photo-1760616172899-0681b97a2de3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGxlYXRoZXIlMjBzaG9lc3xlbnwxfHx8fDE3Njk5MjQzNTV8MA&ixlib=rb-4.1.0&q=80&w=1080'],
    category: 'SHOES',
    subCategory: 'OXFORDS',
    stock: 45,
    featured: true,
    variants: [
      { id: 'v16', size: 'M', color: 'Brown', colorHex: '#8B4513', sku: 'SHO-BRN-40', stock: 8 },
      { id: 'v17', size: 'M', color: 'Brown', colorHex: '#8B4513', sku: 'SHO-BRN-41', stock: 10 },
      { id: 'v18', size: 'L', color: 'Brown', colorHex: '#8B4513', sku: 'SHO-BRN-42', stock: 12 },
      { id: 'v19', size: 'M', color: 'Black', colorHex: '#000000', sku: 'SHO-BLK-40', stock: 7 },
      { id: 'v20', size: 'L', color: 'Black', colorHex: '#000000', sku: 'SHO-BLK-42', stock: 8 },
    ],
    createdAt: '2025-01-12T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },

  // HATS
  {
    id: '7',
    name: 'Wide Brim Fedora Hat',
    description: 'Stylish wide brim fedora made from quality wool felt. Adds sophistication to any outfit.',
    price: 69.99,
    images: ['https://images.unsplash.com/photo-1676451918112-ba36fa1dba39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwaGF0JTIwYWNjZXNzb3JpZXN8ZW58MXx8fHwxNzY5OTI0MzU1fDA&ixlib=rb-4.1.0&q=80&w=1080'],
    category: 'HATS',
    subCategory: 'FEDORAS',
    stock: 20,
    featured: false,
    variants: [
      { id: 'v21', size: 'M', color: 'Black', colorHex: '#000000', sku: 'HAT-BLK-M', stock: 8 },
      { id: 'v22', size: 'L', color: 'Black', colorHex: '#000000', sku: 'HAT-BLK-L', stock: 7 },
      { id: 'v23', size: 'M', color: 'Tan', colorHex: '#D2B48C', sku: 'HAT-TAN-M', stock: 5 },
    ],
    createdAt: '2025-01-28T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },

  // BAGS
  {
    id: '8',
    name: 'Luxury Leather Handbag',
    description: 'Handcrafted luxury leather handbag with multiple compartments. Includes adjustable shoulder strap.',
    price: 299.99,
    images: ['https://images.unsplash.com/photo-1598099947145-e85739e7ca28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwaGFuZGJhZyUyMGx1eHVyeXxlbnwxfHx8fDE3Njk4NzQ3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080'],
    category: 'BAGS',
    subCategory: 'HANDBAGS',
    stock: 15,
    featured: true,
    variants: [
      { id: 'v24', size: 'ONESIZE', color: 'Black', colorHex: '#000000', sku: 'BAG-BLK-OS', stock: 8 },
      { id: 'v25', size: 'ONESIZE', color: 'Cognac', colorHex: '#8B4513', sku: 'BAG-COG-OS', stock: 7 },
    ],
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },

  // Additional products for better variety
  {
    id: '9',
    name: 'Slim Fit Chinos',
    description: 'Comfortable slim fit chinos perfect for both casual and semi-formal occasions.',
    price: 89.99,
    images: ['https://images.unsplash.com/photo-1668934803414-010d2231fcde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzY5ODY2MDE0fDA&ixlib=rb-4.1.0&q=80&w=1080'],
    category: 'CLOTHES',
    subCategory: 'PANTS',
    stock: 60,
    featured: false,
    variants: [
      { id: 'v26', size: 'M', color: 'Khaki', colorHex: '#C3B091', sku: 'CHN-KHK-M', stock: 20 },
      { id: 'v27', size: 'L', color: 'Khaki', colorHex: '#C3B091', sku: 'CHN-KHK-L', stock: 20 },
      { id: 'v28', size: 'M', color: 'Navy', colorHex: '#000080', sku: 'CHN-NVY-M', stock: 10 },
      { id: 'v29', size: 'L', color: 'Navy', colorHex: '#000080', sku: 'CHN-NVY-L', stock: 10 },
    ],
    createdAt: '2025-01-14T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '10',
    name: 'Diamond Stud Earrings',
    description: 'Classic diamond stud earrings set in 14k white gold. Perfect for everyday elegance.',
    price: 399.99,
    images: ['https://images.unsplash.com/photo-1656109801168-699967cf3ba9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWx2ZXIlMjBlYXJyaW5ncyUyMGpld2Vscnl8ZW58MXx8fHwxNzY5ODcyNTMxfDA&ixlib=rb-4.1.0&q=80&w=1080'],
    category: 'JEWELRY',
    subCategory: 'EARRINGS',
    stock: 12,
    featured: true,
    variants: [
      { id: 'v30', size: 'ONESIZE', color: 'White Gold', colorHex: '#F5F5F5', sku: 'ERR-DIA-OS', stock: 12 },
    ],
    createdAt: '2025-01-30T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '11',
    name: 'Diamond Stud Earrings',
    description: 'Classic diamond stud earrings set in 14k white gold. Perfect for everyday elegance.',
    price: 399.99,
    images: ['https://images.unsplash.com/photo-1656109801168-699967cf3ba9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWx2ZXIlMjBlYXJyaW5ncyUyMGpld2Vscnl8ZW58MXx8fHwxNzY5ODcyNTMxfDA&ixlib=rb-4.1.0&q=80&w=1080'],
    category: 'JEWELRY',
    subCategory: 'EARRINGS',
    stock: 12,
    featured: true,
    variants: [
      { id: 'v30', size: 'ONESIZE', color: 'White Gold', colorHex: '#F5F5F5', sku: 'ERR-DIA-OS', stock: 12 },
    ],
    createdAt: '2025-01-30T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '12',
    name: 'Diamond Stud Earrings',
    description: 'Classic diamond stud earrings set in 14k white gold. Perfect for everyday elegance.',
    price: 399.99,
    images: ['https://images.unsplash.com/photo-1656109801168-699967cf3ba9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWx2ZXIlMjBlYXJyaW5ncyUyMGpld2Vscnl8ZW58MXx8fHwxNzY5ODcyNTMxfDA&ixlib=rb-4.1.0&q=80&w=1080'],
    category: 'JEWELRY',
    subCategory: 'EARRINGS',
    stock: 12,
    featured: true,
    variants: [
      { id: 'v30', size: 'ONESIZE', color: 'White Gold', colorHex: '#F5F5F5', sku: 'ERR-DIA-OS', stock: 12 },
    ],
    createdAt: '2025-01-30T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
];

/**
 * Helper function to filter products based on criteria
 */
export function filterProducts(
  products: Product[],
  filters: {
    category?: string;
    subCategory?: string;
    minPrice?: number;
    maxPrice?: number;
    searchQuery?: string;
  }
): Product[] {
  return products.filter((product) => {
    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    // SubCategory filter
    if (filters.subCategory && product.subCategory !== filters.subCategory) {
      return false;
    }

    // Price range filter
    if (filters.minPrice !== undefined && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
      return false;
    }

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(query);
      const matchesDescription = product.description.toLowerCase().includes(query);
      if (!matchesName && !matchesDescription) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Helper function to sort products
 */
export function sortProducts(
  products: Product[],
  sortBy: 'price-asc' | 'price-desc' | 'name' | 'newest'
): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'newest':
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    default:
      return sorted;
  }
}