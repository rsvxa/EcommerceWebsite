"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Package, Settings, LogOut, Heart, ChevronRight 
} from 'lucide-react';
import { useLanguage } from '@/lib/store/use-language';

interface ProfileSidebarProps {
  activeTab: string;
  setActiveTab: (tab: 'profile' | 'settings' | 'orders' | 'wishlist') => void;
  onLogout: () => void;
}

export function ProfileSidebar({ activeTab, setActiveTab, onLogout }: ProfileSidebarProps) {
  const { lang } = useLanguage();
  
  const [sidebarImage, setSidebarImage] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>("Guest");

  const fetchUserData = () => {
    const savedImage = localStorage.getItem('zway_user_avatar');
    if (savedImage) setSidebarImage(savedImage);

    const savedName = localStorage.getItem('zway_user_name');
    if (savedName) setDisplayName(savedName);
  };

  useEffect(() => {
    fetchUserData();

    window.addEventListener('avatarUpdated', fetchUserData);

    window.addEventListener('storage', fetchUserData);

    return () => {
      window.removeEventListener('avatarUpdated', fetchUserData);
      window.removeEventListener('storage', fetchUserData);
    };
  }, []);

  const menuItems = [
    { id: 'profile', label: lang === 'kh' ? 'ព័ត៌មានទូទៅ' : 'Overview', icon: <User size={16} /> },
    { id: 'orders', label: lang === 'kh' ? 'ការបញ្ជាទិញរបស់ខ្ញុំ' : 'Myorder', icon: <Package size={16} /> },
    { id: 'wishlist', label: lang === 'kh' ? 'បញ្ជីប្រាថ្នា' : 'Wishlist', icon: <Heart size={16} /> },
    { id: 'settings', label: lang === 'kh' ? 'ការកំណត់' : 'Settings', icon: <Settings size={16} /> },
  ];

  return (
    <aside className="space-y-10">
      {/* User Branding Section */}
      <div className="relative p-8 rounded-xl bg-zinc-900 text-white overflow-hidden shadow-2xl shadow-zinc-200">
        <div className="absolute -top-10 -right-10 h-32 w-32 bg-white/5 blur-[40px] rounded-full" />
        <div className="relative space-y-4">
          
          <div className="h-14 w-14 rounded-2xl overflow-hidden border border-white/10 bg-zinc-800 flex items-center justify-center shadow-lg">
            {sidebarImage ? (
              <motion.img 
                key={sidebarImage} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                src={sidebarImage} 
                alt="Profile" 
                className="h-full w-full object-cover" 
              />
            ) : (
              <User size={24} className="text-zinc-500" />
            )}
          </div>

          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white mb-1">
              {lang === 'kh' ? 'គណនីផ្ដាច់មុខ' : 'Exclusive Member'}
            </p>
            <motion.h3 
              key={displayName}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-black uppercase tracking-tighter leading-none"
            >
              {displayName}
            </motion.h3>
          </div>
        </div>
      </div>

      <nav className="space-y-2 px-2">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full group relative flex items-center justify-between px-5 py-4 transition-all rounded-xl ${
                  isActive ? 'text-zinc-900' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
              >
                <div className="flex items-center gap-2 relative z-10">
                  <span className={`transition-colors duration-300 ${isActive ? 'text-zinc-900 ' : 'text-zinc-300 group-hover:text-zinc-900'}`}>
                    {item.icon}
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                </div>

                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute inset-0 bg-zinc-100 rounded-xl -z-0"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
                <ChevronRight size={12} className={`relative z-10 transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0'}`} />
              </button>
            );
          })}
        </div>

        <div className="pt-8 mt-8 border-t border-zinc-50">
          <button 
            onClick={onLogout}
            className="group w-full flex items-center gap-4 px-5 py-4 text-[11px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 hover:bg-red-50 transition-all rounded-2xl"
          >
            <div className="p-2 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
              <LogOut size={16} />
            </div>
            {lang === 'kh' ? 'ចាកចេញ' : 'Sign Out'}
          </button>
        </div>
      </nav>
    </aside>
  );
}