'use client';

import { useTranslations } from 'next-intl';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import QuantitySelector from '@/components/ui/QuantitySelector';
import { Trash2, Package } from 'lucide-react';
import type { CartItem } from '@/types';

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const t = useTranslations('cart');
  const { updateQuantity, removeItem } = useCartStore();

  const { product, quantity } = item;
  const lineTotal = product.price * quantity;

  return (
    <div className="flex items-start gap-4 p-6">
      {/* Product Image Placeholder */}
      <Link
        href={`/products/${product.slug}`}
        className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden"
      >
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Package className="w-8 h-8 text-gray-400" />
        )}
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              href={`/products/${product.slug}`}
              className="text-gray-900 font-medium hover:text-amber-700 transition-colors line-clamp-2"
            >
              {product.name}
            </Link>
            <p className="text-sm text-gray-500 mt-0.5">{product.brand}</p>
            <p className="text-sm text-gray-600 mt-1">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Line Total */}
          <p className="text-lg font-semibold text-gray-900 whitespace-nowrap">
            {formatPrice(lineTotal)}
          </p>
        </div>

        {/* Quantity + Remove */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{t('quantity')}:</span>
            <QuantitySelector
              value={quantity}
              onChange={(newQty) => updateQuantity(product.id, newQty)}
              min={1}
              max={99}
            />
          </div>

          <button
            onClick={() => removeItem(product.id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
            aria-label={t('remove')}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
