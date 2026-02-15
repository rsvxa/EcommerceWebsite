"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, Wind, Sun, Leaf, Snowflake, 
  Sparkles, Plus, ArrowRight, ImageIcon 
} from 'lucide-react';
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

const SEASON_DATA = [
  {
    id: "Spring",
    title: { en: "Floral Bloom Collection", kh: "បណ្តុំម៉ូដផ្ការីក" },
    desc: { 
      en: "Lightweight fabrics and pastel colors to welcome the fresh start of spring.", 
      kh: "សាច់ក្រណាត់ស្រាល និងពណ៌ស្រទន់ ដើម្បីស្វាគមន៍ការចាប់ផ្ដើមថ្មីនៃរដូវផ្ការីក។" 
    },
    image: "https://i.pinimg.com/1200x/7d/2d/50/7d2d50b00ed5265c70c0b17b8963a853.jpg",
    icon: <Wind className="text-emerald-500" size={24} />,
    tag: { en: "Fresh & Airy", kh: "ស្រស់ស្រាយ & ស្រាលស្រទន់" },
    accent: "bg-emerald-50 text-emerald-600",
    bgText: "SPRING",
    products: [
      { id: 1, name: "Floral Silk Scarf", price: "$45.00", img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=300" },
      { id: 2, name: "Pastel Linen Shirt", price: "$75.00", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300" }
    ],
    lookbook: [
      "https://i.pinimg.com/736x/12/74/92/12749252e964112f7b1d469221acd537.jpg?q=80&w=1000",
      "https://i.pinimg.com/736x/1f/d1/58/1fd15897907abc8d13efafc6f4bb968c.jpg?q=80&w=1000",
      "https://i.pinimg.com/1200x/e7/a8/34/e7a8345c1577d313b52c559202d351c6.jpg?q=80&w=1000"
    ]
  },
  {
    id: "Summer",
    title: { en: "Sun-Kissed Essentials", kh: "ម៉ូដសម្រាប់រដូវក្ដៅ" },
    desc: { 
      en: "Stay cool with our premium linen shirts and breathable summer dresses.", 
      kh: "រក្សាភាពត្រជាក់ជាមួយអាវសាច់អំបោះ Premium និងរ៉ូបសម្រាប់រដូវក្ដៅដ៏មានផាសុកភាព។" 
    },
    image: "https://i.pinimg.com/736x/9b/fb/65/9bfb65d128921b9afc4d85729050185a.jpg",
    icon: <Sun className="text-orange-500" size={24} />,
    tag: { en: "Hot Trends", kh: "ម៉ូដទាន់សម័យបំផុត" },
    accent: "bg-orange-50 text-orange-600",
    bgText: "SUMMER",
    products: [
      { id: 3, name: "Linen Beach Dress", price: "$95.00", img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300" }
    ],
    lookbook: [
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000",
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1000"
    ]
  },
  {
    id: "Autumn",
    title: { en: "Golden Leaf Layers", kh: "ម៉ូដសម្រាប់រដូវស្លឹកឈើជ្រុះ" },
    desc: { 
      en: "Perfectly balanced coats and knitwear for those cozy evening walks.", 
      kh: "អាវធំ និងអាវចាក់ដែលមានតុល្យភាពល្អឥតខ្ចោះ សម្រាប់ការដើរលេងនាពេលល្ងាចដ៏កក់ក្ដៅ។" 
    },
    image: "https://i.pinimg.com/736x/57/cf/75/57cf75cdc8900dff4024b25952eba146.jpg",
    icon: <Leaf className="text-amber-700" size={24} />,
    tag: { en: "Cozy Style", kh: "ស្ទីលបែបកក់ក្ដៅ" },
    accent: "bg-amber-50 text-amber-700",
    bgText: "AUTUMN",
    products: [
      { id: 4, name: "Knit Wool Sweater", price: "$120.00", img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300" }
    ],
    lookbook: [
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=1000"
    ]
  },
  {
    id: "Winter",
    title: { en: "Urban Arctic Gear", kh: "ម៉ូដសម្រាប់រដូវរងា" },
    desc: { 
      en: "Heavy-duty warmth meets high-street fashion for the coldest days.", 
      kh: "ភាពកក់ក្ដៅកម្រិតខ្ពស់ បូករួមនឹងម៉ូដទាន់សម័យសម្រាប់ថ្ងៃដែលត្រជាក់បំផុត។" 
    },
    image: "https://i.pinimg.com/736x/7b/d2/ac/7bd2ac379b2722c7f48635a568003111.jpg",
    icon: <Snowflake className="text-blue-500" size={24} />,
    tag: { en: "Warm & Chic", kh: "កក់ក្ដៅ & ទាន់សម័យ" },
    accent: "bg-blue-50 text-blue-600",
    bgText: "WINTER",
    products: [
      { id: 5, name: "Puffer Tech Jacket", price: "$250.00", img: "https://images.unsplash.com/photo-1544923246-77307dd654ca?w=300" }
    ],
    lookbook: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000"
    ]
  }
];

export function SeasonSection() {
  const [activeSeason, setActiveSeason] = useState("Spring");
  const { lang } = useLanguage();
  const t = translations[lang].seasonal;

  const currentSeason = SEASON_DATA.find(s => s.id === activeSeason) || SEASON_DATA[0];

  return (
    <section className="py-24 bg-white overflow-hidden">
      {/* Background Text Label */}
      <div className="flex flex-col items-center text-center mb-16 select-none pointer-events-none">
        <h2 className="text-3xl font-black uppercase tracking-[0.5em] text-zinc-100 opacity-50 italic">
          {currentSeason.bgText}
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="flex items-center justify-center gap-2 text-black text-[13px] font-black uppercase tracking-[0.4em] mb-4">
              <Sparkles size={14} /> The Cycle of Style
            </span>
            <h2 className={`text-5xl md:text-6xl font-black uppercase tracking-tighter leading-tight text-zinc-900 ${lang === 'kh' ? 'font-freehand' : ''}`}>
              {t.heading}
            </h2>
          </motion.div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center bg-gray-50 p-1.5 rounded-full border border-gray-100 shadow-sm gap-2">
            {SEASON_DATA.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSeason(item.id)}
                className={`px-6 md:px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 flex items-center gap-2 ${
                  activeSeason === item.id 
                  ? "bg-black text-white shadow-xl scale-105" 
                  : "text-gray-400 hover:text-black"
                }`}
              >
                {activeSeason === item.id && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />}
                {t.seasons[item.id as keyof typeof t.seasons]}
              </button>
            ))}
          </div>
        </div>

        {/* Content Transition Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSeason}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col lg:flex-row gap-16 items-center"
          >
            {/* Image Showcase */}
            <div className="w-full lg:w-1/2 relative group">
              <div className="overflow-hidden rounded-sm shadow-2xl aspect-[3/4] md:h-[700px] w-full">
                <motion.img 
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                  src={currentSeason.image} 
                  alt={currentSeason.title[lang]}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              
              {/* Status Badge */}
              <div className={`absolute -bottom-6 -right-6 md:right-12 p-8 rounded-[2rem] shadow-2xl backdrop-blur-xl border border-white/20 ${currentSeason.accent}`}>
                <div className="flex items-center gap-4">
                   <div className="bg-white p-3 rounded-2xl shadow-sm">{currentSeason.icon}</div>
                   <div>
                      <p className="text-[11px] font-black uppercase tracking-widest opacity-60">Status</p>
                      <p className="text-md font-black uppercase tracking-widest">{currentSeason.tag[lang]}</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="w-full lg:w-1/2 space-y-10 text-left">
              <div className="space-y-4">
                <h3 className="text-5xl md:text-6xl font-black leading-none tracking-tighter uppercase italic">
                  {currentSeason.title[lang]}
                </h3>
                <p className="text-gray-500 text-xl leading-relaxed max-w-lg italic font-light">
                  "{currentSeason.desc[lang]}"
                </p>
              </div>
              
              {/* Buttons Area */}
              <div className="flex flex-col sm:flex-row gap-5">
                {/* Shop Selection Sheet */}
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="flex items-center justify-center gap-4 bg-black text-white px-10 py-5 rounded-sm font-black uppercase text-[12px] tracking-[0.2em] hover:bg-gray-800 transition-all shadow-lg group">
                      <span>{t.shopSelection}</span>
                      <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform" />
                    </button>
                  </SheetTrigger>
                  
                  <SheetContent side="right" className="w-full sm:max-w-[40%] border-none bg-white p-0 shadow-2xl">
                    <div className="h-full flex flex-col">
                      <SheetHeader className="p-8 border-b border-zinc-50">
                        <SheetTitle className="text-3xl font-black uppercase tracking-tighter italic">
                          {currentSeason.id} Collection
                        </SheetTitle>
                        <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">
                          {currentSeason.products.length} Products Available
                        </p>
                      </SheetHeader>

                      <div className="flex-1 overflow-y-auto p-8 space-y-8">
                        {currentSeason.products.map((product) => (
                          <div key={product.id} className="flex gap-6 group/item">
                            <div className="w-24 h-32 rounded-2xl bg-zinc-100 overflow-hidden shrink-0">
                              <img src={product.img} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" alt={product.name} />
                            </div>
                            <div className="flex flex-col justify-center flex-1">
                              <h4 className="font-black uppercase text-sm mb-1">{product.name}</h4>
                              <p className="text-zinc-500 font-bold text-sm mb-3">{product.price}</p>
                              <Button variant="outline" className="w-fit rounded-full h-8 text-[10px] font-black uppercase gap-2 hover:bg-black hover:text-white transition-all">
                                <Plus size={12} /> Add
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Lookbook Sheet */}
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="flex items-center justify-center gap-4 bg-white border-2 border-black text-black px-10 py-5 rounded-sm font-black uppercase text-[12px] tracking-widest hover:bg-zinc-50 transition-all">
                      {t.viewLookbook} <ImageIcon size={18} />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:max-w-[40%] border-none p-0 bg-zinc-900 text-white overflow-y-auto">
                    <SheetHeader className="p-10 sticky top-0 bg-zinc-900/90 backdrop-blur-md z-10 border-b border-white/10">
                      <SheetTitle className="text-4xl font-black uppercase tracking-tighter text-white italic">
                        {currentSeason.id} Lookbook
                      </SheetTitle>
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] italic">Editorial Style Guide — 2026</p>
                    </SheetHeader>
                    
                    <div className="p-6 space-y-6">
                      {currentSeason.lookbook?.map((img, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, scale: 0.9 }} 
                          whileInView={{ opacity: 1, scale: 1 }} 
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <img 
                            src={img} 
                            className="w-full rounded-sm grayscale hover:grayscale-0 transition-all duration-700 cursor-crosshair shadow-2xl border border-white/5" 
                            alt={`lookbook-${i}`} 
                          />
                        </motion.div>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Footer Info */}
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