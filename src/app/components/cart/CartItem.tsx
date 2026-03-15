"use client";

import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { formatPrice } from '@/lib/utils/format';
import { useCartStore } from '@/lib/store/cart-store';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';
import { motion } from 'framer-motion';

interface CartItemProps {
  item: {
    product: {
      id: number;
      name: string;
      price: number;
      image: string;
    };
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
  };
}

export function CartItem({ item }: CartItemProps) {
  const { lang } = useLanguage();
  const t = translations[lang].cart;
  const { updateQuantity, removeItem } = useCartStore();

  if (!item.product) return null;

  const handleIncrement = () => {
    updateQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize);
    }
  };

  const handleRemove = () => {
    const confirmMessage = lang === 'kh' 
      ? `តើអ្នកប្រាកដថាចង់លុប "${item.product.name}" ពីក្នុងរទេះមែនទេ?` 
      : `Are you sure you want to remove "${item.product.name}" from the cart?`;

    if (window.confirm(confirmMessage)) {
      removeItem(item.product.id, item.selectedColor, item.selectedSize);
    }
  };

  const safeColor = item.selectedColor ? String(item.selectedColor).toLowerCase() : 'transparent';

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex gap-6 py-6 border-b border-zinc-100 last:border-0 group relative italic"
    >
      <div className="relative h-32 w-28 shrink-0 overflow-hidden rounded-2xl bg-zinc-50 border border-zinc-100/50 shadow-sm">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="flex flex-1 flex-col justify-between py-1">
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-1.5">
              <h3 className="font-black text-zinc-900 text-[13px] uppercase tracking-tighter line-clamp-1 leading-tight">
                {item.product.name}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {item.selectedSize && (
                  <span className="inline-flex items-center px-2 py-1 rounded-lg bg-zinc-100 text-zinc-600 text-[9px] font-black uppercase tracking-widest border border-zinc-200/50">
                    {item.selectedSize}
                  </span>
                )}
                
                {item.selectedColor && (
                  <div className="inline-flex items-center gap-2 px-2 py-1 rounded-lg bg-zinc-900 text-white text-[9px] font-black uppercase tracking-widest shadow-sm">
                    <div 
                      className="h-2 w-2 rounded-full ring-2 ring-white/20" 
                      style={{ backgroundColor: safeColor }}
                    />
                    {String(item.selectedColor)}
                  </div>
                )}
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="h-8 w-8 text-zinc-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <p className="font-black text-zinc-900 text-[15px] tracking-tight">
            {formatPrice(item.product.price)}
          </p>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div className="flex items-center bg-zinc-100/50 rounded-xl p-1 border border-zinc-200/50">
            <button
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
              className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm transition-all disabled:opacity-20 text-zinc-600 active:scale-90"
            >
              <Minus className="h-3 w-3" />
            </button>
            
            <span className="w-10 text-center text-[11px] font-black text-zinc-900 select-none">
              {item.quantity}
            </span>
            
            <button
              onClick={handleIncrement}
              className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm transition-all text-zinc-600 active:scale-90"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <div className="text-right">
            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-0.5">
              {lang === 'kh' ? 'តម្លៃសរុប' : 'Subtotal'}
            </p>
            <p className="font-black text-zinc-950 text-lg tracking-tighter leading-none">
              {formatPrice(item.product.price * item.quantity)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}