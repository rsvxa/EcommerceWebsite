"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/store/use-language';
import { 
  Heart, ShoppingBag, Trash2, 
  Sparkles, ArrowRight 
} from 'lucide-react';

export function Wishlist() {
  const { lang } = useLanguage();

  const wishlistItems = [
    {
      id: 1,
      name: "Luxury Silk Evening Gown",
      price: "$1,850",
      image: "https://images.unsplash.com/photo-1539109132304-391242e973cc?auto=format&fit=crop&q=80&w=400",
      tag: "Limited Edition"
    },
    {
      id: 2,
      name: "Handcrafted Leather Tote",
      price: "$2,200",
      image: "https://images.unsplash.com/photo-1584917033904-493bb3c3995f?auto=format&fit=crop&q=80&w=400",
      tag: "Best Seller"
    }
  ];

  return (
    <div className="space-y-10 p-2">
      {/* Wishlist Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-rose-500">
            <Heart size={14} fill="currentColor" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              {lang === 'kh' ? 'បញ្ជីប្រាថ្នា' : 'Curated Selection'}
            </span>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter italic text-zinc-900">
            {lang === 'kh' ? 'ផលិតផលដែលអ្នកស្រលាញ់' : 'The Wishlist Vault'}
          </h2>
        </div>
        <p className="text-xs font-bold text-zinc-400">
          {wishlistItems.length} {lang === 'kh' ? 'មុខទំនិញ' : 'Exquisite Pieces'}
        </p>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {wishlistItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-zinc-100 shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-zinc-200">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-6">
                  <div className="flex justify-end">
                    <button className="h-10 w-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <button className="w-full py-4 bg-white text-zinc-900 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-zinc-900 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
                    <ShoppingBag size={16} />
                    {lang === 'kh' ? 'បន្ថែមក្នុងកញ្ចប់' : 'Move to Bag'}
                  </button>
                </div>

                {/* Tag */}
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-white/20 shadow-sm">
                  <p className="text-[8px] font-black uppercase tracking-widest text-zinc-900 flex items-center gap-2">
                    <Sparkles size={10} className="text-amber-500" />
                    {item.tag}
                  </p>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-6 px-2 space-y-1">
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-black tracking-tighter text-zinc-900">{item.price}</p>
                  <button className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 flex items-center gap-1 group/link">
                    View <ArrowRight size={10} className="group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State Mockup */}
        {wishlistItems.length === 0 && (
          <div className="col-span-full py-32 flex flex-col items-center justify-center space-y-6 text-center">
            <div className="h-24 w-24 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-200">
              <Heart size={40} />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-zinc-300">Your vault is empty</p>
              <button className="text-[10px] font-black uppercase tracking-widest text-zinc-900 underline underline-offset-8 decoration-2 hover:text-blue-600 transition-colors">
                Explore Collections
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}