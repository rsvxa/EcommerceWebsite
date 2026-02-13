"use client";

import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowUpRight, ShoppingBag, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang].footer;

  const socialLinks = [
    { icon: <Facebook size={18} />, href: "#", color: "hover:bg-blue-600" },
    { icon: <Instagram size={18} />, href: "#", color: "hover:bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500" },
    { icon: <Twitter size={18} />, href: "#", color: "hover:bg-sky-500" },
  ];

  return (
    <footer className="bg-zinc-950 text-white pt-15 pb-9 border-t border-zinc-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          
          {/* 1. Brand Identity - Span 4 */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center transition-transform">
                <ShoppingBag className="text-black" size={20} />
              </div>
              <h2 className="text-2xl font-black tracking-tighter">ZWAY Fashion</h2>
            </div>
            
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm font-medium">
              {t.aboutDesc}
            </p>
            
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className={`w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 transition-all duration-300 hover:text-white hover:border-transparent ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 2. Quick Links - Span 2 */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">{t.quickLinks}</h3>
            <ul className="space-y-4">
              {[t.newArrivals, t.popular, t.blog, t.aboutUs].map((link) => (
                <li key={link} className="group flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-bold transition-colors cursor-pointer">
                  <ArrowRight size={16} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"/>
                  {link}
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Customer Care - Span 2 */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">{t.customerCare}</h3>
            <ul className="space-y-4">
              {[t.shipping, t.returns, t.faqs, t.support].map((link) => (
                <li key={link} className="text-zinc-400 hover:text-white text-sm font-bold transition-colors cursor-pointer flex items-center justify-between group">
                  {link}
                  <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact Details - Span 4 */}
          <div className="lg:col-span-4 space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">{t.contactUs}</h3>
            <div className="bg-zinc-900/50 p-8 rounded-[2rem] border border-zinc-800/50 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-zinc-800 rounded-2xl text-zinc-400">
                  <MapPin size={20} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-zinc-500 uppercase">{lang === 'kh' ? 'ទីតាំង' : 'Location'}</p>
                  <p className="text-sm font-bold text-zinc-300 leading-snug">{t.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-zinc-800 rounded-2xl text-zinc-400">
                  <Phone size={20} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-zinc-500 uppercase">{lang === 'kh' ? 'ទូរសព្ទ' : 'Call center'}</p>
                  <p className="text-sm font-bold text-zinc-300">+855 969 127 603</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-600 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
            © 2026 ZWAY Fashion Store. {t.rights}
          </p>
          
          <div className="flex items-center gap-8">
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-tighter transition-colors hover:text-zinc-400 cursor-pointer">Privacy Policy</p>
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-tighter transition-colors hover:text-zinc-400 cursor-pointer">Terms of Service</p>
            <div className="flex items-center gap-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}