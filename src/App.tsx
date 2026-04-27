/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, MotionConfig } from 'motion/react';
import { LangProvider, getLangFromPath } from './i18n';
import Preloader from './components/ui/Preloader';
import PageLoader from './components/ui/PageLoader';
import CustomCursor from './components/ui/CustomCursor';
import BackgroundEffects from './components/ui/BackgroundEffects';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Marquee from './components/sections/Marquee';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Reasons from './components/sections/Reasons';
import Sectors from './components/sections/Sectors';
import Clients from './components/sections/Clients';
import CTA from './components/sections/CTA';
import Footer from './components/layout/Footer';
import FloatingCTA from './components/ui/FloatingCTA';
import ScrollTracker from './components/ui/ScrollTracker';
import CornerLabels from './components/ui/CornerLabels';
import CookieBanner from './components/ui/CookieBanner';
import ErrorBoundary from './components/ui/ErrorBoundary';
import type { Lang } from './i18n';

const ServiceModule  = lazy(() => import('./components/modules/ServiceModule'));
const ContactModule  = lazy(() => import('./components/modules/ContactModule'));
const PrivacyModule  = lazy(() => import('./components/modules/PrivacyModule'));
const NotFoundModule = lazy(() => import('./components/modules/NotFoundModule'));

const SERVICE_VIEWS = ['01', '02', '03', '04'] as const;
const SERVICE_VIEW_SET = new Set<string>(SERVICE_VIEWS);

function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

function stripLocalePrefix(pathname: string): string {
  const normalized = normalizePath(pathname);
  const parts = normalized.split('/').filter(Boolean);
  if (parts[0] === 'en' || parts[0] === 'es' || parts[0] === 'pt') {
    const rest = parts.slice(1).join('/');
    return rest ? `/${rest}` : '/';
  }
  return normalized;
}

function getPreferredLang(): Lang {
  if (typeof window === 'undefined') return 'es';
  const parts = normalizePath(window.location.pathname).split('/').filter(Boolean);
  const pathLang = parts[0];
  if (pathLang === 'en' || pathLang === 'pt' || pathLang === 'es') return pathLang;
  const stored = localStorage.getItem('lang');
  if (stored === 'en' || stored === 'pt' || stored === 'es') return stored;
  return 'es';
}

function getViewFromPath(pathname: string): string {
  const path = stripLocalePrefix(pathname);

  if (path === '/') return 'home';
  if (path === '/contacto' || path === '/contact') return 'contact';
  if (path === '/politicas-privacidad' || path === '/privacy-policies' || path === '/privacy') return 'privacy';

  const serviceMatch = path.match(/^\/servicio\/(01|02|03|04)$/);
  if (serviceMatch) return serviceMatch[1];

  return 'not-found';
}

function getPathForView(view: string): string {
  const lang = getPreferredLang();
  const servicePrefix = lang === 'en' ? '/en' : '';
  const publicPrefix = lang === 'es' ? '' : `/${lang}`;

  if (SERVICE_VIEW_SET.has(view)) return `${servicePrefix}/servicio/${view}`;

  switch (view) {
    case 'home':
      return publicPrefix || '/';
    case 'contact':
      return `${publicPrefix}/contacto`;
    case 'privacy':
      return `${publicPrefix}/politicas-privacidad`;
    default:
      return `${publicPrefix}/404`;
  }
}

interface AppProps {
  initialPath?: string;
}

export default function App({ initialPath }: AppProps) {
  const pathForInit = initialPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
  const initialLang = getLangFromPath(pathForInit) ?? 'es';
  const [loading, setLoading] = useState(true);
  const [isSectorModalOpen, setIsSectorModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | string>(() => {
    if (typeof window === 'undefined') return getViewFromPath(pathForInit);
    return getViewFromPath(window.location.pathname);
  });

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [loading]);

  useEffect(() => {
    const syncViewWithUrl = () => setCurrentView(getViewFromPath(window.location.pathname));
    window.addEventListener('popstate', syncViewWithUrl);
    return () => window.removeEventListener('popstate', syncViewWithUrl);
  }, []);

  const syncUrlWithView = (view: string, mode: 'push' | 'replace' = 'push') => {
    if (typeof window === 'undefined') return;
    const targetPath = getPathForView(view);
    const currentPath = normalizePath(window.location.pathname);
    if (targetPath === currentPath) return;

    if (mode === 'replace') {
      window.history.replaceState({ view }, '', targetPath);
      return;
    }

    window.history.pushState({ view }, '', targetPath);
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    syncUrlWithView(view);
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    syncUrlWithView('home');
    const preferred = getPreferredLang();
    document.title =
      preferred === 'en'
        ? 'CCGrupo | CX, Sales, AI and Digital Studio'
        : preferred === 'pt'
          ? 'CCGrupo | CX, Vendas, IA e Digital Studio'
          : 'CCGrupo | CX, Ventas, IA y Digital Studio';

    setTimeout(() => {
      const element = document.getElementById('services');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <MotionConfig reducedMotion="user">
    <LangProvider initialLang={initialLang}>
      <ErrorBoundary>
        <AnimatePresence mode="wait">
          {loading && <Preloader onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <>
            <CustomCursor />
            <CookieBanner onNavigate={handleNavigate} />

            {currentView === 'home' ? (
              <>
                <BackgroundEffects />
                <Navbar onNavigate={handleNavigate} hidden={isSectorModalOpen} />
                <ScrollTracker />
                <CornerLabels />
                <FloatingCTA onNavigate={handleNavigate} />
                <main className="relative z-10">
                  <Hero onNavigate={handleNavigate} />
                  <Marquee />
                  <About />
                  <Services onNavigate={handleNavigate} />
                  <Reasons />
                  <Sectors onModalOpenChange={setIsSectorModalOpen} />
                  <Clients />
                  <CTA onNavigate={handleNavigate} />
                </main>
                <Footer onNavigate={handleNavigate} />
              </>
            ) : currentView === 'contact' ? (
              <Suspense fallback={<PageLoader />}>
                <ContactModule onBack={handleBackToHome} />
              </Suspense>
            ) : currentView === 'privacy' ? (
              <Suspense fallback={<PageLoader />}>
                <PrivacyModule onBack={handleBackToHome} onNavigate={handleNavigate} />
              </Suspense>
            ) : SERVICE_VIEW_SET.has(currentView) ? (
              <Suspense fallback={<PageLoader />}>
                <ServiceModule
                  serviceId={currentView}
                  onBack={handleBackToHome}
                  onNavigate={handleNavigate}
                />
              </Suspense>
            ) : (
              <Suspense fallback={<PageLoader />}>
                <NotFoundModule onBack={handleBackToHome} />
              </Suspense>
            )}
          </>
        )}
      </ErrorBoundary>
    </LangProvider>
    </MotionConfig>
  );
}
