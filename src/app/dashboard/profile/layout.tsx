"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ProfileSidebar } from "@/app/components/profile/ProfileSidebar";
import { useLanguage } from '@/lib/store/use-language';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { lang } = useLanguage();

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Luxury Background Decor - ផ្តល់អារម្មណ៍ថាជា Space ដែលមានជម្រៅ */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-zinc-50/50 to-transparent -z-10" />
      <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-blue-50/30 blur-[120px] rounded-full -z-10" />
      
      <div className="container mx-auto px-6 py-28 md:py-40">
        {/* Breadcrumb Teaser - បង្ហាញទីតាំងបច្ចុប្បន្នបែបស្ងប់ស្ងាត់ */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300"
        >
          <span>Portal</span>
          <div className="h-[1px] w-8 bg-zinc-200" />
          <span className="text-zinc-900">Private Suite</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
          {/* Sidebar Section - Sticky Positioning */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <ProfileSidebar />
              </motion.div>

              {/* Sidebar Helper Note */}
              <div className="mt-12 hidden lg:block px-6">
                <div className="p-6 rounded-[2rem] border border-zinc-100 bg-zinc-50/50 backdrop-blur-sm">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-900 mb-2">Need Help?</p>
                  <p className="text-[11px] text-zinc-400 leading-relaxed italic">
                    {lang === 'kh' 
                      ? "ក្រុមការងារ Concierge របស់យើងត្រៀមខ្លួនជួយអ្នកជានិច្ច។" 
                      : "Our concierge team is here to assist with your private requests."}
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area - The Canvas */}
          <main className="flex-1 min-w-0">
            <motion.div
              key={Math.random()} // ធ្វើឱ្យមាន Animation ាល់ពេលដូរ Page ក្នុង Layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              {/* Decorative Corner */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-zinc-100 rounded-tl-xl hidden md:block" />
              
              <div className="bg-white">
                {children}
              </div>
            </motion.div>
          </main>
        </div>
      </div>

      {/* Aesthetic Footer Element */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-20 pointer-events-none">
        <div className="h-[1px] w-20 bg-zinc-900" />
        <span className="text-[9px] font-black uppercase tracking-[1em]">Excellence</span>
        <div className="h-[1px] w-20 bg-zinc-900" />
      </div>
    </div>
  );
}