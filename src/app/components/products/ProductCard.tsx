"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Eye, ArrowUpRight } from 'lucide-react';
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
} from "../../../app/components/ui/sheet"; 

import type { Product } from '@/types/product';
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
  const { lang } = useLanguage();
  const t = translations[lang].productCard;
  
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();

  const isFavorited = isInWishlist(product.id);

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

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product);
    if (!isFavorited) {
      toast.success(lang === 'kh' ? "បានរក្សាទុកក្នុងបំណងប្រាថ្នា" : "Added to Wishlist", {
        icon: <Heart className="h-4 w-4 fill-current text-red-500" />,
      });
    }
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
      className="h-full italic"
    >
      <Card className="group relative h-full flex flex-col overflow-hidden border-none bg-transparent shadow-none transition-all duration-500">
        
        {/* Visual Container */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#f6f6f6]">
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
          <div className="absolute left-4 top-4 flex flex-col gap-1 z-10">
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
          <div className="absolute right-4 top-4 flex flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 z-30">
            <button 
              onClick={handleWishlist}
              className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-xl transition-all ${isFavorited ? 'text-red-500' : 'hover:bg-zinc-900 hover:text-white'}`}
            >
              <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
            </button>

            {/* Quick View Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-xl hover:bg-zinc-900 hover:text-white transition-colors">
                  <Eye className="h-5 w-5" />
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-full sm:max-w-[45%] p-0 border-none bg-white flex flex-col italic no-scrollbar">
                <div className="flex-1 overflow-y-auto">
                  {/* Product Gallery */}
                  <div className="relative aspect-[4/5] bg-zinc-100">
                    <img 
                      src={product.images[0]} 
                      className="w-full h-full object-cover" 
                      alt={product.name} 
                    />
                    <div className="absolute top-6 left-6">
                      <Badge className="bg-white/90 backdrop-blur-md text-black font-black uppercase text-[10px] tracking-widest px-4 py-2 border-none">
                        {lang === 'kh' ? 'ការប្រមូលថ្មី ២០២៦' : 'New Collection 2026'}
                      </Badge>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-10 space-y-10 text-left">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          {/* Brand in Quick View */}
                          <p className="text-blue-600 text-[11px] font-black uppercase tracking-[0.2em] mb-1">
                            {product.brand}
                          </p>
                          <h2 className={`text-4xl font-black uppercase tracking-tighter leading-none mb-2 ${lang === 'kh' ? 'text-3xl' : ''}`}>
                            {product.name}
                          </h2>
                          <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em]">
                            Ref. ZW-{product.id}2026
                          </p>
                        </div>
                        <p className="text-3xl font-black tracking-tighter italic shrink-0">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      <p className="text-zinc-500 leading-relaxed text-sm">
                        {product.description}
                      </p>
                    </div>

                    {/* Color Selection */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                        {lang === 'kh' ? 'ជ្រើសរើសពណ៌' : 'Select Color'} — <span className="text-black">Midnight Noir</span>
                      </h4>
                      <div className="flex gap-3">
                        {product.variants.map((variant, idx) => (
                          <button
                            key={idx}
                            className="group relative h-12 w-12 rounded-full border border-zinc-200 p-1 transition-all hover:border-black"
                          >
                            <div 
                              className="h-full w-full rounded-full"
                              style={{ backgroundColor: variant.colorHex }}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Size Selection */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                          {lang === 'kh' ? 'ជ្រើសរើសទំហំ' : 'Select Size'}
                        </h4>
                        <button className="text-[9px] font-black uppercase tracking-widest underline">
                          {lang === 'kh' ? 'តារាងទំហំ' : 'Size Guide'}
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {['XS', 'S', 'M', 'L'].map((size) => (
                          <button
                            key={size}
                            className="h-14 border border-zinc-100 rounded-xl font-black text-xs hover:bg-black hover:text-white transition-all uppercase"
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Product Features */}
                    <div className="grid grid-cols-2 gap-px bg-zinc-100 border border-zinc-100 rounded-2xl overflow-hidden">
                      <div className="p-6 bg-white space-y-1">
                        <p className="text-[9px] font-black uppercase text-zinc-400">{lang === 'kh' ? 'សម្ភារៈ' : 'Material'}</p>
                        <p className="text-xs font-bold uppercase">{lang === 'kh' ? 'កប្បាសប្រណីត ១០០%' : '100% Premium Cotton'}</p>
                      </div>
                      <div className="p-6 bg-white space-y-1">
                        <p className="text-[9px] font-black uppercase text-zinc-400">{lang === 'kh' ? 'ការដឹកជញ្ជូន' : 'Shipping'}</p>
                        <p className="text-xs font-bold uppercase">{lang === 'kh' ? 'ដឹកជញ្ជូនរហ័ស' : 'Express Delivery'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sticky Footer Action */}
                <div className="p-8 border-t border-zinc-50 bg-white/80 backdrop-blur-md">
                  <Button 
                    onClick={handleAddToCart}
                    className="w-full h-16 rounded-2xl bg-black text-white font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <ShoppingCart className="mr-3 h-5 w-5" />
                    {lang === 'kh' ? 'បញ្ជាក់ការជ្រើសរើស' : 'Confirm Selection'} — {formatPrice(product.price)}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
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
        <CardContent className="px-1 py-4 flex-grow text-left">
          {/* BRAND LABEL */}
          <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
            {product.brand}
          </p>
          
          <div className="flex justify-between items-start mb-2">
            <h3 className={`font-black uppercase tracking-tighter text-lg leading-tight text-zinc-900 group-hover:text-black transition-colors ${lang === 'kh' ? 'text-[16px] font-bold' : ''}`}>
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
             <span className="text-[9px] text-zinc-400 font-black uppercase tracking-widest whitespace-nowrap pl-4">
              {lang === 'kh' 
                ? `មានក្នុងស្តុក: ${product.stock}`
                : `${product.stock} items left`}
            </span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}