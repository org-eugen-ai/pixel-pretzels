import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type RatingSize = 'sm' | 'md' | 'lg';

interface RatingProps {
  value: number;
  max?: number;
  size?: RatingSize;
  className?: string;
}

const sizeMap: Record<RatingSize, { icon: number; text: string }> = {
  sm: { icon: 14, text: 'text-xs' },
  md: { icon: 18, text: 'text-sm' },
  lg: { icon: 22, text: 'text-base' },
};

function Rating({ value, max = 5, size = 'md', className }: RatingProps) {
  const { icon: iconSize, text: textSize } = sizeMap[size];
  const clampedValue = Math.min(Math.max(value, 0), max);

  const stars = Array.from({ length: max }, (_, index) => {
    const starIndex = index + 1;
    const isFull = clampedValue >= starIndex;
    const isHalf = !isFull && clampedValue >= starIndex - 0.5;

    return (
      <span key={index} className="relative inline-block" style={{ width: iconSize, height: iconSize }}>
        {/* Empty star (background) */}
        <Star
          size={iconSize}
          className="absolute inset-0 text-border-dark"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        {/* Full star */}
        {isFull && (
          <Star
            size={iconSize}
            className="absolute inset-0 fill-accent text-accent"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        )}
        {/* Half star */}
        {isHalf && (
          <span
            className="absolute inset-0 overflow-hidden"
            style={{ width: iconSize / 2 }}
            aria-hidden="true"
          >
            <Star
              size={iconSize}
              className="fill-accent text-accent"
              strokeWidth={1.5}
            />
          </span>
        )}
      </span>
    );
  });

  return (
    <div
      className={cn('inline-flex items-center gap-1', className)}
      role="img"
      aria-label={`${clampedValue} out of ${max} stars`}
    >
      <span className="inline-flex items-center gap-0.5">{stars}</span>
      <span className={cn('font-medium text-text-muted', textSize)}>
        {clampedValue.toFixed(1)}
      </span>
    </div>
  );
}

export default Rating;
export { Rating };
export type { RatingProps, RatingSize };
