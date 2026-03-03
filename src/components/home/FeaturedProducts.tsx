import { getTranslations } from 'next-intl/server';
import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types';

interface FeaturedProductsProps {
  locale?: string;
}

export default async function FeaturedProducts({ locale }: FeaturedProductsProps) {
  const t = await getTranslations('home');
  const featuredProducts = products.filter((p: Product) => p.featured);

  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
              {t('featured.title')}
            </h2>
            <p className="mt-3 text-lg text-text-muted">
              {t('featured.subtitle')}
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>

        {featuredProducts.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-lg text-text-muted">
              {t('featured.empty')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
