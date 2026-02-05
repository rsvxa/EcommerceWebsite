"use client";

import React, { useState } from 'react';
import { Plus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LOOK_PRODUCTS = [
  { id: 1, name: "Creamy White", price: "$249.00", top: "25%", left: "45%" },
  { id: 2, name: "Trouser", price: "$120.00", top: "55%", left: "35%" },
  { id: 3, name: "Nude/Tan bag", price: "$85.00", top: "75%", left: "65%" }
];

export function ShopTheLook() {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          <div className="relative w-full md:w-1/2 aspect-[3/4] overflow-hidden rounded-lg shadow-2xl">
            <img 
              src="https://i.pinimg.com/736x/de/cc/cd/decccd1f0765a2020efc0a491c9a358a.jpg?q=80&w=1000" 
              alt="Fashion Look"
              className="w-full h-full object-cover"
            />

            {/* Hotspot Markers */}
            {LOOK_PRODUCTS.map((product) => (
              <div 
                key={product.id}
                style={{ top: product.top, left: product.left }}
                className="absolute z-10"
              >
                <button
                  onClick={() => setActiveId(activeId === product.id ? null : product.id)}
                  className="relative flex items-center justify-center w-8 h-8 bg-black text-white rounded-full hover:scale-110 transition-transform shadow-lg group"
                >
                  <Plus size={16} className={activeId === product.id ? "rotate-45 transition-transform" : "transition-transform"} />
                  {/* Pulse Effect */}
                  <span className="absolute inset-0 rounded-full bg-black animate-ping opacity-25"></span>
                </button>

                {/* Pop-up Card */}
                <AnimatePresence>
                  {activeId === product.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="absolute top-10 left-0 w-48 bg-white p-4 shadow-xl rounded-md z-20 border border-gray-100"
                    >
                      <h4 className="text-sm font-bold uppercase tracking-tighter">{product.name}</h4>
                      <p className="text-gray-500 text-xs mt-1 mb-3">{product.price}</p>
                      <button className="flex items-center gap-2 bg-black text-white text-[10px] font-bold px-3 py-2 w-full justify-center rounded-sm hover:bg-gray-800">
                        <ShoppingBag size={12} /> Add to Cart
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Side: Text Content */}
          <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
            <span className="text-sm font-black uppercase tracking-[0.5em] text-gray-600">Neutral Tones Style</span>
            <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">
              Shop The <br /> Whole Look
            </h2>
            <p className="text-gray-500 leading-relaxed max-w-md mx-auto md:mx-0">
              Why settle for one piece when you can have the entire aesthetic? Click the markers on the image to discover each element of this season's signature streetwear outfit.
            </p>
            <div className="pt-4">
              <button className="px-10 py-4 bg-black rounded text-white font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors">
                Explore Full Lookbook
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}