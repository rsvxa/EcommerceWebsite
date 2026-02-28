"use client";

import React from 'react';
import { ArrowRight, Plus, ShoppingCart, Star, TrendingUp, X } from 'lucide-react';
import { useLanguage } from '@/lib/store/use-language';
import { motion } from 'framer-motion';
import { useCartStore } from '@/lib/store/cart-store';
import { toast } from 'sonner';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "../ui/sheet";
import { Button } from "../ui/button";

export function TopSelling() {
  const { lang } = useLanguage();
  
  const addItem = useCartStore((state) => state.addItem);
  const setOpen = useCartStore((state) => state.setOpen); 

  const TOP_PRODUCTS = [
    { 
      id: 'top-1',
      title: lang === 'kh' ? 'អាវរងាបែប Street' : 'Urban Street Hoodie', 
      subtitle: lang === 'kh' ? 'ពេញនិយមបំផុតប្រចាំខែ' : 'Best Seller of the Month',
      img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000",
      rating: "4.9",
      sales: "1.2k+",
      price: 85.00,
      details: lang === 'kh' ? 'សាច់ក្រណាត់ក្រាស់ទន់ និងមានផាសុកភាពខ្ពស់។' : 'Premium heavy cotton for maximum comfort.',
      related: [
        { id: 201, name: lang === 'kh' ? "ពណ៌ខ្មៅសុទ្ធ" : "Midnight Black", price: 85.00, images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500"], stock: 10, variants: [] },
        { id: 202, name: lang === 'kh' ? "ពណ៌ប្រផេះផ្សែង" : "Smoke Grey", price: 85.00, images: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500"], stock: 5, variants: [] },
      ]
    },
    { 
      id: 'top-2',
      title: lang === 'kh' ? 'ខោខូវប៊យ Modern' : 'Modern Slim Denim', 
      subtitle: lang === 'kh' ? 'ម៉ូដពេញនិយមឆ្នាំ ២០២៦' : 'Trending Silhouette 2026',
      img: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000",
      rating: "4.8",
      sales: "850+",
      price: 110.00,
      details: lang === 'kh' ? 'រចនាឡើងយ៉ាងសម្រិតសម្រាំងសម្រាប់រាងកាយបុរសសម័យថ្មី។' : 'Engineered fit for the modern professional.',
      related: [
        { id: 203, name: lang === 'kh' ? "ពណ៌ខៀវចាស់" : "Deep Indigo", price: 110.00, images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"], stock: 15, variants: [] },
      ]
    },
    { 
      id: 'top-3',
      title: lang === 'kh' ? 'អាវក្រៅលំដាប់ខ្ពស់' : 'Luxury Varsity Jacket', 
      subtitle: lang === 'kh' ? 'ស្តុកថ្មីលក់ដាច់ខ្លាំង' : 'Highly Anticipated Restock',
      img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000",
      rating: "5.0",
      sales: "500+",
      price: 195.00,
      details: lang === 'kh' ? 'ការរួមបញ្ចូលគ្នារវាងស្បែក និងរោមចៀមគុណភាពខ្ពស់។' : 'Iconic blend of premium wool and leather.',
      related: [
        { id: 204, name: lang === 'kh' ? "ពណ៌បៃតងចាស់" : "Forest Green", price: 195.00, images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"], stock: 3, variants: [] },
      ]
    },
  ];

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({ ...product, price: Number(product.price) });
    
    toast.success(lang === 'kh' ? 'បន្ថែមជោគជ័យ!' : 'Added to Cart', {
      description: lang === 'kh' 
        ? `${product.name} ត្រូវបានដាក់ចូលក្នុងកន្ត្រក។`
        : `${product.name} has been added to your cart.`,
      icon: <ShoppingCart className="h-4 w-4 text-emerald-500" />,
      position: "bottom-center",
    });

    setTimeout(() => {
      setOpen(true);
    }, 500);
  };

  return (
    <section className="py-12 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-16 select-none">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="space-y-4"
          >
            <span className="flex items-center justify-center gap-2 text-black text-[11px] md:text-[13px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">
              <TrendingUp size={14} /> {lang === 'kh' ? 'ចំណូលចិត្តបច្ចុប្បន្ន' : 'Current Favorites'}
            </span>
            <h2 className={`text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-tight text-zinc-900 ${lang === 'kh' ? 'font-freehand' : ''}`}>
              {lang === 'kh' ? 'ផលិតផលលក់ដាច់បំផុត' : 'Top Selling'}
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {TOP_PRODUCTS.map((col, index) => (
            <Sheet key={index}>
              <SheetTrigger asChild>
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="relative h-[500px] md:h-[600px] lg:h-[700px] group cursor-pointer overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-zinc-100"
                >
                  <img 
                    src={col.img} 
                    alt={col.title}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                  />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-6 left-6 md:top-8 md:left-8 flex flex-col gap-2">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full flex items-center gap-2 shadow-xl">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-[10px] font-black">{col.rating}</span>
                    </div>
                    <div className="bg-black text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest">
                        {col.sales} SOLD
                    </div>
                  </div>

                  {/* Add Icon - Hidden on Mobile Touch, shown on Hover */}
                  <div className="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white md:opacity-0 group-hover:opacity-100 transition-all duration-500 rotate-0 group-hover:rotate-90">
                    <Plus size={20} />
                  </div>

                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 md:p-10 flex flex-col justify-end italic">
                    <p className="text-white text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] mb-2 md:mb-3">
                        {col.subtitle}
                    </p>
                    
                    <h3 className={`text-white text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-none mb-4 md:mb-6 ${lang === 'kh' ? 'font-freehand py-1' : ''}`}>
                        {col.title}
                    </h3>
                    
                    <div className="flex items-center justify-between border-t border-white/20 pt-4 md:pt-6">
                      <div className="flex flex-col">
                        <span className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Starting at</span>
                        <span className="text-white text-xl md:text-2xl font-black">${col.price.toFixed(2)}</span>
                      </div>
                      <div className="bg-white text-black px-5 py-3 md:px-8 md:py-4 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-widest group-hover:bg-zinc-100 transition-colors">
                        {lang === 'kh' ? 'ទិញឥឡូវ' : 'Shop Now'}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SheetTrigger>

              <SheetContent side="right" className="w-full sm:max-w-[90%] md:max-w-[50%] lg:max-w-[40%] border-none bg-white p-0 shadow-2xl italic">
                <div className="h-full flex flex-col">
                  {/* Close button for better mobile UX */}
                  <div className="absolute top-4 right-4 z-50 md:hidden">
                    <SheetClose className="p-2 bg-black text-white rounded-full">
                      <X size={20} />
                    </SheetClose>
                  </div>

                  <SheetHeader className="p-6 md:p-10 border-b border-zinc-50 bg-zinc-50/30">
                    <div className="flex items-center gap-2 mb-4">
                       <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                       <span className="text-[9px] md:text-[10px] text-emerald-600 font-black uppercase tracking-widest">
                         {lang === 'kh' ? 'មានក្នុងស្តុកស្រាប់' : 'In Stock & Ready to Ship'}
                       </span>
                    </div>
                    <SheetTitle className={`text-2xl md:text-4xl font-black uppercase tracking-tighter italic leading-none ${lang === 'kh' ? 'font-freehand py-2' : ''}`}>
                      {col.title}
                    </SheetTitle>
                    <p className="text-xs md:text-sm text-zinc-500 font-medium leading-relaxed">
                      {col.details}
                    </p>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 md:space-y-10 no-scrollbar">
                    <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 border-b border-zinc-100 pb-4">Available Variants</h4>
                    {col.related.map((product) => (
                      <motion.div 
                        key={product.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col sm:flex-row gap-4 md:gap-8 group"
                      >
                        <div className="w-full sm:w-32 h-48 sm:h-40 rounded-[1.5rem] md:rounded-[2.5rem] bg-zinc-100 overflow-hidden shrink-0 shadow-sm">
                          <img 
                            src={product.images[0]} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                            alt={product.name}
                          />
                        </div>
                        <div className="flex flex-col justify-center flex-1 space-y-3 md:space-y-4">
                          <div>
                            <h4 className="font-black uppercase text-sm md:text-base tracking-tight text-zinc-900 mb-1">{product.name}</h4>
                            <p className="text-zinc-400 font-black text-xs md:text-sm">${product.price.toFixed(2)}</p>
                          </div>
                          
                          <Button 
                            onClick={(e) => handleAddToCart(e, product)}
                            className="w-full rounded-xl md:rounded-2xl h-10 md:h-12 text-[9px] md:text-[10px] font-black uppercase bg-zinc-900 text-white hover:bg-black transition-all gap-3"
                          >
                            <Plus size={16} /> {lang === 'kh' ? 'ដាក់ចូលក្នុងកន្ត្រក' : 'Add to Cart'}
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="pb-10">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsLookbookOpen(false)}
                      className="w-full h-14 rounded-xl font-black uppercase tracking-widest text-black text-[11px] border-zinc-200 hover:bg-zinc-100 transition-all"
                    >
                      {lang === 'kh' ? 'ត្រឡប់ក្រោយ' : 'Back home'}
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