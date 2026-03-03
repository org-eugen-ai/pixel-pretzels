import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import { PackageSearch } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  locale?: string;
}

export default function ProductGrid({ products, locale }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-surface">
          <PackageSearch className="h-10 w-10 text-text-muted" strokeWidth={1.5} />
        </div>
        <h3 className="text-lg font-semibold text-text">Keine Produkte gefunden</h3>
        <p className="mt-2 max-w-sm text-sm text-text-muted">
          Versuchen Sie, Ihre Filter anzupassen oder eine andere Kategorie auszuwählen.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} locale={locale} />
      ))}
    </div>
  );
}
