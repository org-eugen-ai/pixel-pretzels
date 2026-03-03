'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useCartStore } from '@/stores/cartStore';
import { Link } from '@/i18n/navigation';
import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import ShippingForm from '@/components/checkout/ShippingForm';
import PaymentForm from '@/components/checkout/PaymentForm';
import OrderReview from '@/components/checkout/OrderReview';
import OrderConfirmation from '@/components/checkout/OrderConfirmation';
import Button from '@/components/ui/Button';
import { ShoppingCart } from 'lucide-react';
import type { ShippingAddress } from '@/types';

type PaymentMethod = 'credit-card' | 'paypal' | 'bank-transfer';

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const tCart = useTranslations('cart');
  const { items, clearCart } = useCartStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(
    null
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [orderNumber, setOrderNumber] = useState<string>('');

  const steps = [
    { label: t('shipping') },
    { label: t('payment') },
    { label: t('review') },
    { label: t('confirmation') },
  ];

  const handleShippingSubmit = (address: ShippingAddress) => {
    setShippingAddress(address);
    setCurrentStep(1);
  };

  const handlePaymentSubmit = (method: PaymentMethod) => {
    setPaymentMethod(method);
    setCurrentStep(2);
  };

  const handlePlaceOrder = () => {
    // Generate mock order number
    const mockOrderNumber = `PP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setOrderNumber(mockOrderNumber);
    clearCart();
    setCurrentStep(3);
  };

  // Empty cart and not on confirmation step
  if (items.length === 0 && currentStep < 3) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <div className="flex flex-col items-center justify-center text-center py-20">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <ShoppingCart className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              {tCart('empty')}
            </h1>
            <p className="text-gray-500 max-w-md mb-8">
              {tCart('emptyDesc')}
            </p>
            <Link href="/products">
              <Button variant="primary" size="lg">
                {tCart('continueShopping')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('title')}</h1>

        {/* Stepper */}
        <CheckoutSteps currentStep={currentStep} steps={steps} />

        {/* Step Content */}
        <div className="mt-8">
          {currentStep === 0 && (
            <ShippingForm
              onSubmit={handleShippingSubmit}
              initialValues={shippingAddress}
            />
          )}

          {currentStep === 1 && (
            <PaymentForm
              onSubmit={handlePaymentSubmit}
              onBack={() => setCurrentStep(0)}
              initialMethod={paymentMethod}
            />
          )}

          {currentStep === 2 && shippingAddress && paymentMethod && (
            <OrderReview
              items={items}
              shippingAddress={shippingAddress}
              paymentMethod={paymentMethod}
              onSubmit={handlePlaceOrder}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <OrderConfirmation orderNumber={orderNumber} />
          )}
        </div>
      </div>
    </div>
  );
}
