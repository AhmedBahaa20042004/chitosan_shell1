import { create } from 'zustand';
import { CartItem, Product } from '@/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product: Product) => {
    const items = get().items;
    const existing = items.find(i => i.id === product.id);
    if (existing) {
      set({ items: items.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) });
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] });
    }
  },

  removeItem: (id: string) => {
    set({ items: get().items.filter(i => i.id !== id) });
  },

  updateQuantity: (id: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    set({ items: get().items.map(i => i.id === id ? { ...i, quantity } : i) });
  },

  clearCart: () => set({ items: [] }),

  toggleCart: () => set({ isOpen: !get().isOpen }),

  total: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

  count: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
}));
