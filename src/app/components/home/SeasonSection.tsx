"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Wind, Sun, Leaf, Snowflake, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';

const SEASON_DATA = [
  {
    id: "Spring",
    title: { en: "Floral Bloom Collection", kh: "បណ្តុំម៉ូដផ្ការីក" },
    desc: { 
      en: "Lightweight fabrics and pastel colors to welcome the fresh start of spring.", 
      kh: "សាច់ក្រណាត់ស្រាល និងពណ៌ស្រទន់ ដើម្បីស្វាគមន៍ការចាប់ផ្ដើមថ្មីនៃរដូវផ្ការីក។" 
    },
    image: "https://i.pinimg.com/1200x/7d/2d/50/7d2d50b00ed5265c70c0b17b8963a853.jpg?q=80&w=2070",
    icon: <Wind className="text-emerald-500" size={24} />,
    tag: { en: "Fresh & Airy", kh: "ស្រស់ស្រាយ & ស្រាលស្រទន់" },
    accent: "bg-emerald-50 text-emerald-600",
    bgText: "SPRING"
  },
  {
    id: "Summer",
    title: { en: "Sun-Kissed Essentials", kh: "ម៉ូដសម្រាប់រដូវក្ដៅ" },
    desc: { 
      en: "Stay cool with our premium linen shirts and breathable summer dresses.", 
      kh: "រក្សាភាពត្រជាក់ជាមួយអាវសាច់អំបោះ Premium និងរ៉ូបសម្រាប់រដូវក្ដៅដ៏មានផាសុកភាព។" 
    },
    image: "https://i.pinimg.com/736x/9b/fb/65/9bfb65d128921b9afc4d85729050185a.jpg?q=80&w=2070",
    icon: <Sun className="text-orange-500" size={24} />,
    tag: { en: "Hot Trends", kh: "ម៉ូដទាន់សម័យបំផុត" },
    accent: "bg-orange-50 text-orange-600",
    bgText: "SUMMER"
  },
  {
    id: "Autumn",
    title: { en: "Golden Leaf Layers", kh: "ម៉ូដសម្រាប់រដូវស្លឹកឈើជ្រុះ" },
    desc: { 
      en: "Perfectly balanced coats and knitwear for those cozy evening walks.", 
      kh: "អាវធំ និងអាវចាក់ដែលមានតុល្យភាពល្អឥតខ្ចោះ សម្រាប់ការដើរលេងនាពេលល្ងាចដ៏កក់ក្ដៅ។" 
    },
    image: "https://i.pinimg.com/736x/57/cf/75/57cf75cdc8900dff4024b25952eba146.jpg?q=80&w=2070",
    icon: <Leaf className="text-amber-700" size={24} />,
    tag: { en: "Cozy Style", kh: "ស្ទីលបែបកក់ក្ដៅ" },
    accent: "bg-amber-50 text-amber-700",
    bgText: "AUTUMN"
  },
  {
    id: "Winter",
    title: { en: "Urban Arctic Gear", kh: "ម៉ូដសម្រាប់រដូវរងា" },
    desc: { 
      en: "Heavy-duty warmth meets high-street fashion for the coldest days.", 
      kh: "ភាពកក់ក្ដៅកម្រិតខ្ពស់ បូករួមនឹងម៉ូដទាន់សម័យសម្រាប់ថ្ងៃដែលត្រជាក់បំផុត។" 
    },
    image: "https://i.pinimg.com/736x/7b/d2/ac/7bd2ac379b2722c7f48635a568003111.jpg?q=80&w=2070",
    icon: <Snowflake className="text-blue-500" size={24} />,
    tag: { en: "Warm & Chic", kh: "កក់ក្ដៅ & ទាន់សម័យ" },
    accent: "bg-blue-50 text-blue-600",
    bgText: "WINTER"
  }
];

