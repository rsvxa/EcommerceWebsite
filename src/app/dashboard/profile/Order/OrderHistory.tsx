"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/store/use-language';
import { 
  Package, Truck, CheckCircle2, 
  Clock, ArrowUpRight, Search, Filter 
} from 'lucide-react';

export function OrderHistory() {
  const { lang } = useLanguage();

  const orders = [
    {
      id: "ZW-ORD-9901",
      date: "Oct 24, 2025",
      status: "Delivered",
      total: "$1,240.00",
      items: 3,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200",
    },
    {
      id: "ZW-ORD-9852",
      date: "Oct 12, 2025",
      status: "In Transit",
      total: "$850.00",
      items: 1,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200",
    },
  ];

  return (
    <div className="space-y-8 p-2">
      {/* Search & Filter Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div className="space-y-1">
          <h2 className="text-2xl font-black uppercase tracking-tighter italic text-zinc-900">
            {lang === 'kh' ? 'ប្រវត្តិនៃការបញ្ជាទិញ' : 'Acquisition Vault'}
          </h2>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
            Tracking your luxury investments
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Find order..." 
              className="pl-12 pr-6 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl text-xs font-bold outline-none focus:ring-1 ring-zinc-200 w-64 transition-all"
            />
          </div>
          <button className="p-3 bg-zinc-50 border border-zinc-100 rounded-2xl text-zinc-900 hover:bg-zinc-900 hover:text-white transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order, idx) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={order.id}
            className="group relative bg-white border border-zinc-100 rounded-[2.5rem] p-6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-8">
              {/* Product Thumbnail */}
              <div className="relative h-24 w-24 rounded-3xl bg-zinc-50 overflow-hidden flex-shrink-0 border border-zinc-100">
                <img src={order.image} alt="Order" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>

              {/* Order Info */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Order ID</p>
                  <p className="text-sm font-black text-zinc-900">#{order.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Purchased On</p>
                  <p className="text-sm font-bold text-zinc-600">{order.date}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Total Investment</p>
                  <p className="text-sm font-black text-zinc-900">{order.total}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Status</p>
                  <div className="flex items-center gap-2">
                    <div className={`h-1.5 w-1.5 rounded-full ${order.status === 'Delivered' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                    <p className={`text-[10px] font-black uppercase tracking-widest ${order.status === 'Delivered' ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {order.status}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button className="flex items-center justify-center gap-3 bg-zinc-50 hover:bg-zinc-900 text-zinc-900 hover:text-white px-8 py-4 rounded-2xl transition-all duration-500 group/btn">
                <span className="text-[10px] font-black uppercase tracking-widest">Details</span>
                <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="py-20 text-center space-y-4">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-zinc-50 text-zinc-200">
            <Package size={40} />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-300">No acquisitions found</p>
        </div>
      )}
    </div>
  );
}