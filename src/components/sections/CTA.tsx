import { motion } from 'motion/react';
import { ArrowRight, Briefcase } from 'lucide-react';
import { useLang } from '../../i18n';
import FluidBackground from '../ui/FluidBackground';

interface Props {
  onNavigate?: (view: string) => void;
}

export default function CTA({ onNavigate }: Props) {
  const { t } = useLang();
  const ctaCopy = t.cta;

  return (
    <section className="relative overflow-hidden bg-navy-deep py-20 sm:py-40 lg:py-56 px-5 sm:px-6 text-center">
      <div className="cta-overlay absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <FluidBackground colors={['#023e8a', '#0077b6', '#0096c7']} />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-sm text-teal mb-6 sm:mb-8"
        >
          {ctaCopy.label}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl font-display text-[clamp(2.7rem,6.8vw,6.4rem)] leading-[0.95] tracking-[-0.04em] text-white text-balance mb-6 sm:mb-8"
        >
          {ctaCopy.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg font-light leading-relaxed text-gray-200 max-w-lg mx-auto mb-10 sm:mb-12"
        >
          {ctaCopy.desc}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          onClick={() => onNavigate?.('contact')}
          className="group relative inline-flex w-full max-w-[22rem] sm:w-auto sm:max-w-none mx-auto items-center justify-center gap-4 font-mono text-[0.7rem] tracking-[0.25em] uppercase px-8 sm:px-14 py-5 bg-gradient-to-br from-teal-dark to-teal text-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_50px_rgba(0,180,216,0.4)]"
        >
          <span className="relative z-10">{t.cta.cta}</span>
          <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-teal to-teal-bright opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-x-3 gap-y-2 text-sm"
        >
          <span className="text-white/55 font-light">{ctaCopy.workWithUs}</span>
          <button
            type="button"
            onClick={() => onNavigate?.('careers')}
            className="group inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.22em] uppercase text-teal hover:text-teal-bright transition-colors"
          >
            <Briefcase size={14} strokeWidth={1.8} className="opacity-70 group-hover:opacity-100 transition-opacity" />
            {ctaCopy.workCta}
            <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
