'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import ProductGrid from '@/components/product/ProductGrid';
import ProductSort from '@/components/product/ProductSort';
import type { Product } from '@/types';

type SortBy = 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

interface CategoryPageClientProps {
  products: Product[];
  locale: string;
}

export default function CategoryPageClient({
  products,
  locale,
}: CategoryPageClientProps) {
  const t = useTranslations('products');
  const [sortBy, setSortBy] = useState<SortBy>('relevance');

  const sortedProducts = useMemo(() => {
    const result = [...products];

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [products, sortBy]);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <p className="text-sm text-gray-600">
          {t('showingResults', { count: sortedProducts.length })}
        </p>
        <ProductSort />
      </div>

      {sortedProducts.length > 0 ? (
        <ProductGrid products={sortedProducts} locale={locale} />
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">{t('noProducts')}</p>
        </div>
      )}
    </>
  );
}
