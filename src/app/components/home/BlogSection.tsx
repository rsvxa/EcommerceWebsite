"use client";

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ArrowRight, X, Calendar, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BLOG_POSTS = [
  {
    id: 1,
    category: "Women",
    title: {
      en: "How to Style for the New Season",
      kh: "របៀបតុបតែងខ្លួនសម្រាប់រដូវកាលថ្មី"
    },
    excerpt: {
      en: "Discover the ultimate tips for choosing stylish and comfortable outfits that transition perfectly through the changing weather.",
      kh: "ស្វែងយល់ពីគន្លឹះសំខាន់ៗក្នុងការជ្រើសរើសឈុតសម្លៀកបំពាក់ដែលទាន់សម័យ និងមានផាសុកភាពសម្រាប់ការផ្លាស់ប្តូរអាកាសធាតុ..."
    },
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070",
    date: "Feb 03, 2026"
  },
  {
    id: 2,
    category: "Men",
    title: {
      en: "Top Trending Suits for 2026",
      kh: "ឈុតអាវធំបុរសដែលពេញនិយមបំផុតសម្រាប់ឆ្នាំ ២០២៦"
    },
    excerpt: {
      en: "Classic tailoring meets modern style in this year's men's collection, featuring bold colors and versatile cuts.",
      kh: "ការកាត់ដេរតាមបែបបុរាណ រួមបញ្ចូលជាមួយស្ទីលទំនើបនៅក្នុងបណ្តុំសម្លៀកបំពាក់បុរសឆ្នាំនេះ ជាមួយពណ៌លេចធ្លោ..."
    },
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2070",
    date: "Jan 28, 2026"
  },
  {
    id: 3,
    category: "Women",
    title: {
      en: "The Art of Minimalist Dressing",
      kh: "សិល្បៈនៃការស្លៀកពាក់បែបសាមញ្ញ (Minimalist)"
    },
    excerpt: {
      en: "Less is more: How to pick essential pieces for your wardrobe that create infinite looks with minimal effort.",
      kh: "ភាពសាមញ្ញគឺជាភាពស្រស់ស្អាត៖ របៀបជ្រើសរើសសម្លៀកបំពាក់សំខាន់ៗសម្រាប់ទូខោអាវរបស់អ្នកដើម្បីបង្កើតស្ទីលជាច្រើន..."
    },
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2070",
    date: "Jan 20, 2026"
  }
];

export function BlogSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("All");
  const { lang } = useLanguage();
  const t = translations[lang].blog;

  const categories = [
    { id: "All", label: t.categories.all },
    { id: "Men", label: t.categories.men },
    { id: "Women", label: t.categories.women },
  ];

  const filteredPosts = selectedGender === "All" 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === selectedGender);

  return (
    <section className="py-24 bg-[#fcfcfc] border-t border-zinc-100 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4 max-w-xl">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 mb-2 block">
                ZWAY Editorial
              </span>
              <h2 className={`text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 uppercase leading-none ${lang === 'kh' ? 'font-freehand' : ''}`}>
                {t.title}
              </h2>
            </motion.div>
            <p className="text-zinc-500 text-sm font-medium leading-relaxed">
              Explore the latest trends, styling guides, and fashion insights from our expert editors.
            </p>
          </div>

          <div className="flex flex-col items-end gap-6">
            <div className="flex flex-wrap justify-center gap-3 bg-white p-2 rounded-[2rem] shadow-sm border border-zinc-100">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedGender(cat.id)}
                  className={`flex items-center gap-2 px-8 py-3 rounded-full text-[13px] font-black uppercase tracking-widest transition-all duration-500 ${
                    selectedGender === cat.id 
                    ? "bg-zinc-900 text-white shadow-xl shadow-zinc-200" 
                  : "text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group flex items-center gap-3 text-[13px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 transition-all"
            >
              {t.viewAll} 
              <span className="w-2 h-px bg-zinc-200 group-hover:w-0 group-hover:bg-zinc-900 transition-all" />
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Blog Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedGender}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "circOut" }}
          >
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={40}
              slidesPerView={1}
              pagination={{ clickable: true, dynamicBullets: true }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1280: { slidesPerView: 3 },
              }}
              className="blog-swiper !pb-20 !px-2"
            >
              {filteredPosts.map((post) => (
                <SwiperSlide key={post.id}>
                  <div className="group flex flex-col h-full bg-white rounded-[2.5rem] border border-zinc-100 p-4 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-500">
                    <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] mb-8">
                      <img 
                        src={post.image} 
                        alt={post.title[lang]}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="absolute top-6 left-6 flex gap-2">
                        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl font-black text-[10px] tracking-widest uppercase shadow-sm">
                          {post.category}
                        </div>
                      </div>
                      
                      <button className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 hover:bg-zinc-900 hover:text-white">
                        <ArrowRight size={20} />
                      </button>
                    </div>

                    <div className="px-4 pb-4 space-y-4 flex-grow flex flex-col">
                      <div className="flex items-center gap-4 text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                        <span className="w-1 h-1 bg-zinc-200 rounded-full" />
                        <span className="flex items-center gap-1.5"><Tag size={12} /> 5 Min Read</span>
                      </div>
                      
                      <h3 className="text-xl font-black tracking-tight text-zinc-900 leading-[1.1] transition-colors">
                        {post.title[lang]}
                      </h3>
                      
                      <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 font-medium">
                        {post.excerpt[lang]}
                      </p>

                      <div className="pt-4 mt-auto">
                        <button className="flex items-center gap-3 text-[13px] font-black tracking-[0.2em] uppercase text-zinc-900 group/btn">
                          {t.readMore} 
                          <div className="overflow-hidden w-6 group-hover/btn:w-10 transition-all">
                             <ArrowRight size={14} className="-translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </AnimatePresence>

        {/* Modal Overlay: Full Article View */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-zinc-950/90 backdrop-blur-xl flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="bg-white w-full max-w-7xl h-[90vh] overflow-hidden relative rounded-[3rem] shadow-2xl flex flex-col"
              >
                <div className="p-10 border-b border-zinc-100 flex justify-between items-center bg-white sticky top-0 z-20">
                   <div>
                      <h2 className="text-2xl font-black uppercase tracking-tighter">{t.allStories}</h2>
                      <p className="text-[10px] font-bold text-zinc-400 tracking-[0.3em] uppercase">Archive 2026</p>
                   </div>
                   <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all hover:rotate-90">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-grow overflow-y-auto p-10 md:p-20 no-scrollbar">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                    {BLOG_POSTS.map((post) => (
                      <div key={post.id} className="group cursor-pointer">
                        <div className="aspect-[16/10] overflow-hidden rounded-[2rem] mb-6">
                          <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                        </div>
                        <div className="space-y-3">
                          <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{post.category}</span>
                          <h3 className="font-black text-xl leading-tight">{post.title[lang]}</h3>
                          <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3">{post.excerpt[lang]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .blog-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d4d4d8;
          opacity: 1;
          transition: all 0.3s;
        }
        .blog-swiper .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
          background: #2563eb;
        }
      `}</style>
    </section>
  );
}