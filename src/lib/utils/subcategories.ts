import type { Category, SubCategory } from '@/types/product';

export const subCategoryMapping: Record<Category, { value: SubCategory; label: { en: string, kh: string } }[]> = {
  CLOTHES: [
    { value: 'TSHIRTS', label: { en: 'T-Shirts', kh: 'អាវយឺត' } },
    { value: 'SHIRTS', label: { en: 'Shirts', kh: 'អាវសាច់ក្រណាត់' } },
    { value: 'DRESSES', label: { en: 'Dresses', kh: 'រ៉ូប' } },
    { value: 'JEANS', label: { en: 'Jeans', kh: 'ខោខូវប៊យ' } },
    { value: 'PANTS', label: { en: 'Pants', kh: 'ខោជើងវែង' } },
    { value: 'HOODIES', label: { en: 'Hoodies', kh: 'អាវរងាមានមួក' } },
    { value: 'SUITS', label: { en: 'Suits', kh: 'អាវធំ/ស៊ុត' } },
  ],
  JEWELRY: [
    { value: 'NECKLACES', label: { en: 'Necklaces', kh: 'ខ្សែករ' } },
    { value: 'EARRINGS', label: { en: 'Earrings', kh: 'ក្រវិល' } },
    { value: 'BRACELETS', label: { en: 'Bracelets', kh: 'ខ្សែដៃ' } },
    { value: 'RINGS', label: { en: 'Rings', kh: 'ចិញ្ចៀន' } },
  ],
  SHOES: [
    { value: 'SNEAKERS', label: { en: 'Sneakers', kh: 'ស្បែកជើងប៉ាតា' } },
    { value: 'HEELS', label: { en: 'Heels', kh: 'ស្បែកជើងកែង' } },
    { value: 'DRESS_SHOES', label: { en: 'Dress Shoes', kh: 'ស្បែកជើងរ៉ូប' } },
  ],
  HATS: [
    { value: 'BASEBALL_CAPS', label: { en: 'Baseball Caps', kh: 'មួកកីឡា' } },
    { value: 'BERETS', label: { en: 'Berets', kh: 'មួកបេរ៉េ' } },
    { value: 'COWBOY_HATS', label: { en: 'Cowboy Hats', kh: 'មួកខូវប៊យ' } },
  ],
  BAGS: [
    { value: 'HANDBAGS', label: { en: 'Handbags', kh: 'កាបូបយួរដៃ' } },
    { value: 'BACKPACKS', label: { en: 'Backpacks', kh: 'កាបូបស្ពាយ' } },
    { value: 'CROSSBODY', label: { en: 'Crossbody', kh: 'កាបូបឆៀង' } },
    { value: 'CLUTCHES', label: { en: 'Clutches', kh: 'កាបូបតូច' } },
    { value: 'WALLETS', label: { en: 'Wallets', kh: 'កាបូបលុយ' } },
  ],
};