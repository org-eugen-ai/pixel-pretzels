'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { useFilterStore } from '@/stores/filterStore';
import { Category, Product } from '@/types';
import { Button } from '@/components/ui/Button';
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border pb-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-2 text-left"
      >
        <span className="text-sm font-semibold uppercase tracking-wider text-text">
          {title}
        </span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-text-muted" />
        ) : (
          <ChevronDown className="h-4 w-4 text-text-muted" />
        )}
      </button>
      {isOpen && <div className="mt-3">{children}</div>}
    </div>
  );
}

export default function ProductFilters() {
  const t = useTranslations('products');
  const {
    categories: selectedCategories,
    brands: selectedBrands,
    priceRange,
    setCategories,
    setBrands,
    setPriceRange,
    resetFilters,
  } = useFilterStore();

  const handleToggleCategory = (slug: string) => {
    if (selectedCategories.includes(slug as import('@/types').CategorySlug)) {
      setCategories(selectedCategories.filter((c) => c !== slug) as import('@/types').CategorySlug[]);
    } else {
      setCategories([...selectedCategories, slug as import('@/types').CategorySlug]);
    }
  };

  const handleToggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setBrands([...selectedBrands, brand]);
    }
  };

  const clearFilters = () => resetFilters();

  const [mobileOpen, setMobileOpen] = useState(false);

  // Extract unique brands from products
  const brands = useMemo(() => {
    const brandSet = new Set<string>();
    products.forEach((p: Product) => {
      if (p.brand) brandSet.add(p.brand);
    });
    return Array.from(brandSet).sort();
  }, []);

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    priceRange !== null;

  const filterContent = (
    <div className="space-y-5">
      {/* Header with clear button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-text" />
          <h3 className="text-lg font-bold text-text">{t('filters.title')}</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            {t('filters.clear')}
          </button>
        )}
      </div>

      {/* Category Filter */}
      <FilterSection title={t('filters.categories')}>
        <div className="space-y-2">
          {categories.map((category: Category) => (
            <button
              type="button"
              key={category.slug}
              onClick={() => handleToggleCategory(category.slug)}
              className="group flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-surface"
            >
              <div
                className={cn(
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200',
                  selectedCategories.includes(category.slug)
                    ? 'border-primary bg-primary'
                    : 'border-border-dark group-hover:border-primary/50'
                )}
              >
                {selectedCategories.includes(category.slug) && (
                  <svg
                    className="h-3 w-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm text-text">{category.name}</span>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Brand Filter */}
      <FilterSection title={t('filters.brands')}>
        <div className="max-h-48 space-y-2 overflow-y-auto">
          {brands.map((brand) => (
            <button
              type="button"
              key={brand}
              onClick={() => handleToggleBrand(brand)}
              className="group flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-surface"
            >
              <div
                className={cn(
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200',
                  selectedBrands.includes(brand)
                    ? 'border-primary bg-primary'
                    : 'border-border-dark group-hover:border-primary/50'
                )}
              >
                {selectedBrands.includes(brand) && (
                  <svg
                    className="h-3 w-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm text-text">{brand}</span>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title={t('filters.priceRange')}>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-text-muted">
                {t('filters.min')}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-muted">
                  &euro;
                </span>
                <input
                  type="number"
                  min={0}
                  placeholder="0"
                  value={priceRange?.min ?? ''}
                  onChange={(e) => {
                    const min = e.target.value ? Number(e.target.value) : 0;
                    const max = priceRange?.max ?? 9999;
                    if (!e.target.value && !priceRange?.max) {
                      setPriceRange(null);
                    } else {
                      setPriceRange({ min, max });
                    }
                  }}
                  className="h-10 w-full rounded-lg border border-border bg-background pl-7 pr-3 text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs text-text-muted">
                {t('filters.max')}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-muted">
                  &euro;
                </span>
                <input
                  type="number"
                  min={0}
                  placeholder="9999"
                  value={priceRange?.max ?? ''}
                  onChange={(e) => {
                    const max = e.target.value ? Number(e.target.value) : 9999;
                    const min = priceRange?.min ?? 0;
                    if (!e.target.value && !priceRange?.min) {
                      setPriceRange(null);
                    } else {
                      setPriceRange({ min, max });
                    }
                  }}
                  className="h-10 w-full rounded-lg border border-border bg-background pl-7 pr-3 text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>
        </div>
      </FilterSection>
    </div>
  );

  return (
    <>
      {/* Mobile filter toggle */}
      <div className="lg:hidden">
        <Button
          onClick={() => setMobileOpen(true)}
          variant="outline"
          className="w-full"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          {t('filters.title')}
          {hasActiveFilters && (
            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
              {selectedCategories.length + selectedBrands.length}
            </span>
          )}
        </Button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-background p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-text">{t('filters.title')}</h2>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-text-muted hover:text-text"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {filterContent}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  clearFilters();
                  setMobileOpen(false);
                }}
              >
                {t('filters.clear')}
              </Button>
              <Button onClick={() => setMobileOpen(false)}>
                {t('filters.apply')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-border bg-background p-6">
          {filterContent}
        </div>
      </div>
    </>
  );
}
