"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';
import { SearchX, LayoutGrid, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { ScrollArea } from "../../components/ui/scroll-area";

interface ProductGridProps {
  products: Product[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export function ProductGrid({ products }: ProductGridProps) {
  const { lang } = useLanguage();
  const t = translations[lang].products;

  const limitedProducts = products.slice(0, 7);
  const hasMore = products.length > 7;

  if (products.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[100px] flex-col items-center justify-center p-8 text-center"
      >
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-ping rounded-full bg-zinc-100 opacity-75" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-2xl">
            <SearchX className="h-10 w-10 text-zinc-300" />
          </div>
        </div>
        <div className="max-w-xs space-y-4">
          <h3 className="text-2xl font-black uppercase tracking-tighter text-zinc-900">{t.noFound}</h3>
          <p className="text-sm font-medium leading-relaxed text-zinc-400 italic">"{t.noFoundDesc}"</p>
          <Button 
            variant="outline" 
            className="rounded-full border-zinc-900 px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em]"
            onClick={() => window.location.reload()}
          >
            Reset Search
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
          {lang === 'kh' ? 'បង្ហាញ' : 'Showing'} <span className="text-zinc-900">{limitedProducts.length}</span> {lang === 'kh' ? 'ផលិតផលដំបូង' : 'Masterpieces'}
        </p>
      </div>

      {/* Main Grid (Max 7) */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {limitedProducts.map((product) => (
            <motion.div key={product.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <ProductCard product={product} />
            </motion.div>
          ))}

          {hasMore && (
            <Sheet>
              <SheetTrigger asChild>
                <motion.div 
                  whileHover={{ scale: 0.98 }}
                  className="group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[32px] border-2 border-dashed border-zinc-200 bg-zinc-50/50 p-8 transition-all hover:border-zinc-900 hover:bg-white min-h-[200px]"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl transition-transform group-hover:rotate-12">
                    <LayoutGrid size={24} />
                  </div>
                  <div className="mt-6 text-center">
                    <h4 className="text-xl font-black uppercase tracking-tighter italic">+{products.length - 7} More</h4>
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">View All Collection</p>
                  </div>
                  <div className="mt-8 flex items-center gap-2 rounded-full bg-zinc-100 px-6 py-3 text-[10px] font-black uppercase tracking-widest group-hover:bg-zinc-900 group-hover:text-white transition-all">
                    See More <ArrowRight size={14} />
                  </div>
                </motion.div>
              </SheetTrigger>

              <SheetContent className="w-full sm:max-w-[70%] border-none p-0 bg-white">
                <SheetHeader className="p-8 border-b border-zinc-100">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-zinc-900 rounded-2xl text-white italic">
                      <ShoppingBag size={20} />
                    </div>
                    <div>
                      <SheetTitle className="text-2xl font-black uppercase tracking-tighter italic">
                        {lang === 'kh' ? 'ផលិតផលទាំងអស់' : 'All Masterpieces'}
                      </SheetTitle>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Total {products.length} Products Available</p>
                    </div>
                  </div>
                </SheetHeader>

                <ScrollArea className="h-[calc(100vh-140px)] px-8 py-6">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 pb-20">
                    {products.map((product) => (
                      <div key={product.id} className="transform scale-95 origin-center">
                         <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent">
                  <p className="text-[9px] font-black text-center text-zinc-400 uppercase italic tracking-widest">
                    ZWAY Fashion • Luxury Experience
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}