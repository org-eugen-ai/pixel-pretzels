import { getTranslations } from 'next-intl/server';
import HeroSection from '@/components/home/HeroSection';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import BrandStory from '@/components/home/BrandStory';
import TrustBadges from '@/components/home/TrustBadges';
import NewsletterSignup from '@/components/home/NewsletterSignup';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    title: `Pixel Pretzels – ${t('hero.title')}`,
    description: t('hero.subtitle'),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <HeroSection />
      <CategoryShowcase locale={locale} />
      <FeaturedProducts locale={locale} />
      <BrandStory />
      <TrustBadges />
      <NewsletterSignup />
    </>
  );
}
