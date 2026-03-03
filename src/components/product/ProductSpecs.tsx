import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';

interface Spec {
  label: string;
  value: string;
}

interface ProductSpecsProps {
  specs: Spec[];
}

export default function ProductSpecs({ specs }: ProductSpecsProps) {
  if (!specs || specs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface px-6 py-12 text-center">
        <Info className="mb-3 h-8 w-8 text-text-muted" strokeWidth={1.5} />
        <p className="text-sm text-text-muted">
          Keine technischen Daten verfügbar.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="border-b border-border bg-surface px-5 py-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
          Technische Daten
        </h3>
      </div>
      <div className="divide-y divide-border">
        {specs.map((spec, index) => (
          <div
            key={spec.label}
            className={cn(
              'grid grid-cols-1 gap-1 px-5 py-3 sm:grid-cols-3 sm:gap-4',
              index % 2 === 0 ? 'bg-background' : 'bg-surface/50'
            )}
          >
            <dt className="text-sm font-medium text-text-muted">
              {spec.label}
            </dt>
            <dd className="text-sm font-medium text-text sm:col-span-2">
              {spec.value}
            </dd>
          </div>
        ))}
      </div>
    </div>
  );
}
