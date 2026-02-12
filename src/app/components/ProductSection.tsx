"use client";

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ArrowRight, X, ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations, Language } from '@/lib/i18n/translations';

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// បន្ថែម currentLang ទៅក្នុង Props
interface ProductSectionProps {
  currentLang?: Language;
}

export function ProductSection({ currentLang = 'en' }: ProductSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProduct, setActiveProduct] = useState<any>(null);
  
  const t = (translations[currentLang] || translations['en']).productSection;

  // Sync selection label with translation key
  const categoryKeys: Record<string, string> = {
    "All": t.categories.all,
    "Clothes": t.categories.clothes,
    "Shoes": t.categories.shoes,
    "Accessories": t.categories.accessories
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveProduct(null);
    };
    if (activeProduct) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProduct]);

  // PRODUCTS data (Usually from a global constant or API)
  const PRODUCTS = [
    { id: 1, name: "Diamond Stud Earrings", category: "Accessories", price: 399.99, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974", description: "Classic diamond stud earrings set in 14k white gold.", stock: 12, featured: true },
    { id: 2, name: "Wide Brim Fedora Hat", category: "Accessories", price: 69.99, image: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=1974", description: "Stylish wide brim fedora made from quality wool felt.", stock: 20, featured: true },
    { id: 3, name: "Sterling Silver Earrings", category: "Accessories", price: 59.99, image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1974", description: "Handcrafted sterling silver earrings.", stock: 35, featured: false },
    { id: 4, name: "Gold Plated Necklace", category: "Accessories", price: 79.99, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1974", description: "Elegant 18k gold plated necklace.", stock: 25, featured: true }
  ];

  const filteredProducts = selectedCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <section className={`py-16 bg-white ${currentLang === 'km' ? 'font-khmer' : ''}`}>
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 uppercase">
            {t.title}
          </h2>

          <div className="flex bg-gray-100 p-1 rounded-full overflow-x-auto max-w-full">
            {Object.keys(categoryKeys).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 md:px-6 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  selectedCategory === key 
                  ? "bg-black text-white shadow-md" 
                  : "text-gray-500 hover:text-black"
                }`}
              >
                {categoryKeys[key]}
              </button>
            ))}
          </div>

          <button className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-gray-500 transition-colors">
            {t.shopAll} <ArrowRight size={16} />
          </button>
        </div>

        {/* Product Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={25}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
              className="product-swiper pb-14"
            >
              {filteredProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="group bg-white border border-gray-100 rounded-sm overflow-hidden transition-all hover:shadow-xl h-full flex flex-col">
                    <div className="relative aspect-[4/5] overflow-hidden cursor-pointer" onClick={() => setActiveProduct(product)}>
                      {product.featured && (
                        <div className="absolute top-3 left-3 z-10 bg-black text-white text-[9px] font-black px-2 py-1 uppercase tracking-tighter">
                          {t.featured}
                        </div>
                      )}
                      <button className="absolute top-3 right-3 z-10 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                        <Heart size={16} className="text-gray-900" />
                      </button>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                        <button className="w-full bg-black text-white py-4 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                          <ShoppingBag size={14} /> {t.addToBag}
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-1 cursor-pointer flex-1 flex flex-col" onClick={() => setActiveProduct(product)}>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{product.category}</p>
                      <h3 className="font-bold text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2 text-sm leading-snug">
                        {product.name}
                      </h3>
                      <div className="mt-auto pt-4 flex justify-between items-center">
                        <span className="text-lg font-black tracking-tighter">${product.price}</span>
                        <span className="text-[9px] text-gray-400 font-bold uppercase">{product.stock} {t.inStock}</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </AnimatePresence>

        {/* PRODUCT DETAIL DRAWER */}
        <AnimatePresence>
          {activeProduct && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex justify-end"
              onClick={() => setActiveProduct(null)}
            >
              <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-xl h-full shadow-2xl relative flex flex-col"
              >
                {/* Drawer Header */}
                <div className="p-6 flex justify-between items-center border-b">
                  <button onClick={() => setActiveProduct(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={24} />
                  </button>
                  <h3 className="font-black uppercase tracking-widest text-xs">{t.productDetail}</h3>
                  <div className="w-10" />
                </div>

                {/* Drawer Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 no-scrollbar">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-inner bg-gray-50 border border-gray-100">
                    <img src={activeProduct.image} className="w-full h-full object-cover" alt={activeProduct.name} />
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div>
                        <span className="bg-black text-white text-[9px] font-black px-2 py-1 rounded-sm uppercase tracking-widest">
                          {activeProduct.category}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mt-3 leading-none">{activeProduct.name}</h1>
                      </div>
                      <span className="text-3xl font-black tracking-tighter">${activeProduct.price}</span>
                    </div>

                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                      <span className="text-gray-400 text-xs font-bold ml-2">(12 {t.reviews})</span>
                    </div>

                    <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                      {activeProduct.description}
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-3 gap-2 py-8 border-y border-gray-100">
                    {[
                      { icon: <Truck size={20} />, text: t.features.delivery },
                      { icon: <RefreshCw size={20} />, text: t.features.return },
                      { icon: <ShieldCheck size={20} />, text: t.features.secure }
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-3 text-center">
                        <div className="text-gray-900 bg-gray-50 p-3 rounded-full">{item.icon}</div>
                        <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest leading-tight">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Drawer Footer */}
                <div className="p-6 md:p-10 border-t bg-white">
                  <button className="w-full bg-black text-white py-5 rounded-sm font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98]">
                    <ShoppingBag size={20} /> {t.addToBag} — ${activeProduct.price}
                  </button>
                  <div className="flex items-center justify-center gap-2 mt-5 text-[9px] font-black text-green-600 uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> {t.checkoutVerified}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}