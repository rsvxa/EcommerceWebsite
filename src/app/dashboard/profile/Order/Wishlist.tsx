import { Heart, ShoppingCart, Trash2, Star } from "lucide-react";
import { useState } from "react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  category: string;
}

const mockWishlistItems: WishlistItem[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1578517581165-61ec5ab27a19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBwcm9kdWN0fGVufDF8fHx8MTc3MTAzNjE5NHww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5,
    reviews: 328,
    inStock: true,
    category: "Audio"
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNoJTIwd2VhcmFibGV8ZW58MXx8fHwxNzcwOTcwMjI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviews: 892,
    inStock: true,
    category: "Wearables"
  },
  {
    id: "3",
    name: "Professional Laptop - 16GB RAM",
    price: 1299.99,
    originalPrice: 1499.99,
    image: "https://images.unsplash.com/flagged/photo-1576697010739-6373b63f3204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMGRlc2t8ZW58MXx8fHwxNzcxMDU0MDcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    reviews: 567,
    inStock: true,
    category: "Computers"
  },
  {
    id: "4",
    name: "Mirrorless Camera Kit",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1729655669048-a667a0b01148?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NzA5OTExMDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviews: 423,
    inStock: false,
    category: "Photography"
  },
  {
    id: "5",
    name: "Ultra Performance Running Shoes",
    price: 189.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1695459468644-717c8ae17eed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXMlMjBzbmVha2Vyc3xlbnwxfHx8fDE3NzA5OTIxOTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    reviews: 756,
    inStock: true,
    category: "Footwear"
  },
  {
    id: "6",
    name: "Portable Bluetooth Speaker",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1762328498684-e597f4ceaa43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0YWJsZSUyMHNwZWFrZXIlMjBhdWRpb3xlbnwxfHx8fDE3NzEwNzgxMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.4,
    reviews: 612,
    inStock: true,
    category: "Audio"
  }
];

function WishlistCard({ item, onRemove, onAddToCart }: { 
  item: WishlistItem; 
  onRemove: (id: string) => void;
  onAddToCart: (id: string) => void;
}) {
  const discount = item.originalPrice 
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        {discount > 0 && (
          <Badge className="absolute top-3 left-3 bg-red-500 text-white">
            -{discount}%
          </Badge>
        )}
        {!item.inStock && (
          <Badge className="absolute top-3 right-3 bg-gray-900 text-white">
            Out of Stock
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/90 hover:bg-white"
          onClick={() => onRemove(item.id)}
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs mb-2">
            {item.category}
          </Badge>
          <h3 className="font-semibold text-lg line-clamp-2 mb-2">{item.name}</h3>
        </div>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(item.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({item.reviews})</span>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold">${item.price.toFixed(2)}</span>
          {item.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${item.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <Button 
          className="w-full gap-2"
          onClick={() => onAddToCart(item.id)}
          disabled={!item.inStock}
        >
          <ShoppingCart className="w-4 h-4" />
          {item.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </Card>
  );
}

export function Wishlist() {
  const [items, setItems] = useState<WishlistItem[]>(mockWishlistItems);

  const handleRemove = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleAddToCart = (id: string) => {
    const item = items.find(i => i.id === id);
    if (item) {
      alert(`${item.name} added to cart!`);
    }
  };

  const totalValue = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
              <p className="text-gray-600">
                {items.length} {items.length === 1 ? "item" : "items"} saved
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <WishlistCard
                key={item.id}
                item={item}
                onRemove={handleRemove}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">
              Start adding items you love to your wishlist
            </p>
            <Button>Start Shopping</Button>
          </Card>
        )}
      </div>
    </div>
  );
}
