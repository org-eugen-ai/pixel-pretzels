'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Button from '@/components/ui/Button';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';

interface OrderConfirmationProps {
  orderNumber: string;
}

export default function OrderConfirmation({
  orderNumber,
}: OrderConfirmationProps) {
  const t = useTranslations('checkout');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {t('orderConfirmed')}
      </h2>
      <p className="text-gray-600 mb-8">{t('orderThankYou')}</p>

      {/* Order Number */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8 inline-block mx-auto">
        <div className="flex items-center gap-3 justify-center">
          <Package className="w-5 h-5 text-amber-600" />
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
              {t('orderNumber')}
            </p>
            <p className="text-lg font-bold text-gray-900 font-mono">
              {orderNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Info */}
      <div className="text-sm text-gray-500 mb-8 max-w-md mx-auto space-y-2">
        <p>
          A confirmation email has been sent to your email address. You can
          track your order using the order number above.
        </p>
      </div>

      {/* Continue Shopping */}
      <Link href="/products">
        <Button variant="primary" size="lg">
          <span className="flex items-center gap-2">
            {t('continueShoppingBtn')}
            <ArrowRight className="w-4 h-4" />
          </span>
        </Button>
      </Link>
    </div>
  );
}
