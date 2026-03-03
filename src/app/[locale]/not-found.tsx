import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SearchX } from 'lucide-react';

export default function NotFoundPage() {
  const t = useTranslations('notFound');

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
          <SearchX className="w-10 h-10 text-amber-600" />
        </div>

        {/* 404 */}
        <p className="text-7xl font-bold text-amber-600 mb-4">404</p>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          {t('title')}
        </h1>

        {/* Description */}
        <p className="text-gray-500 mb-8">{t('description')}</p>

        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
        >
          &larr; {t('backHome')}
        </Link>
      </div>
    </div>
  );
}
