import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/app/components/ui/navigation-menu';

import { Shirt, Gem, ShoppingBag, Crown, User, UserPlus, Sparkles } from 'lucide-react';

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
  SHOES: <Crown className="h-5 w-5" />,
  HATS: <Crown className="h-5 w-5" />,
  BAGS: <ShoppingBag className="h-5 w-5" />,
};

const categoryDescriptions: Record<string, string> = {
  CLOTHES: 'Explore our premium collection of clothing',
  JEWELRY: 'Discover elegant jewelry pieces',
  SHOES: 'Step into style with our shoe collection',
  HATS: 'Top off your look with our hats',
  BAGS: 'Carry your essentials in style',
};

export function MegaMenu({ categories, onCategorySelect }: MegaMenuProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-10">
            Shop by Category
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-4 md:w-[600px] lg:w-[800px]">
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => onCategorySelect?.(category.value)}
                    className="group flex items-start gap-4 rounded-lg border border-gray-200 p-4 text-left transition-colors hover:border-black hover:bg-gray-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-black text-white transition-colors group-hover:bg-gray-800">
                      {categoryIcons[category.value] || (
                        <ShoppingBag className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {categoryDescriptions[category.value] ||
                          'Browse our collection'}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Featured Section */}
              <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Shop All Products</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Browse our entire collection
                    </p>
                  </div>
                  <button
                    onClick={() => onCategorySelect?.('')}
                    className="rounded-md bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-gray-800"
                  >
                    View All
                  </button>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

      </NavigationMenuList>
        <div className=" font-bold w-full rounded gap-2 px-7 py-2 text-sm flex items-center justify-center">
          Featured
        </div>
    </NavigationMenu>
  );
}

