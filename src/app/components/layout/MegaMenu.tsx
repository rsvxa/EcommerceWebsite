"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/app/components/ui/navigation-menu';

import { Shirt, Gem, ShoppingBag, Crown, Footprints, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';
import { motion } from 'framer-motion';

interface Category {
  name: string;
  value: string;
}

interface MegaMenuProps {
  categories: Category[];
  onCategorySelect?: (category: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  CLOTHES: <Shirt className="h-5 w-5" />,
  JEWELRY: <Gem className="h-5 w-5" />,
  SHOES: <Footprints className="h-5 w-5" />,
  HATS: <Crown className="h-5 w-5" />,
  BAGS: <ShoppingBag className="h-5 w-5" />,
};

// បន្ថែមរូបភាពតំណាងឱ្យ Category នីមួយៗដើម្បីបង្កើនសោភ័ណភាព
const categoryImages: Record<string, string> = {
  CLOTHES: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=400",
  JEWELRY: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=400",
  SHOES: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=400",
  HATS: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=400",
  BAGS: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400",
};

export function MegaMenu({ categories, onCategorySelect }: MegaMenuProps) {
  const { lang } = useLanguage();
  const t = translations[lang].megaMenu;

  const categoryDescriptions: Record<string, string> = {
    CLOTHES: t.descClothes,
    JEWELRY: t.descJewelry,
    SHOES: t.descShoes,
    HATS: t.descHats,
    BAGS: t.descBags,
  };

  return (
    <NavigationMenu className="max-w-full">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-12 px-6 bg-transparent hover:bg-zinc-50 text-[13px] font-black uppercase tracking-[0.3em] transition-all">
            {t.trigger}
          </NavigationMenuTrigger>
          
          <NavigationMenuContent>
            <div className="w-[100vw] md:w-[700px] lg:w-[900px] p-8 bg-white shadow-2xl overflow-hidden border-t border-zinc-100">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                
                {/* Left Side: Category Links */}
                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  <div className="col-span-full mb-4">
                    <p className="text-[10px] font-black text-black uppercase tracking-[0.4em] mb-2">Explore</p>
                    <h2 className="text-2xl font-black uppercase tracking-tighter">Collections</h2>
                  </div>
                  
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => onCategorySelect?.(category.value)}
                      className="group flex items-center gap-5 p-3 -mx-3 rounded-2xl transition-all hover:bg-zinc-50"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-300">
                        {categoryIcons[category.value] || <ShoppingBag className="h-5 w-5" />}
                      </div>
                      <div className="text-left">
                        <h3 className="text-sm font-black uppercase tracking-tight text-zinc-900">{category.name}</h3>
                        <p className="text-[13px] text-zinc-400 line-clamp-1 group-hover:text-zinc-600 transition-colors italic">
                          {categoryDescriptions[category.value] || t.defaultDesc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Right Side: Visual Highlight (Teaser) */}
                <div className="md:col-span-4 hidden md:block border-l border-zinc-100 pl-10">
                  <div className="relative h-full flex flex-col">
                    <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden group/img cursor-pointer">
                      <img 
                        src={categoryImages[categories[0]?.value] || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800"} 
                        alt="New Arrival"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent flex flex-col justify-end p-6">
                        <span className="text-white/60 text-[9px] font-black uppercase tracking-widest mb-1">New Season</span>
                        <h4 className="text-white text-lg font-black uppercase tracking-tighter">Summer Edition</h4>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => onCategorySelect?.('')}
                      className="mt-6 flex items-center justify-between group/all"
                    >
                      <span className="text-[13px] font-black uppercase tracking-[0.3em] text-gray-600 border-b-2 border-zinc-900 pb-1 group-hover/all:text-black group-hover/all:border-gray-600 transition-all">
                        {t.viewAll}
                      </span>
                      <ArrowRight size={16} className="group-hover/all:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Bottom Featured Bar */}
              <div className="mt-10 pt-6 border-t border-zinc-50 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-zinc-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    <span className="text-zinc-900">1.2k+</span> people browsing now
                  </p>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Store Live</span>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>

      {/* Featured Section Badge */}
      <div className="flex items-center gap-2 ml-4 px-4 py-3.5 border border-gray-200 rounded-md">
         <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-ping" />
         <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-black">
            {t.featured}
         </span>
      </div>
    </NavigationMenu>
  );
}