"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';

const COLLECTIONS = [
  { 
    title: "Streetwear", 
    subtitle: "2026 Edition",
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000" 
  },
  { 
    title: "Essentials", 
    subtitle: "Daily Wear",
    img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000" 
  },
  { 
    title: "Accessories", 
    subtitle: "Final Touch",
    img: "https://i.pinimg.com/736x/41/62/42/4162422b15c28a458ce5cd6b6e25380f.jpg?q=80&w=1000" 
  },
];

export function FeaturedCollections() {
  return (
    <section className="pb-24 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black uppercase tracking-tighter">Featured Collections</h2>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLLECTIONS.map((col, index) => (
            <div key={index} className="relative h-[600px] group cursor-pointer overflow-hidden bg-gray-200">
              <img 
                src={col.img} 
                alt={col.title}
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <span className="text-white/70 text-xs font-bold uppercase tracking-[0.3em] mb-2">{col.subtitle}</span>
                <h3 className="text-white text-3xl font-black uppercase mb-6 tracking-tighter">{col.title}</h3>
                <button className="flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-[0.2em] border-b border-white/50 pb-2 w-fit hover:border-white transition-all">
                  Browse Collection <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}