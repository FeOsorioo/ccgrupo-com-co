import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Brain, BarChart3, Globe2, Settings, Link2, Zap } from 'lucide-react';
const SplitText = lazy(() => import('../ui/SplitText'));
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

// Speed: 32s for a full 50% loop ≈ matches the previous CSS animation cadence.
// Auto-scroll moves LEFT (negative offset), like a typical marquee.
const AUTO_SPEED_PCT_PER_SEC = 50 / 32; // ≈ 1.5625 %/s
const TAP_THRESHOLD = 5;

// Card width scales with breakpoint. Height is UNCONSTRAINED — the card
// grows to fit its content, so nothing is ever clipped.
const ANIM_CSS = `
  :root { --ccg-cw: 240px; }
  @media (min-width: 480px)  { :root { --ccg-cw: 290px; } }
  @media (min-width: 768px)  { :root { --ccg-cw: 335px; } }
  @media (min-width: 1024px) { :root { --ccg-cw: 390px; } }

  /* Each card slot = card width + 16 px left gap.
     With the array doubled, translateX(-50%) is always a seamless restart. */
  .ccg-card {
    flex-shrink: 0;
    width: calc(var(--ccg-cw) + 16px);
    padding-left: 16px;
    padding-top: 12px;
    padding-bottom: 16px;
    box-sizing: border-box;
    position: relative;
  }

  /* JS drives --ccg-offset (percent of track width).
     translate3d goes on its own line so transforms compose correctly. */
  .ccg-track {
    display: flex;
    width: max-content;
    transform: translate3d(var(--ccg-offset, 0%), 0, 0);
    will-change: transform;
    touch-action: pan-y;
  }
  .ccg-track-wrap { cursor: grab; }
  .ccg-track-wrap:active { cursor: grabbing; }

  .ccg-track-wrap:hover .ccg-card {
    filter: brightness(0.65);
    transition: filter 0.2s;
  }
  .ccg-track-wrap:hover .ccg-card:hover {
    filter: brightness(1.05);
    z-index: 10;
  }
`;

export default function Reasons() {
  const { t, lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef       = useRef<HTMLDivElement>(null);
  const offsetPctRef   = useRef(0);           // current translateX in %
  const isDraggingRef  = useRef(false);
  const isHoveringRef  = useRef(false);
  const dragStartRef   = useRef<{ x: number; offsetPct: number; trackWidth: number; moved: boolean } | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  // Subtle parallax: less shift on mobile so cards stay centred
  const xShift = useTransform(scrollYProgress, [0, 1], [60, -60]);

  // Auto-scroll loop (paused on hover or drag) — drives --ccg-offset.
  useEffect(() => {
    let raf = 0;
    let lastT = performance.now();
    const tick = (t: number) => {
      const dt = (t - lastT) / 1000;
      lastT = t;
      if (!isDraggingRef.current && !isHoveringRef.current) {
        offsetPctRef.current -= AUTO_SPEED_PCT_PER_SEC * dt;
      }
      // Wrap into [-50, 0]% so the duplicated track loops seamlessly
      if (offsetPctRef.current <= -50) offsetPctRef.current += 50;
      if (offsetPctRef.current >    0) offsetPctRef.current -= 50;
      if (trackRef.current) {
        trackRef.current.style.setProperty('--ccg-offset', `${offsetPctRef.current}%`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Global pointermove / pointerup so the drag survives even if the cursor
  // leaves the wrap. No pointer capture → native clicks on the cards (if we
  // ever add per-card actions) bubble normally.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!isDraggingRef.current || !dragStartRef.current) return;
      const dx = e.clientX - dragStartRef.current.x;
      if (Math.abs(dx) > TAP_THRESHOLD) dragStartRef.current.moved = true;
      const { trackWidth, offsetPct } = dragStartRef.current;
      // px → % of track width
      const deltaPct = trackWidth > 0 ? (dx / trackWidth) * 100 : 0;
      offsetPctRef.current = offsetPct + deltaPct;
    };
    const onUp = () => {
      isDraggingRef.current = false;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    const trackWidth = trackRef.current?.getBoundingClientRect().width ?? 0;
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX,
      offsetPct: offsetPctRef.current,
      trackWidth,
      moved: false,
    };
  };

  const normalizeQ = (v: string) =>
    v.replace(/^(?:Â)?(?:¿)\s*/, '').replace(/\?\s*$/, '').trim();

  const items  = t.reasons.items;
  const N      = items.length;
  const prefix = lang === 'es' ? '¿' : '';

  // Double the array → translateX(-50%) produces a seamless infinite loop
  const track = [...items, ...items];

  return (
    <section id="reasons" ref={sectionRef} className="py-20">
      <style>{ANIM_CSS}</style>

      {/* ── Heading ─────────────────────────────────── */}
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

        <h2 className="font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-tight font-normal">
          <Suspense fallback={
            <span className="inline-block opacity-0">
              {prefix}{normalizeQ(t.reasons.headingPre)} {normalizeQ(t.reasons.headingEm)}?
            </span>
          }>
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
          </Suspense>
        </h2>
      </div>

      {/* ── Carousel track ───────────────────────────── */}
      {/* overflow-hidden clips cards leaving left/right; height = natural card height */}
      <div
        className="ccg-track-wrap relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, #000 5% 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, #000 5% 95%, transparent)',
        }}
        onPointerDown={onPointerDown}
        onMouseEnter={() => { isHoveringRef.current = true; }}
        onMouseLeave={() => { isHoveringRef.current = false; }}
      >
        {/* Parallax wrapper — in-flow div so the container height follows card height */}
        <motion.div style={{ x: xShift }}>
          <div ref={trackRef} className="ccg-track">
            {track.map((reason, i) => {
              const Icon = ICONS[i % ICONS.length];

              return (
                <div key={i} className="ccg-card">
                  <div
                    className={`rounded-2xl border ${BORDERS[i % BORDERS.length]} bg-navy-deep/90 backdrop-blur-sm p-4 md:p-5 flex flex-col gap-3 hover:border-teal/60 hover:bg-navy-deep transition-colors duration-300 group`}
                  >
                    {/* Top row */}
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center group-hover:bg-teal/20 group-hover:border-teal/40 transition-all duration-300">
                        <Icon size={17} className="text-teal" strokeWidth={1.5} />
                      </div>
                      <span className="font-mono text-[0.55rem] tracking-[0.25em] text-teal/40">
                        {String((i % N) + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-mono text-xs md:text-sm uppercase tracking-wider text-white leading-snug group-hover:text-teal transition-colors duration-300">
                      {reason.title}
                    </h3>

                    {/* Desc — full text, no clamp, card grows to fit */}
                    <p className="text-white font-light text-xs md:text-sm leading-relaxed">
                      {reason.desc}
                    </p>

                    {/* Bottom accent */}
                    <div className="h-px w-0 bg-gradient-to-r from-teal to-transparent group-hover:w-full transition-all duration-500" />
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
