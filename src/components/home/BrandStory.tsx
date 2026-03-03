import { getTranslations } from 'next-intl/server';
import { MapPin, Calendar, Users, Award } from 'lucide-react';

export default async function BrandStory() {
  const t = await getTranslations('home');

  const stats = [
    {
      icon: Calendar,
      value: '35+',
      label: t('brandStory.stats.years'),
    },
    {
      icon: Award,
      value: '1990',
      label: t('brandStory.stats.founded'),
    },
    {
      icon: Users,
      value: '10.000+',
      label: t('brandStory.stats.customers'),
    },
    {
      icon: MapPin,
      value: 'Heilbronn',
      label: t('brandStory.stats.location'),
    },
  ];

  return (
    <section className="bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Text Content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              <Award className="h-4 w-4" />
              {t('brandStory.badge')}
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-text sm:text-4xl">
              {t('brandStory.title')}
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-text-muted sm:text-lg">
              <p>{t('brandStory.paragraph1')}</p>
              <p>{t('brandStory.paragraph2')}</p>
            </div>

            {/* Stats on mobile: visible below text */}
            <div className="mt-10 grid grid-cols-2 gap-4 lg:hidden">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.value}
                    className="rounded-xl border border-border bg-background p-4 text-center"
                  >
                    <Icon className="mx-auto mb-2 h-5 w-5 text-accent" />
                    <div className="text-xl font-bold text-text">{stat.value}</div>
                    <div className="mt-0.5 text-sm text-text-muted">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual / Stats Panel (desktop) */}
          <div className="relative hidden lg:block">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-dark p-10">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/5" />
              <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-accent/10" />
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              <div className="relative grid grid-cols-2 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.value}
                      className={`group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 ${
                        index === 0 ? 'translate-y-4' : ''
                      } ${index === 3 ? '-translate-y-4' : ''}`}
                    >
                      <div className="mb-3 inline-flex rounded-lg bg-accent/20 p-2.5 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="mt-1 text-sm text-white/60">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom accent line */}
              <div className="mt-8 h-1 w-full rounded-full bg-white/10">
                <div className="h-1 w-2/3 rounded-full bg-gradient-to-r from-accent to-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
