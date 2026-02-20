"use client";

import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowUpRight, ShoppingBag, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { ScrollArea } from "../../components/ui/scroll-area";

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang].footer;

  const socialLinks = [
    { icon: <Facebook size={18} />, href: "https://web.facebook.com/", color: "hover:bg-blue-600" },
    { icon: <Instagram size={18} />, href: "https://www.instagram.com/", color: "hover:bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500" },
    { icon: <Twitter size={18} />, href: "https://x.com/", color: "hover:bg-sky-500" },
  ];

  return (
    <footer className="bg-zinc-950 text-white pt-15 pb-9 border-t border-zinc-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          
          {/* 1. Brand Identity */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <ShoppingBag className="text-black" size={20} />
              </div>
              <h2 className="text-2xl font-black tracking-tighter italic">ZWAY Fashion</h2>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm font-medium">
              {t.aboutDesc}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.href} className={`w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 transition-all duration-300 hover:text-white hover:border-transparent ${social.color}`}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-[13px] font-black uppercase tracking-[0.3em] text-zinc-500">{t.quickLinks}</h3>
            <ul className="space-y-4">
              {[t.newArrivals, t.popular, t.blog, t.aboutUs].map((link) => (
                <li key={link} className="group flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-bold transition-colors cursor-pointer">
                  <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"/>
                  {link}
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Customer Care */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-[13px] font-black uppercase tracking-[0.3em] text-zinc-500">{t.customerCare}</h3>
            <ul className="space-y-4">
              {[t.shipping, t.returns, t.faqs, t.support].map((link) => (
                <li key={link} className="text-zinc-400 hover:text-white text-sm font-bold transition-colors cursor-pointer flex items-center justify-between group">
                  {link}
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact Details */}
          <div className="lg:col-span-4 space-y-8">
            <h3 className="text-[13px] font-black uppercase tracking-[0.3em] text-zinc-500">{t.contactUs}</h3>
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
        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
            © 2026 ZWAY Fashion Store. {t.rights}
          </p>
          
          <div className="flex items-center gap-8">
            <PolicyDialog 
              triggerLabel={lang === 'kh' ? "គោលការណ៍ឯកជនភាព" :"Privacy Policy" }
              title={lang === 'kh' ? 'គោលការណ៍ឯកជនភាព' : 'Privacy Policy'}
              icon={<ShieldCheck size={32} className="text-emerald-400" />}
              lang={lang}
              content={[
                { 
                  kh: '១. ការប្រមូលទិន្នន័យផ្ទាល់ខ្លួន', 
                  en: '1. Personal Data Collection', 
                  descKh: 'យើងខ្ញុំប្រមូលព័ត៌មានដូចជា ឈ្មោះ, អាសយដ្ឋានដឹកជញ្ជូន, លេខទូរស័ព្ទ និងព័ត៌មានបង់ប្រាក់ នៅពេលអ្នកធ្វើការបញ្ជាទិញ ដើម្បីសម្រួលដល់ការផ្តល់សេវាកម្ម។', 
                  descEn: 'We collect information such as name, shipping address, phone number, and payment details when you place an order to facilitate our services.' 
                },
                { 
                  kh: '២. ការប្រើប្រាស់ខូឃី (Cookies)', 
                  en: '2. Use of Cookies', 
                  descKh: 'ZWAY ប្រើប្រាស់ខូឃីដើម្បីចងចាំទំនិញក្នុងកញ្ចប់ និងវិភាគចរាចរណ៍វេបសាយ ដើម្បីកែលម្អបទពិសោធន៍ទិញទំនិញរបស់អ្នកឱ្យកាន់តែប្រសើរ។', 
                  descEn: 'ZWAY uses cookies to remember items in your cart and analyze website traffic to improve your shopping experience.' 
                },
                { 
                  kh: '៣. ការសម្ងាត់នៃទិន្នន័យ', 
                  en: '3. Data Privacy', 
                  descKh: 'យើងខ្ញុំធានាមិនលក់ ឬចែកចាយព័ត៌មានផ្ទាល់ខ្លួនរបស់អ្នកទៅកាន់ភាគីទីបីក្នុងគោលបំណងពាណិជ្ជកម្មឡើយ លើកលែងតែដៃគូដឹកជញ្ជូនដែលចាំបាច់។', 
                  descEn: 'We guarantee not to sell or distribute your personal information to third parties for commercial purposes, except for necessary delivery partners.' 
                },
                { 
                  kh: '៤. សិទ្ធិរបស់អតិថិជន', 
                  en: '4. Customer Rights', 
                  descKh: 'អ្នកមានសិទ្ធិស្នើសុំកែប្រែ ឬលុបទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នកចេញពីប្រព័ន្ធរបស់យើងខ្ញុំនៅពេលណាក៏បាន តាមរយៈការទាក់ទងមកកាន់ផ្នែកគាំទ្រ។', 
                  descEn: 'You have the right to request the correction or deletion of your personal data from our system at any time by contacting support.' 
                }
              ]}
            />

            <PolicyDialog 
              triggerLabel={lang === 'kh' ? "លក្ខខណ្ឌប្រើប្រាស់" :"Terms of Service"} 
              title={lang === 'kh' ? 'លក្ខខណ្ឌប្រើប្រាស់' : 'Terms of Service'}
              icon={<FileText size={32} className="text-blue-400" />}
              lang={lang}
             content={[
              { 
                kh: '១. លក្ខខណ្ឌនៃការប្រើប្រាស់វេបសាយ', 
                en: '1. Website Usage Terms', 
                descKh: 'ដោយការចូលប្រើប្រាស់វេបសាយនេះ អ្នកយល់ព្រមថានឹងមិនប្រើប្រាស់វាសម្រាប់សកម្មភាពខុសច្បាប់ ឬការបំពានកម្មសិទ្ធិបញ្ញារបស់ ZWAY ឡើយ។', 
                descEn: 'By accessing this website, you agree not to use it for illegal activities or infringement of ZWAY intellectual property.' 
              },
              { 
                kh: '២. ភាពត្រឹមត្រូវនៃតម្លៃ និងផលិតផល', 
                en: '2. Pricing & Product Accuracy', 
                descKh: 'យើងខ្ញុំខិតខំធានាថារូបភាព និងតម្លៃផលិតផលមានភាពត្រឹមត្រូវបំផុត ប៉ុន្តែក្នុងករណីមានកំហុសបច្ចេកទេស យើងខ្ញុំរក្សាសិទ្ធិក្នុងការលុបចោលការបញ្ជាទិញ និងជូនដំណឹងដល់អ្នក។', 
                descEn: 'We strive for accuracy in product images and prices, but in case of technical errors, we reserve the right to cancel orders and notify you.' 
              },
              { 
                kh: '៣. ការផ្លាស់ប្តូរ និងការបង្វិលសង', 
                en: '3. Exchange & Returns', 
                descKh: 'ទំនិញអាចប្តូរវិញបានក្នុងរយៈពេល ៧ ថ្ងៃ ប្រសិនបើមានបញ្ហាបច្ចេកទេសពីខាងរោងចក្រ ហើយទំនិញត្រូវតែស្ថិតក្នុងស្ថានភាពដើម (មានស្លាកសញ្ញាត្រឹមត្រូវ)។', 
                descEn: 'Items can be exchanged within 7 days if there is a manufacturing defect, and products must be in original condition (with tags).' 
              },
              { 
                kh: '៤. ការទទួលខុសត្រូវលើការដឹកជញ្ជូន', 
                en: '4. Shipping Responsibility', 
                descKh: 'ZWAY ទទួលខុសត្រូវលើសុវត្ថិភាពទំនិញរហូតដល់ដៃអតិថិជន។ ប្រសិនបើមានការបាត់បង់ ឬខូចខាតអំឡុងពេលដឹកជញ្ជូន យើងខ្ញុំនឹងផ្តល់សំណង ឬប្តូរជូនថ្មី។', 
                descEn: 'ZWAY is responsible for the safety of goods until they reach the customer. In case of loss or damage during transit, we will provide compensation or a replacement.' 
              }
]}
            />

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

function PolicyDialog({ triggerLabel, title, icon, lang, content }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-[13px] font-black text-zinc-600 uppercase tracking-tighter transition-colors hover:text-zinc-400 cursor-pointer italic">
          {triggerLabel}
        </p>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-white rounded-xl border-none shadow-2xl p-0 overflow-hidden">
        <div className="p-8 text-black flex items-center gap-4">
           <div className="p-3 bg-white/10 rounded-2xl">{icon}</div>
           <div>
              <DialogTitle className="text-2xl font-black uppercase tracking-tighter italic">
                {title}
              </DialogTitle>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">ZWAY Fashion • Updated 2026</p>
           </div>
        </div>
        <ScrollArea className="h-[470px] p-8">
          <div className="space-y-6 text-zinc-600 font-medium leading-relaxed">
            {content.map((item: any, idx: number) => (
              <section key={idx} className="space-y-2">
                <h4 className="font-black text-zinc-900 uppercase text-xs tracking-widest">
                  {lang === 'kh' ? item.kh : item.en}
                </h4>
                <p className="text-sm">
                  {lang === 'kh' ? item.descKh : item.descEn}
                </p>
              </section>
            ))}
          </div>
        </ScrollArea>
        <div className="p-6 bg-zinc-50 flex justify-end">
           <p className="text-[9px] font-black text-zinc-400 uppercase italic">© 2026 ZWAY Fashion Trust Center</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}