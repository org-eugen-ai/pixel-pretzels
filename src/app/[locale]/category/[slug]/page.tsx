import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ProductGrid from '@/components/product/ProductGrid';
import ProductSort from '@/components/product/ProductSort';
import type { CategorySlug } from '@/types';
import CategoryPageClient from './CategoryPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return { title: 'Not Found' };
  }

  const name = locale === 'de' ? category.nameDE : category.name;
  const description = locale === 'de' ? category.descriptionDE : category.description;

  return {
    title: `${name} | Pixel Pretzels`,
    description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const category = categories.find((c) => c.slug === slug);
  if (!category) {
    notFound();
  }

  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const t = await getTranslations({ locale, namespace: 'products' });

  const name = locale === 'de' ? category.nameDE : category.name;
  const description = locale === 'de' ? category.descriptionDE : category.description;

  const categoryProducts = products.filter(
    (p) => p.category === (slug as CategorySlug)
  );

  const breadcrumbs = [
    { label: tNav('home'), href: '/' },
    { label: name },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={breadcrumbs} />

        {/* Category Header */}
        <div className="mt-6 mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{name}</h1>
          <p className="text-gray-600 max-w-2xl">{description}</p>
        </div>

        <CategoryPageClient
          products={categoryProducts}
          locale={locale}
        />
      </div>
    </div>
  );
}
