import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'sale' | 'new' | 'bestseller';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-primary-light text-white',
  secondary: 'bg-surface-dark text-text',
  destructive: 'bg-error text-white',
  sale: 'bg-error text-white',
  new: 'bg-success text-white',
  bestseller: 'bg-accent text-white',
};

function Badge({ variant = 'default', className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide',
        variantStyles[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

export default Badge;
export { Badge };
export type { BadgeProps, BadgeVariant };
