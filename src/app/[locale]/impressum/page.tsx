import { getTranslations } from 'next-intl/server';
import { Scale, Building2, Phone, FileText, Globe } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'impressum' });

  return {
    title: `${t('title')} | Pixel Pretzels`,
  };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'impressum' });
  const tContact = await getTranslations({ locale, namespace: 'contact' });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">
          {t('title')}
        </h1>

        <div className="space-y-8">
          {/* Company Info */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold text-gray-900">
                {t('company')}
              </h2>
            </div>
            <div className="text-gray-700 space-y-2 text-sm">
              <p className="whitespace-pre-line">{t('address')}</p>
            </div>
          </section>

          {/* Representative */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold text-gray-900">
                {t('represented')}
              </h2>
            </div>
            <p className="text-gray-700 text-sm">{t('ceo')}</p>
          </section>

          {/* Contact */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Phone className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold text-gray-900">
                {t('contactTitle')}
              </h2>
            </div>
            <div className="text-gray-700 text-sm space-y-1.5">
              <p>
                Telefon:{' '}
                <a
                  href={`tel:${tContact('phoneNumber')}`}
                  className="text-amber-700 hover:text-amber-800"
                >
                  {tContact('phoneNumber')}
                </a>
              </p>
              <p>
                E-Mail:{' '}
                <a
                  href={`mailto:${tContact('emailAddress')}`}
                  className="text-amber-700 hover:text-amber-800"
                >
                  {tContact('emailAddress')}
                </a>
              </p>
            </div>
          </section>

          {/* Registration */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold text-gray-900">
                {locale === 'de' ? 'Handelsregister' : 'Commercial Register'}
              </h2>
            </div>
            <div className="text-gray-700 text-sm space-y-1.5">
              <p>{t('registerCourt')}</p>
              <p>{t('vatId')}</p>
            </div>
          </section>

          {/* Dispute Resolution */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold text-gray-900">
                {locale === 'de'
                  ? 'Streitbeilegung'
                  : 'Dispute Resolution'}
              </h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {t('disputeResolution')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
