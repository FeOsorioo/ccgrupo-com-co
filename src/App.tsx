/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'motion/react';
import { LangProvider } from './i18n';
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

const ServiceModule  = lazy(() => import('./components/modules/ServiceModule'));
const ContactModule  = lazy(() => import('./components/modules/ContactModule'));
const PrivacyModule  = lazy(() => import('./components/modules/PrivacyModule'));
const NotFoundModule = lazy(() => import('./components/modules/NotFoundModule'));

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | string>('home');

  // Prevent scrolling while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [loading]);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    document.title = 'CCGrupo | BPO Colombia — CX, Ventas, IA y Digital Studio';
    setTimeout(() => {
      const element = document.getElementById('services');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <LangProvider>
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
                <Navbar onNavigate={handleNavigate} />
                <ScrollTracker />
                <CornerLabels />
                <FloatingCTA onNavigate={handleNavigate} />
                <main className="relative z-10">
                  <Hero onNavigate={handleNavigate} />
                  <Marquee />
                  <About />
                  <Services onNavigate={handleNavigate} />
                  <Reasons />
                  <Sectors />
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
                <PrivacyModule onBack={handleBackToHome} />
              </Suspense>
            ) : ['01','02','03','04'].includes(currentView) ? (
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
  );
}
