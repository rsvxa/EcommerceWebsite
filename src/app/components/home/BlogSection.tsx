"use client";

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ArrowRight, Calendar, Tag, Search, Clock, ChevronRight, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BLOG_POSTS = [
  {
    id: 1,
    category: "Women",
    tags: ["Style Guide", "Trends"],
    title: { en: "How to Style for the New Season", kh: "របៀបតុបតែងខ្លួនសម្រាប់រដូវកាលថ្មី" },
    excerpt: { en: "Discover the ultimate tips for choosing stylish outfits...", kh: "ស្វែងយល់ពីគន្លឹះសំខាន់ៗក្នុងការជ្រើសរើសឈុតសម្លៀកបំពាក់..." },
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070",
    date: "Feb 03, 2026"
  },
  {
    id: 2,
    category: "Men",
    tags: ["Interviews", "Backstage"],
    title: { en: "Top Trending Suits for 2026", kh: "ឈុតអាវធំបុរសដែលពេញនិយមបំផុតសម្រាប់ឆ្នាំ ២០២៦" },
    excerpt: { en: "Classic tailoring meets modern style in this year's collection...", kh: "ការកាត់ដេរតាមបែបបុរាណ រួមបញ្ចូលជាមួយស្ទីលទំនើប..." },
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2070",
    date: "Jan 28, 2026"
  },
  {
    id: 3,
    category: "Women",
    tags: ["Minimalist", "Trends"],
    title: { en: "The Art of Minimalist Dressing", kh: "សិល្បៈនៃការស្លៀកពាក់បែបសាមញ្ញ (Minimalist)" },
    excerpt: { en: "Less is more: How to pick essential pieces...", kh: "ភាពសាមញ្ញគឺជាភាពស្រស់ស្អាត៖ របៀបជ្រើសរើសសម្លៀកបំពាក់..." },
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2070",
    date: "Jan 20, 2026"
  }
];

export function BlogSection() {
  const [selectedGender, setSelectedGender] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
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

  const searchedPosts = BLOG_POSTS.filter(post => 
    post.title[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-24 bg-[#fcfcfc] border-t border-zinc-100 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4 max-w-xl text-left">
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
                  className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                    selectedGender === cat.id 
                    ? "bg-black text-white shadow-xl scale-105" 
                    : "text-gray-400 hover:text-black"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <button className="group flex items-center gap-3 text-[13px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 transition-all">
                  {t.viewAll} 
                  <span className="w-2 h-px group-hover:w-0 transition-all" />
                  <ArrowRight size={16} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-2xl border-none p-0 bg-white flex flex-col">
                
                {/* 1. Archive Header & Search */}
                <SheetHeader className="p-10 border-b border-zinc-50 bg-zinc-50/30 space-y-6">
                  <div>
                    <SheetTitle className="text-4xl font-black uppercase tracking-tighter italic mb-1">
                      Editorial Archive
                    </SheetTitle>
                    <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em]">
                      Volume 2026 — Exploring Fashion & Culture
                    </p>
                  </div>

                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-black transition-colors" size={18} />
                    <input 
                      type="text"
                      placeholder="Search stories, trends, styles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                    />
                  </div>
                </SheetHeader>

                {/* 2. Explore Tags */}
                <div className="px-10 py-6 border-b border-zinc-50 overflow-x-auto no-scrollbar flex gap-4">
                  {["Style Guide", "Interviews", "Backstage", "Trends"].map((tag) => (
                    <button key={tag} className="whitespace-nowrap flex items-center gap-2 px-4 py-2 bg-zinc-100 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                      <Hash size={10} /> {tag}
                    </button>
                  ))}
                </div>

                {/* 3. Article List */}
                <div className="flex-1 overflow-y-auto p-10 space-y-10 no-scrollbar">
                  {searchedPosts.length > 0 ? (
                    searchedPosts.map((post, idx) => (
                      <motion.div 
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group cursor-pointer"
                      >
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                          <div className="relative w-full md:w-48 aspect-[16/10] md:aspect-square rounded-[2rem] overflow-hidden shrink-0">
                            <img src={post.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                          </div>
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3">
                              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[9px] font-black uppercase tracking-widest">
                                {post.category}
                              </span>
                              <span className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-bold">
                                <Clock size={12} /> 5 min read
                              </span>
                            </div>
                            <h3 className="text-2xl font-black leading-tight tracking-tight group-hover:text-blue-600 transition-colors">
                              {post.title[lang]}
                            </h3>
                            <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 italic">
                              {post.excerpt[lang]}
                            </p>
                            <div className="flex items-center gap-2 pt-2 text-[11px] font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                              Read Story <ChevronRight size={14} className="text-blue-600" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="py-20 text-center text-zinc-400 italic">No stories found for "{searchQuery}"</div>
                  )}
                </div>

                {/* 4. Footer CTA */}
                <div className="p-10 bg-white border-t border-zinc-100">
                  <div className="bg-zinc-900 p-8 rounded-[2rem] text-white flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Newsletter</p>
                      <h4 className="text-xl font-black uppercase tracking-tighter italic text-center sm:text-left">Get Fashion Alerts</h4>
                    </div>
                    <button className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform">
                      Subscribe
                    </button>
                  </div>
                </div>

              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Blog Slider (ដូចដើម) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedGender}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
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
                      <div className="absolute top-6 left-6 flex gap-2">
                        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl font-black text-[10px] tracking-widest uppercase shadow-sm">
                          {post.category}
                        </div>
                      </div>
                      <button className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 hover:bg-zinc-900 hover:text-white shadow-xl">
                        <ArrowRight size={20} />
                      </button>
                    </div>

                    <div className="px-4 pb-4 space-y-4 flex-grow flex flex-col">
                      <div className="flex items-center gap-4 text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                        <span className="w-1 h-1 bg-zinc-200 rounded-full" />
                        <span className="flex items-center gap-1.5"><Tag size={12} /> 5 Min Read</span>
                      </div>
                      
                      <h3 className="text-xl font-black tracking-tight text-zinc-900 leading-[1.1]">
                        {post.title[lang]}
                      </h3>
                      
                      <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 font-medium italic">
                        "{post.excerpt[lang]}"
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
      </div>

      <style jsx global>{`
        .blog-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d4d4d8;
          opacity: 1;
        }
        .blog-swiper .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
          background: #000;
        }
      `}</style>
    </section>
  );
}