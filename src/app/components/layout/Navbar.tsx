"use client";

import { useState } from 'react';
import { Link } from 'react-router-dom'; // ប្រើ Link ពី react-router-dom សម្រាប់ Vite
import { ShoppingCart, Search, Menu, X, User, LogOut, UserCircle, Globe, Check, Settings } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from '@/app/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { MegaMenu } from './MegaMenu';
import { CartSheet } from '../cart/CartSheet';
import { AuthDialog } from '../auth/AuthDialog';
import { useCartStore } from '@/lib/store/cart-store';
import { useAuthStore } from '@/lib/store/auth-store';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations'; 
import { toast } from 'sonner';

interface NavbarProps {
  onSearch?: (query: string) => void;
  onCategorySelect?: (category: string) => void;
}

export function Navbar({ onSearch, onCategorySelect }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  const { lang, setLang } = useLanguage();
  const t = translations[lang].nav;

  const totalItems = useCartStore((state) => state.getTotalItems());
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const categories = [
    { name: t.clothes, value: 'CLOTHES' },
    { name: t.jewelry, value: 'JEWELRY' },
    { name: t.shoes, value: 'SHOES' },
    { name: t.hats, value: 'HATS' },
    { name: t.bags, value: 'BAGS' },
  ];

  const handleLogout = () => {
    logout();
    toast.success(lang === 'kh' ? 'បានចាកចេញដោយជោគជ័យ' : 'Logged out successfully');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white font-bold">Z</div>
              <span className="hidden font-semibold sm:inline-block italic">ZWAY Fashion</span>
            </Link>

            <div className="hidden lg:flex lg:items-center">
              <MegaMenu categories={categories} onCategorySelect={onCategorySelect} />
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden flex-1 md:flex md:max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-6 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder={t.search}
                className="w-full pl-10 border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 px-2">
                  <Globe className="h-6 w-6 text-zinc-500" />
                  <span className="text-[10px] font-bold uppercase">{lang}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel className="text-[10px] uppercase text-zinc-400">Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setLang('kh')} className="flex justify-between cursor-pointer">
                  <span>🇰🇭 ភាសាខ្មែរ</span>
                  {lang === 'kh' && <Check className="h-4 w-4 text-blue-600" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('en')} className="flex justify-between cursor-pointer">
                  <span>🇺🇸 English</span>
                  {lang === 'en' && <Check className="h-4 w-4 text-blue-600" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge variant="destructive" className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full px-1 text-xs">
                  {totalItems}
                </Badge>
              )}
            </Button>

            {/* User Dropdown / Auth Button */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <UserCircle className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-zinc-500">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {/* ប៊ូតុងចូលទៅ Profile - ប្តូរទៅប្រើ Link 'to' */}
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/profile" className="cursor-pointer w-full flex items-center">
                      <User className="mr-2 h-4 w-4" /> 
                      {lang === 'kh' ? 'គណនីរបស់ខ្ញុំ' : 'My Account'}
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/profile/settings" className="cursor-pointer w-full flex items-center">
                      <Settings className="mr-2 h-4 w-4" /> 
                      {lang === 'kh' ? 'ការកំណត់' : 'Settings'}
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" /> {t.logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsAuthDialogOpen(true)}>
                <User className="h-5 w-5" />
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetDescription className="sr-only">Menu</SheetDescription>
                <div className="flex flex-col gap-4 py-6">
                  <h2 className="font-semibold text-zinc-500 px-4">{t.categories}</h2>
                  <div className="flex flex-col gap-1">
                    {categories.map((category) => (
                      <Button
                        key={category.value}
                        variant="ghost"
                        className="justify-start font-medium text-md"
                        onClick={() => {
                          onCategorySelect?.(category.value);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {category.name}
                      </Button>
                    ))}
                    <div className="h-[1px] bg-zinc-100 my-2 mx-4" />
                    <Button
                      variant="ghost"
                      className="justify-start font-medium text-md text-blue-600"
                      onClick={() => {
                        onCategorySelect?.('');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {t.allProducts}
                    </Button>
                  </div>

                  {/* Profile Link សម្រាប់ Mobile */}
                  {isAuthenticated && (
                    <>
                      <div className="h-[1px] bg-zinc-100 my-2 mx-4" />
                      <Link to="/dashboard/profile" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start font-medium text-md">
                          <UserCircle className="mr-2 h-5 w-5" />
                          {lang === 'kh' ? 'គណនីរបស់ខ្ញុំ' : 'My Account'}
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
      <AuthDialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen} />
    </nav>
  );
}