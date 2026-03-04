'use client';

import { Product } from '@/types';
import { cn, formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cartStore';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
import { ShoppingCart, Eye } from 'lucide-react';
import { useState } from 'react';

const categoryGradients: Record<string, string> = {
  notebooks: 'from-[#8B5E1A] via-[#A0712A] to-[#5C3A12]',
  smartphones: 'from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]',
  printers: 'from-[#C8842D] via-[#B07326] to-[#8B5E1A]',
  accessories: 'from-[#E0A84C] via-[#D4993E] to-[#C8842D]',
};

interface ProductCardProps {
  product: Product;
  locale?: string;
}

export default function ProductCard({ product, locale }: ProductCardProps) {
  const t = useTranslations('products');
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const gradient = categoryGradients[product.category] || 'from-gray-400 via-gray-500 to-gray-600';
  const name = locale === 'de' ? (product.nameDE || product.name) : product.name;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:border-border-dark hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
        {/* Image Area */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-80`} />

          {/* Abstract product silhouette */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-3/4 w-3/4">
              <div className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-sm" />
              <div className="absolute inset-4 rounded-xl bg-white/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-white/30">
                  {product.brand?.charAt(0) || 'P'}
                </span>
              </div>
            </div>
          </div>

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-10">
              <Badge
                variant={
                  product.badge === 'sale'
                    ? 'destructive'
                    : product.badge === 'new'
                    ? 'default'
                    : 'secondary'
                }
              >
                {product.badge}
              </Badge>
            </div>
          )}

          {/* Quick view overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
            <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-text shadow-lg backdrop-blur-sm">
              <Eye className="h-4 w-4" />
              {t('quickView')}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          {/* Brand */}
          {product.brand && (
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text-muted">
              {product.brand}
            </p>
          )}

          {/* Name */}
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-text transition-colors group-hover:text-primary sm:text-base">
            {name}
          </h3>

          {/* Rating */}
          {product.rating !== undefined && (
            <div className="mt-2 flex items-center gap-2">
              <Rating value={product.rating} />
              {product.reviewCount !== undefined && (
                <span className="text-xs text-text-muted">
                  ({product.reviewCount})
                </span>
              )}
            </div>
          )}

          {/* Price + Add to Cart */}
          <div className="mt-3 flex items-end justify-between gap-2">
            <div>
              {product.originalPrice && product.originalPrice > product.price && (
                <p className="text-xs text-text-muted line-through">
                  {formatPrice(product.originalPrice)}
                </p>
              )}
              <p className="text-lg font-bold text-text">
                {formatPrice(product.price)}
              </p>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={cn(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300',
                isAdded
                  ? 'bg-success text-white scale-110'
                  : 'bg-primary/10 text-primary hover:bg-primary hover:text-white hover:scale-110'
              )}
              aria-label={t('addToCart')}
            >
              {isAdded ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <ShoppingCart className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
