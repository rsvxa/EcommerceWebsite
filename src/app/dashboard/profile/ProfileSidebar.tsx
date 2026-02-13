"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  User, 
  Package, 
  Settings, 
  LogOut, 
  Heart, 
  MapPin, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '@/lib/store/use-language';

export function ProfileSidebar() {
  const { lang } = useLanguage();
  const pathname = usePathname();

  const menuItems = [
    { 
      id: 'overview', 
      label: lang === 'kh' ? 'ព័ត៌មានទូទៅ' : 'Overview', 
      href: '/dashboard/profile',
      icon: <User size={16} /> 
    },
    { 
      id: 'orders', 
      label: lang === 'kh' ? 'ប្រវត្តិបញ្ជាទិញ' : 'Order History', 
      href: '/dashboard/profile/orders',
      icon: <Package size={16} /> 
    },
    { 
      id: 'wishlist', 
      label: lang === 'kh' ? 'បញ្ជីប្រាថ្នា' : 'Wishlist', 
      href: '/dashboard/profile/wishlist',
      icon: <Heart size={16} /> 
    },
    { 
      id: 'addresses', 
      label: lang === 'kh' ? 'អាសយដ្ឋាន' : 'Addresses', 
      href: '/dashboard/profile/addresses',
      icon: <MapPin size={16} /> 
    },
    { 
      id: 'settings', 
      label: lang === 'kh' ? 'ការកំណត់' : 'Settings', 
      href: '/dashboard/profile/settings',
      icon: <Settings size={16} /> 
    },
  ];

  return (
    <aside className="space-y-10">
      {/* User Branding Section */}
      <div className="relative p-8 rounded-[2rem] bg-zinc-900 text-white overflow-hidden shadow-2xl shadow-zinc-200">
        <div className="absolute -top-10 -right-10 h-32 w-32 bg-white/5 blur-[40px] rounded-full" />
        
        <div className="relative space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-zinc-700 to-zinc-500 flex items-center justify-center border border-white/10">
            <User size={24} className="text-zinc-100" />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-1">
              {lang === 'kh' ? 'គណនីផ្ដាច់មុខ' : 'Exclusive Member'}
            </p>
            <h3 className="text-xl font-black uppercase tracking-tighter leading-none">John Doe</h3>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2 px-2">
        <p className="px-4 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-300 mb-4">
          {lang === 'kh' ? 'ម៉ឺនុយគ្រប់គ្រង' : 'Navigation'}
        </p>
        
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`group relative flex items-center justify-between px-5 py-4 transition-all rounded-2xl ${
                  isActive 
                    ? 'bg-zinc-100 text-zinc-900' 
                    : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <span className={`transition-colors duration-300 ${isActive ? 'text-zinc-900' : 'text-zinc-300 group-hover:text-zinc-900'}`}>
                    {item.icon}
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                </div>

                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute inset-0 bg-zinc-100 rounded-2xl -z-0"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}

                <ChevronRight size={12} className={`transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0'}`} />
              </Link>
            );
          })}
        </div>

        {/* Action Divider */}
        <div className="pt-8 mt-8 border-t border-zinc-50">
          <button className="group w-full flex items-center gap-4 px-5 py-4 text-[11px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 hover:bg-red-50 transition-all rounded-2xl">
            <div className="p-2 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
              <LogOut size={16} />
            </div>
            {lang === 'kh' ? 'ចាកចេញ' : 'Sign Out'}
          </button>
        </div>
      </nav>

      {/* Security Badge Helper */}
      <div className="px-6 py-8 rounded-[2rem] bg-zinc-50 border border-zinc-100/50">
        <div className="flex items-center gap-3 mb-3">
          <ShieldCheck size={16} className="text-zinc-400" />
          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-900">Secure Access</span>
        </div>
        <p className="text-[10px] text-zinc-400 leading-relaxed italic">
          {lang === 'kh' 
            ? 'ទិន្នន័យរបស់អ្នកត្រូវបានការពារយ៉ាងមានសុវត្ថិភាព។' 
            : 'Your data is encrypted and protected by our secure vault.'}
        </p>
      </div>
    </aside>
  );
}