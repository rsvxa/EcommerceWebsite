"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Package, Settings, LogOut, Heart, ChevronRight, Loader2 
} from 'lucide-react';
import { useLanguage } from '@/lib/store/use-language';
import { toast } from 'sonner';

interface ProfileSidebarProps {
  activeTab: string;
  setActiveTab: (tab: 'profile' | 'settings' | 'orders' | 'wishlist') => void;
  onLogout: () => void;
}

export function ProfileSidebar({ activeTab, setActiveTab, onLogout }: ProfileSidebarProps) {
  const { lang } = useLanguage();
  
  const [sidebarImage, setSidebarImage] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>("...");
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    const userEmail = localStorage.getItem('zway_user_email');
    if (!userEmail) {
      setLoading(false);
      return;
    }

    try {
      // កែតម្រូវ Endpoint ឱ្យត្រូវនឹង server.js
      const response = await fetch(`http://localhost:5000/api/customer?email=${encodeURIComponent(userEmail)}`);
      if (!response.ok) throw new Error("Failed to load");
      
      const data = await response.json();
      
      // ប្រើ fullName ឱ្យត្រូវតាម Database Schema
      setDisplayName(data.fullName || "User");
      setSidebarImage(data.image || null); 
    } catch (error) {
      console.error("Sidebar Sync Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    
    // ចាប់យក Event ពេលមានការ Update ឈ្មោះ ឬ រូបភាព ពី Component ផ្សេង
    window.addEventListener('avatarUpdated', fetchUserData);
    return () => window.removeEventListener('avatarUpdated', fetchUserData);
  }, []);

  const menuItems = [
    { id: 'profile', label: lang === 'kh' ? 'ព័ត៌មានទូទៅ' : 'Overview', icon: <User size={16} /> },
    { id: 'orders', label: lang === 'kh' ? 'ការបញ្ជាទិញរបស់ខ្ញុំ' : 'My Orders', icon: <Package size={16} /> },
    { id: 'wishlist', label: lang === 'kh' ? 'បញ្ជីប្រាថ្នា' : 'Wishlist', icon: <Heart size={16} /> },
    { id: 'settings', label: lang === 'kh' ? 'ការកំណត់' : 'Settings', icon: <Settings size={16} /> },
  ];

  const handleLogoutClick = () => {
    const confirmMessage = lang === 'kh' 
      ? 'តើអ្នកពិតជាចង់ចាកចេញពីគណនីមែនទេ?' 
      : 'Are you sure you want to sign out?';

    if (window.confirm(confirmMessage)) {
      localStorage.removeItem('zway_user_email');
      localStorage.removeItem('zway_user_token');
      
      setSidebarImage(null);
      setDisplayName("Guest");
      
      onLogout();
      toast.success(lang === 'kh' ? 'ចាកចេញជោគជ័យ' : 'Signed out successfully');
      
      // បញ្ជូនទៅកាន់ Home បន្ទាប់ពី Logout
      window.location.href = '/';
    }
  };

  return (
    <aside className="space-y-10 italic">
      <div className="relative p-8 rounded-[2.5rem] bg-zinc-900 text-white overflow-hidden shadow-2xl shadow-zinc-200">
        <div className="absolute -top-10 -right-10 h-32 w-32 bg-white/5 blur-[40px] rounded-full" />
        <div className="relative space-y-4">
          
          <div className="h-16 w-16 rounded-2xl overflow-hidden border border-white/10 bg-zinc-800 flex items-center justify-center shadow-lg relative">
            {loading ? (
              <Loader2 size={16} className="animate-spin text-zinc-500" />
            ) : sidebarImage ? (
              <motion.img 
                key={sidebarImage} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={sidebarImage} 
                alt="Profile" 
                className="h-full w-full object-cover" 
              />
            ) : (
              <div className="bg-zinc-800 w-full h-full flex items-center justify-center">
                <User size={24} className="text-zinc-600" />
              </div>
            )}
          </div>

          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40 mb-1">
              {lang === 'kh' ? 'សមាជិកផ្ដាច់មុខ' : 'Exclusive Member'}
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
                className={`w-full group relative flex items-center justify-between px-6 py-4 transition-all rounded-2xl ${
                  isActive ? 'text-zinc-900' : 'text-zinc-400 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
              >
                <div className="flex items-center gap-3 relative z-10">
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
                <ChevronRight size={12} className={`relative z-10 transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0'}`} />
              </button>
            );
          })}
        </div>

        <div className="pt-8 mt-8 border-t border-zinc-50">
          <button 
            onClick={handleLogoutClick}
            className="group w-full flex items-center gap-4 px-6 py-4 text-[11px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 hover:bg-red-50 transition-all rounded-2xl"
          >
            <LogOut size={16} className="group-hover:rotate-12 transition-transform" />
            {lang === 'kh' ? 'ចាកចេញ' : 'Sign Out'}
          </button>
        </div>
      </nav>
    </aside>
  );
}