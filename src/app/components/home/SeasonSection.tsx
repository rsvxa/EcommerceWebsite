"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Wind, Sun, Leaf, Snowflake } from 'lucide-react';

const SEASON_DATA = [
  {
    id: 1,
    season: "Spring",
    title: "Floral Bloom Collection",
    desc: "Lightweight fabrics and pastel colors to welcome the fresh start of spring.",
    image: "https://i.pinimg.com/1200x/7d/2d/50/7d2d50b00ed5265c70c0b17b8963a853.jpg?q=80&w=2070",
    icon: <Wind className="text-green-500" size={20} />,
    tag: "Fresh & Airy"
  },
  {
    id: 2,
    season: "Summer",
    title: "Sun-Kissed Essentials",
    desc: "Stay cool with our premium linen shirts and breathable summer dresses.",
    image: "https://i.pinimg.com/736x/9b/fb/65/9bfb65d128921b9afc4d85729050185a.jpg?q=80&w=2070",
    icon: <Sun className="text-orange-500" size={20} />,
    tag: "Hot Trends"
  },
  {
    id: 3,
    season: "Autumn",
    title: "Golden Leaf Layers",
    desc: "Perfectly balanced coats and knitwear for those cozy evening walks.",
    image: "https://i.pinimg.com/736x/57/cf/75/57cf75cdc8900dff4024b25952eba146.jpg?q=80&w=2070",
    icon: <Leaf className="text-amber-600" size={20} />,
    tag: "Cozy Style"
  },
  {
    id: 4,
    season: "Winter",
    title: "Urban Arctic Gear",
    desc: "Heavy-duty warmth meets high-street fashion for the coldest days.",
    image: "https://i.pinimg.com/736x/7b/d2/ac/7bd2ac379b2722c7f48635a568003111.jpg?q=80&w=2070",
    icon: <Snowflake className="text-blue-400" size={20} />,
    tag: "Warm & Chic"
  }
];

export function SeasonSection() {
  const [activeSeason, setActiveSeason] = useState("Spring");
  const currentSeason = SEASON_DATA.find(s => s.season === activeSeason) || SEASON_DATA[0];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-3xl font-black uppercase tracking-tighter leading-tight mb-8">
            Seasonal Lookbook
          </h2>

          <div className="flex bg-gray-50 p-1.5 rounded-full border border-gray-100 shadow-sm">
            {["Spring", "Summer", "Autumn", "Winter"].map((season) => (
              <button
                key={season}
                onClick={() => setActiveSeason(season)}
                className={`px-6 md:px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                  activeSeason === season 
                  ? "bg-black text-white shadow-xl scale-105" 
                  : "text-gray-400 hover:text-black"
                }`}
              >
                {season}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSeason}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "anticipate" }}
            className="flex flex-col lg:flex-row gap-6 items-center"
          >
            <div className="w-full lg:w-1/2 relative group">
              <div className="overflow-hidden rounded-sm shadow-2xl aspect-[3/4] md:h-[750px] md:w-[650px]">
                <img 
                  src={currentSeason.image} 
                  alt={currentSeason.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Content Details */}
            <div className="w-full lg:w-1/2 space-y-10 text-left">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {currentSeason.icon}
                  <span className="text-xs font-black uppercase tracking-widest border-b border-black">{currentSeason.tag}</span>
                </div>
                <h3 className="text-3xl md:text-3xl font-black leading-none tracking-tighter uppercase">
                  {currentSeason.title}
                </h3>
              </div>

              <p className="text-gray-500 text-xl leading-relaxed max-w-lg italic font-light">
                "{currentSeason.desc}"
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="flex items-center justify-center gap-4 bg-black text-white px-12 py-6 rounded-sm font-black uppercase text-[10px] tracking-[0.2em] hover:bg-gray-800 transition-all shadow-lg">
                  Shop The Selection
                  <ArrowUpRight size={18} />
                </button>
                <button className="flex items-center justify-center gap-4 bg-white border border-black text-black px-12 py-6 rounded-sm font-black uppercase text-[10px] tracking-[0.2em] hover:bg-black hover:text-white transition-all">
                  View Full Lookbook
                </button>
              </div>

              {/* Stats Detail */}
              <div className="pt-12 border-t border-gray-100 grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Availability</p>
                  <p className="text-2xl font-bold uppercase">Limited Edition</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Shipping</p>
                  <p className="text-2xl font-bold uppercase">Worldwide</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}