"use client";

import React, { useState } from 'react';
import { Plus, ShoppingBag, ArrowRight, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';
import { useCartStore } from '@/lib/store/cart-store'; // ប្រើ useCartStore
import { toast } from 'sonner'; // ប្រើ toast
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
  const addItem = useCartStore((state) => state.addItem); 

  const LOOK_PRODUCTS = [
    { 
      id: 201, 
      name: "Creamy White", 
      price: 24.00, 
      images: ["https://images.unsplash.com/photo-1554568218-0f1715e72254?w=500"], 
      top: "36%", 
      left: "50%",
      stock: 10
    },
    { 
      id: 202, 
      name: "Trouser", 
      price: 63.00, 
      images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500"], 
      top: "55%", 
      left: "40%",
      stock: 5
    },
    { 
      id: 203, 
      name: "Nude/Tan bag", 
      price: 85.00, 
      images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500"], 
      top: "78%", 
      left: "65%",
      stock: 3
    },
    { 
      id: 204, 
      name: "Long Coat", 
      price: 125.00, 
      images: ["https://images.unsplash.com/photo-1539109132314-d4a8c62e4042?w=500"], 
      top: "70%", 
      left: "33%",
      stock: 2
    }
  ];

  const LOOKBOOK_IMAGES = [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000",
    "https://images.unsplash.com/photo-1475180098004-ca77a66827be?q=80&w=1000"
  ];

  // មុខងារ Add to Cart
  const handleAddToCart = (product: any) => {
    if (product.stock === 0) return;

    addItem(product);
    
    toast.success(lang === 'kh' ? 'បន្ថែមជោគជ័យ!' : 'Added to Cart', {
      description: lang === 'kh' 
        ? `${product.name} ត្រូវបានដាក់ចូលក្នុងកន្ត្រក។`
        : `${product.name} has been added to your cart.`,
      icon: <ShoppingCart className="h-4 w-4 text-emerald-500" />,
      position: "bottom-center",
    });
    
    setActiveId(null); // បិទ Popover បន្ទាប់ពី Add រួច
  };

  return (
    <section className="py-24 bg-white italic">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* Left Side: Interactive Image Showcase */}
          <div className="relative w-full md:w-1/2 aspect-[3/4] overflow-hidden rounded-[3rem] shadow-2xl border border-zinc-100">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
              className="h-full w-full"
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
                    className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all shadow-lg backdrop-blur-md border ${
                      activeId === product.id 
                      ? "bg-black text-white rotate-45 border-black" 
                      : "bg-white/20 border-white/40 text-white hover:bg-white hover:text-black"
                    }`}
                  >
                    <Plus size={20} />
                    <span className="absolute inset-0 rounded-full bg-white/20 animate-ping -z-10" />
                  </button>

                  <AnimatePresence>
                    {activeId === product.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        className="absolute bottom-14 left-1/2 -translate-x-1/2 w-60 bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[2rem] z-30 border border-zinc-50"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <h4 className="text-[12px] font-black uppercase tracking-tight text-zinc-900 leading-none">{product.name}</h4>
                            <p className="text-[10px] font-bold text-zinc-400 mt-1">${product.price.toFixed(2)}</p>
                          </div>
                          <div className="w-10 h-10 rounded-xl bg-zinc-50 overflow-hidden shrink-0">
                             <img src={product.images[0]} className="w-full h-full object-cover" alt={product.name} />
                          </div>
                        </div>
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="flex items-center gap-3 bg-zinc-950 text-white text-[10px] font-black uppercase tracking-widest px-4 py-3 w-full justify-center rounded-xl hover:bg-black transition-all group"
                        >
                          <ShoppingBag size={14} className="group-hover:scale-110 transition-transform" /> 
                          {t.addToCart}
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
                <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] mt-4 text-zinc-900">
                  {t.title}
                </h2>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                className="text-gray-500 text-xl leading-relaxed max-w-md mx-auto md:mx-0 font-medium"
              >
                "{t.desc}"
              </motion.p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="group flex items-center justify-center gap-6 bg-zinc-900 text-white px-10 py-6 rounded-2xl font-black uppercase text-[12px] tracking-[0.2em] hover:bg-black transition-all shadow-2xl">
                    <span>{t.btnFull}</span>
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </SheetTrigger>
                
                <SheetContent side="right" className="w-full sm:max-w-[450px] border-none p-0 bg-zinc-50 overflow-hidden italic">
                  <div className="h-full flex flex-col">
                    <SheetHeader className="p-10 bg-white border-b border-zinc-100">
                      <SheetTitle className="text-4xl font-black uppercase tracking-tighter italic">
                        Editorial
                      </SheetTitle>
                      <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em]">
                        Season 2026 — Vol. 01
                      </p>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                      {LOOKBOOK_IMAGES.map((img, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lg group border border-white"
                        >
                          <img 
                            src={img} 
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" 
                            alt={`Lookbook ${index}`} 
                          />
                        </motion.div>
                      ))}
                    </div>

                    <div className="p-8 bg-white border-t border-zinc-100">
                      <Button className="w-full h-15 py-7 rounded-2xl bg-zinc-900 text-white font-black uppercase tracking-[0.2em] text-[11px] hover:bg-black">
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
            <div className="grid grid-cols-2 gap-8 pt-10 border-t border-zinc-100">
              <div className="space-y-1">
                <p className="text-[11px] font-black text-zinc-400 uppercase tracking-widest leading-none">Tailored</p>
                <p className="text-xl font-black text-zinc-900 tracking-tighter uppercase">Perfect Fit</p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-black text-zinc-400 uppercase tracking-widest leading-none">Shipping</p>
                <p className="text-xl font-black text-zinc-900 tracking-tighter uppercase">Worldwide</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}