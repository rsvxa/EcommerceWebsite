"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';
import { SearchX, LayoutGrid, ArrowRight, ShoppingBag, X } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
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

  // កំណត់ចំនួនផលិតផលបង្ហាញដំបូងឱ្យសមស្របតាម Device (Mobile បង្ហាញតិច Desktop បង្ហាញច្រើន)
  const limitedProducts = products.slice(0, 7);
  const hasMore = products.length > 7;

  if (products.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center"
      >
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-ping rounded-full bg-zinc-100 opacity-75" />
          <div className="relative flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-white shadow-2xl">
            <SearchX className="h-8 w-8 md:h-10 md:w-10 text-zinc-300" />
          </div>
        </div>
        <div className="max-w-xs space-y-4">
          <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-zinc-900">{t.noFound}</h3>
          <p className="text-xs md:text-sm font-medium leading-relaxed text-zinc-400 italic">"{t.noFoundDesc}"</p>
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
      {/* Header - Responsive Text Size */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
          {lang === 'kh' ? 'បង្ហាញ' : 'Showing'} <span className="text-zinc-900">{limitedProducts.length}</span> {lang === 'kh' ? 'ផលិតផលដំបូង' : 'Masterpieces'}
        </p>
      </div>

      {/* Main Grid - Responsive Columns */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {limitedProducts.map((product) => (
            <motion.div key={product.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <ProductCard product={product} />
            </motion.div>
          ))}

          {/* See More Card - Responsive Height */}
          {hasMore && (
            <Sheet>
              <SheetTrigger asChild>
                <motion.div 
                  whileHover={{ scale: 0.98 }}
                  className="group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[24px] md:rounded-[32px] border-2 border-dashed border-zinc-200 bg-zinc-50/50 p-6 md:p-8 transition-all hover:border-zinc-900 hover:bg-white min-h-[250px] md:min-h-[300px]"
                >
                  <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl transition-transform group-hover:rotate-12">
                    <LayoutGrid size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div className="mt-4 md:mt-6 text-center">
                    <h4 className="text-lg md:text-xl font-black uppercase tracking-tighter italic">+{products.length - 7} {lang === 'kh' ? 'ផ្សេងទៀត' : 'More'}</h4>
                    <p className="mt-1 md:mt-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-400">{lang === 'kh' ? 'មើលទាំងអស់' : 'View All Collection'}</p>
                  </div>
                  <div className="mt-6 md:mt-8 flex items-center gap-2 rounded-full bg-zinc-100 px-5 py-2.5 md:px-6 md:py-3 text-[9px] md:text-[10px] font-black uppercase tracking-widest group-hover:bg-zinc-900 group-hover:text-white transition-all">
                   { lang === 'kh' ? 'មើលច្រើនទៀត' : 'See More'} <ArrowRight size={12} className="md:w-3.5 md:h-3.5" />
                  </div>
                </motion.div>
              </SheetTrigger>

              {/* Responsive Sheet Content */}
              <SheetContent side="right" className="w-full sm:max-w-[90%] md:max-w-[75%] lg:max-w-[60%] border-none p-0 bg-white">
                <SheetHeader className="p-6 md:p-8 border-b border-zinc-100 relative">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 md:p-3 bg-zinc-900 rounded-xl md:rounded-2xl text-white italic">
                      <ShoppingBag size={18} className="md:w-5 md:h-5" />
                    </div>
                    <div>
                      <SheetTitle className="text-xl md:text-2xl font-black uppercase tracking-tighter italic">
                        {lang === 'kh' ? 'ផលិតផលទាំងអស់' : 'All Masterpieces'}
                      </SheetTitle>
                      <p className="text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">{lang === 'kh' ? 'សរុប' : 'Total'} {products.length} {lang === 'kh' ? 'ផលិតផល' : 'Products'}</p>
                    </div>
                  </div>
                </SheetHeader>

                <ScrollArea className="h-[calc(100vh-120px)] md:h-[calc(100vh-140px)] px-4 md:px-8 py-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-24">
                    {products.map((product) => (
                      <div key={product.id} className="transition-transform duration-300 hover:scale-[1.02]">
                         <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                {/* Fixed Footer with glass effect */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-white via-white to-transparent">
                    <SheetClose asChild>
                      <Button className="w-full h-16 rounded-2xl bg-black text-white font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-[1.01] active:scale-95 transition-all">
                        {lang === 'kh' ? 'ចាកចេញ' : 'Back'}
                      </Button>
                    </SheetClose>
                  </div>
              </SheetContent>
            </Sheet>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
