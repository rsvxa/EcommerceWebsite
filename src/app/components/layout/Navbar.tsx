import { useState } from 'react';
import { ShoppingCart, Search, Menu, X, User, LogOut, UserCircle } from 'lucide-react';
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
  const totalItems = useCartStore((state) => state.getTotalItems());
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const categories = [
    { name: 'Clothes', value: 'CLOTHES' },
    { name: 'Jewelry', value: 'JEWELRY' },
    { name: 'Shoes', value: 'SHOES' },
    { name: 'Hats', value: 'HATS' },
    { name: 'Bags', value: 'BAGS' },
  ];

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white">
                <span className="font-bold">Z</span>
              </div>
              <span className="hidden font-semibold sm:inline-block">
                ZWAY Fashion
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center">
              <MegaMenu
                categories={categories}
                onCategorySelect={onCategorySelect}
              />
            </div>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden flex-1 md:flex md:max-w-md"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-10 border-gray-200 hover:border-gray-500 hover:ring-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="p-4">
                <SheetDescription className="sr-only">
                  Search for products
                </SheetDescription>
                <form onSubmit={handleSearch} className="mt-4">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </form>
              </SheetContent>
            </Sheet>

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full px-1 text-xs"
                >
                  {totalItems}
                </Badge>
              )}
              <span className="sr-only">Shopping cart</span>
            </Button>

            {/* User Menu */}
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                // ប្រសិនបើ Login រួចហើយ៖ បង្ហាញ Dropdown សម្រាប់ Logout
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <UserCircle className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                // ប្រសិនបើមិនទាន់ Login៖ ចុចលើ Icon រូបមនុស្សឱ្យលោត Dialog ភ្លាម
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsAuthDialogOpen(true)}
                >
                  <User className="h-5 w-5" />
                  <span className="sr-only">Login</span>
                </Button>
              )}
            </div>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetDescription className="sr-only">
                  Browse product categories
                </SheetDescription>
                <div className="flex flex-col gap-4 py-4">
                  <h2 className="font-semibold">Categories</h2>
                  <div className="flex flex-col gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category.value}
                        variant="ghost"
                        className="justify-start"
                        onClick={() => {
                          onCategorySelect?.(category.value);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {category.name}
                      </Button>
                    ))}
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => {
                        onCategorySelect?.('');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      All Products
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Cart Sheet */}
      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />

      {/* Auth Dialog */}
      <AuthDialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen} />
    </nav>
  );
}