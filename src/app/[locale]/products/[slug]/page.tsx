import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { products } from '@/data/products';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductSpecs from '@/components/product/ProductSpecs';
import ProductReviews from '@/components/product/ProductReviews';
import AddToCartButton from '@/components/product/AddToCartButton';
import ProductGrid from '@/components/product/ProductGrid';
import Rating from '@/components/ui/Rating';
import Badge from '@/components/ui/Badge';
import PriceDisplay from '@/components/ui/PriceDisplay';
import ProductDetailTabs from './ProductDetailTabs';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return { title: 'Not Found' };
  }

  const name = locale === 'de' ? product.nameDE : product.name;
  const description = locale === 'de' ? product.descriptionDE : product.description;

  return {
    title: `${name} | Pixel Pretzels`,
    description: description.substring(0, 160),
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'products' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const name = locale === 'de' ? product.nameDE : product.name;
  const description = locale === 'de' ? product.descriptionDE : product.description;
  const specs = locale === 'de' ? product.specsDE : product.specs;

  // Related products: same category, exclude current, max 4
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const categoryName =
    locale === 'de'
      ? tNav(product.category as 'notebooks' | 'smartphones' | 'printers' | 'accessories')
      : tNav(product.category as 'notebooks' | 'smartphones' | 'printers' | 'accessories');

  const breadcrumbs = [
    { label: tNav('home'), href: '/' },
    { label: tNav('products'), href: '/products' },
    { label: categoryName, href: `/category/${product.category}` },
    { label: name },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={breadcrumbs} />

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
          {/* Image Gallery */}
          <ProductImageGallery product={product} />

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Badge */}
            {product.badge && (
              <div className="mb-3">
                <Badge variant={product.badge}>{product.badge}</Badge>
              </div>
            )}

            {/* Brand */}
            <p className="text-sm text-amber-700 font-medium uppercase tracking-wide mb-1">
              {product.brand}
            </p>

            {/* Name */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <Rating value={product.rating} />
              <span className="text-sm text-gray-500">
                {t('reviewsCount', { count: product.reviewCount })}
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <PriceDisplay
                price={product.price}
                originalPrice={product.originalPrice}
              />
              <p className="text-xs text-gray-500 mt-1">{tCommon('inclVat')}</p>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <span className="inline-flex items-center gap-1.5 text-sm text-green-700 font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  {tCommon('inStock')}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-sm text-red-600 font-medium">
                  <span className="w-2 h-2 bg-red-500 rounded-full" />
                  {tCommon('outOfStock')}
                </span>
              )}
            </div>

            {/* Description (short) */}
            <p className="text-gray-600 leading-relaxed mb-8">
              {description.length > 200
                ? description.substring(0, 200) + '...'
                : description}
            </p>

            {/* Add to Cart */}
            <div className="mt-auto">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>

        {/* Tabs: Description / Specs / Reviews */}
        <div className="mt-16">
          <ProductDetailTabs
            description={description}
            specs={specs}
            product={product}
            locale={locale}
          />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {t('relatedProducts')}
            </h2>
            <ProductGrid products={relatedProducts} locale={locale} />
          </section>
        )}
      </div>
    </div>
  );
}
