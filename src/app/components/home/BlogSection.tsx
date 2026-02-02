"use client";

import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ArrowRight } from 'lucide-react';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BLOG_POSTS = [
  {
    id: 1,
    title: "How to Style for the New Season",
    excerpt: "Discover the ultimate tips for choosing stylish and comfortable outfits for 2026...",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070",
    date: "Feb 03, 2026"
  },
  {
    id: 2,
    title: "Top Trending Colors of 2026",
    excerpt: "Which colors are dominating the fashion market this year? Explore the latest trends with us...",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070",
    date: "Jan 28, 2026"
  },
  {
    id: 3,
    title: "The Art of Minimalist Dressing",
    excerpt: "Less is more: How to pick a few essential pieces that create multiple stunning looks...",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2070",
    date: "Jan 20, 2026"
  },
  {
    id: 4,
    title: "Accessories That Elevate Your Look",
    excerpt: "Choosing the right necklaces and earrings to match your face shape and outfit perfectly...",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2070",
    date: "Jan 15, 2026"
  },
  {
    id: 5,
    title: "Sustainable Fashion Choices",
    excerpt: "How to build an eco-friendly wardrobe without compromising on style and elegance...",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070",
    date: "Jan 10, 2026"
  }
];

export function BlogSection() {
  return (
    <section className="py-16 bg-white border-t border-gray-50">
      <div className="container mx-auto px-4">
        {/* Blog Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 uppercase">Fashion Blog</h2>
            <div className="h-1.5 w-16 bg-black mt-2"></div>
          </div>
          <button className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-gray-500 transition-colors">
            View All Posts <ArrowRight size={16} />
          </button>
        </div>

        {/* Blog Slider */}
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
          {BLOG_POSTS.map((post) => (
            <SwiperSlide key={post.id}>
              <div className="group cursor-pointer">
                {/* Blog Image */}
                <div className="relative overflow-hidden rounded-sm mb-5 shadow-sm">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-[280px] object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md font-bold tracking-widest">
                    Lifestyle
                  </div>
                </div>

                {/* Post Content */}
                <div className="space-y-3">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{post.date}</p>
                  <h3 className="text-xl font-bold leading-tight group-hover:text-black transition-colors line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-md line-clamp-2 leading-relaxed">
                    "{post.excerpt}"
                  </p>
                  
                  {/* Read More Button */}
                  <div className="pt-2">
                    <button className="flex items-center gap-2 text-md font-bold tracking-widest border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all">
                      Read More
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}