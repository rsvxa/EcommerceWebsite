"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/store/use-language";
import { User, Mail, ShieldCheck, Bell, Globe, Camera } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export default function SettingsPage() {
  const { lang } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-12 max-w-3xl pb-20"
    >
      {/* Profile Header with Avatar */}
      <div className="flex flex-col sm:flex-row items-center gap-8 border-b border-zinc-100 pb-10">
        <div className="relative group cursor-pointer">
          <div className="h-24 w-24 rounded-[2.5rem] bg-zinc-100 overflow-hidden border-4 border-white shadow-2xl transition-transform group-hover:scale-105">
            <img 
              src="https://i.pravatar.cc/150?u=johndoe" 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 h-8 w-8 bg-zinc-900 rounded-xl flex items-center justify-center text-white shadow-lg border-2 border-white group-hover:bg-blue-600 transition-colors">
            <Camera size={14} />
          </div>
        </div>
        
        <div className="text-center sm:text-left space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Premium Member</p>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">
            {lang === 'kh' ? 'ការកំណត់គណនី' : 'Account Settings'}
          </h2>
          <p className="text-sm text-zinc-400 italic">Manage your digital presence and preferences.</p>
        </div>
      </div>

      <form className="space-y-12">
        {/* Personal Information Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <User size={18} className="text-zinc-400" />
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-900">Personal Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="group space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 transition-colors group-focus-within:text-zinc-900">
                Full Name
              </label>
              <input 
                type="text" 
                className="w-full bg-transparent border-b border-zinc-200 py-3 text-sm font-bold focus:border-zinc-900 outline-none transition-all placeholder:text-zinc-300" 
                defaultValue="John Doe" 
              />
            </div>
            
            <div className="group space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 transition-colors group-focus-within:text-zinc-900">
                Email Address
              </label>
              <div className="relative">
                <input 
                  type="email" 
                  className="w-full bg-transparent border-b border-zinc-200 py-3 text-sm font-bold focus:border-zinc-900 outline-none transition-all" 
                  defaultValue="john@example.com" 
                />
                <Mail size={14} className="absolute right-0 top-3 text-zinc-300" />
              </div>
            </div>
          </div>
        </section>

        {/* Preferences & Security */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Globe size={18} className="text-zinc-400" />
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-900">Preferences</h3>
            </div>
            <div className="space-y-4">
               <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black uppercase tracking-tight">Newsletter</p>
                    <p className="text-[10px] text-zinc-400">Receive seasonal lookbooks</p>
                  </div>
                  <div className="h-5 w-10 bg-zinc-900 rounded-full relative cursor-pointer shadow-inner">
                    <div className="absolute right-1 top-1 h-3 w-3 bg-white rounded-full" />
                  </div>
               </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <ShieldCheck size={18} className="text-zinc-400" />
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-900">Security</h3>
            </div>
            <Button variant="outline" className="w-full h-14 rounded-2xl border-zinc-100 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-all">
              Update Password
            </Button>
          </section>
        </div>

        {/* Save Bar - Desktop Fixed or Inline */}
        <div className="flex items-center justify-end gap-4 pt-8 border-t border-zinc-100">
          <button type="button" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors">
            Discard
          </button>
          <button className="bg-zinc-900 text-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-blue-600 hover:shadow-[0_20px_40px_rgba(37,99,235,0.2)] transition-all transform active:scale-95">
            {lang === 'kh' ? 'រក្សាទុកការផ្លាស់ប្តូរ' : 'Save Changes'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}