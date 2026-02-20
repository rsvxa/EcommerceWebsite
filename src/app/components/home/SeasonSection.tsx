"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, Wind, Sun, Leaf, Snowflake, 
  Sparkles, Plus, ImageIcon, ShoppingBag, ShoppingCart 
} from 'lucide-react';
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
import { mockProducts } from '@/lib/data/products'; 

const SEASON_CONFIG = [
  {
    id: "Spring",
    subCategory: "SHIRTS",
    icon: <Wind className="text-emerald-500" size={24} />,
    accent: "bg-emerald-50 text-emerald-600",
    bgText: "SPRING",
    image: "https://i.pinimg.com/1200x/7d/2d/50/7d2d50b00ed5265c70c0b17b8963a853.jpg",
    tag: { en: "Fresh & Airy", kh: "ស្រស់ស្រាយ & ស្រាលស្រទន់" },
    title: { en: "Floral Bloom Collection", kh: "បណ្តុំម៉ូដបុប្ផារីក" },
    desc: { en: "Lightweight fabrics and pastel colors.", kh: "សាច់ក្រណាត់ស្រាលស្រទន់ និងពណ៌បែបធម្មជាតិ។" },
    lookbook: [
      "https://i.pinimg.com/736x/12/74/92/12749252e964112f7b1d469221acd537.jpg",
      "https://i.pinimg.com/736x/1f/d1/58/1fd15897907abc8d13efafc6f4bb968c.jpg"
    ]
  },
  {
    id: "Summer",
    subCategory: "TSHIRTS",
    icon: <Sun className="text-orange-500" size={24} />,
    accent: "bg-orange-50 text-orange-600",
    bgText: "SUMMER",
    image: "https://i.pinimg.com/736x/9b/fb/65/9bfb65d128921b9afc4d85729050185a.jpg",
    tag: { en: "Hot Trends", kh: "ម៉ូដទាន់សម័យបំផុត" },
    title: { en: "Sun-Kissed Essentials", kh: "ម៉ូដចាំបាច់សម្រាប់រដូវក្ដៅ" },
    desc: { en: "Stay cool with premium cotton.", kh: "រក្សាភាពត្រជាក់ជាមួយសាច់កប្បាសកម្រិតខ្ពស់។" },
    lookbook: ["https://images.unsplash.com/photo-1523381210434-271e8be1f52b"]
  },
  {
    id: "Autumn",
    subCategory: "SUITS",
    icon: <Leaf className="text-amber-700" size={24} />,
    accent: "bg-amber-50 text-amber-700",
    bgText: "AUTUMN",
    image: "https://i.pinimg.com/736x/57/cf/75/57cf75cdc8900dff4024b25952eba146.jpg",
    tag: { en: "Cozy Style", kh: "ស្ទីលបែបកក់ក្ដៅ" },
    title: { en: "Golden Leaf Layers", kh: "ម៉ូដស្រទាប់ស្លឹកឈើជ្រុះ" },
    desc: { en: "Perfectly balanced elegance.", kh: "ភាពថ្លៃថ្នូរដែលមានតុល្យភាពល្អឥតខ្ចោះ។" },
    lookbook: ["https://images.unsplash.com/photo-1520975954732-35dd22299614"]
  },
  {
    id: "Winter",
    subCategory: "HOODIES",
    icon: <Snowflake className="text-blue-500" size={24} />,
    accent: "bg-blue-50 text-blue-600",
    bgText: "WINTER",
    image: "https://i.pinimg.com/736x/7b/d2/ac/7bd2ac379b2722c7f48635a568003111.jpg",
    tag: { en: "Warm & Chic", kh: "កក់ក្ដៅ & ទាន់សម័យ" },
    title: { en: "Urban Arctic Gear", kh: "ម៉ូដរដូវរងាបែបយុវវ័យ" },
    desc: { en: "Heavy-duty warmth meets fashion.", kh: "ភាពកក់ក្ដៅបូករួមនឹងម៉ូដទាន់សម័យបំផុត។" },
    lookbook: ["https://images.unsplash.com/photo-1483985988355-763728e1935b"]
  }
];

