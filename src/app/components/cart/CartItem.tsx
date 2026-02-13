"use client";

import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import type { CartItem as CartItemType } from '@/types/product';
import { formatPrice } from '@/lib/utils/format';
import { useCartStore } from '@/lib/store/cart-store';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { lang } = useLanguage();
  const t = translations[lang].cartItem;
  const { updateQuantity, removeItem } = useCartStore();

  const handleIncrement = () => {
    updateQuantity(
      item.product.id,
      item.quantity + 1,
      item.selectedVariant?.id
    );
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(
        item.product.id,
        item.quantity - 1,
        item.selectedVariant?.id
      );
    }
  };

  const handleRemove = () => {
    removeItem(item.product.id, item.selectedVariant?.id);
  };

  return (
    <div className="flex gap-4 border-b border-gray-100 py-6 last:border-0 group">
      {/* Product Image */}
      <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
        <img
          src={item.product.images[0]}
          alt={item.product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-bold text-zinc-900 line-clamp-1 hover:text-blue-600 cursor-default transition-colors">
              {item.product.name}
            </h3>
            
            {item.selectedVariant && (
              <div className="mt-1 flex flex-wrap gap-x-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                <span>{t.size}: {item.selectedVariant.size}</span>
                <span>•</span>
                <span>{t.color}: {item.selectedVariant.color}</span>
              </div>
            )}
            
            <p className="mt-2 font-black text-sm text-zinc-800">
              {formatPrice(item.product.price)}
            </p>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            className="h-8 w-8 text-zinc-300 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
            title={t.remove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Quantity Controls & Subtotal */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex items-center rounded-lg border border-zinc-200 bg-white shadow-sm overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDecrement}
              className="h-8 w-8 rounded-none hover:bg-zinc-50 border-r border-zinc-100"
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="w-10 text-center text-xs font-bold text-zinc-700 select-none">
              {item.quantity}
            </span>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleIncrement}
              className="h-8 w-8 rounded-none hover:bg-zinc-50 border-l border-zinc-100"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <div className="flex flex-col items-end">
             <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-tighter">
                {lang === 'kh' ? 'សរុបរង' : 'Subtotal'}
             </span>
             <span className="font-black text-zinc-900">
               {formatPrice(item.product.price * item.quantity)}
             </span>
          </div>
        </div>
      </div>
    </div>
  );
}