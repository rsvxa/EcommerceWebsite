import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartStore, CartItem, Product, ProductVariant } from '@/types/product';

/**
 * Zustand store for shopping cart management
 * Features:
 * - Persisted to localStorage
 * - Add/remove items
 * - Update quantities
 * - Calculate totals
 */
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, variant?: ProductVariant) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedVariant?.id === variant?.id
          );

          if (existingItemIndex > -1) {
            // Item already exists, increment quantity
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += 1;
            return { items: newItems };
          } else {
            // Add new item
            return {
              items: [
                ...state.items,
                {
                  product,
                  quantity: 1,
                  selectedVariant: variant,
                },
              ],
            };
          }
        });
      },

      removeItem: (productId: string, variantId?: string) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedVariant?.id === variantId
              )
          ),
        }));
      },

      updateQuantity: (productId: string, quantity: number, variantId?: string) => {
        set((state) => {
          if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            return {
              items: state.items.filter(
                (item) =>
                  !(
                    item.product.id === productId &&
                    item.selectedVariant?.id === variantId
                  )
              ),
            };
          }

          const newItems = state.items.map((item) => {
            if (
              item.product.id === productId &&
              item.selectedVariant?.id === variantId
            ) {
              return { ...item, quantity };
            }
            return item;
          });

          return { items: newItems };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'cart-storage', // localStorage key
    }
  )
);
