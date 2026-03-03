'use client';

import { useTranslations } from 'next-intl';
import { useCartStore } from '@/stores/cartStore';
import { Link } from '@/i18n/navigation';
import CartItemRow from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { ShoppingCart } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CartPage() {
  const t = useTranslations('cart');
  const { items } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <div className="flex flex-col items-center justify-center text-center py-20">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <ShoppingCart className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              {t('empty')}
            </h1>
            <p className="text-gray-500 max-w-md mb-8">
              {t('emptyDesc')}
            </p>
            <Link href="/products">
              <Button variant="primary" size="lg">
                {t('continueShopping')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('title')}</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
              {items.map((item) => (
                <CartItemRow key={item.product.id} item={item} />
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/products"
                className="text-amber-700 hover:text-amber-800 text-sm font-medium inline-flex items-center gap-1"
              >
                &larr; {t('continueShopping')}
              </Link>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="w-full lg:w-96 shrink-0">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