export function SeasonSection() {
  const [activeSeason, setActiveSeason] = useState("Spring");
  const { lang } = useLanguage();
  const t = translations[lang].seasonal;
  const addItem = useCartStore((state) => state.addItem);

  const currentSeason = useMemo(() => {
    const config = SEASON_CONFIG.find(s => s.id === activeSeason) || SEASON_CONFIG[0];
    const filteredProducts = mockProducts.filter(p => p.subCategory === config.subCategory);
    return { ...config, products: filteredProducts };
  }, [activeSeason]);

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock === 0) return;
    addItem(product);
    
    toast.success(lang === 'kh' ? 'បន្ថែមជោគជ័យ!' : 'Added to Cart', {
      description: lang === 'kh' 
        ? `${product.name} ត្រូវបានដាក់ចូលក្នុងកន្ត្រក។`
        : `${product.name} has been added to your cart.`,
      icon: <ShoppingCart className="h-4 w-4 text-emerald-500" />,
      position: "bottom-center",
    });
  };

  return (
    <section className="py-24 bg-white overflow-hidden italic">
      <div className="flex flex-col items-center text-center mb-16 select-none pointer-events-none">
        <h2 className="text-4xl font-black uppercase tracking-[0.5em] text-zinc-100 opacity-60">
          {currentSeason.bgText}
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="flex items-center justify-center gap-2 text-black text-[13px] font-black uppercase tracking-[0.4em] mb-4">
              <Sparkles size={14} /> {lang === 'kh' ? 'វដ្តនៃស្ទីលទាន់សម័យ' : 'The Cycle of Style'}
            </span>
            <h2 className={`text-5xl md:text-6xl font-black uppercase tracking-tighter leading-tight text-zinc-900 ${lang === 'kh' ? 'font-freehand' : ''}`}>
              {t.heading}
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center bg-zinc-50 p-1.5 rounded-full border border-zinc-100 shadow-sm gap-2">
            {SEASON_CONFIG.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSeason(item.id)}
                className={`px-6 md:px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 flex items-center gap-2 ${
                  activeSeason === item.id 
                  ? "bg-black text-white shadow-xl scale-105" 
                  : "text-zinc-400 hover:text-black"
                }`}
              >
                {activeSeason === item.id && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />}
                {t.seasons[item.id as keyof typeof t.seasons]}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSeason}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col lg:flex-row gap-16 items-center"
          >
            {/* Image Preview */}
            <div className="w-full lg:w-1/2 relative group">
              <div className="overflow-hidden rounded-[40px] shadow-2xl aspect-[3/4] md:h-[650px] w-full border border-zinc-100">
                <motion.img 
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  src={currentSeason.image} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              <div className={`absolute -bottom-6 -right-6 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-xl border border-white/20 ${currentSeason.accent}`}>
                <div className="flex items-center gap-4">
                   <div className="bg-white p-3 rounded-2xl shadow-sm">{currentSeason.icon}</div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Status</p>
                      <p className="text-sm font-black uppercase tracking-widest">{currentSeason.tag[lang]}</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Information */}
            <div className="w-full lg:w-1/2 space-y-10 text-left">
              <div className="space-y-4">
                <h3 className={`text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase ${lang === 'kh' ? 'font-freehand py-2' : ''}`}>
                  {currentSeason.title[lang]}
                </h3>
                <p className="text-zinc-500 text-xl leading-relaxed max-w-lg font-medium italic">
                  "{currentSeason.desc[lang]}"
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="flex items-center justify-center gap-4 bg-black text-white px-10 py-5 rounded-2xl font-black uppercase text-[12px] tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-lg group">
                      <span>{t.shopSelection}</span>
                      <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform" />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:max-w-[450px] border-none bg-zinc-50 p-0 shadow-2xl italic">
                    <div className="h-full flex flex-col">
                      <SheetHeader className="p-8 bg-white border-b border-zinc-100">
                        <div className="flex items-center gap-3 mb-2 text-zinc-400">
                           <ShoppingBag size={18} />
                           <span className="text-[10px] font-black uppercase tracking-[0.3em]">ZWAY Selection</span>
                        </div>
                        <SheetTitle className="text-3xl font-black uppercase tracking-tighter">
                          {lang === 'kh' ? `ហាងទំនិញ ${t.seasons[activeSeason as keyof typeof t.seasons]}` : `${activeSeason} Store`}
                        </SheetTitle>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                          {currentSeason.products.length} {lang === 'kh' ? 'ផលិតផលត្រូវបានរកឃើញ' : 'Masterpieces Found'}
                        </p>
                      </SheetHeader>

                      <ScrollArea className="flex-1 p-6">
                        <div className="space-y-4">
                          {currentSeason.products.map((product) => (
                            <div key={product.id} className="flex gap-5 p-4 bg-white rounded-[24px] border border-zinc-100 group/item transition-all hover:shadow-md">
                              <div className="w-20 h-24 rounded-xl bg-zinc-50 overflow-hidden shrink-0">
                                <img src={product.images[0]} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" alt={product.name} />
                              </div>
                              <div className="flex flex-col justify-center flex-1">
                                <h4 className="font-black uppercase text-[12px] tracking-tight mb-1">{product.name}</h4>
                                <p className="text-zinc-400 font-black text-[12px] mb-3">${product.price}</p>
                                <Button 
                                  disabled={product.stock === 0}
                                  onClick={(e) => handleAddToCart(e, product)}
                                  className="w-fit rounded-xl bg-zinc-950 h-8 text-[9px] font-black uppercase tracking-widest hover:bg-zinc-800 disabled:opacity-50"
                                >
                                  {product.stock === 0 ? (lang === 'kh' ? 'អស់ពីស្តុក' : 'Sold Out') : (
                                    <><Plus size={12} className="mr-1" /> {lang === 'kh' ? 'បន្ថែម' : 'Add to Cart'}</>
                                  )}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </SheetContent>
                </Sheet>

                <Sheet>
                  <SheetTrigger asChild>
                    <button className="flex items-center justify-center gap-4 bg-white border-2 border-black text-black px-10 py-5 rounded-2xl font-black uppercase text-[12px] tracking-widest hover:bg-zinc-50 transition-all">
                      {t.viewLookbook} <ImageIcon size={18} />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:max-w-[450px] border-none p-0 bg-zinc-950 text-white overflow-hidden italic">
                    <ScrollArea className="h-full">
                      <div className="p-10 space-y-10">
                        <div className="space-y-2">
                          <SheetTitle className="text-5xl font-black uppercase tracking-tighter text-white italic">Lookbook</SheetTitle>
                          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em]">Editorial Style Guide — 2026</p>
                        </div>
                        <div className="space-y-6">
                          {currentSeason.lookbook?.map((img, i) => (
                            <motion.img 
                              key={i} 
                              initial={{ opacity: 0, y: 20 }} 
                              whileInView={{ opacity: 1, y: 0 }} 
                              src={img} 
                              className="w-full rounded-[2rem] shadow-2xl border border-white/5 grayscale hover:grayscale-0 transition-all duration-700" 
                            />
                          ))}
                        </div>
                      </div>
                    </ScrollArea>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Stats Footer */}
              <div className="pt-12 border-t border-zinc-100 flex items-center gap-12">
                <div className="space-y-1">
                  <p className="text-[11px] font-black uppercase text-zinc-400 tracking-widest">{t.availability}</p>
                  <p className="text-xl font-black uppercase tracking-tighter text-zinc-900">{t.limited}</p>
                </div>
                <div className="w-px h-10 bg-zinc-100" />
                <div className="space-y-1">
                  <p className="text-[11px] font-black uppercase text-zinc-400 tracking-widest">{t.shipping}</p>
                  <p className="text-xl font-black uppercase tracking-tighter text-zinc-900">{t.worldwide}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ScrollArea({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={`overflow-y-auto overflow-x-hidden scrollbar-hide ${className}`}>{children}</div>;
}