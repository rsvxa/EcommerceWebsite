"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook, Twitter, Heart, MessageCircle } from 'lucide-react';

// ១. បង្កើតទិន្នន័យសម្រាប់ Feed
const SOCIAL_POSTS = [
  {
    id: 1,
    platform: "Instagram",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070",
    likes: "1.2k",
    comments: "45"
  },
  {
    id: 2,
    platform: "Facebook",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070",
    likes: "850",
    comments: "12"
  },
  {
    id: 3,
    platform: "X",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070",
    likes: "3.5k",
    comments: "120"
  },
  {
    id: 4,
    platform: "Instagram",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2070",
    likes: "2.1k",
    comments: "89"
  },
  {
    id: 5,
    platform: "Facebook",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070",
    likes: "600",
    comments: "5"
  },
  {
    id: 6,
    platform: "X",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2070",
    likes: "1.8k",
    comments: "67"
  }
];

export function InstagramFeed() {
  const [filter, setFilter] = useState("All");

  // ២. Filter Logic
  const filteredPosts = filter === "All" 
    ? SOCIAL_POSTS 
    : SOCIAL_POSTS.filter(post => post.platform === filter);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Shop The Look</h2>
          <p className="text-gray-500 text-sm mb-8">Follow us on social media for daily inspiration</p>

          {/* Platform Tabs */}
          <div className="flex justify-center items-center gap-2 bg-gray-100 p-1 rounded-full w-fit mx-auto">
            {["All", "Instagram", "Facebook", "X"].map((p) => (
              <button
                key={p}
                onClick={() => setFilter(p)}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${
                  filter === p 
                  ? "bg-black text-white shadow-lg" 
                  : "text-gray-400 hover:text-black"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Feed */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-square group cursor-pointer overflow-hidden bg-gray-200"
              >
                <img 
                  src={post.image} 
                  alt={post.platform}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white">
                  <div className="flex items-center gap-2">
                    <Heart size={20} fill="white" />
                    <span className="font-bold">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle size={20} fill="white" />
                    <span className="font-bold">{post.comments}</span>
                  </div>
                  {/* Icon សម្គាល់ Platform នៅជ្រុងខាងលើ */}
                  <div className="absolute top-4 right-4">
                    {post.platform === "Instagram" && <Instagram size={18} />}
                    {post.platform === "Facebook" && <Facebook size={18} />}
                    {post.platform === "Twitter" && <Twitter size={18} />}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}