export function SeasonSection() {
  const [activeSeason, setActiveSeason] = useState("Spring");
  const { lang } = useLanguage();
  const t = translations[lang].seasonal;

  const currentSeason = SEASON_DATA.find(s => s.id === activeSeason) || SEASON_DATA[0];

  return (
    <section className="py-24 bg-white overflow-hidden">
      {/* Decorative Background Text */}
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-3xl md:text-3xl font-black uppercase tracking-tighter leading-tight mb-8">{currentSeason.bgText}</h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header with Visual Tabs */}
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
            <h2 className={`text-5xl md:text-5xl font-black uppercase tracking-tighter leading-tight text-zinc-900 ${lang === 'kh' ? 'font-freehand' : ''}`}>
              {t.heading}
            </h2>
          </motion.div>

          <div className="flex bg-gray-50 p-1.5 rounded-full border border-gray-100 shadow-sm">
            {Object.keys(t.seasons).map((key) => (
              <button
                key={key}
                onClick={() => setActiveSeason(key)}
                className={`px-6 md:px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                  activeSeason === key 
                  ? "bg-black text-white shadow-xl scale-105" 
                  : "text-gray-400 hover:text-black"
                }`}
              >
                {activeSeason === key && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />}
                {t.seasons[key as keyof typeof t.seasons]}
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
            className="flex flex-col lg:flex-row gap-6 items-center"
          >
            {/* Image Showcase */}
            <div className="w-full lg:w-1/2 relative group">
              <div className="overflow-hidden rounded-sm shadow-2xl aspect-[3/4] md:h-[750px] md:w-[650px]">
                <motion.img 
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                  src={currentSeason.image} 
                  alt={currentSeason.title[lang]}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0  from-zinc-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              
              {/* Floating Tag */}
              <div className={`absolute -bottom-6 -right-6 md:right-12 p-8 rounded-[2rem] shadow-2xl backdrop-blur-xl border border-white/20 ${currentSeason.accent} transition-colors duration-700`}>
                <div className="flex items-center gap-4">
                   <div className="bg-white p-3 rounded-2xl shadow-sm">{currentSeason.icon}</div>
                   <div>
                      <p className="text-[13px] font-black uppercase tracking-widest opacity-60">Status</p>
                      <p className="text:md font-black uppercase tracking-widest">{currentSeason.tag[lang]}</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-1/2 space-y-10 text-left">
              <div className="space-y-4">
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-5xl md:text-3xl font-black leading-none tracking-tighter uppercase"
                >
                  {currentSeason.title[lang]}
                </motion.h3>
                <p className="text-gray-500 text-xl leading-relaxed max-w-lg italic font-light">
                  "{currentSeason.desc[lang]}"
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <button className="flex items-center justify-center gap-4 bg-black text-white px-12 py-6 rounded-sm font-black uppercase text-[13px] tracking-[0.2em] hover:bg-gray-800 transition-all shadow-lg">
                  <span className="relative z-10">{t.shopSelection}</span>
                  <ArrowUpRight size={20} className="relative z-10 group-hover:rotate-45 transition-transform" />
                </button>
                <button className="flex items-center justify-center gap-4 bg-white border border-black text-black px-12 py-6 rounded-sm font-black uppercase text-[13px] tracking-[0.2em] hover:bg-black hover:text-white transition-all">
                  {t.viewLookbook}
                </button>
              </div>

              {/* Utility Info */}
              <div className="pt-12 border-t border-zinc-100 flex items-center justify-between gap-8">
                <div className="space-y-2">
                  <p className="text-[13px] font-black uppercase text-zinc-600 tracking-widest">{t.availability}</p>
                  <p className="text-2xl font-black uppercase tracking-tighter text-zinc-900">{t.limited}</p>
                </div>
                <div className="w-px h-12 bg-zinc-100 hidden sm:block" />
                <div className="space-y-2">
                  <p className="text-[13px] font-black uppercase text-zinc-600 tracking-widest">{t.shipping}</p>
                  <p className="text-2xl font-black uppercase tracking-tighter text-zinc-900">{t.worldwide}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}