'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { key: 'notebooks', href: '/products?category=notebooks' },
  { key: 'smartphones', href: '/products?category=smartphones' },
  { key: 'printers', href: '/products?category=printers' },
  { key: 'accessories', href: '/products?category=accessories' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] as const;

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocale: 'de' | 'en';
  onLocaleChange: (locale: 'de' | 'en') => void;
}

function MobileMenu({ isOpen, onClose, currentLocale, onLocaleChange }: MobileMenuProps) {
  const t = useTranslations('nav');

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-in panel */}
          <motion.nav
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-background pixel-grid shadow-xl"
            aria-label="Mobile navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <span className="text-lg font-bold text-primary">Pixel Pretzels</span>
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-150',
                  'text-text-muted hover:bg-surface-dark hover:text-text',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light/50',
                )}
                aria-label="Schliessen"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Navigation links */}
            <div className="flex-1 overflow-y-auto px-2 py-4">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={cn(
                        'flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-colors duration-150',
                        'text-text hover:bg-surface-dark hover:text-primary',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light/50',
                      )}
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Language switcher */}
            <div className="border-t border-border px-4 py-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
                Sprache / Language
              </p>
              <div className="flex gap-2">
                {(['de', 'en'] as const).map((locale) => (
                  <button
                    key={locale}
                    type="button"
                    onClick={() => {
                      onLocaleChange(locale);
                      onClose();
                    }}
                    className={cn(
                      'flex-1 rounded-lg py-2 text-sm font-semibold uppercase transition-colors duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light/50',
                      currentLocale === locale
                        ? 'bg-primary text-white'
                        : 'bg-surface text-text-muted hover:bg-surface-dark hover:text-text',
                    )}
                    aria-label={locale === 'de' ? 'Deutsch' : 'English'}
                    aria-pressed={currentLocale === locale}
                  >
                    {locale === 'de' ? 'Deutsch' : 'English'}
                  </button>
                ))}
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

export { MobileMenu };
export type { MobileMenuProps };
