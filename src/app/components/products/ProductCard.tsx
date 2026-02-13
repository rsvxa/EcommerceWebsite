"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Eye, ArrowUpRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/app/components/ui/card';
import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils/format';
import { useCartStore } from '@/lib/store/cart-store';
import { toast } from 'sonner';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang].productCard;
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const variant = product.variants.length > 0 ? product.variants[0] : undefined;
    addItem(product, variant);
    
    toast.success(t.addedToCart, {
      description: lang === 'kh' 
        ? `${product.name} ត្រូវបានដាក់ចូលក្នុងកន្ត្រករបស់អ្នក។`
        : `${product.name} has been added to your cart.`,
      icon: <ShoppingCart className="h-4 w-4" />,
    });
  };

  const isLowStock = product.stock > 0 && product.stock < 10;
  const isOutOfStock = product.stock === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full"
    >
      <Card className="group relative h-full flex flex-col overflow-hidden border-none bg-transparent shadow-none transition-all duration-500">
        
        {/* Visual Container */}
        <div className="relative aspect-[3/5] overflow-hidden rounded-[2rem] bg-[#f6f6f6]">
          {/* Image Layer */}
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className={`h-full w-full object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.2,0,0,1)] ${isHovered && product.images[1] ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} alternate`}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.2,0,0,1)] ${isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
            />
          )}

          {/* Luxury Badges */}
          <div className="absolute left-4 top-4 flex flex-col gap-2 z-10">
            {product.featured && (
              <Badge className="bg-zinc-900/80 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest border-none px-3 py-1">
                {t.featured}
              </Badge>
            )}
            {isLowStock && !isOutOfStock && (
              <Badge variant="destructive" className="bg-orange-500 text-white text-[9px] font-black uppercase tracking-widest border-none px-3 py-1">
                {t.lowStock}
              </Badge>
            )}
          </div>

          {/* Right Floating Actions */}
          <div className="absolute right-4 top-4 flex flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-xl hover:bg-zinc-900 hover:text-white transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-xl hover:bg-zinc-900 hover:text-white transition-colors">
              <Eye className="h-5 w-5" />
            </button>
          </div>

          {/* Smart Cart Trigger */}
          <AnimatePresence>
            {isHovered && !isOutOfStock && (
              <motion.div 
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 60, opacity: 0 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="absolute inset-x-4 bottom-4 z-20"
              >
                <Button
                  onClick={handleAddToCart}
                  className="w-full h-14 rounded-2xl bg-white/90 backdrop-blur-xl text-zinc-900 font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl hover:bg-zinc-900 hover:text-white border-none transition-all"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {t.addToCart}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {isOutOfStock && (
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
              <span className="px-6 py-2 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full">
                {t.soldOut}
              </span>
            </div>
          )}
        </div>

        {/* Informational Content */}
        <CardContent className="px-1 py-6 flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className={`font-black uppercase tracking-tighter text-lg leading-tight text-zinc-900 group-hover:text-black transition-colors ${lang === 'kh' ? 'text-md font-bold' : ''}`}>
              {product.name}
            </h3>
            <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-black" />
          </div>
          
          <p className="mb-4 line-clamp-2 text-[13px] leading-relaxed text-zinc-400 font-medium italic">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-zinc-900">
              {formatPrice(product.price)}
            </span>

            {/* Micro Color Selectors */}
            {product.variants.length > 0 && (
              <div className="flex -space-x-1">
                {Array.from(new Set(product.variants.map((v) => v.color))).slice(0, 3).map((color, index) => (
                  <div
                    key={index}
                    className="h-4 w-4 rounded-full border-2 border-white shadow-sm transition-transform hover:scale-125 cursor-help"
                    style={{
                      backgroundColor: product.variants.find((v) => v.color === color)?.colorHex || '#ccc',
                    }}
                    title={color}
                  />
                ))}
                {product.variants.length > 3 && (
                  <span className="text-[9px] font-black text-zinc-400 pl-2">+{product.variants.length - 3}</span>
                )}
              </div>
            )}
          </div>
        </CardContent>

        {/* Visual Divider & Stock Info */}
        <CardFooter className="px-1 py-0 pb-4">
          <div className="flex w-full items-center justify-between">
             <div className="h-[2px] flex-grow bg-zinc-100" />
             <span className="text-[9px] text-zinc-400 font-black uppercase tracking-widest whitespace-nowrap">
              {lang === 'kh' 
                ? `${t.inStock} ${product.stock}`
                : `${product.stock} items left`}
            </span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}