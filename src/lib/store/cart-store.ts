import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// កំណត់ Type ឱ្យត្រូវជាមួយទិន្នន័យ MySQL របស់អ្នក
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  brand?: string;
  category?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, color?: string, size?: string) => void;
  removeItem: (productId: number, color?: string, size?: string) => void;
  updateQuantity: (productId: number, quantity: number, color?: string, size?: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

     addItem: (product, color, size) => {
  set((state) => {
    // ឆែកមើល បើ color ជា Object ត្រូវហៅយកតែ property .color មកប្រើ
    const colorName = typeof color === 'object' 
      ? (color as any).color 
      : (color || 'Standard');

    const existingItemIndex = state.items.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedColor === colorName && 
        item.selectedSize === size
    );

    if (existingItemIndex > -1) {
      const newItems = [...state.items];
      newItems[existingItemIndex].quantity += 1;
      return { items: newItems };
    } else {
      return {
        items: [
          ...state.items,
          {
            product,
            quantity: 1,
            selectedColor: colorName, // រក្សាទុកជា String ជានិច្ច
            selectedSize: size || 'M',
          },
        ],
      };
    }
  });
},

      // លុបទំនិញចេញពីរទេះ
      removeItem: (productId, color, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedColor === color &&
                item.selectedSize === size
              )
          ),
        }));
      },

      // កែសម្រួលចំនួនទំនិញ (បូក/ដក)
      updateQuantity: (productId, quantity, color, size) => {
        set((state) => {
          if (quantity <= 0) {
            // បើចំនួនតិចជាង ១ គឺលុបចេញតែម្តង
            return {
              items: state.items.filter(
                (item) =>
                  !(
                    item.product.id === productId &&
                    item.selectedColor === color &&
                    item.selectedSize === size
                  )
              ),
            };
          }

          const newItems = state.items.map((item) => {
            if (
              item.product.id === productId &&
              item.selectedColor === color &&
              item.selectedSize === size
            ) {
              return { ...item, quantity };
            }
            return item;
          });

          return { items: newItems };
        });
      },

      // សម្អាតរទេះទាំងមូល
      clearCart: () => {
        set({ items: [] });
      },

      // គណនាចំនួនទំនិញសរុប (Units)
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      // គណនាតម្លៃសរុប
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'cart-storage', // រក្សាទុកក្នុង localStorage
    }
  )
);