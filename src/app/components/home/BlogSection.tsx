"use client";

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BLOG_POSTS = [
  {
    id: 1,
    category: "Women",
    title: "How to Style for the New Season",
    excerpt: "Discover the ultimate tips for choosing stylish and comfortable outfits...",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070",
    date: "Feb 03, 2026"
  },
  {
    id: 2,
    category: "Men",
    title: "Top Trending Suits for 2026",
    excerpt: "Classic tailoring meets modern style in this year's men's collection...",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2070",
    date: "Jan 28, 2026"
  },
  {
    id: 3,
    category: "Women",
    title: "The Art of Minimalist Dressing",
    excerpt: "Less is more: How to pick essential pieces for your wardrobe...",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2070",
    date: "Jan 20, 2026"
  },
  {
    id: 4,
    category: "Men",
    title: "Casual Streetwear Essentials",
    excerpt: "Upgrade your daily look with these premium streetwear items...",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070",
    date: "Jan 15, 2026"
  },
  {
    id: 5,
    category: "Women",
    title: "Sustainable Fashion Choices",
    excerpt: "How to build an eco-friendly wardrobe without compromising on style...",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070",
    date: "Jan 10, 2026"
  }
];

export function BlogSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("All");

  const filteredPosts = selectedGender === "All" 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === selectedGender);

  return (
    <section className="py-16 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 uppercase">Fashion Blog</h2>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-full">
            {["All", "Men", "Women"].map((gender) => (
              <button
                key={gender}
                onClick={() => setSelectedGender(gender)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  selectedGender === gender 
                  ? "bg-black text-white shadow-md" 
                  : "text-gray-500 hover:text-black"
                }`}
              >
                {gender}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-gray-500 transition-colors"
          >
            View All <ArrowRight size={16} />
          </button>
        </div>

        {/* Blog Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedGender}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={true}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="blog-swiper pb-14"
            >
              {filteredPosts.map((post) => (
                <SwiperSlide key={post.id}>
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-sm mb-5">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-[280px] object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md font-bold text-[10px] tracking-widest uppercase">
                        {post.category}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{post.date}</p>
                      <h3 className="text-xl font-bold leading-tight line-clamp-1">{post.title}</h3>
                      <p className="text-gray-500 text-sm line-clamp-2 italic">"{post.excerpt}"</p>
                      <button className="flex items-center gap-2 text-xs font-bold tracking-widest border-b-2 border-black pb-1 uppercase hover:text-gray-500 hover:border-gray-500 transition-all">
                        Read More <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </AnimatePresence>

        {/* Modal Overlay (ដូចដើម) */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto relative rounded-xl p-8 md:p-16 no-scrollbar"
              >
                <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 bg-black text-white p-2 rounded-full hover:rotate-90 transition-transform">
                  <X size={20} />
                </button>
                <header className="text-center mb-16">
                  <h2 className="text-4xl font-black uppercase tracking-tighter">All Fashion Stories</h2>
                  <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {BLOG_POSTS.map((post) => (
                    <div key={post.id} className="space-y-4">
                      <div className="overflow-hidden rounded-lg">
                        <img src={post.image} className="w-full h-48 object-cover hover:scale-105 transition-transform" />
                      </div>
                      <h3 className="font-bold text-lg">{post.title}</h3>
                      <p className="text-gray-500 text-sm line-clamp-2">{post.excerpt}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}