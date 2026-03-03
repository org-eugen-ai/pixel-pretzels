'use client';

import { useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const SOCIAL_LINKS = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
] as const;

function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tHome = useTranslations('home');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="border-t border-border bg-surface" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-text">
              {t('company')}
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-text-muted transition-colors hover:text-primary"
                >
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-text-muted transition-colors hover:text-primary"
                >
                  {tNav('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-text">
              {t('customerService')}
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/shipping"
                  className="text-sm text-text-muted transition-colors hover:text-primary"
                >
                  {t('shipping')}
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-sm text-text-muted transition-colors hover:text-primary"
                >
                  {t('returns')}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-text-muted transition-colors hover:text-primary"
                >
                  {t('faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-text">
              {t('legal')}
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-text-muted transition-colors hover:text-primary"
                >
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-text-muted transition-colors hover:text-primary"
                >
                  {t('terms')}
                </Link>
              </li>
              <li>
                <Link
                  href="/impressum"
                  className="text-sm text-text-muted transition-colors hover:text-primary"
                >
                  {t('impressum')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-text">
              {tHome('newsletterTitle')}
            </h3>
            <p className="mb-4 text-sm text-text-muted">
              {tHome('newsletterDesc')}
            </p>
            {subscribed ? (
              <p className="text-sm font-medium text-success">
                Vielen Dank! / Thank you!
              </p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={tHome('newsletterPlaceholder')}
                  required
                  className={cn(
                    'flex-1 rounded-lg border border-border bg-white px-3 py-2 text-sm text-text',
                    'placeholder:text-text-muted',
                    'focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20',
                  )}
                />
                <button
                  type="submit"
                  className={cn(
                    'shrink-0 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white',
                    'transition-colors duration-150 hover:bg-accent-dark',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2',
                  )}
                >
                  {tHome('newsletterButton')}
                </button>
              </form>
            )}

            {/* Social media links */}
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-text">
                {t('followUs')}
              </p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-150',
                      'text-text-muted hover:bg-surface-dark hover:text-primary',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light/50',
                    )}
                    aria-label={social.name}
                  >
                    <social.icon size={18} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-2 border-t border-border pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-text-muted">
            {t('copyright')}
          </p>
          <p className="text-xs text-text-muted">
            {t('madeIn')}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
export { Footer };
