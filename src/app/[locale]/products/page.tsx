import { getTranslations } from 'next-intl/server';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ProductsPageClient from './ProductsPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });

  return {
    title: `${t('title')} | Pixel Pretzels`,
    description:
      locale === 'de'
        ? 'Entdecken Sie unser gesamtes Sortiment an Notebooks, Smartphones, Druckern und Zubehoer.'
        : 'Discover our full range of notebooks, smartphones, printers and accessories.',
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const breadcrumbs = [
    { label: tNav('home'), href: '/' },
    { label: tNav('products') },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-8">
          {t('title')}
        </h1>

        <ProductsPageClient locale={locale} />
      </div>
    </div>
  );
}
