"use client";

import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';
import { SearchX, ArrowLeftRotate } from 'lucide-react';
import { Button } from '../ui/button';

interface ProductGridProps {
  products: Product[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function ProductGrid({ products }: ProductGridProps) {
  const { lang } = useLanguage();
  const t = translations[lang].products;

  // Empty State Layout
  if (products.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[500px] flex-col items-center justify-center p-8 text-center"
      >
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-ping rounded-full bg-zinc-100 opacity-75" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-2xl">
            <SearchX className="h-10 w-10 text-zinc-300" />
          </div>
        </div>
        
        <div className="max-w-xs space-y-4">
          <h3 className="text-2xl font-black uppercase tracking-tighter text-zinc-900">
            {t.noFound}
          </h3>
          <p className="text-sm font-medium leading-relaxed text-zinc-400 italic">
            "{t.noFoundDesc}"
          </p>
          
          <div className="pt-4">
            <Button 
              variant="outline"
              className="rounded-full border-zinc-900 px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-900 hover:text-white transition-all"
              onClick={() => window.location.reload()}
            >
              Reset Search
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Result Count Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
          Showing <span className="text-zinc-900">{products.length}</span> Masterpieces
        </p>
      </div>

      {/* Product Grid with Framer Motion */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {products.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}