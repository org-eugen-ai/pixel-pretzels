'use client';

import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  disabled?: boolean;
  className?: string;
}

function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
  disabled = false,
  className,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (!disabled && value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (!disabled && value < max) {
      onChange(value + 1);
    }
  };

  const btnSize = size === 'sm' ? 'h-7 w-7' : 'h-9 w-9';
  const spanSize = size === 'sm' ? 'h-7 min-w-[2rem] text-xs' : 'h-9 min-w-[2.5rem] text-sm';

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-lg border border-border',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        aria-label="Menge verringern"
        className={cn(
          'flex items-center justify-center rounded-l-lg transition-colors duration-150',
          btnSize,
          'hover:bg-surface-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-light/50',
          'disabled:cursor-not-allowed disabled:opacity-40',
        )}
      >
        <Minus size={size === 'sm' ? 14 : 16} aria-hidden="true" />
      </button>
      <span
        className={cn(
          'flex items-center justify-center border-x border-border px-2 font-medium tabular-nums text-text',
          spanSize,
        )}
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        aria-label="Menge erhoehen"
        className={cn(
          'flex items-center justify-center rounded-r-lg transition-colors duration-150',
          btnSize,
          'hover:bg-surface-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-light/50',
          'disabled:cursor-not-allowed disabled:opacity-40',
        )}
      >
        <Plus size={size === 'sm' ? 14 : 16} aria-hidden="true" />
      </button>
    </div>
  );
}

export default QuantitySelector;
export { QuantitySelector };
export type { QuantitySelectorProps };
