'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import {
  Send,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Clock,
} from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contact');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSent, setIsSent] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email';
    if (!formData.subject.trim()) newErrors.subject = 'Required';
    if (!formData.message.trim()) newErrors.message = 'Required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSent(true);
    }
  };

  const handleChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            {isSent ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {t('sent')}
                </h2>
                <p className="text-gray-600">{t('sentDesc')}</p>
                <button
                  onClick={() => {
                    setIsSent(false);
                    setFormData({
                      name: '',
                      email: '',
                      subject: '',
                      message: '',
                    });
                  }}
                  className="mt-6 text-amber-700 hover:text-amber-800 font-medium text-sm"
                >
                  &larr; Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label={t('name')}
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      error={errors.name}
                      required
                    />
                    <Input
                      label={t('email')}
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      error={errors.email}
                      required
                    />
                  </div>

                  <Input
                    label={t('subject')}
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    error={errors.subject}
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t('message')} *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        handleChange('message', e.target.value)
                      }
                      rows={6}
                      className={`w-full px-3 py-2.5 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow resize-none ${
                        errors.message
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-gray-200'
                      }`}
                      required
                    />
                    {errors.message && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      {t('send')}
                    </span>
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar - Business Info */}
          <div className="space-y-6">
            {/* Address */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-gray-900">{t('address')}</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pixel Pretzels GmbH
                <br />
                Musterstrasse 42
                <br />
                74072 Heilbronn
                <br />
                Germany
              </p>
            </div>

            {/* Phone & Email */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Phone className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Telefon
                    </span>
                  </div>
                  <a
                    href={`tel:${t('phoneNumber')}`}
                    className="text-sm text-amber-700 hover:text-amber-800"
                  >
                    {t('phoneNumber')}
                  </a>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-medium text-gray-700">
                      E-Mail
                    </span>
                  </div>
                  <a
                    href={`mailto:${t('emailAddress')}`}
                    className="text-sm text-amber-700 hover:text-amber-800"
                  >
                    {t('emailAddress')}
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-gray-900">
                  {t('businessHours')}
                </h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1.5">
                <li>{t('mondayFriday')}</li>
                <li>{t('saturday')}</li>
                <li>{t('sunday')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
