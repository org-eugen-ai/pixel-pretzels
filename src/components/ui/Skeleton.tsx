import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded bg-surface-dark',
        className,
      )}
      aria-hidden="true"
    />
  );
}

export { Skeleton };
export type { SkeletonProps };
