'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, Globe } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useCartStore } from '@/stores/cartStore';
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';

const NAV_LINKS = [
  { key: 'notebooks', href: '/products?category=notebooks' },
  { key: 'smartphones', href: '/products?category=smartphones' },
  { key: 'printers', href: '/products?category=printers' },
  { key: 'accessories', href: '/products?category=accessories' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] as const;

const LOCALES = ['de', 'en'] as const;

function Header() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = useLocale() as 'de' | 'en';

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchInputRef = useRef<HTMLInputElement>(null);
  const debouncedSearch = useDebounce(searchQuery, 300);

  const totalItems = useCartStore((state) => state.totalItems());

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  // Handle search submission
  useEffect(() => {
    if (debouncedSearch.trim()) {
      // Search logic can be expanded later
    }
  }, [debouncedSearch]);

  const handleLocaleSwitch = (newLocale: 'de' | 'en') => {
    router.replace(pathname, { locale: newLocale });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-background shadow-sm shadow-primary/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-surface-dark lg:hidden"
              aria-label="Menu"
            >
              <Menu size={22} aria-hidden="true" />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold text-primary transition-colors hover:text-primary-light"
            >
              <span className="text-xl">Pixel Pretzels</span>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150',
                    'text-text hover:bg-surface-dark hover:text-primary',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light/50',
                  )}
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>

            {/* Right section: search, language, cart */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search toggle */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-150',
                  'hover:bg-surface-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light/50',
                  isSearchOpen && 'bg-surface-dark',
                )}
                aria-label={tCommon('search')}
                aria-expanded={isSearchOpen}
              >
                {isSearchOpen ? (
                  <X size={20} aria-hidden="true" />
                ) : (
                  <Search size={20} aria-hidden="true" />
                )}
              </button>

              {/* Language switcher */}
              <div className="hidden items-center rounded-lg border border-border sm:flex">
                {LOCALES.map((locale) => (
                  <button
                    key={locale}
                    type="button"
                    onClick={() => handleLocaleSwitch(locale)}
                    className={cn(
                      'px-2.5 py-1.5 text-xs font-semibold uppercase transition-colors duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-light/50',
                      locale === 'de' && 'rounded-l-lg',
                      locale === 'en' && 'rounded-r-lg',
                      currentLocale === locale
                        ? 'bg-primary text-white'
                        : 'text-text-muted hover:bg-surface-dark hover:text-text',
                    )}
                    aria-label={locale === 'de' ? 'Deutsch' : 'English'}
                    aria-pressed={currentLocale === locale}
                  >
                    {locale}
                  </button>
                ))}
              </div>

              {/* Mobile language icon */}
              <button
                type="button"
                onClick={() =>
                  handleLocaleSwitch(currentLocale === 'de' ? 'en' : 'de')
                }
                className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-surface-dark sm:hidden"
                aria-label={
                  currentLocale === 'de'
                    ? 'Switch to English'
                    : 'Auf Deutsch wechseln'
                }
              >
                <Globe size={20} aria-hidden="true" />
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                className={cn(
                  'relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-150',
                  'hover:bg-surface-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light/50',
                )}
                aria-label={`${t('cart')}${totalItems > 0 ? ` (${totalItems})` : ''}`}
              >
                <ShoppingCart size={20} aria-hidden="true" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search bar (expandable) */}
          {isSearchOpen && (
            <div className="border-t border-border pb-4 pt-3">
              <form onSubmit={handleSearchSubmit} role="search">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
                    aria-hidden="true"
                  />
                  <input
                    ref={searchInputRef}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={tCommon('searchPlaceholder')}
                    className={cn(
                      'w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-text',
                      'placeholder:text-text-muted',
                      'focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20',
                    )}
                  />
                </div>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16" aria-hidden="true" />

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentLocale={currentLocale}
        onLocaleChange={handleLocaleSwitch}
      />
    </>
  );
}

export default Header;
export { Header };
