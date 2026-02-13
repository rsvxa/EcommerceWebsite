"use client";

import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/app/components/ui/sheet';
import { Separator } from '@/app/components/ui/separator';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { CartItem } from './CartItem';
import { useCartStore } from '@/lib/store/cart-store';
import { formatPrice } from '@/lib/utils/format';
import { toast } from 'sonner';
import { CheckoutModal } from './CheckoutModal';
// --- បន្ថែម Import ភាសា ---
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { lang } = useLanguage();
  const t = translations[lang].cart;

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { items, getTotalPrice, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleClearCart = () => {
    clearCart();
    toast.success(t.cleared);
  };

  const handleProceedToCheckout = () => {
    onOpenChange(false);
    setTimeout(() => {
      setIsCheckoutOpen(true);
    }, 300);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="flex w-full flex-col sm:max-w-2xl p-8 md:p-12 overflow-y-auto border-l-0 shadow-2xl">
          <SheetHeader className="pb-8">
            <SheetTitle className="flex items-center gap-3 font-black uppercase tracking-tighter text-3xl">
              <ShoppingBag className="h-8 w-8" />
              {t.title} ({itemCount})
            </SheetTitle>
            <SheetDescription className="text-sm mt-2 text-zinc-500">
              {t.desc}
            </SheetDescription>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-6">
              <div className="rounded-full bg-zinc-50 p-10 border border-zinc-100">
                <ShoppingBag className="h-16 w-16 text-zinc-300" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-bold uppercase tracking-widest text-sm">{t.empty}</h3>
                <p className="text-xs text-zinc-400">{t.emptyDesc}</p>
              </div>
              <Button 
                onClick={() => onOpenChange(false)} 
                className="mt-4 bg-black text-white px-10 py-6 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-transform"
              >
                {t.startShopping}
              </Button>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 -mx-2 px-2">
                <div className="space-y-8 py-4">
                  {items.map((item, index) => (
                    <div key={`${item.product.id}-${index}`} className="group">
                      <CartItem item={item} />
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="pt-10 space-y-8 bg-white">
                <Separator className="opacity-50" />
                
                <div className="space-y-4 px-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">{t.subtotal}</span>
                    <span className="font-bold">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">{t.shipping}</span>
                    <span className="text-zinc-400 italic text-[10px]">{t.shippingDesc}</span>
                  </div>
                  
                  <Separator className="my-6 opacity-30" />
                  
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{t.totalAmount}</p>
                      <p className="text-4xl font-black tracking-tighter">{formatPrice(totalPrice)}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <button 
                    onClick={handleProceedToCheckout}
                    className="w-full bg-black text-white h-16 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-zinc-800 transition-all shadow-xl active:scale-[0.98]"
                  >
                    {t.checkout}
                  </button>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => onOpenChange(false)} 
                      className="h-14 rounded-xl font-bold uppercase tracking-widest text-[9px] border-zinc-200"
                    >
                      {t.continue}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleClearCart}
                      className="h-14 rounded-xl font-bold uppercase tracking-widest text-[9px] text-red-500 hover:bg-red-50"
                    >
                      {t.clearAll}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onOpenChange={setIsCheckoutOpen} 
        total={totalPrice} 
        cartItems={items} 
      />
    </>
  );
}