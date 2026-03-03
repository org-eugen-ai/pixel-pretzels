'use client';

import { Product } from '@/types';
import { useTranslations } from 'next-intl';
import { Rating } from '@/components/ui/Rating';
import { Badge } from '@/components/ui/Badge';
import { Star, ThumbsUp, CheckCircle } from 'lucide-react';

interface Review {
  id: number;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
  helpful: number;
}

function generateReviews(product: Product): Review[] {
  const reviewTemplates: Review[] = [
    {
      id: 1,
      author: 'Michael S.',
      rating: 5,
      title: 'Hervorragendes Produkt!',
      body: `Bin sehr zufrieden mit dem ${product.name}. Die Qualität ist erstklassig und die Leistung übertrifft meine Erwartungen. Pixel Pretzels hat wieder einmal eine tolle Beratung geboten. Kann ich nur weiterempfehlen!`,
      date: '2025-12-15',
      verified: true,
      helpful: 24,
    },
    {
      id: 2,
      author: 'Sandra K.',
      rating: 4,
      title: 'Gutes Preis-Leistungs-Verhältnis',
      body: `Der ${product.name} von ${product.brand || 'diesem Hersteller'} macht einen soliden Eindruck. Setup war unkompliziert und alles funktioniert wie beschrieben. Einzig die Lieferzeit hätte etwas kürzer sein können, aber das Gerät selbst ist top.`,
      date: '2025-11-28',
      verified: true,
      helpful: 18,
    },
    {
      id: 3,
      author: 'Thomas W.',
      rating: 5,
      title: 'Perfekt für den Arbeitsalltag',
      body: `Nutze den ${product.name} nun seit einigen Wochen täglich und bin begeistert. Die Verarbeitung ist hochwertig und die Performance ist mehr als ausreichend. Der Support von Pixel Pretzels war bei einer kleinen Rückfrage sehr schnell und kompetent.`,
      date: '2025-10-10',
      verified: true,
      helpful: 31,
    },
  ];

  return reviewTemplates;
}

interface ProductReviewsProps {
  product: Product;
}

export default function ProductReviews({ product }: ProductReviewsProps) {
  const t = useTranslations('products');
  const reviews = generateReviews(product);
  const averageRating = product.rating ?? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const totalReviews = product.reviewCount ?? reviews.length;

  // Rating distribution (approximate)
  const distribution = [
    { stars: 5, percentage: 70 },
    { stars: 4, percentage: 20 },
    { stars: 3, percentage: 7 },
    { stars: 2, percentage: 2 },
    { stars: 1, percentage: 1 },
  ];

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
        <h3 className="mb-6 text-xl font-bold text-text">
          {t('reviews.title')}
        </h3>

        <div className="grid gap-8 sm:grid-cols-[auto_1fr]">
          {/* Overall score */}
          <div className="flex flex-col items-center justify-center rounded-xl bg-surface px-8 py-6">
            <div className="text-5xl font-bold text-text">
              {averageRating.toFixed(1)}
            </div>
            <div className="mt-2">
              <Rating value={averageRating} />
            </div>
            <p className="mt-2 text-sm text-text-muted">
              {totalReviews} {t('reviews.reviewCount')}
            </p>
          </div>

          {/* Distribution bars */}
          <div className="space-y-2.5">
            {distribution.map((row) => (
              <div key={row.stars} className="flex items-center gap-3">
                <div className="flex w-12 items-center justify-end gap-1 text-sm text-text-muted">
                  {row.stars}
                  <Star className="h-3.5 w-3.5 fill-current text-warning" />
                </div>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-dark">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-warning to-amber-400 transition-all duration-700"
                    style={{ width: `${row.percentage}%` }}
                  />
                </div>
                <span className="w-10 text-right text-sm text-text-muted">
                  {row.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-xl border border-border bg-background p-5 transition-shadow hover:shadow-sm sm:p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-3">
                  {/* Avatar circle */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-text">
                        {review.author}
                      </span>
                      {review.verified && (
                        <Badge variant="secondary">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          {t('reviews.verified')}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-text-muted">
                      {new Date(review.date).toLocaleDateString('de-DE', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <Rating value={review.rating} />
            </div>

            <h4 className="mt-4 font-semibold text-text">{review.title}</h4>
            <p className="mt-2 leading-relaxed text-text-muted">{review.body}</p>

            <div className="mt-4 flex items-center gap-4 border-t border-border pt-4">
              <button className="flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-primary">
                <ThumbsUp className="h-4 w-4" />
                {t('reviews.helpful')} ({review.helpful})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
