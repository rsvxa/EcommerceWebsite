"use client";

import React from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';
import { motion } from 'framer-motion';

export function FeaturedCollections() {
  const { lang } = useLanguage();
  const t = translations[lang].collections;

  const COLLECTIONS = [
    { 
      title: t.items.streetwear.title, 
      subtitle: t.items.streetwear.subtitle,
      img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000",
    },
    { 
      title: t.items.essentials.title, 
      subtitle: t.items.essentials.subtitle,
      img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000",
    },
    { 
      title: t.items.accessories.title, 
      subtitle: t.items.accessories.subtitle,
      img: "https://i.pinimg.com/736x/41/62/42/4162422b15c28a458ce5cd6b6e25380f.jpg?q=80&w=1000",
    },
  ];

  return (
    <section className="pb-24 bg-white">
      <div className="text-center mb-12">
        
        {/* Header Section */}
        <div className=" md:flex-row justify-between items-end mb-20 gap-8 text-center">
          <div className="mb-12">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-gray-600 text-[13px] font-black uppercase tracking-[0.5em] mb-4"
            >
              Season 2026
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-5xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] text-zinc-900 ${lang === 'kh' ? 'font-freehand' : ''}`}
            >
              {t.heading} <br />
              
            </motion.h2> <br />
            <div className='text-zinc-400 text-xs font-bold uppercase tracking-widest'>Curated pieces designed for the modern lifestyle.</div>
          </div>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLLECTIONS.map((col, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98] 
              }}
              className={`relative h-[550px] md:h-[600px] group cursor-pointer overflow-hidden rounded-[3rem] bg-zinc-200 ${col.size}`}
            >
              {/* Image with Advanced Zoom */}
              <img 
                src={col.img} 
                alt={col.title}
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                
                {/* Plus Icon Decor */}
                <div className="absolute top-10 right-10 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 rotate-0 group-hover:rotate-90">
                  <Plus size={20} />
                </div>

                <div className="relative overflow-hidden">
                  <span className="block text-white text-[13px] font-black uppercase tracking-[0.4em] mb-4 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-expo">
                    {col.subtitle}
                  </span>
                </div>
                
                <div className="relative overflow-hidden mb-8">
                  <h3 className="text-white text-4xl md:text-4xl font-black uppercase tracking-tighter leading-none translate-y-full group-hover:translate-y-0 transition-transform duration-700 delay-100 ease-expo">
                    {col.title}
                  </h3>
                </div>
                
                <button className="flex items-center gap-4 text-white text-[11px] font-black uppercase tracking-[0.3em] group/btn transition-all">
                  <span className="bg-white text-zinc-950 px-6 py-3 rounded-full group-hover:bg-gray-800 group-hover:text-white transition-colors duration-300">
                    {t.browse}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-all">
                    <ArrowRight size={16} />
                  </div>
                </button>
              </div>

              {/* Decorative Border on Hover */}
              <div className="absolute inset-0 border-[0px] group-hover:border-[16px] border-white/10 transition-all duration-700 pointer-events-none rounded-[3rem]" />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ease-expo {
          transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
        }
      `}</style>
    </section>
  );
}