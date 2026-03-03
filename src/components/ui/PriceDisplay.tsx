import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';

type PriceSize = 'sm' | 'md' | 'lg';

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  size?: PriceSize;
  className?: string;
}

const sizeStyles: Record<PriceSize, { price: string; original: string; vat: string }> = {
  sm: { price: 'text-base font-semibold', original: 'text-sm', vat: 'text-[10px]' },
  md: { price: 'text-xl font-bold', original: 'text-base', vat: 'text-xs' },
  lg: { price: 'text-3xl font-bold', original: 'text-lg', vat: 'text-sm' },
};

function PriceDisplay({ price, originalPrice, size = 'md', className }: PriceDisplayProps) {
  const styles = sizeStyles[size];
  const hasDiscount = originalPrice !== undefined && originalPrice > price;

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex items-baseline gap-2">
        <span
          className={cn(
            styles.price,
            hasDiscount ? 'text-error' : 'text-text',
          )}
        >
          {formatPrice(price)}
        </span>
        {hasDiscount && (
          <span
            className={cn(
              styles.original,
              'text-text-muted line-through',
            )}
          >
            {formatPrice(originalPrice)}
          </span>
        )}
      </div>
      <span className={cn(styles.vat, 'text-text-muted')}>
        inkl. MwSt.
      </span>
    </div>
  );
}

export default PriceDisplay;
export { PriceDisplay };
export type { PriceDisplayProps, PriceSize };
