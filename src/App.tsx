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

export default function App() {
  const [loading, setLoading] = useState(true);

  // Prevent scrolling while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <CustomCursor />
          <BackgroundEffects />
          <Navbar />

          <main className="relative z-10">
            <Hero />
            <Marquee />
            <About />
            <Services />
            <Reasons />
            <Clients />
            <CTA />
          </main>

          <Footer />
        </>
      )}
    </>
  );
}
