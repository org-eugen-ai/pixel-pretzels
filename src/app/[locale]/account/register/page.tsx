'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const t = useTranslations('account');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Required';
    if (!email.trim()) newErrors.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Invalid email';
    if (!password.trim()) newErrors.password = 'Required';
    else if (password.length < 8)
      newErrors.password = 'Min. 8 characters';
    if (!confirmPassword.trim()) newErrors.confirmPassword = 'Required';
    else if (password !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    if (!agreeTerms) newErrors.agreeTerms = 'Required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Mock registration - no real auth
      alert('Registration functionality is not implemented in this demo.');
    }
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-6 h-6 text-amber-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t('register')}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Pixel Pretzels
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={t('name')}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clearError('name');
              }}
              error={errors.name}
              placeholder="Max Mustermann"
              required
            />

            <Input
              label={t('email')}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError('email');
              }}
              error={errors.email}
              placeholder="name@example.com"
              required
            />

            <Input
              label={t('password')}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearError('password');
              }}
              error={errors.password}
              placeholder="Min. 8 characters"
              required
            />

            <Input
              label={t('confirmPassword')}
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                clearError('confirmPassword');
              }}
              error={errors.confirmPassword}
              placeholder="Repeat password"
              required
            />

            {/* Terms */}
            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    clearError('agreeTerms');
                  }}
                  className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500 mt-0.5"
                />
                <span className="text-sm text-gray-600">
                  {t('agreeTerms')}
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-xs text-red-500 mt-1">{errors.agreeTerms}</p>
              )}
            </div>

            {/* Submit */}
            <Button type="submit" variant="primary" size="lg" className="w-full">
              {t('registerButton')}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              {t('hasAccount')}{' '}
              <Link
                href="/account/login"
                className="text-amber-700 hover:text-amber-800 font-medium"
              >
                {t('login')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
