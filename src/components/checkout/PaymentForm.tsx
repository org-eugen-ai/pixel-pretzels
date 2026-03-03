'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { CreditCard, Building2, Wallet } from 'lucide-react';

type PaymentMethod = 'credit-card' | 'paypal' | 'bank-transfer';

interface PaymentFormProps {
  onSubmit: (method: PaymentMethod) => void;
  onBack: () => void;
  initialMethod?: PaymentMethod | null;
}

const paymentMethods = [
  {
    id: 'credit-card' as const,
    icon: CreditCard,
    translationKey: 'creditCard' as const,
  },
  {
    id: 'paypal' as const,
    icon: Wallet,
    translationKey: 'paypal' as const,
  },
  {
    id: 'bank-transfer' as const,
    icon: Building2,
    translationKey: 'bankTransfer' as const,
  },
];

export default function PaymentForm({
  onSubmit,
  onBack,
  initialMethod,
}: PaymentFormProps) {
  const t = useTranslations('checkout');

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(
    initialMethod ?? 'credit-card'
  );
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (selectedMethod === 'credit-card') {
      if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = t('required');
      }
      if (!expiry.trim() || !/^\d{2}\/\d{2}$/.test(expiry)) {
        newErrors.expiry = 'MM/YY';
      }
      if (!cvv.trim() || cvv.length < 3) {
        newErrors.cvv = t('required');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(selectedMethod);
    }
  };

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length > 2) {
      return digits.slice(0, 2) + '/' + digits.slice(2);
    }
    return digits;
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {t('paymentMethod')}
      </h2>

      {/* Payment Method Selection */}
      <div className="space-y-3 mb-6">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <label
              key={method.id}
              className={cn(
                'flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors',
                isSelected
                  ? 'border-amber-600 bg-amber-50'
                  : 'border-gray-200 hover:border-gray-300'
              )}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={isSelected}
                onChange={() => setSelectedMethod(method.id)}
                className="sr-only"
              />
              <div
                className={cn(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                  isSelected ? 'border-amber-600' : 'border-gray-300'
                )}
              >
                {isSelected && (
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                )}
              </div>
              <Icon
                className={cn(
                  'w-5 h-5',
                  isSelected ? 'text-amber-600' : 'text-gray-400'
                )}
              />
              <span
                className={cn(
                  'font-medium',
                  isSelected ? 'text-amber-800' : 'text-gray-700'
                )}
              >
                {t(method.translationKey)}
              </span>
            </label>
          );
        })}
      </div>

      {/* Credit Card Fields */}
      {selectedMethod === 'credit-card' && (
        <div className="space-y-4 mt-6 p-4 bg-gray-50 rounded-lg">
          <Input
            label={t('cardNumber')}
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            placeholder="1234 5678 9012 3456"
            error={errors.cardNumber}
            maxLength={19}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t('expiry')}
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              error={errors.expiry}
              maxLength={5}
            />
            <Input
              label={t('cvv')}
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="123"
              error={errors.cvv}
              maxLength={4}
              type="password"
            />
          </div>
        </div>
      )}

      {/* PayPal Info */}
      {selectedMethod === 'paypal' && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            You will be redirected to PayPal to complete your payment after
            reviewing your order.
          </p>
        </div>
      )}

      {/* Bank Transfer Info */}
      {selectedMethod === 'bank-transfer' && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            You will receive our bank details via email after placing your
            order. Please transfer the total amount within 7 days.
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onBack}
        >
          {t('back')}
        </Button>
        <Button type="submit" variant="primary" size="lg">
          {t('next')}
        </Button>
      </div>
    </form>
  );
}
