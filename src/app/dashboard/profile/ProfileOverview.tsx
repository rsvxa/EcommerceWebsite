"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/store/use-language';
import { 
  User, Package, MapPin, ArrowUpRight, 
  CreditCard, Crown, ShieldCheck, Sparkles 
} from 'lucide-react';

export function ProfileOverview() {
  const { lang } = useLanguage();

  return (
    <div className="space-y-10">
      {/* Top Welcome Header - Luxury Branding */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-black">
            <Sparkles size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              {lang === 'kh' ? 'សមាជិកកម្រិតខ្ពស់' : 'Privileged Member'}
            </span>
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-zinc-900">
            {lang === 'kh' ? 'ជម្រាបសួរ, ' : 'Welcome back, '} 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-500 to-zinc-800">John Doe</span>
          </h2>
        </div>
        <div className="flex items-center gap-4 bg-zinc-50 px-6 py-3 rounded-2xl border border-zinc-100">
          <div className="text-right">
            <p className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Current Status</p>
            <p className="text-xs font-black uppercase tracking-widest text-zinc-900 italic">Platinum Tier</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-zinc-900 flex items-center justify-center text-amber-400 shadow-lg shadow-zinc-200">
            <Crown size={20} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Personal Details - Premium Glass Card */}
        <motion.div 
          whileHover={{ y: -8 }}
          className="md:col-span-2 group relative p-10 rounded-[3rem] bg-white border border-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:scale-110 transition-transform duration-700">
            <User size={200} />
          </div>

          <div className="relative space-y-10">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-900 border border-zinc-100 shadow-inner">
                <ShieldCheck size={20} />
              </div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">
                {lang === 'kh' ? 'ព័ត៌មានអត្តសញ្ញាណ' : 'Verified Identity'}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-300">Full Name</p>
                <p className="text-xl font-black text-zinc-900">Johnathan Doe</p>
              </div>
              <div className="space-y-1 border-l border-zinc-50 pl-8">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-300">Membership ID</p>
                <p className="text-xl font-black text-zinc-900">ZW-889-001</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-300">Primary Email</p>
                <p className="text-sm font-bold text-zinc-500">john.doe@vip-zway.com</p>
              </div>
              <div className="space-y-1 border-l border-zinc-50 pl-8">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-300">Mobile Office</p>
                <p className="text-sm font-bold text-zinc-500">+855 12 345 678</p>
              </div>
            </div>

            <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-900 group-hover:gap-5 transition-all bg-zinc-50 px-6 py-4 rounded-xl border border-zinc-100 hover:bg-zinc-900 hover:text-white">
              {lang === 'kh' ? 'កែសម្រួលព័ត៌មាន' : 'Refine Profile'}
              <ArrowUpRight size={14} />
            </button>
          </div>
        </motion.div>

        {/* Floating Stat Stack */}
        <div className="space-y-6">
          {[
            { label: 'Store Credit', val: '$2,450.00', icon: <CreditCard size={18}/>, color: 'bg-zinc-900 text-white' },
            { label: 'Wishlist Items', val: '18 Pieces', icon: <Sparkles size={18}/>, color: 'bg-white text-zinc-900 border border-zinc-100' },
            { label: 'Saved Addresses', val: '03 Locations', icon: <MapPin size={18}/>, color: 'bg-white text-zinc-900 border border-zinc-100' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              whileHover={{ x: 10 }}
              className={`p-8 rounded-[2rem] flex items-center justify-between shadow-sm transition-all cursor-pointer ${stat.color}`}
            >
              <div className="space-y-1">
                <p className={`text-[8px] font-black uppercase tracking-[0.2em] ${i === 0 ? 'text-zinc-500' : 'text-zinc-400'}`}>{stat.label}</p>
                <p className="text-lg font-black tracking-tight">{stat.val}</p>
              </div>
              <div className={`${i === 0 ? 'text-amber-400' : 'text-zinc-300'}`}>
                {stat.icon}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Latest Acquisition - Black Card Focus */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="group relative p-12 rounded-[3.5rem] bg-zinc-900 text-white overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">
                {lang === 'kh' ? 'កំពុងដឹកជញ្ជូន' : 'Order in Motion'}
              </span>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-5xl font-black italic tracking-tighter">#ORD-2026-LX</h3>
              <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
                {lang === 'kh' 
                  ? 'ទំនិញលំដាប់ខ្ពស់របស់អ្នក កំពុងត្រូវបានរៀបចំសម្រាប់ការដឹកជញ្ជូនពិសេស។' 
                  : 'Your high-end selection is being prepared for boutique delivery with signature handling.'}
              </p>
            </div>

            <div className="flex items-center gap-12 pt-4">
              <div className="space-y-1">
                <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Destination</p>
                <p className="text-xs font-bold">Phnom Penh, KH</p>
              </div>
              <div className="space-y-1">
                <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Est. Arrival</p>
                <p className="text-xs font-bold italic">February 18, 2026</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button className="h-32 w-32 rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-center gap-3 hover:bg-white hover:text-zinc-900 transition-all duration-500 group/btn">
              <Package size={24} className="group-hover/btn:scale-110 transition-transform"/>
              <span className="text-[8px] font-black uppercase tracking-widest">Track</span>
            </button>
            <button className="h-32 w-48 rounded-[2.5rem] bg-white text-zinc-900 flex flex-col items-center justify-center gap-3 hover:bg-blue-600 hover:text-white transition-all duration-500">
              <ArrowUpRight size={24} />
              <span className="text-[8px] font-black uppercase tracking-widest">View Details</span>
            </button>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}