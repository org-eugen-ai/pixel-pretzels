'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { useCartStore } from '@/stores/cartStore';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { ShoppingCart, Check, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const t = useTranslations('products');
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const inStock = product.inStock !== false;

  const handleAddToCart = () => {
    if (!inStock) return;
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuantity(1);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      {/* Stock status */}
      <div className="flex items-center gap-2">
        <div
          className={cn(
            'h-2.5 w-2.5 rounded-full',
            inStock ? 'bg-success' : 'bg-error'
          )}
        />
        <span
          className={cn(
            'text-sm font-medium',
            inStock ? 'text-success' : 'text-error'
          )}
        >
          {inStock ? t('inStock') : t('outOfStock')}
        </span>
      </div>

      {/* Quantity + Add to Cart */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <QuantitySelector
          value={quantity}
          onChange={setQuantity}
          min={1}
          max={10}
          disabled={!inStock}
        />

        <Button
          onClick={handleAddToCart}
          disabled={!inStock || isAdded}
          className={cn(
            'flex-1 h-12 text-base transition-all duration-300',
            isAdded && 'bg-success hover:bg-success'
          )}
        >
          {isAdded ? (
            <span className="flex items-center gap-2">
              <Check className="h-5 w-5 animate-[scale-in_0.3s_ease-out]" />
              {t('addedToCart')}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              {t('addToCart')}
            </span>
          )}
        </Button>
      </div>

      {/* Shipping note */}
      {inStock && (
        <div className="flex items-center gap-2 rounded-lg bg-surface px-4 py-3">
          <Package className="h-4 w-4 shrink-0 text-primary" />
          <p className="text-sm text-text-muted">
            {t('shippingNote')}
          </p>
        </div>
      )}
    </div>
  );
}
