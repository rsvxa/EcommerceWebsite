"use client";

import React, { useState, useEffect } from 'react';
import { Plus, ShoppingCart, Star, TrendingUp, X, Loader2 } from 'lucide-react';
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
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const addItem = useCartStore((state) => state.addItem);
  const setOpen = useCartStore((state) => state.setOpen); 

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/products'); 
        const data = await response.json();
        
        const topThree = data
          .sort((a: any, b: any) => (b.stocks < a.stocks ? 1 : -1))
          .slice(0, 3);
          
        setProducts(topThree);
      } catch (error) {
        console.error("Failed to fetch top products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopProducts();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      stock: product.stocks
    });
    
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

  if (isLoading) {
    return (
      <div className="py-24 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-300" />
      </div>
    );
  }

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
          {products.map((product, index) => (
            <Sheet key={product.id}>
              <SheetTrigger asChild>
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="relative h-[500px] md:h-[600px] lg:h-[700px] group cursor-pointer overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-zinc-100"
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                  />
                  
                  <div className="absolute top-6 left-6 md:top-8 md:left-8 flex flex-col gap-2">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full flex items-center gap-2 shadow-xl">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-[10px] font-black">4.9</span>
                    </div>
                    <div className="bg-black text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest">
                        NEW SEASON
                    </div>
                  </div>

                  <div className="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white md:opacity-0 group-hover:opacity-100 transition-all duration-500 rotate-0 group-hover:rotate-90">
                    <Plus size={20} />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 md:p-10 flex flex-col justify-end italic">
                    <p className="text-white text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] mb-2 md:mb-3">
                        {product.type} Selection
                    </p>
                    
                    <h3 className={`text-white text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-none mb-4 md:mb-6 ${lang === 'kh' ? 'font-freehand py-1' : ''}`}>
                        {product.name}
                    </h3>
                    
                    <div className="flex items-center justify-between border-t border-white/20 pt-4 md:pt-6">
                      <div className="flex flex-col">
                        <span className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Starting at</span>
                        <span className="text-white text-xl md:text-2xl font-black">${Number(product.price).toFixed(2)}</span>
                      </div>
                      <div className="bg-white text-black px-5 py-3 md:px-8 md:py-4 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-widest group-hover:bg-zinc-100 transition-colors">
                        {lang === 'kh' ? 'មើលលម្អិត' : 'View Detail'}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SheetTrigger>

              <SheetContent side="right" className="w-full sm:max-w-[90%] md:max-w-[50%] lg:max-w-[40%] border-none bg-white p-0 shadow-2xl italic">
                <div className="h-full flex flex-col">
                  <div className="absolute top-4 right-4 z-50 md:hidden">
                    <SheetClose className="p-2 bg-black text-white rounded-full">
                      <X size={20} />
                    </SheetClose>
                  </div>

                  <div className="relative h-[40vh] md:h-[40vh] w-full">
                    <img src={product.image} className="w-[40%] h-full " alt={product.name} />
                  </div>

                  <SheetHeader className="p-6 md:p-10 border-b border-zinc-50">
                    <div className="flex items-center gap-2 mb-4">
                       <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                       <span className="text-[9px] md:text-[10px] text-emerald-600 font-black uppercase tracking-widest">
                         {product.stocks > 0 ? (lang === 'kh' ? 'មានក្នុងស្តុក' : 'In Stock') : (lang === 'kh' ? 'អស់ពីស្តុក' : 'Out of Stock')}
                       </span>
                    </div>
                    <SheetTitle className={`text-2xl md:text-4xl font-black uppercase tracking-tighter italic leading-none ${lang === 'kh' ? 'font-freehand py-2' : ''}`}>
                      {product.name}
                    </SheetTitle>
                    <p className="text-xs md:text-sm text-zinc-500 font-medium leading-relaxed">
                      {product.description || (lang === 'kh' ? 'មិនមានការពិពណ៌នា' : 'No description available')}
                    </p>
                  </SheetHeader>

                  <div className="p-6 md:p-10 mt-auto">
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-2xl md:text-3xl font-black text-zinc-900">${Number(product.price).toFixed(2)}</span>
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Limited Edition</span>
                    </div>
                    <Button 
                      disabled={product.stocks === 0}
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-full rounded-xl md:rounded-2xl h-14 md:h-16 text-[10px] md:text-[12px] font-black uppercase bg-zinc-900 text-white hover:bg-black transition-all gap-4 shadow-xl"
                    >
                      <Plus size={18} /> {lang === 'kh' ? 'ដាក់ចូលក្នុងកន្ត្រក' : 'Add to Cart'}
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