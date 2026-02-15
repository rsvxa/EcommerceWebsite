"use client";

import React from 'react';
import { ArrowRight, Plus, ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';
import { motion } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";

export function FeaturedCollections() {
  const { lang } = useLanguage();
  const t = translations[lang].collections;

  const COLLECTIONS = [
    { 
      id: 'streetwear',
      title: t.items.streetwear.title, 
      subtitle: t.items.streetwear.subtitle,
      img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000",
      products: [
        { id: 1, name: "Street Oversized Hoodie", price: "$85.00", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500" },
        { id: 2, name: "Cargo Tech Pants", price: "$120.00", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500" },
        { id: 3, name: "Urban Graphic Tee", price: "$45.00", img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500" },
      ]
    },
    { 
      id: 'essentials',
      title: t.items.essentials.title, 
      subtitle: t.items.essentials.subtitle,
      img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000",
      products: [
        { id: 4, name: "Premium Cotton Tee", price: "$35.00", img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500" },
        { id: 5, name: "Minimalist Chinos", price: "$75.00", img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500" },
      ]
    },
    { 
      id: 'accessories',
      title: t.items.accessories.title, 
      subtitle: t.items.accessories.subtitle,
      img: "https://i.pinimg.com/736x/41/62/42/4162422b15c28a458ce5cd6b6e25380f.jpg?q=80&w=1000",
      products: [
        { id: 6, name: "Signature Cap", price: "$25.00", img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500" },
        { id: 7, name: "Leather Crossbody", price: "$150.00", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500" },
      ]
    },
  ];

  return (
    <section className="pb-24 bg-white">
      <div className="max-w-full mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-gray-400 text-[11px] font-black uppercase tracking-[0.6em] mb-4"
          >
            Spring Summer 2026
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl font-black uppercase tracking-tighter text-zinc-900 leading-[0.85]"
          >
            {t.heading}
          </motion.h2>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLLECTIONS.map((col, index) => (
            <Sheet key={index}>
              <SheetTrigger asChild>
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="relative h-[650px] group cursor-pointer overflow-hidden rounded-[3.5rem] bg-zinc-100"
                >
                  <img 
                    src={col.img} 
                    alt={col.title}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  />
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-10 flex flex-col justify-end">
                    <div className="absolute top-10 right-10 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 rotate-0 group-hover:rotate-90">
                      <Plus size={24} />
                    </div>

                    <p className="text-white/60 text-[12px] font-black uppercase tracking-[0.4em] mb-4 overflow-hidden">
                      <motion.span className="block group-hover:translate-y-0 translate-y-full transition-transform duration-500">
                        {col.subtitle}
                      </motion.span>
                    </p>
                    
                    <h3 className="text-white text-5xl font-black uppercase tracking-tighter leading-none mb-8 overflow-hidden">
                      <motion.span className="block group-hover:translate-y-0 translate-y-full transition-transform duration-700 delay-75">
                        {col.title}
                      </motion.span>
                    </h3>
                    
                    <div className="flex items-center gap-4">
                      <div className="border border-white/30 text-white hover:text-black px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-white transition-colors">
                        {t.browse}
                      </div>
                      <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SheetTrigger>

              <SheetContent side="right" className="w-full sm:max-w-[40%] border-none bg-white p-0 shadow-2xl">
                <div className="h-full flex flex-col">
                  <SheetHeader className="p-8 border-b border-zinc-50">
                    <SheetTitle className="text-3xl font-black uppercase tracking-tighter italic">
                      {col.title}
                    </SheetTitle>
                    <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">
                      {col.products.length} Products Available
                    </p>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    {col.products.map((product) => (
                      <motion.div 
                        key={product.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex gap-6 group"
                      >
                        <div className="w-24 h-32 rounded-3xl bg-zinc-100 overflow-hidden shrink-0 shadow-sm">
                          <img src={product.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex flex-col justify-center flex-1">
                          <h4 className="font-black uppercase text-sm mb-1 tracking-tight">{product.name}</h4>
                          <p className="text-zinc-500 font-bold text-sm mb-4">{product.price}</p>
                          <Button variant="outline" className="w-fit rounded-full h-8 text-[10px] font-black uppercase border-zinc-200 hover:bg-black hover:text-white transition-all gap-2">
                            <Plus size={12} /> Add
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-8 bg-zinc-50 border-t border-zinc-100">
                    <Button className="w-full h-14 rounded-2xl bg-black text-white font-black uppercase tracking-widest hover:bg-zinc-800 transition-all gap-3 shadow-xl shadow-black/10">
                      View Full Collection <ArrowRight size={18} />
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </div>
    </section>
  );
}