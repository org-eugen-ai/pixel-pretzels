'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import type { ShippingAddress } from '@/types';

interface ShippingFormProps {
  onSubmit: (address: ShippingAddress) => void;
  initialValues?: ShippingAddress | null;
}

const COUNTRIES = [
  { value: 'DE', label: 'Deutschland' },
  { value: 'AT', label: 'Oesterreich' },
  { value: 'CH', label: 'Schweiz' },
  { value: 'NL', label: 'Niederlande' },
  { value: 'BE', label: 'Belgien' },
  { value: 'FR', label: 'Frankreich' },
  { value: 'IT', label: 'Italien' },
  { value: 'ES', label: 'Spanien' },
  { value: 'PL', label: 'Polen' },
  { value: 'GB', label: 'Vereinigtes Koenigreich' },
];

export default function ShippingForm({
  onSubmit,
  initialValues,
}: ShippingFormProps) {
  const t = useTranslations('checkout');

  const [formData, setFormData] = useState<ShippingAddress>(
    initialValues ?? {
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      postalCode: '',
      country: 'DE',
      email: '',
      phone: '',
    }
  );

  const [errors, setErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingAddress, string>> = {};

    if (!formData.firstName.trim()) newErrors.firstName = t('required');
    if (!formData.lastName.trim()) newErrors.lastName = t('required');
    if (!formData.street.trim()) newErrors.street = t('required');
    if (!formData.city.trim()) newErrors.city = t('required');
    if (!formData.postalCode.trim()) newErrors.postalCode = t('required');
    if (!formData.country.trim()) newErrors.country = t('required');
    if (!formData.email.trim()) {
      newErrors.email = t('required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!formData.phone.trim()) newErrors.phone = t('required');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof ShippingAddress, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {t('shippingAddress')}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label={t('firstName')}
          value={formData.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          error={errors.firstName}
          required
        />
        <Input
          label={t('lastName')}
          value={formData.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
          error={errors.lastName}
          required
        />
        <div className="sm:col-span-2">
          <Input
            label={t('street')}
            value={formData.street}
            onChange={(e) => handleChange('street', e.target.value)}
            error={errors.street}
            required
          />
        </div>
        <Input
          label={t('postalCode')}
          value={formData.postalCode}
          onChange={(e) => handleChange('postalCode', e.target.value)}
          error={errors.postalCode}
          required
        />
        <Input
          label={t('city')}
          value={formData.city}
          onChange={(e) => handleChange('city', e.target.value)}
          error={errors.city}
          required
        />
        <div className="sm:col-span-2">
          <Select
            label={t('country')}
            value={formData.country}
            onChange={(e) => handleChange('country', e.target.value)}
            error={errors.country}
            options={COUNTRIES}
            required
          />
        </div>
        <Input
          label={t('email')}
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          required
        />
        <Input
          label={t('phone')}
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          error={errors.phone}
          required
        />
      </div>

      <div className="mt-8 flex justify-end">
        <Button type="submit" variant="primary" size="lg">
          {t('next')}
        </Button>
      </div>
    </form>
  );
}
