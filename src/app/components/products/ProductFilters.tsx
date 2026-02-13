"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronRight, RotateCcw, Filter } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Slider } from '@/app/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from '@/app/components/ui/sheet';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import type { Category } from '@/types/product';
import { subCategoryMapping } from '@/lib/utils/subcategories';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';

interface ProductFiltersProps {
  selectedCategory?: string;
  selectedSubCategory?: string;
  priceRange: [number, number];
  maxPrice: number;
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onSubCategoryChange: (subCategory: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
}

export function ProductFilters({
  selectedCategory = '',
  selectedSubCategory = '',
  priceRange,
  maxPrice,
  sortBy,
  onCategoryChange,
  onSubCategoryChange,
  onPriceRangeChange,
  onSortChange,
  onClearFilters,
}: ProductFiltersProps) {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [isOpen, setIsOpen] = useState(false);

  const categoriesList = [
    { value: 'CLOTHES', label: t.nav.clothes, count: 124 },
    { value: 'JEWELRY', label: t.nav.jewelry, count: 42 },
    { value: 'SHOES', label: t.nav.shoes, count: 86 },
    { value: 'HATS', label: t.nav.hats, count: 18 },
    { value: 'BAGS', label: t.nav.bags, count: 35 },
  ];

  const sortOptions = [
    { value: 'newest', label: t.filters.sortNewest },
    { value: 'price-asc', label: t.filters.sortPriceAsc },
    { value: 'price-desc', label: t.filters.sortPriceDesc },
    { value: 'name', label: t.filters.sortName },
  ];

  const FilterContent = () => (
    <div className="space-y-10">
      {/* Sort Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-[13px] font-black uppercase tracking-[0.2em] text-zinc-400">
            {t.filters.sortBy}
          </Label>
        </div>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="h-12 text-[11px] font-bold uppercase tracking-widest rounded-2xl border-zinc-100 bg-zinc-50/50 hover:bg-zinc-100 transition-all">
            <SelectValue placeholder={t.filters.sortBy} />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-zinc-100 shadow-2xl">
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-[11px] font-bold uppercase tracking-widest py-3">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Categories Accordion Style */}
      <div className="space-y-4">
        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
          {t.filters.categories}
        </Label>
        <div className="space-y-1">
          <button
            onClick={() => {
              onCategoryChange('');
              onSubCategoryChange('');
            }}
            className={`group w-full flex items-center justify-between rounded-xl px-4 py-3 text-left transition-all ${
              selectedCategory === ''
                ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-200'
                : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
            }`}
          >
            <span className="text-[11px] font-black uppercase tracking-widest">{t.filters.allCategories}</span>
            <span className="text-[9px] font-bold opacity-50">∞</span>
          </button>

          {categoriesList.map((category) => {
            const subCategories = subCategoryMapping[category.value as Category] || [];
            const isSelected = selectedCategory === category.value;

            return (
              <div key={category.value} className="space-y-1">
                <button
                  onClick={() => onCategoryChange(isSelected && selectedSubCategory === '' ? '' : category.value)}
                  className={`group w-full flex items-center justify-between rounded-xl px-4 py-3 text-left transition-all ${
                    isSelected
                      ? 'bg-zinc-100 text-zinc-900 font-black'
                      : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
                  }`}
                >
                  <span className="text-[11px] font-bold uppercase tracking-widest">{category.label}</span>
                  <ChevronRight className={`h-3 w-3 transition-transform duration-300 ${isSelected ? 'rotate-90' : 'opacity-0 group-hover:opacity-100'}`} />
                </button>
                
                <AnimatePresence>
                  {isSelected && subCategories.length > 0 && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-4 pr-2 space-y-1"
                    >
                      {subCategories.map((subCat) => (
                        <button
                          key={subCat.value}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSubCategoryChange(subCat.value);
                            if (window.innerWidth < 1024) setIsOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 rounded-lg px-4 py-2 text-left transition-all ${
                            selectedSubCategory === subCat.value
                              ? 'text-blue-600 bg-blue-50 font-bold'
                              : 'text-zinc-400 hover:text-zinc-900'
                          }`}
                        >
                          <div className={`w-1 h-1 rounded-full ${selectedSubCategory === subCat.value ? 'bg-blue-600' : 'bg-transparent'}`} />
                          <span className="text-[10px] font-black uppercase tracking-widest">{subCat.label[lang]}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{t.filters.price}</Label>
          <div className="flex items-center gap-1 bg-zinc-100 px-3 py-1 rounded-full">
             <span className="text-[10px] font-black">${priceRange[0]}</span>
             <span className="text-[8px] text-zinc-400">—</span>
             <span className="text-[10px] font-black">${priceRange[1]}</span>
          </div>
        </div>
        <Slider
          value={priceRange}
          onValueChange={(value) => onPriceRangeChange(value as [number, number])}
          max={maxPrice}
          min={0}
          step={1}
          className="py-4"
        />
      </div>

      {/* Action Footer */}
      <div className="pt-6 border-t border-zinc-100">
        <Button
          variant="ghost"
          className="w-full flex items-center justify-center gap-2 h-12 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-all"
          onClick={() => {
            onClearFilters();
            setIsOpen(false);
          }}
        >
          <RotateCcw className="h-3 w-3" />
          {t.filters.clear}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-28">
          <div className="flex items-center gap-3 mb-8">
             <div className="p-2 bg-zinc-900 rounded-lg text-white">
                <Filter size={14} />
             </div>
             <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-900">
              {t.filters.title}
            </h2>
          </div>
          <FilterContent />
        </div>
      </div>

      {/* Mobile Trigger */}
      <div className="lg:hidden sticky top-20 z-30 bg-white/80 backdrop-blur-md py-4 mb-6 border-b border-zinc-100 -mx-4 px-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button className="w-full h-14 bg-zinc-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-zinc-200">
              <SlidersHorizontal className="mr-3 h-4 w-4" />
              {t.filters.mobileTrigger}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[92vh] rounded-t-[3rem] p-0 overflow-hidden border-none shadow-2xl">
            <div className="h-2 w-12 bg-zinc-200 rounded-full mx-auto mt-4 mb-2" />
            <SheetHeader className="px-8 pt-6 pb-4 text-left">
              <SheetTitle className="text-xl font-black uppercase tracking-tighter text-zinc-900">{t.filters.title}</SheetTitle>
              <SheetDescription className="text-xs font-medium italic text-zinc-400">{t.filters.mobileDesc}</SheetDescription>
            </SheetHeader>
            <ScrollArea className="h-full px-8 pb-32">
              <div className="mt-6">
                <FilterContent />
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}