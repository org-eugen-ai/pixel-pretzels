'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { Package, MapPin, CreditCard, Loader2 } from 'lucide-react';
import type { CartItem, ShippingAddress } from '@/types';

type PaymentMethod = 'credit-card' | 'paypal' | 'bank-transfer';

interface OrderReviewProps {
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  onSubmit: () => void;
  onBack: () => void;
}

const FREE_SHIPPING_THRESHOLD = 4900;
const SHIPPING_COST = 499;

export default function OrderReview({
  items,
  shippingAddress,
  paymentMethod,
  onSubmit,
  onBack,
}: OrderReviewProps) {
  const t = useTranslations('checkout');
  const tCart = useTranslations('cart');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = isFreeShipping ? 0 : SHIPPING_COST;
  const tax = Math.round(subtotal - subtotal / 1.19);
  const total = subtotal + shipping;

  const paymentMethodLabels: Record<PaymentMethod, string> = {
    'credit-card': t('creditCard'),
    paypal: t('paypal'),
    'bank-transfer': t('bankTransfer'),
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onSubmit();
  };

  return (
    <div className="space-y-6">
      {/* Items */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-bold text-gray-900">{tCart('title')}</h3>
        </div>
        <ul className="divide-y divide-gray-100">
          {items.map((item) => (
            <li
              key={item.product.id}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                  {item.product.images[0] ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {tCart('quantity')}: {item.quantity}
                  </p>
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {formatPrice(item.product.price * item.quantity)}
              </p>
            </li>
          ))}
        </ul>

        {/* Totals */}
        <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{tCart('subtotal')}</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{tCart('shipping')}</span>
            <span className={isFreeShipping ? 'text-green-600 font-medium' : 'font-medium'}>
              {isFreeShipping ? tCart('shippingFree') : formatPrice(shipping)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{tCart('tax')}</span>
            <span className="font-medium">{formatPrice(tax)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-100">
            <span className="text-base font-bold text-gray-900">
              {tCart('total')}
            </span>
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-bold text-gray-900">
            {t('shippingAddress')}
          </h3>
        </div>
        <address className="text-sm text-gray-700 not-italic space-y-1">
          <p className="font-medium">
            {shippingAddress.firstName} {shippingAddress.lastName}
          </p>
          <p>{shippingAddress.street}</p>
          <p>
            {shippingAddress.postalCode} {shippingAddress.city}
          </p>
          <p>{shippingAddress.country}</p>
          <p className="pt-2">{shippingAddress.email}</p>
          <p>{shippingAddress.phone}</p>
        </address>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-bold text-gray-900">
            {t('paymentMethod')}
          </h3>
        </div>
        <p className="text-sm text-gray-700 font-medium">
          {paymentMethodLabels[paymentMethod]}
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onBack}
          disabled={isSubmitting}
        >
          {t('back')}
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={handlePlaceOrder}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              {t('placeOrder')}...
            </span>
          ) : (
            t('placeOrder')
          )}
        </Button>
      </div>
    </div>
  );
}
