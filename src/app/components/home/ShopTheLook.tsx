"use client";

import React, { useState } from 'react';
import { Plus, ShoppingBag, ArrowRight, ShoppingCart, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';
import { useCartStore } from '@/lib/store/cart-store'; 
import { toast } from 'sonner'; 
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
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang].shopLook;
  const addItem = useCartStore((state) => state.addItem); 

  const LOOK_PRODUCTS = [
    { 
      id: 201, 
      name: lang === 'kh' ? "អាវយឺតព័ណ៌ក្រែម" : "Creamy White", 
      price: 24.00, 
      images: ["https://images.unsplash.com/photo-1554568218-0f1715e72254?w=500"], 
      top: "36%", 
      left: "50%",
      stock: 10
    },
    { 
      id: 202, 
      name: lang === 'kh' ? "ខោសាច់ក្រណាត់" : "Trouser", 
      price: 63.00, 
      images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500"], 
      top: "55%", 
      left: "40%",
      stock: 5
    },
    { 
      id: 203, 
      name: lang === 'kh' ? "កាបូបយួរដៃ" : "Nude/Tan bag", 
      price: 85.00, 
      images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500"], 
      top: "78%", 
      left: "65%",
      stock: 3
    },
    { 
      id: 204, 
      name: lang === 'kh' ? "អាវក្រៅវែង" : "Long Coat", 
      price: 125.00, 
      images: ["https://i.pinimg.com/736x/0f/bd/cc/0fbdccbafbe4113751f3837c1c453bfb.jpg?w=500"], 
      top: "70%", 
      left: "33%",
      stock: 2
    }
  ];

  const handleAddToCart = (product: any) => {
    if (product.stock === 0) return;
    
    addItem({
      ...product,
      image: product.images[0], // ប្រាកដថា image ត្រូវបានបញ្ជូនទៅកាន់ store ត្រឹមត្រូវ
      quantity: 1
    });

    toast.success(lang === 'kh' ? 'បន្ថែមជោគជ័យ!' : 'Added to Cart', {
      description: `${product.name} ${lang === 'kh' ? 'បានដាក់ចូលក្នុងកន្ត្រក' : 'added to your bag.'}`,
      icon: <Check className="h-4 w-4 text-emerald-500" />,
      position: "bottom-right",
    });

    setActiveId(null);
  };

  return (
    <section className="py-24 bg-white italic">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* Left Side: Interactive Image Showcase */}
          <div className="relative w-full md:w-1/2 aspect-[3/4] overflow-hidden rounded-[3rem] shadow-2xl border border-zinc-100 group">
            <motion.div 
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
              className="h-full w-full"
            >
              <img 
                src="https://i.pinimg.com/736x/de/cc/cd/decccd1f0765a2020efc0a491c9a358a.jpg?q=80&w=1000" 
                alt="High Fashion Editorial"
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
              />
              
              {/* Overlay for depth */}
              <div className="absolute inset-0 bg-black/5" />

              {LOOK_PRODUCTS.map((product) => (
                <div 
                  key={product.id}
                  style={{ top: product.top, left: product.left }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                >
                  <button
                    onClick={() => setActiveId(activeId === product.id ? null : product.id)}
                    className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 shadow-lg backdrop-blur-md border ${
                      activeId === product.id 
                      ? "bg-black text-white rotate-45 border-black scale-125" 
                      : "bg-white/30 border-white/50 text-white hover:bg-white hover:text-black hover:scale-110"
                    }`}
                  >
                    <Plus size={20} />
                    <span className="absolute inset-0 rounded-full bg-white/40 animate-ping -z-10" />
                  </button>

                  <AnimatePresence>
                    {activeId === product.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        className="absolute bottom-14 left-1/2 -translate-x-1/2 w-64 bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-[2rem] z-30 border border-zinc-50"
                      >
                        <div className="flex justify-between items-center mb-4 gap-3">
                          <div className="flex-1">
                            <h4 className="text-[12px] font-black uppercase tracking-tight text-zinc-900 leading-tight truncate">{product.name}</h4>
                            <p className="text-[10px] font-bold text-zinc-400 mt-1">${product.price.toFixed(2)}</p>
                          </div>
                          <div className="w-12 h-12 rounded-xl bg-zinc-50 overflow-hidden shrink-0 shadow-inner">
                             <img src={product.images[0]} className="w-full h-full object-cover" alt={product.name} />
                          </div>
                        </div>
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="flex items-center gap-3 bg-zinc-950 text-white text-[10px] font-black uppercase tracking-widest px-4 py-3 w-full justify-center rounded-xl hover:bg-black transition-all group active:scale-95"
                        >
                          <ShoppingBag size={14} className="group-hover:translate-y-[-1px] transition-transform" /> 
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
          <div className="w-full md:w-1/2 space-y-12 text-center md:text-left">
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <span className="text-sm font-black uppercase tracking-[0.5em] text-zinc-300">
                  {t.tagline}
                </span>
                <h2 className={`text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mt-6 text-zinc-900 ${lang === 'kh' ? 'font-freehand py-4' : ''}`}>
                  {t.title}
                </h2>
              </motion.div>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 0.6 }} className="text-zinc-500 text-xl leading-relaxed max-w-md mx-auto md:mx-0 font-medium">
                "{t.desc}"
              </motion.p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-10">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <button className="group flex items-center justify-center gap-8 bg-zinc-900 text-white px-12 py-7 rounded-2xl font-black uppercase text-[12px] tracking-[0.2em] hover:bg-black transition-all shadow-2xl hover:shadow-zinc-300 active:scale-95">
                    <span>{t.btnFull}</span>
                    <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform" />
                  </button>
                </SheetTrigger>
                
                <SheetContent side="right" className="w-full sm:max-w-[90%] md:max-w-[75%] lg:max-w-[60%] border-none p-0 bg-white">
                    <SheetHeader className="p-10 bg-white border-b border-zinc-100 shrink-0">
                      <SheetTitle className="text-5xl font-black uppercase tracking-tighter italic leading-none">
                        Editorial Look
                      </SheetTitle>
                      <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em] mt-2">
                        Shop the curated pieces
                      </p>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto px-8 py-8 space-y-10 no-scrollbar bg-zinc-50/30">
                      <div className="space-y-4">
                        <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl">
                          <img src="https://i.pinimg.com/736x/de/cc/cd/decccd1f0765a2020efc0a491c9a358a.jpg" className="w-full h-full object-cover" alt="Main Look" />
                        </div>
                        <p className="text-center text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em] italic mt-4">SS2026 Editorial Series</p>
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-900 border-b border-zinc-100 pb-4">Featured Items</h3>
                        <div className="grid gap-5">
                          {LOOK_PRODUCTS.map((product) => (
                            <motion.div 
                              key={product.id}
                              whileHover={{ x: 10 }}
                              className="flex items-center gap-5 p-4 bg-white rounded-[2rem] border border-zinc-100 shadow-sm hover:shadow-md transition-all group"
                            >
                              <div className="w-24 h-28 rounded-2xl overflow-hidden bg-zinc-100 shrink-0">
                                <img src={product.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={product.name} />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-[14px] font-black uppercase text-zinc-900 leading-tight">{product.name}</h4>
                                <p className="text-[12px] font-bold text-zinc-400 mt-1">${product.price.toFixed(2)}</p>
                                <button 
                                  onClick={() => handleAddToCart(product)}
                                  className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-900 hover:gap-3 transition-all"
                                >
                                  <Plus size={14} className="text-emerald-500" /> Add to Bag
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="pb-12 pt-4">
                        <Button 
                          variant="outline" 
                          onClick={() => setIsSheetOpen(false)} 
                          className="w-full h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-black text-[11px] border-zinc-200 hover:bg-zinc-900 hover:text-white transition-all shadow-sm"
                        >
                          {lang === 'kh' ? 'បន្តការទិញទំនិញ' : 'Continue Shopping'}
                        </Button>
                      </div>
                    </div>
                </SheetContent>
              </Sheet>
              
              <div className="flex flex-col items-center md:items-start gap-3">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -5, zIndex: 10 }}
                      className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-zinc-200 shadow-lg cursor-pointer"
                    >
                      <img src={`https://i.pravatar.cc/150?img=${i+20}`} alt="user" />
                    </motion.div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-zinc-900 flex items-center justify-center text-[10px] text-white font-black shadow-lg">
                    +12k
                  </div>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Trusted by Global Style Icons</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12 pt-12 border-t border-zinc-100">
              <div className="space-y-2">
                <p className="text-[11px] font-black text-zinc-300 uppercase tracking-[0.3em] leading-none">Craftsmanship</p>
                <p className="text-2xl font-black text-zinc-900 tracking-tighter uppercase italic">Premium Silk</p>
              </div>
              <div className="space-y-2">
                <p className="text-[11px] font-black text-zinc-300 uppercase tracking-[0.3em] leading-none">Global Reach</p>
                <p className="text-2xl font-black text-zinc-900 tracking-tighter uppercase italic">Express Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}