import type { Product } from '@/types/product';


import type { Product } from '@/types/product';

export const mockProducts: Product[] = [
  // CLOTHES
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    brand: 'Nike', // បន្ថែម Brand
    description: 'Soft, breathable cotton t-shirt perfect for everyday wear.',
    price: 49.99,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'TSHIRTS',
    stock: 50,
    featured: true,
    variants: [
      { id: 'v1', size: 'S', color: 'White', colorHex: '#FFFFFF', sku: 'TSH-WHT-S', stock: 15 },
      { id: 'v5', size: 'M', color: 'Black', colorHex: '#000000', sku: 'TSH-BLK-M', stock: 25 },
    ],
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Elegant Evening Dress',
    brand: 'Dior', // បន្ថែម Brand
    description: 'Stunning evening dress with a flattering silhouette.',
    price: 189.99,
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'DRESSES',
    stock: 30,
    featured: true,
    variants: [
      { id: 'v7', size: 'XS', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-XS', stock: 5 },
    ],
    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '3',
    name: 'Casual Denim Jacket',
    brand: 'Zara', // បន្ថែម Brand
    description: 'Classic denim jacket with a modern fit.',
    price: 129.99,
    images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'JACKETS',
    stock: 40,
    featured: false,
    variants: [
      { id: 'v11', size: 'M', color: 'Blue Denim', colorHex: '#1560BD', sku: 'JCK-DEN-M', stock: 12 },
    ],
    createdAt: '2025-01-18T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },

  // JEWELRY
  {
    id: '4',
    name: 'Gold Plated Necklace',
    brand: 'Louis Vuitton', // បន្ថែម Brand
    description: 'Elegant 18k gold plated necklace with a delicate chain.',
    price: 79.99,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000'],
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

  // SHOES
  {
    id: '6',
    name: 'Leather Oxford Shoes',
    brand: 'Prada', // បន្ថែម Brand
    description: 'Premium leather oxford shoes with a timeless design.',
    price: 159.99,
    images: ['https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000'],
    category: 'SHOES',
    subCategory: 'OXFORDS',
    stock: 45,
    featured: true,
    variants: [
      { id: 'v16', size: 'M', color: 'Brown', colorHex: '#8B4513', sku: 'SHO-BRN-40', stock: 8 },
    ],
    createdAt: '2025-01-12T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '13',
    name: 'Ultraboost Running Shoes',
    brand: 'Adidas', // បន្ថែម Brand
    description: 'The ultimate running shoes for performance and comfort.',
    price: 180.00,
    images: ['https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1000'],
    category: 'SHOES',
    subCategory: 'SNEAKERS',
    stock: 20,
    featured: true,
    variants: [
      { id: 'v31', size: 'M', color: 'White', colorHex: '#FFFFFF', sku: 'ADI-ULB-42', stock: 10 },
    ],
    createdAt: '2025-01-30T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },

  // BAGS
  {
    id: '8',
    name: 'Luxury Leather Handbag',
    brand: 'Prada', // បន្ថែម Brand
    description: 'Handcrafted luxury leather handbag with multiple compartments.',
    price: 299.99,
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000'],
    category: 'BAGS',
    subCategory: 'HANDBAGS',
    stock: 15,
    featured: true,
    variants: [
      { id: 'v24', size: 'ONESIZE', color: 'Black', colorHex: '#000000', sku: 'BAG-BLK-OS', stock: 8 },
    ],
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    brand: 'Nike', // បន្ថែម Brand
    description: 'Soft, breathable cotton t-shirt perfect for everyday wear.',
    price: 49.99,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'TSHIRTS',
    stock: 50,
    featured: true,
    variants: [
      { id: 'v1', size: 'S', color: 'White', colorHex: '#FFFFFF', sku: 'TSH-WHT-S', stock: 15 },
      { id: 'v5', size: 'M', color: 'Black', colorHex: '#000000', sku: 'TSH-BLK-M', stock: 25 },
    ],
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Elegant Evening Dress',
    brand: 'Dior', // បន្ថែម Brand
    description: 'Stunning evening dress with a flattering silhouette.',
    price: 189.99,
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'DRESSES',
    stock: 30,
    featured: true,
    variants: [
      { id: 'v7', size: 'XS', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-XS', stock: 5 },
    ],
    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '3',
    name: 'Casual Denim Jacket',
    brand: 'Zara', // បន្ថែម Brand
    description: 'Classic denim jacket with a modern fit.',
    price: 129.99,
    images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'JACKETS',
    stock: 40,
    featured: false,
    variants: [
      { id: 'v11', size: 'M', color: 'Blue Denim', colorHex: '#1560BD', sku: 'JCK-DEN-M', stock: 12 },
    ],
    createdAt: '2025-01-18T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },

  // JEWELRY
  {
    id: '4',
    name: 'Gold Plated Necklace',
    brand: 'Louis Vuitton', // បន្ថែម Brand
    description: 'Elegant 18k gold plated necklace with a delicate chain.',
    price: 79.99,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000'],
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

  // SHOES
  {
    id: '6',
    name: 'Leather Oxford Shoes',
    brand: 'Prada', // បន្ថែម Brand
    description: 'Premium leather oxford shoes with a timeless design.',
    price: 159.99,
    images: ['https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000'],
    category: 'SHOES',
    subCategory: 'OXFORDS',
    stock: 45,
    featured: true,
    variants: [
      { id: 'v16', size: 'M', color: 'Brown', colorHex: '#8B4513', sku: 'SHO-BRN-40', stock: 8 },
    ],
    createdAt: '2025-01-12T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '13',
    name: 'Ultraboost Running Shoes',
    brand: 'Adidas', // បន្ថែម Brand
    description: 'The ultimate running shoes for performance and comfort.',
    price: 180.00,
    images: ['https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1000'],
    category: 'SHOES',
    subCategory: 'SNEAKERS',
    stock: 20,
    featured: true,
    variants: [
      { id: 'v31', size: 'M', color: 'White', colorHex: '#FFFFFF', sku: 'ADI-ULB-42', stock: 10 },
    ],
    createdAt: '2025-01-30T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },

  // BAGS
  {
    id: '8',
    name: 'Luxury Leather Handbag',
    brand: 'Prada', // បន្ថែម Brand
    description: 'Handcrafted luxury leather handbag with multiple compartments.',
    price: 299.99,
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000'],
    category: 'BAGS',
    subCategory: 'HANDBAGS',
    stock: 15,
    featured: true,
    variants: [
      { id: 'v24', size: 'ONESIZE', color: 'Black', colorHex: '#000000', sku: 'BAG-BLK-OS', stock: 8 },
    ],
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    brand: 'Nike', // បន្ថែម Brand
    description: 'Soft, breathable cotton t-shirt perfect for everyday wear.',
    price: 49.99,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'TSHIRTS',
    stock: 50,
    featured: true,
    variants: [
      { id: 'v1', size: 'S', color: 'White', colorHex: '#FFFFFF', sku: 'TSH-WHT-S', stock: 15 },
      { id: 'v5', size: 'M', color: 'Black', colorHex: '#000000', sku: 'TSH-BLK-M', stock: 25 },
    ],
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Elegant Evening Dress',
    brand: 'Dior', // បន្ថែម Brand
    description: 'Stunning evening dress with a flattering silhouette.',
    price: 189.99,
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'DRESSES',
    stock: 30,
    featured: true,
    variants: [
      { id: 'v7', size: 'XS', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-XS', stock: 5 },
    ],
    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '3',
    name: 'Casual Denim Jacket',
    brand: 'Zara', // បន្ថែម Brand
    description: 'Classic denim jacket with a modern fit.',
    price: 129.99,
    images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'JACKETS',
    stock: 40,
    featured: false,
    variants: [
      { id: 'v11', size: 'M', color: 'Blue Denim', colorHex: '#1560BD', sku: 'JCK-DEN-M', stock: 12 },
    ],
    createdAt: '2025-01-18T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },

  // JEWELRY
  {
    id: '4',
    name: 'Gold Plated Necklace',
    brand: 'Louis Vuitton', // បន្ថែម Brand
    description: 'Elegant 18k gold plated necklace with a delicate chain.',
    price: 79.99,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000'],
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

  // SHOES
  {
    id: '6',
    name: 'Leather Oxford Shoes',
    brand: 'Prada', // បន្ថែម Brand
    description: 'Premium leather oxford shoes with a timeless design.',
    price: 159.99,
    images: ['https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000'],
    category: 'SHOES',
    subCategory: 'OXFORDS',
    stock: 45,
    featured: true,
    variants: [
      { id: 'v16', size: 'M', color: 'Brown', colorHex: '#8B4513', sku: 'SHO-BRN-40', stock: 8 },
    ],
    createdAt: '2025-01-12T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '13',
    name: 'Ultraboost Running Shoes',
    brand: 'Adidas', // បន្ថែម Brand
    description: 'The ultimate running shoes for performance and comfort.',
    price: 180.00,
    images: ['https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1000'],
    category: 'SHOES',
    subCategory: 'SNEAKERS',
    stock: 20,
    featured: true,
    variants: [
      { id: 'v31', size: 'M', color: 'White', colorHex: '#FFFFFF', sku: 'ADI-ULB-42', stock: 10 },
    ],
    createdAt: '2025-01-30T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },

  // BAGS
  {
    id: '8',
    name: 'Luxury Leather Handbag',
    brand: 'Prada', // បន្ថែម Brand
    description: 'Handcrafted luxury leather handbag with multiple compartments.',
    price: 299.99,
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000'],
    category: 'BAGS',
    subCategory: 'HANDBAGS',
    stock: 15,
    featured: true,
    variants: [
      { id: 'v24', size: 'ONESIZE', color: 'Black', colorHex: '#000000', sku: 'BAG-BLK-OS', stock: 8 },
    ],
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    brand: 'Nike', // បន្ថែម Brand
    description: 'Soft, breathable cotton t-shirt perfect for everyday wear.',
    price: 49.99,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'TSHIRTS',
    stock: 50,
    featured: true,
    variants: [
      { id: 'v1', size: 'S', color: 'White', colorHex: '#FFFFFF', sku: 'TSH-WHT-S', stock: 15 },
      { id: 'v5', size: 'M', color: 'Black', colorHex: '#000000', sku: 'TSH-BLK-M', stock: 25 },
    ],
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Elegant Evening Dress',
    brand: 'Dior', // បន្ថែម Brand
    description: 'Stunning evening dress with a flattering silhouette.',
    price: 189.99,
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'DRESSES',
    stock: 30,
    featured: true,
    variants: [
      { id: 'v7', size: 'XS', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-XS', stock: 5 },
    ],
    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '3',
    name: 'Casual Denim Jacket',
    brand: 'Zara', // បន្ថែម Brand
    description: 'Classic denim jacket with a modern fit.',
    price: 129.99,
    images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'JACKETS',
    stock: 40,
    featured: false,
    variants: [
      { id: 'v11', size: 'M', color: 'Blue Denim', colorHex: '#1560BD', sku: 'JCK-DEN-M', stock: 12 },
    ],
    createdAt: '2025-01-18T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },

  // JEWELRY
  {
    id: '4',
    name: 'Gold Plated Necklace',
    brand: 'Louis Vuitton', // បន្ថែម Brand
    description: 'Elegant 18k gold plated necklace with a delicate chain.',
    price: 79.99,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000'],
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

  // SHOES
  {
    id: '6',
    name: 'Leather Oxford Shoes',
    brand: 'Prada', // បន្ថែម Brand
    description: 'Premium leather oxford shoes with a timeless design.',
    price: 159.99,
    images: ['https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000'],
    category: 'SHOES',
    subCategory: 'OXFORDS',
    stock: 45,
    featured: true,
    variants: [
      { id: 'v16', size: 'M', color: 'Brown', colorHex: '#8B4513', sku: 'SHO-BRN-40', stock: 8 },
    ],
    createdAt: '2025-01-12T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '13',
    name: 'Ultraboost Running Shoes',
    brand: 'Adidas', // បន្ថែម Brand
    description: 'The ultimate running shoes for performance and comfort.',
    price: 180.00,
    images: ['https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1000'],
    category: 'SHOES',
    subCategory: 'SNEAKERS',
    stock: 20,
    featured: true,
    variants: [
      { id: 'v31', size: 'M', color: 'White', colorHex: '#FFFFFF', sku: 'ADI-ULB-42', stock: 10 },
    ],
    createdAt: '2025-01-30T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },

  // BAGS
  {
    id: '8',
    name: 'Luxury Leather Handbag',
    brand: 'Prada', // បន្ថែម Brand
    description: 'Handcrafted luxury leather handbag with multiple compartments.',
    price: 299.99,
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000'],
    category: 'BAGS',
    subCategory: 'HANDBAGS',
    stock: 15,
    featured: true,
    variants: [
      { id: 'v24', size: 'ONESIZE', color: 'Black', colorHex: '#000000', sku: 'BAG-BLK-OS', stock: 8 },
    ],
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    brand: 'Nike', // បន្ថែម Brand
    description: 'Soft, breathable cotton t-shirt perfect for everyday wear.',
    price: 49.99,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'TSHIRTS',
    stock: 50,
    featured: true,
    variants: [
      { id: 'v1', size: 'S', color: 'White', colorHex: '#FFFFFF', sku: 'TSH-WHT-S', stock: 15 },
      { id: 'v5', size: 'M', color: 'Black', colorHex: '#000000', sku: 'TSH-BLK-M', stock: 25 },
    ],
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Elegant Evening Dress',
    brand: 'Dior', // បន្ថែម Brand
    description: 'Stunning evening dress with a flattering silhouette.',
    price: 189.99,
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'DRESSES',
    stock: 30,
    featured: true,
    variants: [
      { id: 'v7', size: 'XS', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-XS', stock: 5 },
    ],
    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '3',
    name: 'Casual Denim Jacket',
    brand: 'Zara', // បន្ថែម Brand
    description: 'Classic denim jacket with a modern fit.',
    price: 129.99,
    images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'JACKETS',
    stock: 40,
    featured: false,
    variants: [
      { id: 'v11', size: 'M', color: 'Blue Denim', colorHex: '#1560BD', sku: 'JCK-DEN-M', stock: 12 },
    ],
    createdAt: '2025-01-18T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },

  // JEWELRY
  {
    id: '4',
    name: 'Gold Plated Necklace',
    brand: 'Louis Vuitton', // បន្ថែម Brand
    description: 'Elegant 18k gold plated necklace with a delicate chain.',
    price: 79.99,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000'],
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

  // SHOES
  {
    id: '6',
    name: 'Leather Oxford Shoes',
    brand: 'Prada', // បន្ថែម Brand
    description: 'Premium leather oxford shoes with a timeless design.',
    price: 159.99,
    images: ['https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000'],
    category: 'SHOES',
    subCategory: 'OXFORDS',
    stock: 45,
    featured: true,
    variants: [
      { id: 'v16', size: 'M', color: 'Brown', colorHex: '#8B4513', sku: 'SHO-BRN-40', stock: 8 },
    ],
    createdAt: '2025-01-12T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '13',
    name: 'Ultraboost Running Shoes',
    brand: 'Adidas', // បន្ថែម Brand
    description: 'The ultimate running shoes for performance and comfort.',
    price: 180.00,
    images: ['https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1000'],
    category: 'SHOES',
    subCategory: 'SNEAKERS',
    stock: 20,
    featured: true,
    variants: [
      { id: 'v31', size: 'M', color: 'White', colorHex: '#FFFFFF', sku: 'ADI-ULB-42', stock: 10 },
    ],
    createdAt: '2025-01-30T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },

  // BAGS
  {
    id: '8',
    name: 'Luxury Leather Handbag',
    brand: 'Prada', // បន្ថែម Brand
    description: 'Handcrafted luxury leather handbag with multiple compartments.',
    price: 299.99,
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000'],
    category: 'BAGS',
    subCategory: 'HANDBAGS',
    stock: 15,
    featured: true,
    variants: [
      { id: 'v24', size: 'ONESIZE', color: 'Black', colorHex: '#000000', sku: 'BAG-BLK-OS', stock: 8 },
    ],
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    brand: 'Nike', // បន្ថែម Brand
    description: 'Soft, breathable cotton t-shirt perfect for everyday wear.',
    price: 49.99,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'TSHIRTS',
    stock: 50,
    featured: true,
    variants: [
      { id: 'v1', size: 'S', color: 'White', colorHex: '#FFFFFF', sku: 'TSH-WHT-S', stock: 15 },
      { id: 'v5', size: 'M', color: 'Black', colorHex: '#000000', sku: 'TSH-BLK-M', stock: 25 },
    ],
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Elegant Evening Dress',
    brand: 'Dior', // បន្ថែម Brand
    description: 'Stunning evening dress with a flattering silhouette.',
    price: 189.99,
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'DRESSES',
    stock: 30,
    featured: true,
    variants: [
      { id: 'v7', size: 'XS', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-XS', stock: 5 },
    ],
    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '3',
    name: 'Casual Denim Jacket',
    brand: 'Zara', // បន្ថែម Brand
    description: 'Classic denim jacket with a modern fit.',
    price: 129.99,
    images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'JACKETS',
    stock: 40,
    featured: false,
    variants: [
      { id: 'v11', size: 'M', color: 'Blue Denim', colorHex: '#1560BD', sku: 'JCK-DEN-M', stock: 12 },
    ],
    createdAt: '2025-01-18T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },

  // JEWELRY
  {
    id: '4',
    name: 'Gold Plated Necklace',
    brand: 'Louis Vuitton', // បន្ថែម Brand
    description: 'Elegant 18k gold plated necklace with a delicate chain.',
    price: 79.99,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000'],
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

  // SHOES
  {
    id: '6',
    name: 'Leather Oxford Shoes',
    brand: 'Prada', // បន្ថែម Brand
    description: 'Premium leather oxford shoes with a timeless design.',
    price: 159.99,
    images: ['https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000'],
    category: 'SHOES',
    subCategory: 'OXFORDS',
    stock: 45,
    featured: true,
    variants: [
      { id: 'v16', size: 'M', color: 'Brown', colorHex: '#8B4513', sku: 'SHO-BRN-40', stock: 8 },
    ],
    createdAt: '2025-01-12T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '13',
    name: 'Ultraboost Running Shoes',
    brand: 'Adidas', // បន្ថែម Brand
    description: 'The ultimate running shoes for performance and comfort.',
    price: 180.00,
    images: ['https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1000'],
    category: 'SHOES',
    subCategory: 'SNEAKERS',
    stock: 20,
    featured: true,
    variants: [
      { id: 'v31', size: 'M', color: 'White', colorHex: '#FFFFFF', sku: 'ADI-ULB-42', stock: 10 },
    ],
    createdAt: '2025-01-30T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },

  // BAGS
  {
    id: '8',
    name: 'Luxury Leather Handbag',
    brand: 'Prada', // បន្ថែម Brand
    description: 'Handcrafted luxury leather handbag with multiple compartments.',
    price: 299.99,
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000'],
    category: 'BAGS',
    subCategory: 'HANDBAGS',
    stock: 15,
    featured: true,
    variants: [
      { id: 'v24', size: 'ONESIZE', color: 'Black', colorHex: '#000000', sku: 'BAG-BLK-OS', stock: 8 },
    ],
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    brand: 'Nike', // បន្ថែម Brand
    description: 'Soft, breathable cotton t-shirt perfect for everyday wear.',
    price: 49.99,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'TSHIRTS',
    stock: 50,
    featured: true,
    variants: [
      { id: 'v1', size: 'S', color: 'White', colorHex: '#FFFFFF', sku: 'TSH-WHT-S', stock: 15 },
      { id: 'v5', size: 'M', color: 'Black', colorHex: '#000000', sku: 'TSH-BLK-M', stock: 25 },
    ],
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Elegant Evening Dress',
    brand: 'Dior', // បន្ថែម Brand
    description: 'Stunning evening dress with a flattering silhouette.',
    price: 189.99,
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'DRESSES',
    stock: 30,
    featured: true,
    variants: [
      { id: 'v7', size: 'XS', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-XS', stock: 5 },
    ],
    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '3',
    name: 'Casual Denim Jacket',
    brand: 'Zara', // បន្ថែម Brand
    description: 'Classic denim jacket with a modern fit.',
    price: 129.99,
    images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'JACKETS',
    stock: 40,
    featured: false,
    variants: [
      { id: 'v11', size: 'M', color: 'Blue Denim', colorHex: '#1560BD', sku: 'JCK-DEN-M', stock: 12 },
    ],
    createdAt: '2025-01-18T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },

  // JEWELRY
  {
    id: '4',
    name: 'Gold Plated Necklace',
    brand: 'Louis Vuitton', // បន្ថែម Brand
    description: 'Elegant 18k gold plated necklace with a delicate chain.',
    price: 79.99,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000'],
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

  // SHOES
  {
    id: '6',
    name: 'Leather Oxford Shoes',
    brand: 'Prada', // បន្ថែម Brand
    description: 'Premium leather oxford shoes with a timeless design.',
    price: 159.99,
    images: ['https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000'],
    category: 'SHOES',
    subCategory: 'OXFORDS',
    stock: 45,
    featured: true,
    variants: [
      { id: 'v16', size: 'M', color: 'Brown', colorHex: '#8B4513', sku: 'SHO-BRN-40', stock: 8 },
    ],
    createdAt: '2025-01-12T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '13',
    name: 'Ultraboost Running Shoes',
    brand: 'Adidas', // បន្ថែម Brand
    description: 'The ultimate running shoes for performance and comfort.',
    price: 180.00,
    images: ['https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1000'],
    category: 'SHOES',
    subCategory: 'SNEAKERS',
    stock: 20,
    featured: true,
    variants: [
      { id: 'v31', size: 'M', color: 'White', colorHex: '#FFFFFF', sku: 'ADI-ULB-42', stock: 10 },
    ],
    createdAt: '2025-01-30T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },

  // BAGS
  {
    id: '8',
    name: 'Luxury Leather Handbag',
    brand: 'Prada', // បន្ថែម Brand
    description: 'Handcrafted luxury leather handbag with multiple compartments.',
    price: 299.99,
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000'],
    category: 'BAGS',
    subCategory: 'HANDBAGS',
    stock: 15,
    featured: true,
    variants: [
      { id: 'v24', size: 'ONESIZE', color: 'Black', colorHex: '#000000', sku: 'BAG-BLK-OS', stock: 8 },
    ],
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    brand: 'Nike', // បន្ថែម Brand
    description: 'Soft, breathable cotton t-shirt perfect for everyday wear.',
    price: 49.99,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'TSHIRTS',
    stock: 50,
    featured: true,
    variants: [
      { id: 'v1', size: 'S', color: 'White', colorHex: '#FFFFFF', sku: 'TSH-WHT-S', stock: 15 },
      { id: 'v5', size: 'M', color: 'Black', colorHex: '#000000', sku: 'TSH-BLK-M', stock: 25 },
    ],
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Elegant Evening Dress',
    brand: 'Dior', // បន្ថែម Brand
    description: 'Stunning evening dress with a flattering silhouette.',
    price: 189.99,
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'DRESSES',
    stock: 30,
    featured: true,
    variants: [
      { id: 'v7', size: 'XS', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-XS', stock: 5 },
    ],
    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '3',
    name: 'Casual Denim Jacket',
    brand: 'Zara', // បន្ថែម Brand
    description: 'Classic denim jacket with a modern fit.',
    price: 129.99,
    images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'JACKETS',
    stock: 40,
    featured: false,
    variants: [
      { id: 'v11', size: 'M', color: 'Blue Denim', colorHex: '#1560BD', sku: 'JCK-DEN-M', stock: 12 },
    ],
    createdAt: '2025-01-18T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },

  // JEWELRY
  {
    id: '4',
    name: 'Gold Plated Necklace',
    brand: 'Louis Vuitton', // បន្ថែម Brand
    description: 'Elegant 18k gold plated necklace with a delicate chain.',
    price: 79.99,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000'],
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

  // SHOES
  {
    id: '6',
    name: 'Leather Oxford Shoes',
    brand: 'Prada', // បន្ថែម Brand
    description: 'Premium leather oxford shoes with a timeless design.',
    price: 159.99,
    images: ['https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000'],
    category: 'SHOES',
    subCategory: 'OXFORDS',
    stock: 45,
    featured: true,
    variants: [
      { id: 'v16', size: 'M', color: 'Brown', colorHex: '#8B4513', sku: 'SHO-BRN-40', stock: 8 },
    ],
    createdAt: '2025-01-12T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '13',
    name: 'Ultraboost Running Shoes',
    brand: 'Adidas', // បន្ថែម Brand
    description: 'The ultimate running shoes for performance and comfort.',
    price: 180.00,
    images: ['https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1000'],
    category: 'SHOES',
    subCategory: 'SNEAKERS',
    stock: 20,
    featured: true,
    variants: [
      { id: 'v31', size: 'M', color: 'White', colorHex: '#FFFFFF', sku: 'ADI-ULB-42', stock: 10 },
    ],
    createdAt: '2025-01-30T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },

  // BAGS
  {
    id: '8',
    name: 'Luxury Leather Handbag',
    brand: 'Prada', // បន្ថែម Brand
    description: 'Handcrafted luxury leather handbag with multiple compartments.',
    price: 299.99,
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000'],
    category: 'BAGS',
    subCategory: 'HANDBAGS',
    stock: 15,
    featured: true,
    variants: [
      { id: 'v24', size: 'ONESIZE', color: 'Black', colorHex: '#000000', sku: 'BAG-BLK-OS', stock: 8 },
    ],
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    brand: 'Nike', // បន្ថែម Brand
    description: 'Soft, breathable cotton t-shirt perfect for everyday wear.',
    price: 49.99,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'TSHIRTS',
    stock: 50,
    featured: true,
    variants: [
      { id: 'v1', size: 'S', color: 'White', colorHex: '#FFFFFF', sku: 'TSH-WHT-S', stock: 15 },
      { id: 'v5', size: 'M', color: 'Black', colorHex: '#000000', sku: 'TSH-BLK-M', stock: 25 },
    ],
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Elegant Evening Dress',
    brand: 'Dior', // បន្ថែម Brand
    description: 'Stunning evening dress with a flattering silhouette.',
    price: 189.99,
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'DRESSES',
    stock: 30,
    featured: true,
    variants: [
      { id: 'v7', size: 'XS', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-XS', stock: 5 },
    ],
    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '3',
    name: 'Casual Denim Jacket',
    brand: 'Zara', // បន្ថែម Brand
    description: 'Classic denim jacket with a modern fit.',
    price: 129.99,
    images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'JACKETS',
    stock: 40,
    featured: false,
    variants: [
      { id: 'v11', size: 'M', color: 'Blue Denim', colorHex: '#1560BD', sku: 'JCK-DEN-M', stock: 12 },
    ],
    createdAt: '2025-01-18T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },

  // JEWELRY
  {
    id: '4',
    name: 'Gold Plated Necklace',
    brand: 'Louis Vuitton', // បន្ថែម Brand
    description: 'Elegant 18k gold plated necklace with a delicate chain.',
    price: 79.99,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000'],
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

  // SHOES
  {
    id: '6',
    name: 'Leather Oxford Shoes',
    brand: 'Prada', // បន្ថែម Brand
    description: 'Premium leather oxford shoes with a timeless design.',
    price: 159.99,
    images: ['https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000'],
    category: 'SHOES',
    subCategory: 'OXFORDS',
    stock: 45,
    featured: true,
    variants: [
      { id: 'v16', size: 'M', color: 'Brown', colorHex: '#8B4513', sku: 'SHO-BRN-40', stock: 8 },
    ],
    createdAt: '2025-01-12T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '13',
    name: 'Ultraboost Running Shoes',
    brand: 'Adidas', // បន្ថែម Brand
    description: 'The ultimate running shoes for performance and comfort.',
    price: 180.00,
    images: ['https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1000'],
    category: 'SHOES',
    subCategory: 'SNEAKERS',
    stock: 20,
    featured: true,
    variants: [
      { id: 'v31', size: 'M', color: 'White', colorHex: '#FFFFFF', sku: 'ADI-ULB-42', stock: 10 },
    ],
    createdAt: '2025-01-30T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },

  // BAGS
  {
    id: '8',
    name: 'Luxury Leather Handbag',
    brand: 'Prada', // បន្ថែម Brand
    description: 'Handcrafted luxury leather handbag with multiple compartments.',
    price: 299.99,
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000'],
    category: 'BAGS',
    subCategory: 'HANDBAGS',
    stock: 15,
    featured: true,
    variants: [
      { id: 'v24', size: 'ONESIZE', color: 'Black', colorHex: '#000000', sku: 'BAG-BLK-OS', stock: 8 },
    ],
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    brand: 'Nike', // បន្ថែម Brand
    description: 'Soft, breathable cotton t-shirt perfect for everyday wear.',
    price: 49.99,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'TSHIRTS',
    stock: 50,
    featured: true,
    variants: [
      { id: 'v1', size: 'S', color: 'White', colorHex: '#FFFFFF', sku: 'TSH-WHT-S', stock: 15 },
      { id: 'v5', size: 'M', color: 'Black', colorHex: '#000000', sku: 'TSH-BLK-M', stock: 25 },
    ],
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Elegant Evening Dress',
    brand: 'Dior', // បន្ថែម Brand
    description: 'Stunning evening dress with a flattering silhouette.',
    price: 189.99,
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'DRESSES',
    stock: 30,
    featured: true,
    variants: [
      { id: 'v7', size: 'XS', color: 'Navy Blue', colorHex: '#000080', sku: 'DRS-NVY-XS', stock: 5 },
    ],
    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '3',
    name: 'Casual Denim Jacket',
    brand: 'Zara', // បន្ថែម Brand
    description: 'Classic denim jacket with a modern fit.',
    price: 129.99,
    images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000'],
    category: 'CLOTHES',
    subCategory: 'JACKETS',
    stock: 40,
    featured: false,
    variants: [
      { id: 'v11', size: 'M', color: 'Blue Denim', colorHex: '#1560BD', sku: 'JCK-DEN-M', stock: 12 },
    ],
    createdAt: '2025-01-18T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },

  // JEWELRY
  {
    id: '4',
    name: 'Gold Plated Necklace',
    brand: 'Louis Vuitton', // បន្ថែម Brand
    description: 'Elegant 18k gold plated necklace with a delicate chain.',
    price: 79.99,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000'],
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

  // SHOES
  {
    id: '6',
    name: 'Leather Oxford Shoes',
    brand: 'Prada', // បន្ថែម Brand
    description: 'Premium leather oxford shoes with a timeless design.',
    price: 159.99,
    images: ['https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000'],
    category: 'SHOES',
    subCategory: 'OXFORDS',
    stock: 45,
    featured: true,
    variants: [
      { id: 'v16', size: 'M', color: 'Brown', colorHex: '#8B4513', sku: 'SHO-BRN-40', stock: 8 },
    ],
    createdAt: '2025-01-12T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '13',
    name: 'Ultraboost Running Shoes',
    brand: 'Adidas', // បន្ថែម Brand
    description: 'The ultimate running shoes for performance and comfort.',
    price: 180.00,
    images: ['https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1000'],
    category: 'SHOES',
    subCategory: 'SNEAKERS',
    stock: 20,
    featured: true,
    variants: [
      { id: 'v31', size: 'M', color: 'White', colorHex: '#FFFFFF', sku: 'ADI-ULB-42', stock: 10 },
    ],
    createdAt: '2025-01-30T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },

  // BAGS
  {
    id: '8',
    name: 'Luxury Leather Handbag',
    brand: 'Prada', // បន្ថែម Brand
    description: 'Handcrafted luxury leather handbag with multiple compartments.',
    price: 299.99,
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000'],
    category: 'BAGS',
    subCategory: 'HANDBAGS',
    stock: 15,
    featured: true,
    variants: [
      { id: 'v24', size: 'ONESIZE', color: 'Black', colorHex: '#000000', sku: 'BAG-BLK-OS', stock: 8 },
    ],
    createdAt: '2025-01-10T10:00:00Z',
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