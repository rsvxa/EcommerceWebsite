"use client";

import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowUpRight, ShoppingBag, ArrowRight, ShieldCheck, FileText, Truck, RefreshCcw, HelpCircle, User, Star, BookOpen, Info } from 'lucide-react';
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
                <a key={i} href={social.href} target="_blank" className={`w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 transition-all duration-300 hover:text-white hover:border-transparent ${social.color}`}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-[13px] font-black uppercase tracking-[0.3em] text-zinc-500">{t.quickLinks}</h3>
            <ul className="space-y-4">
              <li>
                <PolicyDialog 
                  triggerLabel={t.newArrivals} 
                  title={t.newArrivals}
                  icon={<Star size={32} className="text-yellow-400" />}
                  lang={lang}
                  content={[
                    { kh: 'ស្ទីលថ្មីប្រចាំសប្តាហ៍', en: 'Weekly New Styles', descKh: 'យើងខ្ញុំធ្វើបច្ចុប្បន្នភាពទំនិញថ្មីៗរៀងរាល់ថ្ងៃច័ន្ទ។ រាល់ម៉ូដសម្លៀកបំពាក់ត្រូវបានសម្រាំងយ៉ាងសម្រិតសម្រាំងបំផុតសម្រាប់យុវវ័យសម័យថ្មី។', descEn: 'We update new arrivals every Monday. Every piece is carefully curated for modern youth fashion trends.' },
                    { kh: 'ការផ្តល់ជូនពិសេស', en: 'Exclusive Offers', descKh: 'សម្រាប់ទំនិញមកដល់ថ្មី អ្នកនឹងទទួលបានការបញ្ចុះតម្លៃ ៥% ភ្លាមៗក្នុងរយៈពេល ៤៨ម៉ោងដំបូង។', descEn: 'For new arrivals, enjoy an instant 5% discount within the first 48 hours.' }
                  ]}
                  isListStyle={true}
                />
              </li>
              <li>
                <PolicyDialog 
                  triggerLabel={t.popular} 
                  title={t.popular}
                  icon={<ShoppingBag size={32} className="text-orange-400" />}
                  lang={lang}
                  content={[
                    { kh: 'ទំនិញលក់ដាច់បំផុត', en: 'Best Sellers', descKh: 'នេះគឺជាបញ្ជីទំនិញដែលទទួលបានការគាំទ្រខ្លាំងបំផុតពីអតិថិជន ZWAY របស់យើងក្នុងខែនេះ។', descEn: 'This is the list of products most supported by our ZWAY customers this month.' },
                    { kh: 'គុណភាពខ្ពស់', en: 'High Quality', descKh: 'ទំនិញពេញនិយមមិនត្រឹមតែស្អាតទេ តែវាជាប្រភេទក្រណាត់ដែលធន់ និងមានផាសុកភាពបំផុត។', descEn: 'Popular items aren’t just stylish; they are made from the most durable and comfortable fabrics.' }
                  ]}
                  isListStyle={true}
                />
              </li>
              <li>
                <PolicyDialog 
                  triggerLabel={t.blog} 
                  title={t.blog}
                  icon={<BookOpen size={32} className="text-blue-400" />}
                  lang={lang}
                  content={[
                    { kh: 'តិចនិកតុបតែងខ្លួន', en: 'Styling Tips', descKh: 'រៀនពីរបៀបផ្គូរផ្គងពណ៌សម្លៀកបំពាក់ឱ្យស័ក្តិសមទៅតាមកម្មវិធីផ្សេងៗ មិនថាដំណើរកម្សាន្ត ឬការងារការិយាល័យ។', descEn: 'Learn how to match clothing colors for different occasions, whether for travel or office work.' },
                    { kh: 'ព័ត៌មានហ្វេសសិន', en: 'Fashion News', descKh: 'តាមដានព័ត៌មាន និងការវិវត្តនៃពិភពហ្វេសសិនទាំងក្នុង និងក្រៅប្រទេសជាមួយ ZWAY។', descEn: 'Stay updated with global and local fashion trends with ZWAY.' }
                  ]}
                  isListStyle={true}
                />
              </li>
              <li>
                <PolicyDialog 
                  triggerLabel={t.aboutUs} 
                  title={t.aboutUs}
                  icon={<Info size={32} className="text-zinc-400" />}
                  lang={lang}
                  content={[
                    { kh: 'ដំណើរដើមទុន', en: 'Our Story', descKh: 'ZWAY បង្កើតឡើងក្នុងឆ្នាំ ២០២០ ក្នុងគោលបំណងផ្តល់នូវសម្លៀកបំពាក់ដែលមានតម្លៃសមរម្យ និងគុណភាពខ្ពស់សម្រាប់ប្រជាជនកម្ពុជា។', descEn: 'ZWAY was founded in 2020 with the mission to provide affordable, high-quality clothing for Cambodians.' },
                    { kh: 'ចក្ខុវិស័យ', en: 'Vision', descKh: 'ក្លាយជាហ្វេសសិនស្ទ័រឈានមុខគេ ដែលផ្តល់នូវទំនុកចិត្ត និងភាពស្រស់ស្អាតដល់អតិថិជនគ្រប់រូប។', descEn: 'To become a leading fashion store that provides confidence and beauty to every customer.' }
                  ]}
                  isListStyle={true}
                />
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-[13px] font-black uppercase tracking-[0.3em] text-zinc-500">{t.customerCare}</h3>
            <ul className="space-y-4">
              <li>
                <PolicyDialog 
                  triggerLabel={t.shipping} 
                  title={t.shipping}
                  icon={<Truck size={32} className="text-emerald-400" />}
                  lang={lang}
                  content={[
                    { kh: 'រយៈពេលដឹកជញ្ជូន', en: 'Delivery Time', descKh: 'ក្នុងភ្នំពេញ៖ ១ ទៅ ២ ថ្ងៃ។ ខេត្តក្រុងផ្សេងៗ៖ ២ ទៅ ៣ ថ្ងៃ។', descEn: 'Phnom Penh: 1-2 days. Provinces: 2-3 days.' },
                    { kh: 'តម្លៃសេវាដឹក', en: 'Shipping Rates', descKh: 'ឥតគិតថ្លៃសម្រាប់ការបញ្ជាទិញលើសពី ២០ដុល្លារ។ តម្លៃទូទៅចន្លោះពី ១ដុល្លារ ទៅ ២ដុល្លារ។', descEn: 'Free shipping for orders over $20. Standard rates between $1 to $2.' }
                  ]}
                  isListStyle={true}
                />
              </li>
              <li>
                <PolicyDialog 
                  triggerLabel={t.returns} 
                  title={t.returns}
                  icon={<RefreshCcw size={32} className="text-red-400" />}
                  lang={lang}
                  content={[
                    { kh: 'លក្ខខណ្ឌប្តូរទំនិញ', en: 'Exchange Conditions', descKh: 'ទំនិញត្រូវតែស្ថិតក្នុងសភាពដើម មានស្លាកសញ្ញា និងមិនទាន់បានបោកគក់។ អាចប្តូរបានក្នុងរយៈពេល ៧ថ្ងៃ។', descEn: 'Items must be in original condition, with tags, and unwashed. Exchangeable within 7 days.' },
                    { kh: 'ការបង្វិលសាច់ប្រាក់', en: 'Refund Policy', descKh: 'យើងខ្ញុំមិនមានគោលការណ៍បង្វិលសាច់ប្រាក់វិញទេ ប៉ុន្តែលោកអ្នកអាចប្តូរជាទំនិញផ្សេងដែលមានតម្លៃប្រហាក់ប្រហែល។', descEn: 'We do not have a refund policy, but you can exchange for other items of similar value.' }
                  ]}
                  isListStyle={true}
                />
              </li>
              <li>
                <PolicyDialog 
                  triggerLabel={t.faqs} 
                  title={t.faqs}
                  icon={<HelpCircle size={32} className="text-purple-400" />}
                  lang={lang}
                  content={[
                    { kh: 'តើត្រូវបង់ប្រាក់យ៉ាងដូចម្តេច?', en: 'How to pay?', descKh: 'លោកអ្នកអាចបង់ប្រាក់តាមរយៈ ABA, ACLEDA ឬសាច់ប្រាក់ផ្ទាល់ពេលទំនិញទៅដល់ (COD)។', descEn: 'You can pay via ABA, ACLEDA, or Cash on Delivery (COD).' },
                    { kh: 'តើហាងមានទីតាំងនៅឯណា?', en: 'Where is the store?', descKh: 'យើងខ្ញុំមានសាខានៅរាជធានីភ្នំពេញ ដែលមានអាសយដ្ឋានដូចបានបង្ហាញក្នុងផ្នែកទំនាក់ទំនង។', descEn: 'We have branches in Phnom Penh, as shown in the contact section.' }
                  ]}
                  isListStyle={true}
                />
              </li>
              <li>
                <PolicyDialog 
                  triggerLabel={t.support} 
                  title={t.support}
                  icon={<Phone size={32} className="text-blue-500" />}
                  lang={lang}
                  content={[
                    { kh: 'ម៉ោងធ្វើការ', en: 'Working Hours', descKh: 'រៀងរាល់ថ្ងៃ ចាប់ពីម៉ោង ៨:០០ ព្រឹក ដល់ ៩:០០ យប់។', descEn: 'Every day from 8:00 AM to 9:00 PM.' },
                    { kh: 'ទំនាក់ទំនងបន្ទាន់', en: 'Emergency Contact', descKh: 'សម្រាប់បញ្ហាបន្ទាន់ សូមតេមកកាន់លេខ +855 969 127 603 ឬ Telegram: @zway_fashion។', descEn: 'For urgent issues, call +855 969 127 603 or Telegram: @zway_fashion.' }
                  ]}
                  isListStyle={true}
                />
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <h3 className="text-[13px] font-black uppercase tracking-[0.3em] text-zinc-500">{t.contactUs}</h3>
            
            <div className="bg-zinc-900/50 p-8 rounded-[2rem] border border-zinc-800/50 space-y-6">
              
              <a 
                href="https://maps.google.com/?q=ZWAY+FASHION+CAMBODIA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-4 group cursor-pointer"
              >
                <div className="p-3 bg-zinc-800 rounded-2xl text-zinc-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <MapPin size={20} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-zinc-500 uppercase">{lang === 'kh' ? 'ទីតាំង' : 'Location'}</p>
                  <p className="text-sm font-bold text-zinc-300 leading-snug group-hover:text-white transition-colors">
                    {t.address}
                  </p>
                </div>
              </a>

              <a 
                href="tel:+855969127603" 
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="p-3 bg-zinc-800 rounded-2xl text-zinc-400 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                  <Phone size={20} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-zinc-500 uppercase">{lang === 'kh' ? 'ទូរសព្ទ' : 'Call center'}</p>
                  <p className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">
                    +855 969 127 603
                  </p>
                </div>
              </a>

            </div>
          </div>
        </div>

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