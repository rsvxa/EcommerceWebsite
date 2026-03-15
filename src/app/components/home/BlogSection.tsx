"use client";

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ArrowRight, Calendar, Tag, Search, Clock, ChevronRight, Hash, X, Info } from 'lucide-react';
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
    content: {
      en: "This season focuses on layering textures. Start with a neutral base and add bold accessories. Think oversized blazers paired with minimalist slip dresses.",
      kh: "រដូវកាលនេះផ្តោតលើការលេងពណ៌ និងសាច់ក្រណាត់។ ចាប់ផ្តើមជាមួយសម្លៀកបំពាក់ពណ៌ធម្មតា ហើយបន្ថែមគ្រឿងអលង្ការដែលលេចធ្លោ។ សាកល្បងអាវ Blazer ធំៗជាមួយរ៉ូបសាមញ្ញ។"
    },
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070",
    date: "Feb 03, 2026"
  },
  {
    id: 2,
    category: "Men",
    tags: ["Interviews", "Backstage"],
    title: { en: "Top Trending Suits for 2026", kh: "ឈុតអាវធំបុរសដែលពេញនិយមបំផុតសម្រាប់ឆ្នាំ ២០២៦" },
    excerpt: { en: "Classic tailoring meets modern style in this year's collection...", kh: "ការកាត់ដេរតាមបែបបុរាណ រួមបញ្ចូលជាមួយស្ទីលទំនើប..." },
    content: {
      en: "Tailoring in 2026 is moving towards relaxed silhouettes. Earth tones like olive green and deep brown are dominating the runway.",
      kh: "ការកាត់ដេរនៅឆ្នាំ ២០២៦ ឆ្ពោះទៅរកភាពធូរស្រាល និងផាសុកភាព។ ពណ៌បែបធម្មជាតិដូចជា ពណ៌បៃតងចាស់ និងពណ៌ត្នោត កំពុងមានប្រជាប្រិយភាពខ្លាំង។"
    },
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2070",
    date: "Jan 28, 2026"
  },
  {
    id: 3,
    category: "Women",
    tags: ["Minimalist", "Trends"],
    title: { en: "The Art of Minimalist Dressing", kh: "សិល្បៈនៃការស្លៀកពាក់បែបសាមញ្ញ (Minimalist)" },
    excerpt: { en: "Less is more: How to pick essential pieces...", kh: "ភាពសាមញ្ញគឺជាភាពស្រស់ស្អាត៖ របៀបជ្រើសរើសសម្លៀកបំពាក់..." },
    content: {
      en: "Building a capsule wardrobe is key. Focus on high-quality fabrics like silk and organic cotton that last for years.",
      kh: "ការបង្កើតទូខោអាវបែប Capsule គឺជាចំណុចសំខាន់។ ផ្តោតលើសាច់ក្រណាត់មានគុណភាពខ្ពស់ដូចជា សូត្រ និងកប្បាសធម្មជាតិ។"
    },
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2070",
    date: "Jan 20, 2026"
  }
];

export function BlogSection() {
  const [selectedGender, setSelectedGender] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePost, setActivePost] = useState<any>(null); 
  const { lang } = useLanguage();
  const t = translations[lang].blog;


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

                <div className="px-10 py-6 border-b border-zinc-50 overflow-x-auto no-scrollbar flex gap-4">
                  {["Style Guide", "Interviews", "Backstage", "Trends"].map((tag) => (
                    <button key={tag} className="whitespace-nowrap flex items-center gap-2 px-4 py-2 bg-zinc-100 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                      <Hash size={10} /> {tag}
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto p-10 space-y-10 no-scrollbar">
                  {searchedPosts.length > 0 ? (
                    searchedPosts.map((post, idx) => (
                      <motion.div 
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group cursor-pointer"
                        onClick={() => setActivePost(post)} // បើក Details
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
              </SheetContent>
            </Sheet>
          </div>
        </div>

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
                  <div 
                    onClick={() => setActivePost(post)}
                    className="group flex flex-col h-full bg-white rounded-[2.5rem] border border-zinc-100 p-4 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-500 cursor-pointer"
                  >
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

      <Sheet open={!!activePost} onOpenChange={() => setActivePost(null)}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-[3rem] border-none p-0 overflow-hidden bg-white">
          <div className="h-full flex flex-col">
            <div className="p-6 flex justify-between items-center border-b border-zinc-50">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Editorial Details</span>
                <button onClick={() => setActivePost(null)} className="p-3 bg-zinc-100 rounded-full hover:bg-black hover:text-white transition-all">
                    <X size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar">
              {activePost && (
                <div className="max-w-4xl mx-auto p-8 md:p-16 space-y-12">
                  <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl">
                    <img src={activePost.image} className="w-full h-full object-cover" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-10">
                        <div className="space-y-2">
                             <span className="px-4 py-2 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest">
                                {activePost.category}
                             </span>
                             <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
                                {activePost.title[lang]}
                             </h2>
                        </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-8">
                        <div className="p-8 bg-zinc-50 rounded-[2rem] space-y-6">
                            <h4 className="font-black uppercase text-xs tracking-widest border-b border-zinc-200 pb-4">Article Info</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-400 text-[10px] font-black uppercase">Published</span>
                                    <span className="text-xs font-bold">{activePost.date}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-400 text-[10px] font-black uppercase">Read Time</span>
                                    <span className="text-xs font-bold">5 Minutes</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-400 text-[10px] font-black uppercase">Author</span>
                                    <span className="text-xs font-bold">ZWAY Editor</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {activePost.tags.map((tag: string) => (
                                <span key={tag} className="px-4 py-2 border border-zinc-100 rounded-full text-[9px] font-black uppercase tracking-widest">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-8">
                        <div className="flex items-center gap-3 text-blue-600">
                            <Info size={20} />
                            <h3 className="font-black uppercase text-sm tracking-[0.2em]">Styling Guide & Description</h3>
                        </div>
                        
                        <p className="text-xl md:text-2xl font-medium leading-relaxed text-zinc-800 italic first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left">
                            {activePost.content[lang]}
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-square rounded-[2rem] bg-zinc-100 overflow-hidden italic text-[10px] flex items-center justify-center text-zinc-400">Related Look 01</div>
                            <div className="aspect-square rounded-[2rem] bg-zinc-100 overflow-hidden italic text-[10px] flex items-center justify-center text-zinc-400">Related Look 02</div>
                        </div>

                        <div className="p-8 border-l-4 border-black bg-zinc-50 italic">
                             "Fashion is the armor to survive the reality of everyday life." — ZWAY Editorial
                        </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

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