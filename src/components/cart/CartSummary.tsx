'use client';

import { useTranslations } from 'next-intl';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import Button from '@/components/ui/Button';
import { ShieldCheck, Truck } from 'lucide-react';

const FREE_SHIPPING_THRESHOLD = 4900; // 49.00 EUR in cents
const SHIPPING_COST = 499; // 4.99 EUR in cents

export default function CartSummary() {
  const t = useTranslations('cart');
  const { subtotal, tax } = useCartStore();

  const subtotalAmount = subtotal();
  const taxAmount = tax();
  const isFreeShipping = subtotalAmount >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = isFreeShipping ? 0 : SHIPPING_COST;
  const totalAmount = subtotalAmount + shippingCost;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
      <h2 className="text-lg font-bold text-gray-900 mb-6">
        {t('title')}
      </h2>

      <div className="space-y-3">
        {/* Subtotal */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">{t('subtotal')}</span>
          <span className="text-gray-900 font-medium">
            {formatPrice(subtotalAmount)}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">{t('shipping')}</span>
          <span
            className={
              isFreeShipping
                ? 'text-green-600 font-medium'
                : 'text-gray-900 font-medium'
            }
          >
            {isFreeShipping ? t('shippingFree') : formatPrice(shippingCost)}
          </span>
        </div>

        {/* Tax */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">{t('tax')}</span>
          <span className="text-gray-900 font-medium">
            {formatPrice(taxAmount)}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between">
            <span className="text-base font-bold text-gray-900">
              {t('total')}
            </span>
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(totalAmount)}
            </span>
          </div>
          <p className="text-xs text-gray-500 text-right mt-1">
            inkl. MwSt.
          </p>
        </div>
      </div>

      {/* Checkout Button */}
      <Link href="/checkout" className="block mt-6">
        <Button variant="primary" size="lg" className="w-full">
          {t('checkout')}
        </Button>
      </Link>

      {/* Trust Badges */}
      <div className="mt-6 space-y-2">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Truck className="w-4 h-4 text-gray-400" />
          <span>
            {isFreeShipping
              ? 'Kostenloser Versand'
              : `Noch ${formatPrice(FREE_SHIPPING_THRESHOLD - subtotalAmount)} bis zum kostenlosen Versand`}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <ShieldCheck className="w-4 h-4 text-gray-400" />
          <span>SSL-verschluesselte Zahlung</span>
        </div>
      </div>
    </div>
  );
}
