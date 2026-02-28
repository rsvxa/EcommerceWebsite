"use client";

import { useState } from 'react';
import { ShoppingCart, Search, Menu, User, UserCircle, Globe, X, ChevronLeft, LogOut, LayoutDashboard, Settings, ShoppingBag, Heart } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Link } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '../ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { MegaMenu } from './MegaMenu';
import { CartSheet } from '../cart/CartSheet';
import { AuthDialog } from '../auth/AuthDialog';
import { useCartStore } from '@/lib/store/cart-store';
import { useAuthStore } from '@/lib/store/auth-store';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations'; 
import { toast } from 'sonner';
import { ProfileOverview } from '../../dashboard/profile/ProfileOverview';
import { SettingsPage } from '../../dashboard/profile/settings/page';
import { ProfileSidebar } from '../../dashboard/profile/ProfileSidebar';
import { OrderHistory } from '../../dashboard/profile/Order/OrderHistory';
import { Wishlist } from '../../dashboard/profile/Order/Wishlist';

interface NavbarProps {
  onSearch?: (query: string) => void;
  onCategorySelect?: (category: string) => void;
}

export function Navbar({ onSearch, onCategorySelect }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'orders' | 'wishlist'>('profile');
  const [showMobileDashboard, setShowMobileDashboard] = useState(false);

  const { lang, setLang } = useLanguage();
  const t = translations[lang].nav;

  const totalItems = useCartStore((state) => state.getTotalItems());
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
    toast.success(lang === 'kh' ? 'បានចាកចេញដោយជោគជ័យ' : 'Logged out successfully');
  };

  const categories = [
    { name: t.clothes, value: 'CLOTHES' },
    { name: t.jewelry, value: 'JEWELRY' },
    { name: t.shoes, value: 'SHOES' },
    { name: t.hats, value: 'HATS' },
    { name: t.bags, value: 'BAGS' },
  ];

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
                className="w-full pl-10 border-gray-400 focus:ring-zinc-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 px-2 border bg-gray-100 border-gray-400 w-25 h-9">
                  <Globe size={20}/>
                  <span className="text-[13px] font-black uppercase tracking-widest">{lang === 'kh' ? 'KH' : 'EN'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => setLang('kh')} className="cursor-pointer">KH ភាសាខ្មែរ</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('en')} className="cursor-pointer">EN English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge variant="destructive" className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full px-1 text-xs">
                  {totalItems}
                </Badge>
              )}
            </Button>

            {/* Profile Icon for Desktop only */}
            {isAuthenticated ? (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsProfileOpen(true)}
                className="hidden lg:flex hover:bg-zinc-100 rounded-full"
              >
                <UserCircle className="h-6 w-6" />
              </Button>
            ) : (
              <Button variant="ghost" size="icon" className="hidden lg:flex" onClick={() => setIsAuthDialogOpen(true)}>
                <User className="h-5 w-5" />
              </Button>
            )}

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={(open) => {
              setIsMobileMenuOpen(open);
              if (!open) setShowMobileDashboard(false); // Reset dashboard view when closing
            }}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0 flex flex-col">
                <div className="flex-1 flex flex-col overflow-hidden">
                  
                  {/* Header of Mobile Menu */}
                  <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
                    {showMobileDashboard ? (
                      <button 
                        onClick={() => setShowMobileDashboard(false)}
                        className="flex items-center gap-2 text-zinc-500 hover:text-black transition-colors"
                      >
                        <ChevronLeft size={20} />
                        <span className="text-xs font-black uppercase tracking-widest">{lang === 'kh' ? 'ត្រឡប់ក្រោយ' : 'Back'}</span>
                      </button>
                    ) : (
                      <span className="text-lg font-black italic">ZWAY MENU</span>
                    )}
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    {!showMobileDashboard ? (
                      /* Main Menu Content */
                      <div className="p-4 space-y-2">
                        {isAuthenticated ? (
                          <div 
                            onClick={() => setShowMobileDashboard(true)}
                            className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-100 mb-6 cursor-pointer hover:bg-zinc-100"
                          >
                            <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center text-white font-bold uppercase">
                              {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-black uppercase">{user?.name || 'User'}</p>
                              <p className="text-[10px] text-zinc-400 uppercase tracking-widest">{lang === 'kh' ? 'មើលគណនី' : 'View Profile'}</p>
                            </div>
                            <ChevronLeft size={16} className="rotate-180 text-zinc-300" />
                          </div>
                        ) : (
                          <Button 
                            variant="outline" 
                            className="w-full justify-start gap-3 rounded-xl mb-6 py-6 border-zinc-200"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsAuthDialogOpen(true);
                            }}
                          >
                            <User size={18} />
                            <span className="font-bold uppercase tracking-widest text-xs">{lang === 'kh' ? 'ចូលគណនី' : 'Login / Register'}</span>
                          </Button>
                        )}

                        <p className="px-4 text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-2">{lang === 'kh' ? 'ប្រភេទ' : 'Categories'}</p>
                        {categories.map((cat) => (
                          <button
                            key={cat.value}
                            onClick={() => {
                              onCategorySelect?.(cat.value);
                              setIsMobileMenuOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 rounded-xl hover:bg-zinc-50 font-bold uppercase text-xs tracking-widest transition-colors"
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    ) : (
                      /* Profile Dashboard Content (Mobile View) */
                      <div className="p-4 space-y-2 animate-in slide-in-from-right duration-300">
                        <button 
                          onClick={() => { setActiveTab('profile'); setIsProfileOpen(true); setIsMobileMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-4 rounded-xl hover:bg-zinc-50 font-black uppercase text-[11px] tracking-widest"
                        >
                          <LayoutDashboard size={18} /> {lang === 'kh' ? 'ទិដ្ឋភាពទូទៅ' : 'Overview'}
                        </button>
                        <button 
                          onClick={() => { setActiveTab('orders'); setIsProfileOpen(true); setIsMobileMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-4 rounded-xl hover:bg-zinc-50 font-black uppercase text-[11px] tracking-widest"
                        >
                          <ShoppingBag size={18} /> {lang === 'kh' ? 'ប្រវត្តិបញ្ជាទិញ' : 'Orders'}
                        </button>
                        <button 
                          onClick={() => { setActiveTab('wishlist'); setIsProfileOpen(true); setIsMobileMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-4 rounded-xl hover:bg-zinc-50 font-black uppercase text-[11px] tracking-widest"
                        >
                          <Heart size={18} /> {lang === 'kh' ? 'បញ្ជីប្រាថ្នា' : 'Wishlist'}
                        </button>
                        <button 
                          onClick={() => { setActiveTab('settings'); setIsProfileOpen(true); setIsMobileMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-4 rounded-xl hover:bg-zinc-50 font-black uppercase text-[11px] tracking-widest"
                        >
                          <Settings size={18} /> {lang === 'kh' ? 'ការកំណត់' : 'Settings'}
                        </button>
                        <div className="pt-4 mt-4 border-t border-zinc-100">
                          <button 
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-4 rounded-xl text-red-500 hover:bg-red-50 font-black uppercase text-[11px] tracking-widest"
                          >
                            <LogOut size={18} /> {lang === 'kh' ? 'ចាកចេញ' : 'Logout'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Profile & Settings Sheet (Desktop & Mobile Content) */}
      <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <SheetContent className="w-full sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] p-0 flex flex-col h-screen">
          
          <div className="flex-none flex items-center justify-between px-8 py-6 border-b border-zinc-100 bg-white z-10">
            <h2 className="text-xl font-black uppercase tracking-tighter italic text-zinc-900">
              {lang === 'kh' ? 'ផ្ទាំងព័ត៌មាន ZWAY' : 'ZWAY Dashboard'}
            </h2>
            <Button 
              variant="ghost" 
              onClick={() => setIsProfileOpen(false)}
              className="group flex items-center rounded-full bg-zinc-100 hover:bg-black gap-2 text-[13px] font-black uppercase tracking-[0.2em] text-black hover:text-white transition-all"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform" />
            </Button>
          </div>

          <div className="flex-1 flex overflow-hidden">
            <aside className="hidden md:block border-r border-zinc-50 p-6 bg-white overflow-y-auto w-[220px]">
              <ProfileSidebar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                onLogout={handleLogout} 
              />
            </aside>

            <main className="flex-1 overflow-y-auto bg-[#F9FAFB] p-4 md:p-8 custom-scrollbar">
              <div className="max-w-5xl mx-auto">
                <div className="animate-in fade-in slide-in-from-right-8 duration-700">
                  {activeTab === 'profile' && <ProfileOverview />}
                  {activeTab === 'settings' && <SettingsPage />}
                  {activeTab === 'orders' && <OrderHistory/>}
                  {activeTab === 'wishlist' && <Wishlist/>}
                </div>
              </div>
            </main>
          </div>
        </SheetContent>
      </Sheet>

      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
      <AuthDialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen} />
    </nav>
  );
}