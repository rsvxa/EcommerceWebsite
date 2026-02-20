"use client";

import { Heart, ShoppingCart, Trash2, Star, Clock } from "lucide-react";
import { Card } from "../../../../app/components/ui/card";
import { Button } from "../../../../app/components/ui/button";
import { Badge } from "../../../../app/components/ui/badge";
import { useWishlistStore } from "@/lib/store/use-wishlist-store";
import { useCartStore } from "@/lib/store/cart-store";
import { useLanguage } from "@/lib/store/use-language";
import { formatPrice } from "@/lib/utils/format";
import { toast } from "sonner";

export function Wishlist() {
  const { items, toggleItem } = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);
  const { lang } = useLanguage();

  const handleAddToCart = (product: any) => {
    if (product.stock === 0) return;
    
    const variant = product.variants?.length > 0 ? product.variants[0] : undefined;
    addItem(product, variant);

    toast.success(lang === 'kh' ? "បានដាក់ចូលក្នុងកន្ត្រក" : "Added to Cart", {
      icon: <ShoppingCart className="h-4 w-4" />,
    });
  };

  const totalValue = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-12 px-4 italic">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 border-b border-zinc-100 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
                Your Collection
              </span>
              <h1 className="text-5xl font-black uppercase tracking-tighter">
                {lang === 'kh' ? "បំណងប្រាថ្នា" : "My Wishlist"}
              </h1>
              <p className="text-zinc-500 text-sm font-medium">
                {items.length} {lang === 'kh' ? "មុខទំនិញដែលបានរក្សាទុក" : "Items saved in your archive"}
              </p>
            </div>
            <div className="bg-zinc-900 text-white p-6 rounded-[2rem] min-w-[200px] text-right">
              <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Total Value</p>
              <p className="text-3xl font-black italic">{formatPrice(totalValue)}</p>
            </div>
          </div>
        </div>

        {/* Wishlist Items List (Vertical Style) */}
        {items.length > 0 ? (
          <div className="space-y-4">
            {items.map((item) => (
              <Card 
                key={item.id} 
                className="group relative overflow-hidden border border-zinc-100 bg-white rounded-[2rem] p-4 transition-all hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
              >
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  
                  {/* Product Image */}
                  <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-zinc-50">
                    <img
                      src={item.images?.[0] || item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 text-left space-y-1">
                    <div className="flex items-center gap-2">
                       <Badge className="bg-zinc-100 text-zinc-900 text-[9px] font-black uppercase tracking-widest hover:bg-zinc-100">
                         {item.category || "Premium"}
                       </Badge>
                       {item.stock < 5 && item.stock > 0 && (
                         <span className="text-[9px] font-black uppercase text-orange-500 flex items-center gap-1">
                           <Clock size={10} /> Low Stock
                         </span>
                       )}
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900">
                      {item.name}
                    </h3>
                    <p className="text-zinc-400 text-sm line-clamp-1 italic pr-10">
                      {item.description}
                    </p>
                    <p className="text-xl font-black text-zinc-900 pt-1">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
                    <Button
                      onClick={() => handleAddToCart(item)}
                      disabled={item.stock === 0}
                      className="flex-1 sm:w-40 h-12 bg-black text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:scale-[1.02] transition-transform"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {item.stock === 0 ? "Sold Out" : "Add to Cart"}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 rounded-xl border-zinc-100 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-colors"
                      onClick={() => toggleItem(item)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-20 text-center border-dashed border-2 border-zinc-100 bg-transparent rounded-[3rem]">
            <div className="h-20 w-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-zinc-300" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight mb-2">
              {lang === 'kh' ? "មិនមានទំនិញក្នុងបញ្ជី" : "Your archive is empty"}
            </h2>
            <p className="text-zinc-500 mb-8 max-w-xs mx-auto italic">
              {lang === 'kh' 
                ? "ចាប់ផ្តើមស្វែងរក និងរក្សាទុកទំនិញដែលអ្នកស្រឡាញ់នៅទីនេះ" 
                : "Start adding items you love to your personal wishlist archive."}
            </p>
            <Button className="rounded-full px-10 h-14 bg-black text-white font-black uppercase text-[10px] tracking-[0.2em]">
              Start Shopping
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}