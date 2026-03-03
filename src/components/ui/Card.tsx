import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function Card({ className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl bg-white shadow-sm transition-shadow duration-200 hover:shadow-md',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export { Card };
export type { CardProps };
