// TypeScript types for the e-commerce application

export type Category = 'CLOTHES' | 'JEWELRY' | 'SHOES' | 'HATS' | 'BAGS';

export type SubCategory =
  // Clothes
  | 'TSHIRTS' | 'SHIRTS' | 'DRESSES' | 'JEANS' | 'PANTS' | 'SHORTS'
  | 'JACKETS' | 'COATS' | 'SWEATERS' | 'HOODIES' | 'SKIRTS' | 'BLAZERS'
  | 'SUITS' | 'ACTIVEWEAR' | 'SWIMWEAR' | 'UNDERWEAR' | 'SLEEPWEAR'
  // Jewelry
  | 'NECKLACES' | 'EARRINGS' | 'BRACELETS' | 'RINGS' | 'WATCHES'
  | 'ANKLETS' | 'BROOCHES' | 'CUFFLINKS' | 'PENDANTS' | 'CHARMS'
  // Shoes
  | 'SNEAKERS' | 'BOOTS' | 'SANDALS' | 'HEELS' | 'FLATS' | 'LOAFERS'
  | 'OXFORDS' | 'SLIPPERS' | 'ATHLETIC' | 'CASUAL_SHOES' | 'DRESS_SHOES'
  // Hats
  | 'BASEBALL_CAPS' | 'BEANIES' | 'FEDORAS' | 'BUCKET_HATS' | 'BERETS'
  | 'COWBOY_HATS' | 'SUN_HATS' | 'VISORS' | 'PANAMA_HATS' | 'WINTER_HATS'
  // Bags
  | 'HANDBAGS' | 'BACKPACKS' | 'TOTES' | 'CROSSBODY' | 'CLUTCHES'
  | 'SHOULDER_BAGS' | 'WALLETS' | 'DUFFEL_BAGS' | 'BRIEFCASES'
  | 'MESSENGER_BAGS' | 'TRAVEL_BAGS';

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'ONESIZE';

export interface ProductVariant {
  id: string;
  size: Size;
  color: string;
  colorHex?: string;
  sku: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: Category;
  subCategory?: SubCategory;
  stock: number;
  featured?: boolean;
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface CartStore {
  items: CartItem[];
  addItem: (product: Product, variant?: ProductVariant) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export interface ProductFilters {
  category?: Category;
  subCategory?: SubCategory;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'name' | 'newest';
}