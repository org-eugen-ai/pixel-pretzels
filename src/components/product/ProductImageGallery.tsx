'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { cn } from '@/lib/utils';
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

const categoryGradients: Record<string, string[]> = {
  notebooks: [
    'from-blue-400 via-indigo-500 to-purple-600',
    'from-indigo-400 via-blue-500 to-cyan-600',
    'from-purple-400 via-indigo-500 to-blue-600',
    'from-blue-500 via-purple-500 to-pink-500',
  ],
  smartphones: [
    'from-violet-400 via-purple-500 to-fuchsia-600',
    'from-fuchsia-400 via-pink-500 to-rose-600',
    'from-purple-400 via-violet-500 to-indigo-600',
    'from-pink-400 via-fuchsia-500 to-purple-600',
  ],
  printers: [
    'from-emerald-400 via-teal-500 to-cyan-600',
    'from-teal-400 via-cyan-500 to-blue-500',
    'from-green-400 via-emerald-500 to-teal-600',
    'from-cyan-400 via-teal-500 to-emerald-600',
  ],
  accessories: [
    'from-amber-400 via-orange-500 to-red-500',
    'from-orange-400 via-red-500 to-pink-500',
    'from-yellow-400 via-amber-500 to-orange-600',
    'from-red-400 via-orange-500 to-amber-500',
  ],
};

const defaultGradients = [
  'from-gray-400 via-gray-500 to-gray-600',
  'from-slate-400 via-gray-500 to-zinc-600',
  'from-zinc-400 via-slate-500 to-gray-600',
  'from-gray-500 via-slate-500 to-zinc-500',
];

interface ProductImageGalleryProps {
  product: Product;
}

export default function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const gradients = categoryGradients[product.category] || defaultGradients;
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? gradients.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === gradients.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-surface">
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br transition-all duration-500',
            gradients[activeIndex]
          )}
        />

        {/* Abstract product representation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-2/3 w-2/3">
            <div className="absolute inset-0 rounded-3xl bg-white/10 backdrop-blur-sm" />
            <div className="absolute inset-6 rounded-2xl bg-white/10" />
            <div className="absolute inset-12 rounded-xl bg-white/5" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold text-white/20 sm:text-8xl">
                {product.brand?.charAt(0) || 'P'}
              </span>
            </div>
          </div>
        </div>

        {/* Zoom hint */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 text-xs text-white/70 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <ZoomIn className="h-3.5 w-3.5" />
          {product.name}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-white/30 group-hover:opacity-100"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-white/30 group-hover:opacity-100"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Image counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {activeIndex + 1} / {gradients.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {gradients.map((gradient, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              'relative aspect-square overflow-hidden rounded-xl border-2 transition-all duration-200',
              activeIndex === index
                ? 'border-primary ring-2 ring-primary/20 scale-[1.02]'
                : 'border-border hover:border-border-dark'
            )}
            aria-label={`View image ${index + 1}`}
          >
            <div className={cn('absolute inset-0 bg-gradient-to-br', gradient)} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-1/2 w-1/2 rounded-lg bg-white/10" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
