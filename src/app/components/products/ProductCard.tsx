import { motion } from 'motion/react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/app/components/ui/card';
import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils/format';
import { useCartStore } from '@/lib/store/cart-store';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    // If product has variants, add the first available one
    const variant =
      product.variants.length > 0 ? product.variants[0] : undefined;
    addItem(product, variant);
    toast.success('Added to cart', {
      description: `${product.name} has been added to your cart.`,
    });
  };

  const isLowStock = product.stock > 0 && product.stock < 10;
  const isOutOfStock = product.stock === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Card className="group relative overflow-hidden border-gray-200 transition-shadow hover:shadow-lg">
        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Badges */}
          <div className="absolute left-2 top-2 flex flex-col gap-2">
            {product.featured && (
              <Badge className="bg-black text-white hover:bg-gray-800">
                Featured
              </Badge>
            )}
            {isLowStock && !isOutOfStock && (
              <Badge variant="destructive">Low Stock</Badge>
            )}
            {isOutOfStock && (
              <Badge variant="secondary" className="bg-gray-500 text-white">
                Sold Out
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-colors hover:bg-white"
            onClick={(e) => {
              e.preventDefault();
              toast.success('Added to wishlist');
            }}
          >
            <Heart className="h-4 w-4" />
          </motion.button>

          {/* Quick Add Button - Shows on Hover */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <Button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="w-full rounded-none bg-black py-6 text-white hover:bg-gray-800"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <CardContent className="p-4">
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 flex-1 font-semibold">
              {product.name}
            </h3>
          </div>
          <p className="mb-2 line-clamp-2 text-sm text-gray-600">
            {product.description}
          </p>

          {/* Variants Info */}
          {product.variants.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1">
              {Array.from(
                new Set(product.variants.map((v) => v.color))
              ).map((color, index) => (
                <div
                  key={index}
                  className="h-4 w-4 rounded-full border border-gray-300"
                  style={{
                    backgroundColor:
                      product.variants.find((v) => v.color === color)
                        ?.colorHex || '#ccc',
                  }}
                  title={color}
                />
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex w-full items-center justify-between">
            <span className="text-xl font-bold">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-gray-500">
              {product.stock} in stock
            </span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
