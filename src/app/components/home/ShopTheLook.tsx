"use client";

import React, { useState } from 'react';
import { Plus, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';

export function ShopTheLook() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const { lang } = useLanguage();
  const t = translations[lang].shopLook;

  const LOOK_PRODUCTS = [
    { id: 1, name: "Creamy White", price: "$249.00", top: "30%", left: "45%" },
    { id: 2, name: "Trouser", price: "$120.00", top: "55%", left: "40%" },
    { id: 3, name: "Nude/Tan bag", price: "$85.00", top: "75%", left: "65%" }
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
                className="w-full h-full object-cover "
              />
              <div className="absolute inset-0 bg-zinc-900/10 group-hover:bg-transparent transition-colors duration-700" />

              {/* Hotspot Markers */}
              {LOOK_PRODUCTS.map((product) => (
                <div 
                  key={product.id}
                  style={{ top: product.top, left: product.left }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                >
                  <button
                    onClick={() => setActiveId(activeId === product.id ? null : product.id)}
                    className={`relative flex items-center justify-center w-8 h-8 bg-black text-white rounded-full hover:scale-110 transition-transform shadow-lg group ${
                      activeId === product.id 
                      ? "bg-black border-blue-400 text-white rotate-45" 
                      : "bg-gray-300/50 border-white/40 text-white hover:bg-white hover:text-black shadow-xl"
                    }`}
                  >
                    <Plus size={20} />
                    <span className={activeId === product.id ? "rotate-45 transition-transform" : "transition-transform"}></span>
                  </button>

                  {/* Glassmorphism Pop-up Card */}
                  <AnimatePresence>
                    {activeId === product.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        className="absolute bottom-14 left-1/2 -translate-x-1/2 w-56 bg-white/80 backdrop-blur-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-xl z-30 border border-white/50"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-[11px] font-black uppercase tracking-widest text-zinc-900 leading-tight pr-4">{product.name}</h4>
                          <span className="text-[10px] font-bold text-black">{product.price}</span>
                        </div>
                        <button className="flex items-center gap-3 bg-gray-200 text-black hover:text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-3 w-full justify-center rounded-2xl hover:bg-gray-800 transition-all active:scale-95">
                          <ShoppingBag size={12} /> {t.addToCart}
                        </button>
                        
                        {/* Pointy Arrow for the card */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/80 backdrop-blur-2xl rotate-45 border-r border-b border-white/50" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Side: Editorial Content */}
          <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-sm font-black uppercase tracking-[0.5em] text-gray-600">
                  {t.tagline}
                </span>
                <h2 className={`text-5xl font-black uppercase tracking-tighter leading-none ${lang === 'kh' ? 'font-freehand py-2' : ''}`}>
                  {t.title}
                </h2>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                className="text-gray-500 leading-relaxed max-w-md mx-auto md:mx-0"
              >
                "{t.desc}"
              </motion.p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <button className="flex items-center justify-center gap-4 bg-black text-white px-12 py-6 rounded-sm font-black uppercase text-[13px] tracking-[0.2em] hover:bg-gray-800 transition-all shadow-lg">
                <span className="relative z-10">{t.btnFull}</span>
              </button>
              
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-zinc-200">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-white bg-zinc-100 flex items-center justify-center text-[10px] font-black">
                  +12k
                </div>
              </div>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="border-l-2 border-zinc-100 pl-6">
                <p className="text-[13px] font-black text-zinc-400 uppercase tracking-widest mb-1">Tailored</p>
                <p className="text-xl font-bold text-zinc-900">Perfect Fit Guarantee</p>
              </div>
              <div className="border-l-2 border-zinc-100 pl-6">
                <p className="text-[13px] font-black text-zinc-400 uppercase tracking-widest mb-1">Eco-Conscious</p>
                <p className="text-xl font-bold text-zinc-900">Sustainable Fabrics</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}