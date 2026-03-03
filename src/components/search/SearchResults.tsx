'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { products } from '@/data/products';
import ProductGrid from '@/components/product/ProductGrid';
import { Link } from '@/i18n/navigation';
import { SearchX, ArrowRight } from 'lucide-react';
import type { Product } from '@/types';

interface SearchResultsProps {
  query: string;
}

export default function SearchResults({ query }: SearchResultsProps) {
  const t = useTranslations('common');
  const tProducts = useTranslations('products');
  const tNav = useTranslations('nav');

  const results: Product[] = useMemo(() => {
    if (!query || query.length < 2) return [];

    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.nameDE.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.descriptionDE.toLowerCase().includes(q)
    );
  }, [query]);

  // No query yet
  if (!query || query.length < 2) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 text-lg">
          {t('searchPlaceholder')}
        </p>
      </div>
    );
  }

  // No results
  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-7 h-7 text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {t('noResults')}
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          No products found for &quot;{query}&quot;. Try a different search term or browse
          our categories.
        </p>

        {/* Category suggestions */}
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/category/notebooks"
            className="inline-flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-amber-300 hover:text-amber-700 transition-colors"
          >
            {tNav('notebooks')}
            <ArrowRight className="w-3 h-3" />
          </Link>
          <Link
            href="/category/smartphones"
            className="inline-flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-amber-300 hover:text-amber-700 transition-colors"
          >
            {tNav('smartphones')}
            <ArrowRight className="w-3 h-3" />
          </Link>
          <Link
            href="/category/printers"
            className="inline-flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-amber-300 hover:text-amber-700 transition-colors"
          >
            {tNav('printers')}
            <ArrowRight className="w-3 h-3" />
          </Link>
          <Link
            href="/category/accessories"
            className="inline-flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-amber-300 hover:text-amber-700 transition-colors"
          >
            {tNav('accessories')}
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    );
  }

  // Results found
  return (
    <div>
      <p className="text-sm text-gray-600 mb-6">
        {tProducts('showingResults', { count: results.length })}
        {' '}
        <span className="text-gray-400">
          for &quot;{query}&quot;
        </span>
      </p>
      <ProductGrid products={results} locale="de" />
    </div>
  );
}
