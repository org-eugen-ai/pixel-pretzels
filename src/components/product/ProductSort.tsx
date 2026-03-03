'use client';

import { useTranslations } from 'next-intl';
import { useFilterStore } from '@/stores/filterStore';
import { ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const sortOptions = [
  { value: 'relevance', labelKey: 'sort.relevance' },
  { value: 'price-asc', labelKey: 'sort.priceAsc' },
  { value: 'price-desc', labelKey: 'sort.priceDesc' },
  { value: 'rating', labelKey: 'sort.rating' },
  { value: 'newest', labelKey: 'sort.newest' },
] as const;

export type SortOption = (typeof sortOptions)[number]['value'];

export default function ProductSort() {
  const t = useTranslations('products');
  const { sortBy, setSortBy } = useFilterStore();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5 text-sm text-text-muted">
        <ArrowUpDown className="h-4 w-4" />
        <span className="hidden sm:inline">{t('sort.label')}</span>
      </div>
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className={cn(
            'h-10 appearance-none rounded-lg border border-border bg-background pl-4 pr-10 text-sm font-medium text-text',
            'cursor-pointer transition-all duration-200',
            'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
            'hover:border-border-dark'
          )}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {t(option.labelKey)}
            </option>
          ))}
        </select>
        {/* Custom dropdown arrow */}
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          <svg
            className="h-4 w-4 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
