"use client";

import React from 'react';
import { ArrowRight, Plus, ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';
import { motion } from 'framer-motion';
import { useCartStore } from '@/lib/store/cart-store';
import { toast } from 'sonner';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";

export function FeaturedCollections() {
  const { lang } = useLanguage();
  const t = translations[lang].collections;
  const addItem = useCartStore((state) => state.addItem);

  const COLLECTIONS = [
    { 
      id: 'streetwear',
      title: lang === 'kh' ? 'ម៉ូដយុវវ័យ' : t.items.streetwear.title, 
      subtitle: lang === 'kh' ? 'ស្ទីលប្លែក និងទាន់សម័យ' : t.items.streetwear.subtitle,
      img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000",
      products: [
        { id: 101, name: lang === 'kh' ? "អាវរងា Oversized" : "Street Oversized Hoodie", price: 85.00, images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500"], stock: 15, variants: [] },
        { id: 102, name: lang === 'kh' ? "ខោហោប៉ៅច្រើន Tech" : "Cargo Tech Pants", price: 120.00, images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500"], stock: 8, variants: [] },
        { id: 103, name: lang === 'kh' ? "អាវយឺតក្រាហ្វិក" : "Urban Graphic Tee", price: 45.00, images: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500"], stock: 20, variants: [] },
      ]
    },
    { 
      id: 'essentials',
      title: lang === 'kh' ? 'របស់ចាំបាច់' : t.items.essentials.title, 
      subtitle: lang === 'kh' ? 'សាមញ្ញ តែមានគុណភាព' : t.items.essentials.subtitle,
      img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000",
      products: [
        { id: 104, name: lang === 'kh' ? "អាវយឺតសាច់កប្បាស" : "Premium Cotton Tee", price: 35.00, images: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500"], stock: 50, variants: [] },
        { id: 105, name: lang === 'kh' ? "ខោជើងវែងបែបសាមញ្ញ" : "Minimalist Chinos", price: 75.00, images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500"], stock: 12, variants: [] },
      ]
    },
    { 
      id: 'accessories',
      title: lang === 'kh' ? 'គ្រឿងតុបតែង' : t.items.accessories.title, 
      subtitle: lang === 'kh' ? 'បន្ថែមភាពលេចធ្លោ' : t.items.accessories.subtitle,
      img: "https://i.pinimg.com/736x/41/62/42/4162422b15c28a458ce5cd6b6e25380f.jpg?q=80&w=1000",
      products: [
        { id: 106, name: lang === 'kh' ? "មួកម៉ាកសញ្ញា" : "Signature Cap", price: 25.00, images: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500"], stock: 30, variants: [] },
        { id: 107, name: lang === 'kh' ? "កាបូបស្ពាយចំហៀង" : "Leather Crossbody", price: 150.00, images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500"], stock: 5, variants: [] },
      ]
    },
  ];

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.stock === 0) return;

    addItem({ ...product, price: Number(product.price) });
    
    toast.success(lang === 'kh' ? 'បន្ថែមជោគជ័យ!' : 'Added to Cart', {
      description: lang === 'kh' 
        ? `${product.name} ត្រូវបានដាក់ចូលក្នុងកន្ត្រក។`
        : `${product.name} has been added to your cart.`,
      icon: <ShoppingCart className="h-4 w-4 text-emerald-500" />,
      position: "bottom-right",
    });
  };

  return (
    <section className="pb-24 bg-white">
      <div className="max-w-full mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-20 select-none">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-gray-400 text-[11px] font-black uppercase tracking-[0.6em] mb-4 italic"
          >
            Spring Summer 2026
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`text-5xl font-black uppercase tracking-tighter text-zinc-900 leading-[0.85] italic ${lang === 'kh' ? 'font-freehand' : ''}`}
          >
            {t.heading}
          </motion.h2>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLLECTIONS.map((col, index) => (
            <Sheet key={index}>
              <SheetTrigger asChild>
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="relative h-[650px] group cursor-pointer overflow-hidden rounded-[3.5rem] bg-zinc-100"
                >
                  <img 
                    src={col.img} 
                    alt={col.title}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  />
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-10 flex flex-col justify-end italic">
                    <div className="absolute top-10 right-10 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 rotate-0 group-hover:rotate-90">
                      <Plus size={24} />
                    </div>

                    <p className="text-white/60 text-[12px] font-black uppercase tracking-[0.4em] mb-4 overflow-hidden">
                      <motion.span className="block group-hover:translate-y-0 translate-y-full transition-transform duration-500">
                        {col.subtitle}
                      </motion.span>
                    </p>
                    
                    <h3 className={`text-white text-5xl font-black uppercase tracking-tighter leading-none mb-8 overflow-hidden ${lang === 'kh' ? 'font-freehand py-2' : ''}`}>
                      <motion.span className="block group-hover:translate-y-0 translate-y-full transition-transform duration-700 delay-75">
                        {col.title}
                      </motion.span>
                    </h3>
                    
                    <div className="flex items-center gap-4">
                      <div className="border border-white/30 text-white hover:text-black px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-white transition-colors">
                        {t.browse}
                      </div>
                      <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SheetTrigger>

              <SheetContent side="right" className="w-full sm:max-w-[450px] border-none bg-white p-0 shadow-2xl italic">
                <div className="h-full flex flex-col">
                  <SheetHeader className="p-8 border-b border-zinc-50 bg-zinc-50/50">
                    <div className="flex items-center gap-2 mb-2">
                       <ShoppingCart size={14} className="text-zinc-400" />
                       <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">
                         {lang === 'kh' ? 'ហាងទំនិញផ្តាច់មុខ' : 'Collection Boutique'}
                       </span>
                    </div>
                    <SheetTitle className={`text-4xl font-black uppercase tracking-tighter italic ${lang === 'kh' ? 'font-freehand' : ''}`}>
                      {col.title}
                    </SheetTitle>
                    <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest">
                      {col.products.length} {lang === 'kh' ? 'ផលិតផលមានក្នុងស្តុក' : 'Exclusive Pieces'}
                    </p>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                    {col.products.map((product) => (
                      <motion.div 
                        key={product.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex gap-6 group"
                      >
                        <div className="w-24 h-32 rounded-[2rem] bg-zinc-100 overflow-hidden shrink-0 shadow-sm border border-zinc-50">
                          <img 
                            src={product.images[0]} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                            alt={product.name}
                          />
                        </div>
                        <div className="flex flex-col justify-center flex-1">
                          <h4 className="font-black uppercase text-sm mb-1 tracking-tight text-zinc-900">{product.name}</h4>
                          <p className="text-zinc-500 font-black text-sm mb-4">${product.price.toFixed(2)}</p>
                          <Button 
                            onClick={(e) => handleAddToCart(e, product)}
                            variant="outline" 
                            className="w-fit rounded-xl h-9 text-[10px] font-black uppercase border-zinc-200 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all gap-2"
                          >
                            <Plus size={14} /> {lang === 'kh' ? 'បន្ថែមក្នុងកន្ត្រក' : 'Add to Cart'}
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-8 bg-zinc-50 border-t border-zinc-100">
                    <Button className="w-full h-15 py-7 rounded-[1.5rem] bg-zinc-900 text-white font-black uppercase text-[11px] tracking-[0.2em] hover:bg-black transition-all gap-3 shadow-2xl shadow-black/10">
                      {lang === 'kh' ? 'មើលម៉ូដទាំងអស់' : 'View Full Collection'} <ArrowRight size={18} />
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </div>
    </section>
  );
}