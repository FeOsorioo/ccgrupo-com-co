import { lazy, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import CircularText from '../ui/CircularText';
import { useLang } from '../../i18n';

const Prism = lazy(() => import('../ui/Prism'));

interface Props {
  onNavigate?: (view: string) => void;
}

export default function Hero({ onNavigate }: Props) {
  const { t, lang } = useLang();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const heroCopy = lang === 'en'
    ? {
        line1: 'Technology drives us,',
        line2: 'people',
        line3a: 'inspire',
        line3b: 'us.',
        desc: 'We integrate technology, processes and knowledge to build solutions that make your business more agile, efficient and profitable.',
      }
    : {
        line1: 'La tecnología nos impulsa,',
        line2: 'las personas',
        line3a: 'nos',
        line3b: 'inspiran.',
        desc: 'Integramos tecnología, procesos y conocimiento para construir soluciones que hacen tu negocio más ágil, eficiente y rentable.',
      };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-5 sm:px-6 pt-20 sm:pt-28 pb-16 sm:pb-20">

      {/* Prism WebGL background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Prism
            animationType="rotate"
            timeScale={0.5}
            height={3.5}
            baseWidth={5.5}
            scale={4.2}
            hueShift={0}
            colorFrequency={1}
            noise={0}
            glow={0.6}
            transparent
            suspendWhenOffscreen
          />
        </Suspense>
      </div>

      {/* Dark overlay so text stays legible */}
      <div className="hero-overlay absolute inset-0 z-[1] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-[1.03] tracking-tight font-normal">
          <span className="block overflow-hidden">
            <motion.span initial={{ y: '115%' }} animate={{ y: 0 }} transition={{ delay: 2.1, duration: 1.3, ease: [0.16, 1, 0.3, 1] }} className="block">
              {heroCopy.line1}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span initial={{ y: '115%' }} animate={{ y: 0 }} transition={{ delay: 2.3, duration: 1.3, ease: [0.16, 1, 0.3, 1] }} className="block italic text-gradient">
              {heroCopy.line2}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span initial={{ y: '115%' }} animate={{ y: 0 }} transition={{ delay: 2.5, duration: 1.3, ease: [0.16, 1, 0.3, 1] }} className="block">
              {heroCopy.line3a} <span className="italic text-gradient">{heroCopy.line3b}</span>
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.9 }}
          className="max-w-lg sm:max-w-xl mt-6 sm:mt-8 text-base font-light leading-relaxed text-white"
        >
          {heroCopy.desc}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.9 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-5 mt-8 sm:mt-10 w-full max-w-[26rem] sm:max-w-none"
        >
          <button
            onClick={() => onNavigate?.('contact')}
            className="group relative w-full sm:w-auto font-mono text-[0.65rem] sm:text-label tracking-[0.2em] uppercase px-8 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-br from-teal-dark to-teal text-white overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(0,180,216,0.35)]"
          >
            <span className="relative z-10">{t.hero.cta1}</span>
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-teal to-teal-bright opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto font-mono text-[0.65rem] sm:text-label tracking-[0.2em] uppercase px-8 sm:px-10 py-3.5 sm:py-4 bg-transparent border border-white/10 text-white hover:border-teal hover:text-teal hover:bg-teal/10 transition-all duration-300"
          >
            {t.hero.cta2}
          </button>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.8 }}
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="font-mono text-label tracking-[0.35em] uppercase text-white">{t.hero.scroll}</span>
        <div className="w-px h-12 bg-gradient-to-b from-teal to-transparent animate-pulse" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.8, duration: 1 }}
        className="absolute bottom-10 right-10 hidden lg:block z-20"
      >
        <CircularText text="CONTACT*CENTER*GRUPO*BPO*" onHover="speedUp" spinDuration={20} className="text-teal font-mono text-xs" />
      </motion.div>
    </section>
  );
}
