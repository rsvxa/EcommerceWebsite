"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook, Twitter, Heart, MessageCircle, Share2 } from 'lucide-react';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';

const SOCIAL_POSTS = [
  { id: 1, platform: "Instagram", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070", likes: "1.2k", comments: "45", size: "md:col-span-2 md:row-span-2" },
  { id: 2, platform: "Facebook", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070", likes: "850", comments: "12", size: "md:col-span-1 md:row-span-1" },
  { id: 3, platform: "X", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070", likes: "3.5k", comments: "120", size: "md:col-span-1 md:row-span-1" },
  { id: 4, platform: "Instagram", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2070", likes: "2.1k", comments: "89", size: "md:col-span-1 md:row-span-2" },
  { id: 5, platform: "Facebook", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070", likes: "600", comments: "5", size: "md:col-span-1 md:row-span-1" },
  { id: 6, platform: "X", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2070", likes: "1.8k", comments: "67", size: "md:col-span-1 md:row-span-1" }
];

export function InstagramFeed() {
  const [filter, setFilter] = useState("All");
  const { lang } = useLanguage();
  const t = translations[lang].social;

  const PLATFORMS = [
    { id: "All", label: t.platforms.all, icon: null },
    { id: "Instagram", label: t.platforms.instagram, icon: <Instagram size={14} /> },
    { id: "Facebook", label: t.platforms.facebook, icon: <Facebook size={14} /> },
    { id: "X", label: t.platforms.x, icon: <Twitter size={14} /> },
  ];

  const filteredPosts = filter === "All" 
    ? SOCIAL_POSTS 
    : SOCIAL_POSTS.filter(post => post.platform === filter);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Luxury Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-700 text-[13px] font-black uppercase tracking-[0.5em] mb-4"
          >
            Social Community
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-zinc-900 ${lang === 'kh' ? 'font-freehand' : ''}`}
          >
            {t.heading}
          </motion.h2>
          
          {/* Minimalist Tabs */}
          <div className="flex flex-wrap justify-center gap-3 bg-white p-2 rounded-[2rem] shadow-sm border border-zinc-100">
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                onClick={() => setFilter(p.id)}
                className={`flex items-center gap-2 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                  filter === p.id 
                  ? "bg-black text-white shadow-xl scale-105" 
                  : "text-gray-400 hover:text-black"
                }`}
              >
                {p.icon} {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sophisticated Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className={`relative aspect-square group cursor-pointer overflow-hidden bg-gray-200 ${post.size}`}
              >
                <img 
                  src={post.image} 
                  alt={post.platform}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Advanced Interaction Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white">
                  
                  {/* Top: Platform & Share */}
                  <div className="flex justify-between items-start translate-y-[-20px] group-hover:translate-y-0 transition-transform duration-500">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20">
                      {post.platform === "Instagram" && <Instagram size={18} />}
                      {post.platform === "Facebook" && <Facebook size={18} />}
                      {post.platform === "X" && <Twitter size={18} />}
                    </div>
                    <button className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-zinc-900 hover:bg-blue-600 hover:text-white transition-colors">
                      <Share2 size={16} />
                    </button>
                  </div>

                  {/* Center: Engagement Stats */}
                  <div className="flex justify-center gap-8 text-white">
                    <div className="flex flex-col items-center gap-1 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <Heart size={24} className="fill-white" />
                      <span className="text-xs font-black tracking-widest">{post.likes}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-150">
                      <MessageCircle size={24} className="fill-white" />
                      <span className="text-xs font-black tracking-widest">{post.comments}</span>
                    </div>
                  </div>

                  {/* Bottom: Action Label */}
                  <div className="translate-y-[20px] group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/70 text-center">
                      Click to view post
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer CTA */}
        <div className="mt-20 text-center">
          <button className="group relative px-12 py-5 bg-zinc-900 text-white rounded-full overflow-hidden transition-all hover:pr-16">
            <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.3em]">
              Follow @ZWAY_FASHION
            </span>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">
              <Instagram size={18} />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}