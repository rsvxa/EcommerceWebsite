import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import type { CartItem as CartItemType } from '@/types/product';
import { formatPrice } from '@/lib/utils/format';
import { useCartStore } from '@/lib/store/cart-store';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleIncrement = () => {
    updateQuantity(
      item.product.id,
      item.quantity + 1,
      item.selectedVariant?.id
    );
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(
        item.product.id,
        item.quantity - 1,
        item.selectedVariant?.id
      );
    }
  };

  const handleRemove = () => {
    removeItem(item.product.id, item.selectedVariant?.id);
  };

  return (
    <div className="flex gap-4 border-b border-gray-200 py-4 last:border-0">
      {/* Product Image */}
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md bg-gray-100">
        <img
          src={item.product.images[0]}
          alt={item.product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div className="flex-1">
            <h3 className="font-semibold">{item.product.name}</h3>
            {item.selectedVariant && (
              <p className="mt-1 text-sm text-gray-600">
                {item.selectedVariant.size} - {item.selectedVariant.color}
              </p>
            )}
            <p className="mt-1 font-semibold">
              {formatPrice(item.product.price)}
            </p>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            className="h-8 w-8 text-gray-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Quantity Controls */}
        <div className="mt-auto flex items-center gap-2">
          <div className="flex items-center rounded-md border border-gray-300">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDecrement}
              className="h-8 w-8 rounded-none"
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-10 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleIncrement}
              className="h-8 w-8 rounded-none"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Subtotal */}
          <span className="ml-auto font-semibold">
            {formatPrice(item.product.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
