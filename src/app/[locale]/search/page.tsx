'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useDebounce } from '@/hooks/useDebounce';
import SearchResults from '@/components/search/SearchResults';
import Input from '@/components/ui/Input';
import { Search } from 'lucide-react';

export default function SearchPage() {
  const t = useTranslations('common');
  const tProducts = useTranslations('products');
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';

  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 300);

  // Sync with URL param changes
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery && urlQuery !== query) {
      setQuery(urlQuery);
    }
  }, [searchParams]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            {t('search')}
          </h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow"
              autoFocus
            />
          </div>
        </div>

        {/* Results */}
        <SearchResults query={debouncedQuery} />
      </div>
    </div>
  );
}
