'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { products } from '@/data/products';
import { useFilterStore } from '@/stores/filterStore';
import ProductGrid from '@/components/product/ProductGrid';
import ProductFilters from '@/components/product/ProductFilters';
import ProductSort from '@/components/product/ProductSort';
import type { Product } from '@/types';

interface ProductsPageClientProps {
  locale: string;
}

export default function ProductsPageClient({ locale }: ProductsPageClientProps) {
  const t = useTranslations('products');
  const { categories, brands, priceRange, sortBy } = useFilterStore();

  const filteredProducts = useMemo(() => {
    let result: Product[] = [...products];

    // Filter by categories
    if (categories.length > 0) {
      result = result.filter((p) => categories.includes(p.category));
    }

    // Filter by brands
    if (brands.length > 0) {
      result = result.filter((p) => brands.includes(p.brand));
    }

    // Filter by price range
    if (priceRange) {
      result = result.filter(
        (p) => p.price >= priceRange.min && p.price <= priceRange.max
      );
    }

    // Sort
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
        // relevance — featured first
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [categories, brands, priceRange, sortBy]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Sidebar */}
      <aside className="w-full lg:w-64 shrink-0">
        <ProductFilters />
      </aside>

      {/* Products Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <p className="text-sm text-gray-600">
            {t('showingResults', { count: filteredProducts.length })}
          </p>
          <ProductSort />
        </div>

        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} locale={locale} />
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">{t('noProducts')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
