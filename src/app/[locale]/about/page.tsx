import { getTranslations } from 'next-intl/server';
import {
  Award,
  HeartHandshake,
  Brain,
  Shield,
  MapPin,
  Calendar,
  Users,
  Star,
} from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: `${t('title')} | Pixel Pretzels`,
    description: t('subtitle'),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  const values = [
    {
      icon: Award,
      title: t('valueQuality'),
      description: t('valueQualityDesc'),
    },
    {
      icon: HeartHandshake,
      title: t('valueService'),
      description: t('valueServiceDesc'),
    },
    {
      icon: Brain,
      title: t('valueExpertise'),
      description: t('valueExpertiseDesc'),
    },
    {
      icon: Shield,
      title: t('valueTrust'),
      description: t('valueTrustDesc'),
    },
  ];

  const stats = [
    {
      value: '35+',
      label: locale === 'de' ? 'Jahre Erfahrung' : 'Years Experience',
      icon: Calendar,
    },
    {
      value: '10.000+',
      label: locale === 'de' ? 'Zufriedene Kunden' : 'Happy Customers',
      icon: Users,
    },
    {
      value: '500+',
      label: locale === 'de' ? 'Produkte' : 'Products',
      icon: Star,
    },
    {
      value: '1',
      label: locale === 'de' ? 'Standort in Heilbronn' : 'Location in Heilbronn',
      icon: MapPin,
    },
  ];

  const timeline = [
    {
      year: '1990',
      title:
        locale === 'de'
          ? 'Gruendung in Heilbronn'
          : 'Founded in Heilbronn',
      description:
        locale === 'de'
          ? 'Eroeffnung des ersten Fachgeschaefts fuer Personal Computer in der Heilbronner Innenstadt.'
          : 'Opening of the first specialist shop for personal computers in downtown Heilbronn.',
    },
    {
      year: '1998',
      title:
        locale === 'de'
          ? 'Internet-Zeitalter'
          : 'Internet Era',
      description:
        locale === 'de'
          ? 'Erweiterung um Internetdienste und Netzwerktechnik. Erster eigener Webshop.'
          : 'Expansion into internet services and network technology. First own web shop.',
    },
    {
      year: '2007',
      title:
        locale === 'de'
          ? 'Smartphone-Revolution'
          : 'Smartphone Revolution',
      description:
        locale === 'de'
          ? 'Aufnahme von Smartphones ins Sortiment. Wachstum zum regionalen Technologie-Haendler.'
          : 'Addition of smartphones to the product range. Growth into a regional technology retailer.',
    },
    {
      year: '2015',
      title:
        locale === 'de'
          ? 'Umzug & Erweiterung'
          : 'Relocation & Expansion',
      description:
        locale === 'de'
          ? 'Umzug in groessere Raeumlichkeiten. Ausbau des Service- und Beratungsangebots.'
          : 'Move to larger premises. Expansion of service and consulting offerings.',
    },
    {
      year: '2020',
      title:
        locale === 'de'
          ? 'Digitale Transformation'
          : 'Digital Transformation',
      description:
        locale === 'de'
          ? 'Vollstaendiger Relaunch des Online-Shops. Einfuehrung von Click & Collect.'
          : 'Complete relaunch of the online shop. Introduction of Click & Collect.',
    },
    {
      year: '2026',
      title:
        locale === 'de'
          ? 'Pixel Pretzels heute'
          : 'Pixel Pretzels Today',
      description:
        locale === 'de'
          ? 'Modernes Technologieunternehmen mit ueber 35 Jahren Erfahrung und einer treuen Kundschaft.'
          : 'Modern technology company with over 35 years of experience and a loyal customer base.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-20">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('storyTitle')}
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            {t('storyText')}
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {locale === 'de' ? 'Unsere Geschichte' : 'Our History'}
          </h2>
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-amber-200 -translate-x-1/2" />

            <div className="space-y-12">
              {timeline.map((event, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                    index % 2 === 0
                      ? 'md:flex-row'
                      : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-amber-600 rounded-full -translate-x-1/2 mt-2 ring-4 ring-amber-100" />

                  {/* Content */}
                  <div
                    className={`ml-10 md:ml-0 md:w-1/2 ${
                      index % 2 === 0
                        ? 'md:pr-12 md:text-right'
                        : 'md:pl-12'
                    }`}
                  >
                    <span className="text-sm font-bold text-amber-600">
                      {event.year}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-1">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mt-2 text-sm">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {t('valuesTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-100 p-6 text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {t('locationTitle')}
          </h2>
          <div className="flex items-start justify-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="whitespace-pre-line text-left">
              {t('locationAddress')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
