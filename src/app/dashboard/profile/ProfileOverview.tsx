"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/store/use-language';
import { User, Package, MapPin, ArrowUpRight, CreditCard } from 'lucide-react';

export function ProfileOverview() {
  const { lang } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Personal Details Card */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="group relative p-10 border border-zinc-100 rounded-[2.5rem] bg-white transition-all hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
          <User size={120} />
        </div>

        <div className="relative space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-blue-600" />
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
              {lang === 'kh' ? 'ព័ត៌មានផ្ទាល់ខ្លួន' : 'Identity'}
            </h4>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300 mb-1">Name</p>
              <p className="text-lg font-black uppercase tracking-tighter text-zinc-900">John Doe</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300 mb-1">Email</p>
                <p className="text-sm font-bold text-zinc-600">john.doe@example.com</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300 mb-1">Contact</p>
                <p className="text-sm font-bold text-zinc-600">+855 12 345 678</p>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 pt-4 hover:gap-4 transition-all">
            {lang === 'kh' ? 'កែសម្រួល' : 'Edit Profile'}
            <ArrowUpRight size={14} />
          </button>
        </div>
      </motion.div>

      {/* Latest Order Card (The Highlight) */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="group relative p-10 rounded-[2.5rem] bg-zinc-900 text-white shadow-2xl shadow-zinc-200 overflow-hidden"
      >
        {/* Animated Background Element */}
        <div className="absolute -bottom-10 -right-10 h-64 w-64 bg-blue-600/20 blur-[80px] rounded-full group-hover:bg-blue-500/30 transition-colors" />
        
        <div className="relative h-full flex flex-col justify-between space-y-8">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                {lang === 'kh' ? 'ការបញ្ជាទិញចុងក្រោយ' : 'Recent Acquisition'}
              </h4>
              <p className="text-3xl font-black italic tracking-tighter">#ORD-9921</p>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10">
              <Package className="text-white" size={20} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <div className="h-2 w-2 rounded-full bg-current animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Status</p>
                <p className="text-xs font-bold uppercase tracking-[0.1em]">
                  {lang === 'kh' ? 'កំពុងដឹកជញ្ជូន' : 'In Transit to Destination'}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Est. Arrival</p>
                <p className="text-xs font-bold">Oct 28, 2025</p>
              </div>
              <button className="px-6 py-3 bg-white text-zinc-900 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-colors">
                Track
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Optional Third Card: Quick Actions/Stats */}
      <div className="md:col-span-2 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Wishlist', val: '12', icon: <ArrowUpRight size={12}/> },
          { label: 'Store Credit', val: '$0.00', icon: <CreditCard size={12}/> },
          { label: 'Addresses', val: '02', icon: <MapPin size={12}/> },
          { label: 'Rewards', val: 'Elite', icon: <div className="h-1 w-1 rounded-full bg-blue-600"/> }
        ].map((stat, i) => (
          <div key={i} className="p-6 border border-zinc-100 rounded-2xl flex items-center justify-between group hover:bg-zinc-50 transition-colors cursor-pointer">
            <div>
              <p className="text-[8px] font-black uppercase tracking-widest text-zinc-400 mb-1">{stat.label}</p>
              <p className="text-sm font-black text-zinc-900">{stat.val}</p>
            </div>
            <div className="text-zinc-300 group-hover:text-zinc-900 transition-colors">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}