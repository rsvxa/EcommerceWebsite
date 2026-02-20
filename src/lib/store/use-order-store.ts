import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "neworder" | "delivered" | "shipped" | "cancelled";
  items: any[];
  total: number;
  customer: any;
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) => set((state) => ({ 
        orders: [order, ...state.orders] 
      })),
    }),
    { name: 'order-history-storage' }
  )
);