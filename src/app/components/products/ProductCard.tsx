"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Eye, ArrowUpRight, Check, ChevronLeft, X } from 'lucide-react';

import { Button } from '../../../app/components/ui/button';
import { Badge } from '../../../app/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
} from '../../../app/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "../../../app/components/ui/sheet";

import type { Product, ProductVariant } from '@/types/product';
import { formatPrice } from '@/lib/utils/format';
import { useCartStore } from '@/lib/store/cart-store';
import { useWishlistStore } from '@/lib/store/use-wishlist-store';
import { toast } from 'sonner';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants && product.variants.length > 0 
      ? product.variants[0] 
      : { id: 'default', color: (product as any).color || 'Standard', colorHex: (product as any).colorHex || '#000' }
  );
  
  const [selectedSize, setSelectedSize] = useState<string>((product as any).size || 'M');

  const { lang } = useLanguage();
  const t = translations[lang].productCard;
  
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();

  const isFavorited = isInWishlist(product.id);
  
  const currentStock = (product as any).stocks || 0; 
  const isLowStock = currentStock > 0 && currentStock < 10;
  const isOutOfStock = currentStock === 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, selectedVariant.color, selectedSize);
    toast.success(lang === 'kh' ? "បានបញ្ចូលក្នុងកន្ត្រក" : "Added to cart");
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product);
    if (!isFavorited) {
      toast.success(lang === 'kh' ? "បានរក្សាទុកក្នុងបំណងប្រាថ្នា" : "Added to Wishlist", {
        icon: <Heart className="h-4 w-4 fill-current text-red-500" />,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full italic"
    >
      <Card className="group relative h-full flex flex-col overflow-hidden border-none bg-transparent shadow-none transition-all duration-500">
        
        {/* Visual Container */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#f6f6f6]">
          <motion.img
            src={(product as any).image} 
            alt={product.name}
            className={`h-full w-full object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.2,0,0,1)] ${isHovered ? 'scale-110' : 'scale-100'}`}
          />

          {/* Badges */}
          <div className="absolute left-4 top-4 flex flex-col gap-1 z-10">
            {product.featured && (
              <Badge className="bg-black text-white text-[9px] font-black uppercase tracking-widest border-none px-3 py-1 rounded-full">
                {t.featured}
              </Badge>
            )}
            {isLowStock && !isOutOfStock && (
              <Badge variant="destructive" className="bg-orange-500 text-white text-[9px] font-black uppercase tracking-widest border-none px-3 py-1 rounded-full">
                {t.lowStock}
              </Badge>
            )}
          </div>

          {/* Actions: បង្ហាញជានិច្ចលើ Mobile (opacity-100 md:opacity-0) */}
          <div className="absolute right-3 top-3 flex flex-col gap-2 z-30 opacity-100 md:opacity-0 md:translate-x-12 md:group-hover:translate-x-0 md:group-hover:opacity-100 transition-all duration-500">
            <button 
              onClick={handleWishlist}
              className={`flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-2xl bg-white shadow-xl transition-all ${isFavorited ? 'text-red-500' : 'text-zinc-900 hover:bg-zinc-900 hover:text-white'}`}
            >
              <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
            </button>

            <Sheet open={isLookbookOpen} onOpenChange={setIsLookbookOpen}>
              <SheetTrigger asChild>
                <button className="flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-2xl bg-white/90 backdrop-blur-md shadow-xl hover:bg-black hover:text-white transition-all duration-500">
                  <Eye className="h-5 w-5" />
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-full sm:max-w-[50%] p-0 border-none bg-white flex flex-col shadow-2xl">
                <div className="absolute top-16 left-10 z-50 flex items-center gap-2">
                  <SheetClose asChild>
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-zinc-100 text-zinc-900 hover:bg-black hover:text-white transition-all">
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                  </SheetClose>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
                  <div className="relative aspect-[4/5] bg-zinc-50 overflow-hidden">
                    <img 
                      src={(product as any).image} 
                      className="w-full h-full object-cover" 
                      alt={product.name} 
                    />
                  </div>

                  <div className="p-6 md:p-8 space-y-8">
                    <div className="space-y-4 text-left">
                      <div className="space-y-1">
                        <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.3em]">
                          {product.brand}
                        </p>
                        <h2 className={`text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none text-zinc-900`}>
                          {product.name}
                        </h2>
                      </div>
                      <p className="text-2xl font-black tracking-tighter text-zinc-900 italic">
                        {formatPrice(product.price)}
                      </p>
                      <p className="text-zinc-500 leading-relaxed text-sm italic">
                        {product.description}
                      </p>
                    </div>

                    {/* Color Selection */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                        {lang === 'kh' ? 'ជ្រើសរើសពណ៌' : 'Select Color'} — {selectedVariant.color}
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {(product.variants && product.variants.length > 0 ? product.variants : [selectedVariant]).map((variant, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedVariant(variant)}
                            className={`relative h-10 w-10 rounded-full border transition-all duration-300 ${selectedVariant.color === variant.color ? 'border-zinc-900 ring-2 ring-zinc-100' : 'border-zinc-200'}`}
                          >
                            <div 
                              className="h-full w-full rounded-full border-2 border-white"
                              style={{ backgroundColor: variant.colorHex || '#eee' }}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Size Selection */}
                    <div className="space-y-4 text-left">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                        {lang === 'kh' ? 'ជ្រើសរើសទំហំ' : 'Select Size'}
                      </h4>
                      <div className="grid grid-cols-4 gap-2">
                        {['S', 'M', 'L', 'XL'].map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`h-11 rounded-xl font-black text-[10px] uppercase border-2 transition-all 
                              ${selectedSize === size 
                                ? 'bg-black text-white border-black shadow-lg shadow-black/20' 
                                : 'bg-white text-zinc-400 border-zinc-100'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="absolute bottom-0 inset-x-0 p-6 border-t border-zinc-100 bg-white/90 backdrop-blur-xl z-50">
                  <Button 
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className="w-full h-14 md:h-16 rounded-2xl bg-black text-white font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl transition-all disabled:opacity-30"
                  >
                    <ShoppingCart className="mr-3 h-4 w-4" />
                    {lang === 'kh' ? 'បន្ថែមទៅកន្ត្រក' : 'Add to Bag'} — {formatPrice(product.price)}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Quick Add Button (បង្ហាញតែលើ Desktop ពេល Hover) */}
          <AnimatePresence>
            {isHovered && !isOutOfStock && (
              <motion.div 
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 60, opacity: 0 }}
                className="hidden md:block absolute inset-x-4 bottom-4 z-20"
              >
                <Button
                  onClick={handleAddToCart}
                  className="w-full h-14 rounded-2xl bg-white/95 backdrop-blur-xl text-zinc-900 font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl hover:bg-black hover:text-white border-none transition-all"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {t.addToCart}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {isOutOfStock && (
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center z-20">
              <span className="px-6 py-2 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full">
                {t.soldOut}
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <CardContent className="px-1 py-4 flex-grow text-left">
          <div className="flex justify-between items-start mb-1">
            <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em]">
              {product.brand || 'ZWAY'}
            </p>
            {/* បង្ហាញ Check ក្នុង Stock លើ Mobile */}
            <div className="flex items-center gap-1 md:hidden">
               <span className="text-[8px] font-bold text-green-600 uppercase">In Stock</span>
            </div>
          </div>
          
          <div className="flex justify-between items-start mb-2">
            <h3 className={`font-black uppercase tracking-tighter text-lg leading-tight text-zinc-900 line-clamp-1 ${lang === 'kh' ? 'text-[16px]' : ''}`}>
              {product.name}
            </h3>
            <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all hidden md:block" />
          </div>
          
          <p className="mb-4 line-clamp-2 text-[12px] leading-relaxed text-zinc-400 font-medium italic">
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-black text-zinc-900 tracking-tighter italic">
              {formatPrice(product.price)}
            </span>

            <div className="flex items-center gap-1.5">
               <div
                  className="h-2.5 w-2.5 rounded-full border border-zinc-200"
                  style={{ backgroundColor: selectedVariant.colorHex || '#000' }}
                />
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                   {selectedVariant.color}
                </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-1 py-0 pb-4 hidden md:flex">
          <div className="flex w-full items-center justify-between border-t border-zinc-50 pt-4">
             <span className="text-[9px] text-zinc-400 font-black uppercase tracking-[0.2em]">
              {lang === 'kh' ? `ស្តុក: ${currentStock}` : `Stock: ${currentStock}`}
            </span>
            <Check className={`h-3 w-3 ${currentStock > 0 ? 'text-green-500' : 'text-zinc-200'}`} />
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}