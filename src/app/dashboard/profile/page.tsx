"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/store/use-language";
import { ProfileOverview } from "@/app/components/profile/ProfileOverview";
import { Sparkles, ArrowRight } from "lucide-react";

export default function ProfilePage() {
  const { lang } = useLanguage();

  // រៀបចំការសួរសុខទុក្ខតាមពេលវេលា (Greeting)
  const hour = new Date().getHours();
  const getGreeting = () => {
    if (lang === 'kh') {
      if (hour < 12) return "អរុណសួស្តី";
      if (hour < 17) return "ទិវាសួស្តី";
      return "សាយ័ណ្ហសួស្តី";
    }
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="space-y-12">
      {/* Hero Welcome Section */}
      <section className="relative">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-8 bg-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 flex items-center gap-2">
              <Sparkles size={10} />
              {getGreeting()}, Explorer
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-5xl font-black uppercase tracking-tighter text-zinc-900 leading-[0.8] md:text-6xl">
                {lang === 'kh' ? 'គណនីរបស់ខ្ញុំ' : 'My Account'}
              </h1>
              <p className="max-w-md text-sm font-medium leading-relaxed text-zinc-400 italic">
                {lang === 'kh' 
                  ? 'ស្វាគមន៍មកកាន់កន្លែងផ្ទាល់ខ្លួនរបស់អ្នក។ គ្រប់គ្រងព័ត៌មាន និងពិនិត្យមើលសកម្មភាពថ្មីៗនៅទីនេះ។' 
                  : 'Welcome to your private sanctuary. Curate your profile and monitor your recent interactions here.'}
              </p>
            </div>

            {/* Quick Stats Badge */}
            <div className="flex items-center gap-8 bg-zinc-50 border border-zinc-100 p-6 rounded-[2rem]">
              <div className="text-center">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">Status</p>
                <p className="text-xs font-black uppercase text-zinc-900">Elite</p>
              </div>
              <div className="h-8 w-[1px] bg-zinc-200" />
              <div className="text-center">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">Since</p>
                <p className="text-xs font-black uppercase text-zinc-900">2024</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Content Component */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative"
      >
        {/* Decorative Grid Background - ជួយឱ្យ Overview មើលទៅមានរបៀប */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 -z-10" />
        
        <ProfileOverview />
      </motion.div>

      {/* Discover More Call-to-action */}
      <div className="pt-6 border-t border-zinc-50">
        <button className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 transition-all">
          <span>{lang === 'kh' ? 'ស្វែងរកការប្រមូលថ្មីៗ' : 'Discover New Arrivals'}</span>
          <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </div>
  );
}