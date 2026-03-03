'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Monitor, Cpu, Zap } from 'lucide-react';

export default function HeroSection() {
  const t = useTranslations('home');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-[#0f1f33]">
      {/* Decorative geometric shapes */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Large circle top-right */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full border border-white/10" />
        <div className="absolute -top-12 -right-12 h-72 w-72 rounded-full border border-white/5" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-[10%] h-20 w-20 rotate-45 rounded-lg border border-white/10 backdrop-blur-sm" />
        <div className="absolute bottom-1/4 right-[15%] h-16 w-16 rounded-full bg-accent/10" />
        <div className="absolute top-1/2 right-[30%] h-12 w-12 rotate-12 border border-accent/20" />
        <div className="absolute bottom-1/3 left-[25%] h-24 w-24 rounded-full border border-white/5" />

        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/3 h-64 w-64 rounded-full bg-primary-light/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
              <Zap className="h-3.5 w-3.5 text-accent" />
              {t('hero.badge')}
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              {t('hero.title')}
              <span className="mt-2 block bg-gradient-to-r from-accent to-yellow-300 bg-clip-text text-transparent">
                {t('hero.titleHighlight')}
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl lg:mx-0">
              {t('hero.subtitle')}
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Link href="/products">
                <Button>
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {t('hero.secondaryCta')}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Visual Element - Abstract tech illustration built with CSS */}
          <div className="relative hidden lg:block" aria-hidden="true">
            <div className="relative mx-auto h-96 w-96">
              {/* Central glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/20 to-primary-light/20 blur-2xl" />

              {/* Main card */}
              <div className="absolute inset-4 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                <div className="flex h-full flex-col items-center justify-center gap-6">
                  <div className="flex gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-accent/20 text-accent">
                      <Monitor className="h-8 w-8" />
                    </div>
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-light/20 text-primary-light">
                      <Cpu className="h-8 w-8" />
                    </div>
                  </div>

                  {/* Abstract stats bars */}
                  <div className="w-full space-y-3 px-4">
                    <div className="h-2 w-full rounded-full bg-white/10">
                      <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-accent to-accent-dark" />
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/10">
                      <div className="h-2 w-1/2 rounded-full bg-gradient-to-r from-primary-light to-primary" />
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/10">
                      <div className="h-2 w-5/6 rounded-full bg-gradient-to-r from-accent to-yellow-400" />
                    </div>
                  </div>

                  {/* Decorative dots grid */}
                  <div className="grid grid-cols-6 gap-2">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor:
                            i % 3 === 0
                              ? 'rgba(249,115,22,0.4)'
                              : 'rgba(255,255,255,0.1)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Orbiting elements */}
              <div className="absolute -top-2 -right-2 flex h-14 w-14 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-md">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <div className="absolute -bottom-2 -left-2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
