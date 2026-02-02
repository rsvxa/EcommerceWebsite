import { useState } from 'react';
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react';
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
import { Separator } from '@/app/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/app/components/ui/collapsible';
import type { Category } from '@/types/product';
import { subCategoryMapping } from '@/lib/utils/subcategories';

interface ProductFiltersProps {
  selectedCategory?: string;
  priceRange: [number, number];
  maxPrice: number;
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onSubCategoryChange: (subCategory: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
}

const categories: { value: string; label: string }[] = [
  { value: '', label: 'All Categories' },
  { value: 'CLOTHES', label: 'Clothes' },
  { value: 'JEWELRY', label: 'Jewelry' },
  { value: 'SHOES', label: 'Shoes' },
  { value: 'HATS', label: 'Hats' },
  { value: 'BAGS', label: 'Bags' },
];

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A to Z' },
];

export function ProductFilters({
  selectedCategory = '',
  priceRange,
  maxPrice,
  sortBy,
  onCategoryChange,
  onSubCategoryChange,
  onPriceRangeChange,
  onSortChange,
  onClearFilters,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const FilterContent = () => (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-4 pr-4">
        {/* Sort By */}
        <div className="space-y-2">
          <Label className="text-xs">Sort By</Label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Select sorting" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Category Filter with Subcategories */}
        <div className="space-y-2">
          <Label className="text-xs">Categories</Label>
          <div className="space-y-1">
            {/* All Categories Button */}
            <button
              onClick={() => onCategoryChange('')}
              className={`w-full rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                selectedCategory === ''
                  ? 'bg-black text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              All Categories
            </button>

            {/* Categories with Subcategories */}
            {categories.slice(1).map((category) => {
              const subCategories = subCategoryMapping[category.value as Category] || [];
              const isExpanded = expandedCategories[category.value];
              const isSelected = selectedCategory === category.value;

              return (
                <Collapsible
                  key={category.value}
                  open={isExpanded}
                  onOpenChange={() => toggleCategory(category.value)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onCategoryChange(category.value)}
                        className={`flex-1 rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                          isSelected
                            ? 'bg-black text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {category.label}
                      </button>
                      {subCategories.length > 0 && (
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                          >
                            {isExpanded ? (
                              <ChevronUp className="h-3 w-3" />
                            ) : (
                              <ChevronDown className="h-3 w-3" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      )}
                    </div>
                    
                    {subCategories.length > 0 && (
                      <CollapsibleContent className="ml-3 space-y-1">
                        {subCategories.map((subCat) => (
                          <button
                            key={subCat.value}
                            onClick={() => {
                              onCategoryChange(category.value);
                              onSubCategoryChange(subCat.value);
                            }}
                            className="w-full rounded-md px-2 py-1 text-left text-xs text-gray-600 hover:bg-gray-100 hover:text-black"
                          >
                            {subCat.label}
                          </button>
                        ))}
                      </CollapsibleContent>
                    )}
                  </div>
                </Collapsible>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-xs">
            Price: ${priceRange[0]} - ${priceRange[1]}
          </Label>
          <Slider
            value={priceRange}
            onValueChange={(value) =>
              onPriceRangeChange(value as [number, number])
            }
            max={maxPrice}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>$0</span>
            <span>${maxPrice}</span>
          </div>
        </div>

        <Separator />

        {/* Clear Filters */}
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs"
          onClick={() => {
            onClearFilters();
            setIsOpen(false);
          }}
        >
          <X className="mr-2 h-3 w-3" />
          Clear Filters
        </Button>
      </div>
    </ScrollArea>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="sticky top-20 rounded-lg border border-gray-200 bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </h2>
          </div>
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters & Sort
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filters & Sort</SheetTitle>
              <SheetDescription>
                Filter and sort products by category, price, and more.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
