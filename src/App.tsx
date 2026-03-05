/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Preloader from './components/ui/Preloader';
import CustomCursor from './components/ui/CustomCursor';
import BackgroundEffects from './components/ui/BackgroundEffects';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Marquee from './components/sections/Marquee';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Reasons from './components/sections/Reasons';
import Clients from './components/sections/Clients';
import CTA from './components/sections/CTA';
import Footer from './components/layout/Footer';
import ServiceModule from './components/modules/ServiceModule';
import ContactModule from './components/modules/ContactModule';

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
    // Optional: scroll to services section after a small delay
    setTimeout(() => {
      const element = document.getElementById('services');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <CustomCursor />
          
          {currentView === 'home' ? (
            <>
              <BackgroundEffects />
              <Navbar onNavigate={handleNavigate} />

              <main className="relative z-10">
                <Hero />
                <Marquee />
                <About />
                <Services onNavigate={handleNavigate} />
                <Reasons />
                <Clients />
                <CTA onNavigate={handleNavigate} />
              </main>

              <Footer />
            </>
          ) : currentView === 'contact' ? (
            <ContactModule onBack={handleBackToHome} />
          ) : (
            <ServiceModule
              serviceId={currentView}
              onBack={handleBackToHome}
            />
          )}
        </>
      )}
    </>
  );
}
