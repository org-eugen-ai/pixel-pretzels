import { getTranslations } from 'next-intl/server';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';

export default async function TrustBadges() {
  const t = await getTranslations('home');

  const badges = [
    {
      icon: Truck,
      title: t('trust.shipping.title'),
      description: t('trust.shipping.description'),
    },
    {
      icon: RotateCcw,
      title: t('trust.returns.title'),
      description: t('trust.returns.description'),
    },
    {
      icon: ShieldCheck,
      title: t('trust.secure.title'),
      description: t('trust.secure.description'),
    },
    {
      icon: Headphones,
      title: t('trust.support.title'),
      description: t('trust.support.description'),
    },
  ];

  return (
    <section className="pretzel-border-top border-y border-border bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.title}
                className="group flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left lg:flex-col lg:items-center lg:text-center"
              >
                <div className="mb-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 transition-colors duration-300 group-hover:bg-primary/10 sm:mb-0 sm:mr-4 lg:mb-3 lg:mr-0">
                  <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text sm:text-base">
                    {badge.title}
                  </h3>
                  <p className="mt-1 text-xs text-text-muted sm:text-sm">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
