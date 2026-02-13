"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const BANNER_IMAGES = [
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070",
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070",
];

export function HeroBanner() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;

  const scrollToCategories = () => {
    const categorySection = document.getElementById('categories-section');
    if (categorySection) {
      categorySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full relative h-[700px] md:h-screen overflow-hidden bg-zinc-950">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        speed={1500}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        navigation={{
          prevEl: '.hero-prev',
          nextEl: '.hero-next',
        }}
        pagination={{
          clickable: true,
          el: '.hero-pagination',
          renderBullet: (index, className) => {
            return `<span class="${className} !w-12 !h-[2px] !rounded-none !bg-white/30 transition-all duration-500"></span>`;
          },
        }}
        className="h-full w-full"
      >
        {t.banners.map((banner, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div className="relative w-full h-full flex items-center overflow-hidden">
                {/* Background Image with Parallax Zoom */}
                <motion.div 
                  initial={{ scale: 1.2 }}
                  animate={isActive ? { scale: 1 } : { scale: 1.2 }}
                  transition={{ duration: 10, ease: "linear" }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.5) 100%), url(${BANNER_IMAGES[index]})` 
                  }}
                />

                <div className="container mx-auto px-8 md:px-16 relative z-10">
                  <div className="max-w-4xl">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      <span className="text-white text-[15px] md:text-xs font-bold uppercase tracking-[0.5em] mb-6 block drop-shadow-lg">
                        {lang === 'kh' ? 'បណ្តុំសម្លៀកបំពាក់ថ្មី ២០២៦' : 'New Collection 2026'}
                      </span>
                    </motion.div>

                    <motion.h2 
                      initial={{ opacity: 0, x: -50 }}
                      animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                      transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className={`text-6xl md:text-[90px] font-black text-white leading-[0.85] tracking-tighter uppercase mb-8 drop-shadow-2xl ${lang === 'kh' ? 'font-freehand py-4' : ''}`}
                    >
                      {banner.title.split(' ').map((word, i) => (
                        <span key={i} className={i % 2 !== 0 ? "text-transparent stroke-text" : ""}>
                          {word}{' '}
                        </span>
                      ))}
                    </motion.h2>

                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={isActive ? { opacity: 0.8, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.8, delay: 1 }}
                      className="text-white text-base md:text-lg font-medium max-w-md leading-relaxed mb-12"
                    >
                      {banner.desc}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                    >
                      <button 
                        onClick={scrollToCategories}
                        className="group relative flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full overflow-hidden transition-all duration-500 hover:bg-gray-800 hover:text-white"
                      >
                        <span className="relative z-10 text-[15px] font-black uppercase tracking-[0.2em]">
                          {t.shopNow}
                        </span>
                        <div className="relative z-10 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation & UI Elements */}
      <div className="absolute bottom-12 left-0 w-full z-30 px-8 md:px-16 flex justify-between items-center pointer-events-none">
        {/* Pagination Dots */}
        <div className="hero-pagination !relative !w-auto flex gap-3 pointer-events-auto"></div>

        {/* Navigation Arrows */}
        <div className="flex gap-4 pointer-events-auto">
          <button className="hero-prev w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-zinc-950 transition-all duration-500 backdrop-blur-sm">
            <ChevronLeft size={24} />
          </button>
          <button className="hero-next w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-zinc-950 transition-all duration-500 backdrop-blur-sm">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Decorative Side Text */}
      <div className="absolute top-1/2 -right-24 -rotate-90 hidden lg:block z-30">
        <span className="text-white/10 text-[80px] font-black uppercase tracking-[0.2em] whitespace-nowrap select-none">
          ESTD 2026 • ZWAY FASHION
        </span>
      </div>

      <style jsx global>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.8);
        }
        .hero-pagination .swiper-pagination-bullet-active {
          background: #000000 !important;
          width: 80px !important;
        }
      `}</style>
    </div>
  );
}