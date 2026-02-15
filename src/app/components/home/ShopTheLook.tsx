"use client";

import React, { useState } from 'react';
import { Plus, ShoppingBag, ArrowRight, ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";

export function ShopTheLook() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const { lang } = useLanguage();
  const t = translations[lang].shopLook;

  const LOOK_PRODUCTS = [
    { id: 1, name: "Creamy White", price: "$24.00", top: "36%", left: "50%" },
    { id: 2, name: "Trouser", price: "$63.00", top: "55%", left: "40%" },
    { id: 3, name: "Nude/Tan bag", price: "$85.00", top: "78%", left: "65%" },
    { id: 4, name: "Long Coat", price: "$125.00", top: "70%", left: "33%" }
  ];

  const LOOKBOOK_IMAGES = [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000",
    "https://images.unsplash.com/photo-1475180098004-ca77a66827be?q=80&w=1000"
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* Left Side: Interactive Image Showcase */}
          <div className="relative w-full md:w-1/2 aspect-[3/4] overflow-hidden rounded-lg shadow-2xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            >
              <img 
                src="https://i.pinimg.com/736x/de/cc/cd/decccd1f0765a2020efc0a491c9a358a.jpg?q=80&w=1000" 
                alt="High Fashion Editorial"
                className="w-full h-full object-cover"
              />
              
              {/* Hotspot Markers */}
              {LOOK_PRODUCTS.map((product) => (
                <div 
                  key={product.id}
                  style={{ top: product.top, left: product.left }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                >
                  <button
                    onClick={() => setActiveId(activeId === product.id ? null : product.id)}
                    className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all shadow-lg ${
                      activeId === product.id 
                      ? "bg-black text-white rotate-45" 
                      : "bg-white/30 backdrop-blur-md border border-white/40 text-white hover:bg-white hover:text-black"
                    }`}
                  >
                    <Plus size={20} />
                  </button>

                  <AnimatePresence>
                    {activeId === product.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        className="absolute bottom-14 left-1/2 -translate-x-1/2 w-56 bg-white/90 backdrop-blur-2xl p-5 shadow-2xl rounded-xl z-30 border border-white"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-[11px] font-black uppercase tracking-widest text-zinc-900 leading-tight">{product.name}</h4>
                          <span className="text-[10px] font-bold text-black">{product.price}</span>
                        </div>
                        <button className="flex items-center gap-3 bg-zinc-900 text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-3 w-full justify-center rounded-lg hover:bg-black transition-all">
                          <ShoppingBag size={12} /> {t.addToCart}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Side: Editorial Content */}
          <div className="w-full md:w-1/2 space-y-10 text-center md:text-left">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-sm font-black uppercase tracking-[0.5em] text-gray-400">
                  {t.tagline}
                </span>
                <h2 className={`text-6xl font-black uppercase tracking-tighter leading-none mt-4 ${lang === 'kh' ? 'font-freehand py-2' : ''}`}>
                  {t.title}
                </h2>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                className="text-gray-500 text-lg leading-relaxed max-w-md mx-auto md:mx-0 italic"
              >
                "{t.desc}"
              </motion.p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8">
              {/* ប៊ូតុងបើក Full Lookbook ជាមួយ Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <button className="group flex items-center justify-center gap-6 bg-black text-white px-10 py-6 rounded-sm font-black uppercase text-[13px] tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-2xl">
                    <span>{t.btnFull}</span>
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </SheetTrigger>
                
                <SheetContent side="right" className="w-full sm:max-w-[40%] border-none p-0 bg-zinc-50 overflow-hidden">
                  <div className="h-full flex flex-col">
                    <SheetHeader className="p-10 bg-white border-b border-zinc-100">
                      <SheetTitle className="text-4xl font-black uppercase tracking-tighter italic">
                        Editorial Lookbook
                      </SheetTitle>
                      <p className="text-zinc-400 text-xs font-bold uppercase tracking-[0.3em]">
                        Season 2026 — Volume 01
                      </p>
                    </SheetHeader>

                    {/* បញ្ជីរូបភាព Lookbook ក្នុង Sheet */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                      {LOOKBOOK_IMAGES.map((img, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-lg group"
                        >
                          <img 
                            src={img} 
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" 
                            alt={`Lookbook ${index}`} 
                          />
                          <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-[10px] font-black uppercase tracking-widest">Shot 0{index + 1}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="p-8 bg-white border-t border-zinc-100">
                      <Button className="w-full h-14 rounded-xl bg-black text-white font-black uppercase tracking-widest hover:bg-zinc-800">
                        Shop All Pieces
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              
              {/* Social Proof */}
              <div className="flex flex-col items-center md:items-start gap-2">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-zinc-200">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-black uppercase tracking-tighter text-zinc-400">Join +12k Styled Users</p>
              </div>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-zinc-100">
              <div className="space-y-1">
                <p className="text-[11px] font-black text-zinc-400 uppercase tracking-widest">Tailored</p>
                <p className="text-lg font-bold text-zinc-900 tracking-tight">Perfect Fit</p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-black text-zinc-400 uppercase tracking-widest">Shipping</p>
                <p className="text-lg font-bold text-zinc-900 tracking-tight">Worldwide</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}