import type { Category, SubCategory } from '@/types/product';

export const subCategoryMapping: Record<Category, { value: SubCategory; label: string }[]> = {
  CLOTHES: [
    { value: 'TSHIRTS', label: 'T-Shirts' },
    { value: 'SHIRTS', label: 'Shirts' },
    { value: 'DRESSES', label: 'Dresses' },
    { value: 'JEANS', label: 'Jeans' },
    { value: 'PANTS', label: 'Pants' },
    { value: 'HOODIES', label: 'Hoodies' },
    { value: 'SUITS', label: 'Suits' },
  ],
  JEWELRY: [
    { value: 'NECKLACES', label: 'Necklaces' },
    { value: 'EARRINGS', label: 'Earrings' },
    { value: 'BRACELETS', label: 'Bracelets' },
    { value: 'RINGS', label: 'Rings' },
  ],
  SHOES: [
    { value: 'SNEAKERS', label: 'Sneakers' },
    { value: 'HEELS', label: 'Heels' },
    { value: 'DRESS_SHOES', label: 'Dress Shoes' },
  ],
  HATS: [
    { value: 'BASEBALL_CAPS', label: 'Baseball Caps' },
    { value: 'BERETS', label: 'Berets' },
    { value: 'COWBOY_HATS', label: 'Cowboy Hats' },
  ],
  BAGS: [
    { value: 'HANDBAGS', label: 'Handbags' },
    { value: 'BACKPACKS', label: 'Backpacks' },
    { value: 'CROSSBODY', label: 'Crossbody' },
    { value: 'CLUTCHES', label: 'Clutches' },
    { value: 'WALLETS', label: 'Wallets' },
  ],
};

export function getSubCategoriesForCategory(category: Category): { value: SubCategory; label: string }[] {
  return subCategoryMapping[category] || [];
}

export function formatSubCategory(subCategory: SubCategory): string {
  const allSubCategories = Object.values(subCategoryMapping).flat();
  const found = allSubCategories.find((s) => s.value === subCategory);
  return found?.label || subCategory;
}
