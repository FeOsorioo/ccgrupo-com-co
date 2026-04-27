import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import {
  HeartPulse, Landmark, ShoppingBag, Building2, GraduationCap, Truck,
  X, CheckCircle2, TrendingUp, ArrowRight,
} from 'lucide-react';
import { useLang } from '../../i18n';

const ICONS = [HeartPulse, Landmark, ShoppingBag, Building2, GraduationCap, Truck];

type SectorItem = {
  name: string;
  desc: string;
  detail: string;
  challenges: string[];
  solutions: string[];
  kpis: { label: string; value: string }[];
};

export default function Sectors() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { t, lang } = useLang();
  const s = t.sectors;
  const viewMoreLabel = lang === 'en' ? 'See more' : 'Ver más';

  const [active, setActive] = useState<(SectorItem & { index: number }) | null>(null);

  const open = (item: SectorItem, index: number) => setActive({ ...item, index });
  const close = () => setActive(null);

  return (
    <>
      <section id="sectors" ref={ref} className="relative py-32 px-6 md:px-14 lg:px-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-teal/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal mb-6">
              <div className="w-8 h-px bg-teal" />
              {s.label}
            </div>
            <h2 className="font-display text-3xl md:text-5xl leading-tight text-white mb-4">
              {s.heading}
            </h2>
            <p className="text-gray-300 font-light text-base max-w-2xl leading-relaxed">
              {s.sub}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {s.items.map((item, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: 32 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  onClick={() => open(item, i)}
                  className="group relative p-8 md:p-10 border border-white/10 hover:border-teal/40 bg-white/[0.02] hover:bg-teal/[0.05] rounded-2xl transition-all duration-300 text-left cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-xl border border-white/10 group-hover:border-teal/40 bg-white/[0.03] group-hover:bg-teal/10 flex items-center justify-center mb-7 transition-all duration-300">
                    <Icon size={24} className="text-gray-400 group-hover:text-teal transition-colors duration-300" />
                  </div>

                  <div className="font-mono text-label tracking-[0.25em] uppercase text-teal/50 mb-3 group-hover:text-teal transition-colors duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <h3 className="font-mono text-base uppercase tracking-widest text-white mb-3 group-hover:text-teal transition-colors duration-300">
                    {item.name}
                  </h3>

                  <p className="text-gray-400 font-light text-base leading-relaxed mb-7">
                    {item.desc}
                  </p>

                  <div className="flex items-center gap-2 font-mono text-xs tracking-[0.15em] uppercase text-teal/0 group-hover:text-teal transition-all duration-300">
                    <span>{viewMoreLabel}</span>
                    <ArrowRight size={12} />
                  </div>

                  <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-teal to-transparent group-hover:w-full transition-all duration-500 rounded-b-2xl" />
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={close}
              className="fixed inset-0 z-[9800] bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 bottom-0 sm:inset-0 z-[9900] flex sm:items-center sm:justify-center sm:p-6 md:p-10 pointer-events-none"
            >
              <div
                className="pointer-events-auto relative w-full sm:max-w-3xl
                           max-h-[92vh] sm:max-h-[90vh] overflow-y-auto overscroll-contain
                           bg-navy-deep border border-white/[0.12]
                           rounded-t-3xl sm:rounded-3xl
                           shadow-[0_-16px_60px_rgba(0,0,0,0.5)] sm:shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
                onClick={e => e.stopPropagation()}
              >
                {/* Drag handle (mobile) */}
                <div className="flex justify-center pt-3 pb-1 sm:hidden">
                  <div className="w-10 h-1 rounded-full bg-white/20" />
                </div>

                <div className="px-5 py-8 sm:p-10 md:p-14 relative">
                  {/* Close button inside padding flow */}
                  <button
                    onClick={close}
                    className="absolute top-6 right-6 w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white hover:text-teal hover:border-teal/30 transition-all duration-200 z-20"
                  >
                    <X size={20} />
                  </button>

                  {/* Header */}
                  <div className="flex items-start gap-4 mb-8 sm:mb-10 pr-10">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl border border-teal/30 bg-teal/10 flex items-center justify-center shrink-0">
                      {(() => { const Icon = ICONS[active.index]; return <Icon size={28} className="text-teal" />; })()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-teal mb-2">
                        {String(active.index + 1).padStart(2, '0')} — {s.label}
                      </div>
                      <h3 className="font-display text-2xl sm:text-4xl md:text-5xl text-white leading-tight break-words">
                        {active.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-white font-light text-base sm:text-lg leading-relaxed mb-10 sm:mb-12 border-l-2 border-teal/40 pl-6">
                    {active.detail}
                  </p>

                  {/* KPIs */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 sm:mb-12">
                    {active.kpis.map((kpi, i) => (
                      <div key={i} className="p-5 sm:p-6 border border-white/10 rounded-2xl bg-white/[0.04] text-center">
                        <div className="font-mono text-2xl sm:text-3xl font-bold text-teal mb-1">{kpi.value}</div>
                        <div className="font-mono text-[0.6rem] sm:text-xs tracking-[0.1em] uppercase text-white/60 leading-tight">{kpi.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Challenges / Solutions */}
                  <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.25em] uppercase text-white/50 mb-5 sm:mb-6">
                        <TrendingUp size={14} className="text-teal shrink-0" />
                        {s.challenges}
                      </div>
                      <ul className="space-y-3 sm:space-y-4">
                        {active.challenges.map((c, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-white/90 font-light">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.25em] uppercase text-white/50 mb-5 sm:mb-6">
                        <CheckCircle2 size={14} className="text-teal shrink-0" />
                        {s.solutions}
                      </div>
                      <ul className="space-y-3 sm:space-y-4">
                        {active.challenges.map((c, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-white/90 font-light">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                            {active.solutions[i] || c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
