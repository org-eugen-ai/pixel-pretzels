'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [1];

  if (current > 3) {
    pages.push('ellipsis');
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push('ellipsis');
  }

  pages.push(total);

  return pages;
}

function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav aria-label="Seitennavigation" className={cn('flex items-center justify-center gap-1', className)}>
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Vorherige Seite"
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-150',
          'hover:bg-surface-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light/50',
          'disabled:cursor-not-allowed disabled:opacity-40',
        )}
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>

      {pages.map((page, index) => {
        if (page === 'ellipsis') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex h-9 w-9 items-center justify-center text-sm text-text-muted"
              aria-hidden="true"
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-label={`Seite ${page}`}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light/50',
              isActive
                ? 'bg-primary text-white'
                : 'text-text hover:bg-surface-dark',
            )}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Naechste Seite"
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-150',
          'hover:bg-surface-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light/50',
          'disabled:cursor-not-allowed disabled:opacity-40',
        )}
      >
        <ChevronRight size={18} aria-hidden="true" />
      </button>
    </nav>
  );
}

export { Pagination };
export type { PaginationProps };
