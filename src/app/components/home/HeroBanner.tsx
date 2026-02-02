"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const FASHION_BANNERS = [
  {
    id: 1,
    title: "NEW ARRIVALS",
    desc: "Explore the latest trends and essential pieces for the upcoming season.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070",
  },
  {
    id: 2,
    title: "SUMMER COLLECTION",
    desc: "Get ready for the sun with up to 50% off on our most popular summer styles.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070",
  },
  {
    id: 3,
    title: "STREETWEAR VIBES",
    desc: "Express your unique personality with our premium urban streetwear collection.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070",
  }
];

export function HeroBanner() {
  const scrollToCategories = () => {
    // This points to the Brand section we labeled in App.tsx
    const categorySection = document.getElementById('categories-section');
    if (categorySection) {
      categorySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full relative h-[600px] md:h-[750px] overflow-hidden">
      {/* 1. Swiper Section - Images and Text Only */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="h-full w-full"
      >
        {FASHION_BANNERS.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div 
              className="relative w-full h-full bg-cover bg-center flex items-center"
              style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${banner.image})` }}
            >
              <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-2xl text-white">
                  <h2 className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    {banner.title}
                  </h2>
                  <p className="text-base md:text-xl font-light opacity-90 mb-24 max-w-lg leading-relaxed">
                    {banner.desc}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 2. Fixed Shop Now Button - Outside Swiper to stay static */}
      <div className="absolute bottom-20 md:bottom-32 left-0 w-full z-20">
        <div className="container mx-auto px-6 md:px-12">
          <button 
            onClick={scrollToCategories}
            className="px-12 py-5 bg-white rounded-md text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-500 shadow-2xl border border-transparent hover:border-white"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}