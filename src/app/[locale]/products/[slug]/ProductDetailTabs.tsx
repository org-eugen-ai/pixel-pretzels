'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ProductSpecs from '@/components/product/ProductSpecs';
import ProductReviews from '@/components/product/ProductReviews';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductDetailTabsProps {
  description: string;
  specs: { label: string; value: string }[];
  product: Product;
  locale: string;
}

export default function ProductDetailTabs({
  description,
  specs,
  product,
  locale,
}: ProductDetailTabsProps) {
  const t = useTranslations('products');
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>(
    'description'
  );

  const tabs = [
    { key: 'description' as const, label: t('description') },
    { key: 'specs' as const, label: t('specifications') },
    { key: 'reviews' as const, label: t('reviewsCount', { count: product.reviewCount }) },
  ];

  return (
    <div>
      {/* Tab Headers */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'pb-4 text-sm font-medium border-b-2 transition-colors',
                activeTab === tab.key
                  ? 'border-amber-600 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {activeTab === 'description' && (
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p>{description}</p>
          </div>
        )}

        {activeTab === 'specs' && (
          <ProductSpecs specs={specs} />
        )}

        {activeTab === 'reviews' && (
          <ProductReviews product={product} />
        )}
      </div>
    </div>
  );
}
