'use client';

import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';

export default function NewsletterSignup() {
  const t = useTranslations('home');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary via-primary-dark to-[#5C3A12] py-16 sm:py-20">
      {/* Background decoration */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/5" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            <Mail className="h-4 w-4" />
            {t('newsletter.badge')}
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('newsletter.title')}
          </h2>
          <p className="mt-4 text-lg text-white/80">
            {t('newsletter.subtitle')}
          </p>

          {isSubmitted ? (
            <div className="mt-10 flex flex-col items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <p className="text-xl font-semibold text-white">
                {t('newsletter.success')}
              </p>
              <p className="text-white/70">
                {t('newsletter.successDetail')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <div className="relative flex-1 sm:max-w-md">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('newsletter.placeholder')}
                    required
                    className="h-12 w-full rounded-xl border-2 border-white/20 bg-white pl-12 pr-4 text-text shadow-lg placeholder:text-text-light focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30 sm:h-14 sm:text-lg"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 sm:h-14"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      {t('newsletter.submitting')}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {t('newsletter.subscribe')}
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </div>
              <p className="mt-4 text-sm text-white/60">
                {t('newsletter.privacy')}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
