import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Brain, BarChart3, Globe2, Settings, Link2, Zap } from 'lucide-react';
import SplitText from '../ui/SplitText';
import { useLang } from '../../i18n';

const ICONS   = [Globe2, Settings, BarChart3, Link2, Brain, Zap];
const BORDERS = [
  'border-teal/30',
  'border-teal/20',
  'border-teal/25',
  'border-teal/30',
  'border-teal/20',
  'border-teal/25',
];

const ANIM_S  = 32;  // seconds for one full pass (desktop speed)

// Card dimensions live in CSS vars so every breakpoint override is automatic.
// The @keyframes "to" value also reads the var, so the exit point is always correct.
const ANIM_CSS = `
  :root {
    --ccg-cw: 240px;
    --ccg-ch: 245px;
  }
  @media (min-width: 480px) {
    :root { --ccg-cw: 290px; --ccg-ch: 265px; }
  }
  @media (min-width: 768px) {
    :root { --ccg-cw: 335px; --ccg-ch: 300px; }
  }
  @media (min-width: 1024px) {
    :root { --ccg-cw: 385px; --ccg-ch: 320px; }
  }

  @keyframes ccg-slide-fwd {
    from { left: 100%; }
    to   { left: calc(-1 * var(--ccg-cw)); }
  }
  .ccg-track-item {
    width:    var(--ccg-cw);
    height:   var(--ccg-ch);
    position: absolute;
    top: 0;
  }
  .ccg-track-item:hover {
    z-index: 10;
  }
  .ccg-track:hover .ccg-track-item {
    animation-play-state: paused !important;
    filter: brightness(0.6);
  }
  .ccg-track:hover .ccg-track-item:hover {
    filter: brightness(1.1);
  }
`;

export default function Reasons() {
  const { t, lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll progress through the section → parallax shift on the track
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const xShift = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const normalizeQ = (v: string) =>
    v.replace(/^(?:\u00C2)?(?:\u00BF)\s*/, '').replace(/\?\s*$/, '').trim();

  const items  = t.reasons.items;
  const N      = items.length;
  const prefix = lang === 'es' ? '\u00BF' : '';

  return (
    <section id="reasons" ref={sectionRef} className="py-20">
      <style>{ANIM_CSS}</style>

      {/* Heading */}
      <div className="px-6 md:px-14 lg:px-28 max-w-3xl mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal mb-6"
        >
          <div className="w-8 h-px bg-teal" />
          {t.reasons.label}
        </motion.div>

        <div className="font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-tight">
          <SplitText
            key={`reasons-heading-${lang}`}
            className="inline-block"
            delay={30}
            duration={1}
            splitType="words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
          >
            {prefix}{normalizeQ(t.reasons.headingPre)}{' '}
            <em className="italic text-gradient inline-block align-baseline whitespace-nowrap">
              {normalizeQ(t.reasons.headingEm)}?
            </em>
          </SplitText>
        </div>
      </div>

      {/* Carousel track */}
      <div
        className="relative overflow-hidden"
        style={{
          height: 'calc(var(--ccg-ch) + 36px)',
          maskImage: 'linear-gradient(to right, transparent, #000 5% 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, #000 5% 95%, transparent)',
        }}
      >
        {/* Scroll-linked subtle parallax layer */}
        <motion.div
          className="absolute inset-0"
          style={{ x: xShift }}
        >
          {/* Actual CSS-animated track */}
          <div
            className="ccg-track relative w-full h-full"
          >
            {items.map((reason, i) => {
              const Icon = ICONS[i % ICONS.length];
              const delay = `${((ANIM_S / N) * i - ANIM_S).toFixed(2)}s`;

              return (
                <div
                  key={i}
                  className="ccg-track-item"
                  style={{
                    animation: `ccg-slide-fwd ${ANIM_S}s linear infinite`,
                    animationDelay: delay,
                    paddingTop: '12px',
                    paddingLeft: i === 0 ? 0 : '16px',
                  }}
                >
                  <div
                    className={`w-full h-full rounded-2xl border ${BORDERS[i % BORDERS.length]} bg-navy-deep/90 backdrop-blur-sm p-4 md:p-5 flex flex-col gap-3 hover:border-teal/60 hover:bg-navy-deep transition-all duration-300 group overflow-hidden`}
                    style={{ boxSizing: 'border-box' }}
                  >
                    {/* Top row */}
                    <div className="flex items-center justify-between shrink-0">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center group-hover:bg-teal/20 group-hover:border-teal/40 transition-all duration-300">
                        <Icon size={17} className="text-teal" strokeWidth={1.5} />
                      </div>
                      <span className="font-mono text-[0.55rem] tracking-[0.25em] text-teal/40">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="font-mono text-xs md:text-sm uppercase tracking-wider text-white leading-snug group-hover:text-teal transition-colors duration-300 shrink-0 line-clamp-2">
                      {reason.title}
                    </h4>

                    {/* Desc */}
                    <p className="text-gray-400 font-light text-xs md:text-sm leading-relaxed flex-1 overflow-hidden line-clamp-4">
                      {reason.desc}
                    </p>

                    {/* Bottom accent */}
                    <div className="h-px w-0 bg-gradient-to-r from-teal to-transparent group-hover:w-full transition-all duration-500 shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
