import { motion } from 'motion/react';
import { Paintbrush, Megaphone, Layers, MessageSquare, BarChart3, Code2 } from 'lucide-react';
import { useLang } from '../../i18n';

const STEP_ICONS = [Paintbrush, Megaphone, Layers, MessageSquare, BarChart3, Code2];

type ZoneType = 'posting' | 'joint' | 'ccg';

function getZone(brand: string): ZoneType {
  if (brand === 'Posting') return 'posting';
  if (brand === 'CCG + Posting') return 'joint';
  return 'ccg';
}

interface ZoneStyles {
  accentBar: string;
  badge: string;
  iconBox: string;
  iconColor: string;
}

/**
 * Zone styles are theme-agnostic: same classes in both modes, with
 * light-mode contrast tweaks handled by the `journey-zone-*` rules in
 * index.css. This avoids React state vs. `html.light` class desync that
 * could render light-theme white surfaces on a dark page.
 */
const ZONE_STYLES: Record<ZoneType, ZoneStyles> = {
  posting: {
    accentBar: 'bg-violet-500',
    badge: 'journey-zone-posting font-mono text-[0.6rem] tracking-wide px-2 py-0.5 rounded-full whitespace-nowrap',
    iconBox: 'journey-zone-posting-icon',
    iconColor: 'text-violet-300',
  },
  joint: {
    accentBar: 'bg-gradient-to-r from-violet-500 to-teal',
    badge: 'journey-zone-joint font-mono text-[0.6rem] tracking-wide px-2 py-0.5 rounded-full whitespace-nowrap',
    iconBox: 'journey-zone-joint-icon',
    iconColor: 'text-violet-200',
  },
  ccg: {
    accentBar: 'bg-teal',
    badge: 'journey-zone-ccg font-mono text-[0.6rem] tracking-wide px-2 py-0.5 rounded-full whitespace-nowrap',
    iconBox: 'journey-zone-ccg-icon',
    iconColor: 'text-teal',
  },
};

export default function Journey() {
  const { t } = useLang();
  const s = t.journey;

  const zoneStyles = ZONE_STYLES;

  return (
    <section
      id="journey"
      className="journey-section bg-navy-deep py-20 sm:py-28 px-5 sm:px-6 md:px-14 lg:px-28"
    >
      <div className="max-w-7xl mx-auto space-y-14">

        {/* ── Header ── */}
        <div className="space-y-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal/80"
          >
            <div className="w-8 h-px bg-teal/60 shrink-0" />
            {s.label}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="font-display text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.02em] text-white"
          >
            {s.heading}
            <br />
            <span className="text-teal">{s.headingEnd}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.14 }}
            className="text-white/55 text-base leading-relaxed"
          >
            {s.sub}
          </motion.p>
        </div>

        {/* ── Connecting flow line (lg only) ── */}
        <div className="hidden lg:block relative h-0">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-violet-500/30 via-teal/30 to-teal/10 pointer-events-none" />
        </div>

        {/* ── Steps grid ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4"
        >
          {s.steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            const zone = getZone(step.brand);
            const styles = zoneStyles[zone];
            const stepNum = String(i + 1).padStart(2, '0');

            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
                }}
                className="journey-card relative flex flex-col gap-3 p-4 rounded-2xl overflow-hidden transition-all duration-300 group"
              >
                {/* Top accent bar */}
                <div className={`absolute inset-x-0 top-0 h-[3px] ${styles.accentBar}`} />

                {/* Step number watermark */}
                <span className="journey-watermark absolute top-3 right-3 font-mono text-[3.5rem] font-light leading-none select-none pointer-events-none">
                  {stepNum}
                </span>

                {/* Brand badge */}
                <div className="flex items-center gap-2 mt-1">
                  <span className={styles.badge}>
                    {step.brand}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${styles.iconBox}`}>
                  <Icon className={`w-4 h-4 ${styles.iconColor}`} />
                </div>

                {/* Title */}
                <p className="journey-card-title font-display text-sm sm:text-base font-semibold leading-snug">
                  {step.title}
                </p>

                {/* Desc */}
                <p className="journey-card-desc font-mono text-[0.65rem] tracking-wide leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Result strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="journey-strip rounded-2xl px-6 py-5"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {s.result.map((item, i) => {
              const isLast = i === s.result.length - 1;
              const isBeforeLast = i === s.result.length - 2;
              return (
                <div key={i} className="flex items-center gap-x-3">
                  <span
                    className={[
                      'font-display text-base sm:text-lg font-semibold leading-snug',
                      isLast
                        ? 'text-teal drop-shadow-[0_0_8px_rgba(0,180,216,0.5)]'
                        : 'journey-strip-item',
                    ].join(' ')}
                  >
                    {item}
                  </span>
                  {!isLast && (
                    <span className="text-teal font-bold text-lg shrink-0 leading-none">
                      {isBeforeLast ? '=' : '+'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
