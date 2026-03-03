import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { categories } from '@/data/categories';
import { Category, CategorySlug } from '@/types';
import { Laptop, Smartphone, Printer, Cable, LucideIcon } from 'lucide-react';

const categoryIcons: Record<CategorySlug, LucideIcon> = {
  notebooks: Laptop,
  smartphones: Smartphone,
  printers: Printer,
  accessories: Cable,
};

const categoryGradients: Record<CategorySlug, string> = {
  notebooks:
    'from-blue-600 to-indigo-700',
  smartphones:
    'from-violet-600 to-purple-700',
  printers:
    'from-emerald-600 to-teal-700',
  accessories:
    'from-amber-500 to-orange-600',
};

interface CategoryShowcaseProps {
  locale: string;
}

export default async function CategoryShowcase({ locale }: CategoryShowcaseProps) {
  const t = await getTranslations('home');

  return (
    <section className="bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            {t('categories.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
            {t('categories.subtitle')}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {categories.map((category: Category) => {
            const Icon = categoryIcons[category.slug as CategorySlug] || Laptop;
            const gradient = categoryGradients[category.slug as CategorySlug] || 'from-gray-600 to-gray-700';
            const name = locale === 'de' ? (category.nameDE || category.name) : category.name;
            const description = locale === 'de'
              ? (category.descriptionDE || category.description)
              : category.description;

            return (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group relative"
              >
                <div
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-6 sm:p-8 transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/20`}
                >
                  {/* Decorative circle */}
                  <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-white/5" />

                  <div className="relative z-10">
                    <div className="mb-4 inline-flex rounded-xl bg-white/20 p-3 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6 text-white sm:h-8 sm:w-8" strokeWidth={1.5} />
                    </div>

                    <h3 className="text-lg font-bold text-white sm:text-xl">
                      {name}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm text-white/75 sm:text-base">
                      {description}
                    </p>

                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white/90 transition-all duration-300 group-hover:gap-2">
                      {t('categories.explore')}
                      <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
