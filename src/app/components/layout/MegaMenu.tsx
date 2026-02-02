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

        {/* Featured Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-10 text-sm font-large">
            Featured
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-2 p-4">
              <li>
                <button
                  onClick={() => onCategorySelect?.('MALE')}
                  className="flex w-full items-center gap-3 rounded-md p-2 text-sm transition-colors hover:bg-gray-100 group"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-100">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Male</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onCategorySelect?.('FEMALE')}
                  className="flex w-full items-center gap-3 rounded-md p-2 text-sm transition-colors hover:bg-gray-100 group"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-50 text-pink-600 group-hover:bg-pink-100">
                    <UserPlus className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Female</span>
                </button>
              </li>
              <li className="my-1 border-t border-gray-100" />
              <li>
                <button
                  onClick={() => onCategorySelect?.('featured')}
                  className="flex w-full items-center gap-3 rounded-md p-2 text-sm transition-colors hover:bg-gray-100 group text-gray-500"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-50 text-yellow-600 group-hover:bg-yellow-100">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <span>All Featured</span>
                </button>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
       
      </NavigationMenuList>
    </NavigationMenu>
  );
}

