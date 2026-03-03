'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useDebounce } from '@/hooks/useDebounce';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { Link, useRouter } from '@/i18n/navigation';
import { Search, X } from 'lucide-react';
import type { Product } from '@/types';

export default function SearchBar() {
  const t = useTranslations('common');
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Search results (max 5)
  const results: Product[] =
    debouncedQuery.length >= 2
      ? products
          .filter((p) => {
            const q = debouncedQuery.toLowerCase();
            return (
              p.name.toLowerCase().includes(q) ||
              p.nameDE.toLowerCase().includes(q) ||
              p.brand.toLowerCase().includes(q) ||
              p.description.toLowerCase().includes(q) ||
              p.descriptionDE.toLowerCase().includes(q)
            );
          })
          .slice(0, 5)
      : [];

  const showDropdown = isFocused && debouncedQuery.length >= 2;

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleResultClick = () => {
    setQuery('');
    setIsFocused(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={t('searchPlaceholder')}
          className="w-full pl-10 pr-8 py-2 bg-gray-100 border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white focus:border-transparent transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
          {results.length > 0 ? (
            <>
              <ul className="divide-y divide-gray-100">
                {results.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={handleResultClick}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                        {product.images[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Search className="w-4 h-4 text-gray-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">{product.brand}</p>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                        {formatPrice(product.price)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-100">
                <Link
                  href={`/search?q=${encodeURIComponent(query.trim())}`}
                  onClick={handleResultClick}
                  className="flex items-center justify-center gap-2 p-3 text-sm text-amber-700 hover:bg-amber-50 font-medium transition-colors"
                >
                  {t('viewAll')}
                  <span>&rarr;</span>
                </Link>
              </div>
            </>
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              {t('noResults')}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
