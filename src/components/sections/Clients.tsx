import { useState, useEffect, useMemo, lazy, Suspense, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
const SplitText = lazy(() => import('../ui/SplitText'));
import { useLang } from '../../i18n';

// Auto-loads every .webp file added to src/assets/clients/webp/
const logoModules = import.meta.glob('../../assets/clients/webp/*.webp', { eager: true }) as Record<string, { default: string }>;

const CLIENTS = Object.entries(logoModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, mod]) => ({
    name: path.split('/').pop()?.replace(/\.\w+$/, '') ?? 'Cliente',
    logo: mod.default,
  }));

interface ClientAvatarsProps {
  clients: { name: string; logo: string }[];
  /** Avatar size in px */
  size: number;
  /** Max number of visible avatars before splitting into pages. The
   *  "+X" bubble cycles through pages on click. */
  maxVisible: number;
  /** Overlap percentage between avatars (0–100) */
  overlap?: number;
  /** Hover scale factor */
  focusScale?: number;
  /** Suffix for the +X bubble tooltip ("más" / "more" / "mais") */
  moreSuffix: string;
}

/**
 * Original-style stacked avatar row: first `maxVisible` logos overlap each
 * other, hovering an avatar pops it up + reveals its name tooltip. The
 * trailing "+X" bubble is now a pager — clicking it swaps the visible
 * group for the next batch of logos (wrapping back to page 0 at the end).
 * No modal, no horizontal scroll — everything stays in place.
 */
function ClientAvatars({
  clients,
  size,
  maxVisible,
  overlap = 50,
  focusScale = 1.25,
  moreSuffix,
}: ClientAvatarsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(clients.length / maxVisible));
  const exceedMax = clients.length > maxVisible;

  const visible = useMemo(() => {
    const start = page * maxVisible;
    return clients.slice(start, start + maxVisible);
  }, [clients, page, maxVisible]);

  // Navigation bubble counts:
  //   • Forward "+X" represents how many logos remain ahead from the
  //     START of the current page — including the ones currently shown.
  //     Page 0 with 56 total + 15 per page → +56, +41, +26, +11.
  //   • Back "-Y" represents how many logos have been left behind in
  //     prior pages. Page 0 → 0 (hidden), page 1 → 15, etc.
  const forwardCount  = exceedMax ? clients.length - page * maxVisible : 0;
  const backwardCount = page * maxVisible;
  const hasForward    = exceedMax && page < totalPages - 1;
  const hasBack       = page > 0;

  // Reset hover state when paging
  useEffect(() => {
    setHoveredIndex(null);
  }, [page]);

  const diff = 1 - overlap / 100;
  const baseGap = size * (overlap / 100);
  const neededGap = (size * (1 + focusScale)) / 2;
  const shift = Math.max(0, neededGap - baseGap);

  const handleKey = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') setHoveredIndex(index);
  };

  const goToNextPage = () => {
    setPage((p) => (p + 1) % totalPages);
  };
  const goToPrevPage = () => {
    setPage((p) => (p - 1 + totalPages) % totalPages);
  };

  // Build the row as a typed list: optional back bubble at index 0,
  // then visible logos, then optional forward bubble at the end.
  type RowItem =
    | { kind: 'back'; count: number }
    | { kind: 'logo'; client: { name: string; logo: string } }
    | { kind: 'forward'; count: number };

  const items: RowItem[] = [
    ...(hasBack ? [{ kind: 'back' as const, count: backwardCount }] : []),
    ...visible.map((client) => ({ kind: 'logo' as const, client })),
    ...(hasForward ? [{ kind: 'forward' as const, count: forwardCount }] : []),
  ];

  // Single shared key per page so AnimatePresence treats the whole
  // group as a unit, fading out the old page before fading in the new.
  const pageKey = `clients-page-${page}`;

  return (
    // Card-deck transition between pages:
    //   • The outgoing page swipes off to the LEFT with a tilt — like
    //     flicking the top card off a deck.
    //   • The incoming page rises FROM UNDERNEATH (initial state =
    //     slightly smaller, lower, faded), so it feels like the next
    //     card was already there in the stack and is now exposed.
    // The two phases overlap (default AnimatePresence sync) so during
    // the swipe the new page is visibly waiting under the old one.
    // `clipPath: inset(top right bottom left)` with NEGATIVE top/bottom
    // expands the clip box vertically — tooltips and hover-scaled
    // avatars escape upwards; logos swiping off get clipped horizontally
    // so they never push the page wider.
    <div
      className="client-avatars relative w-full"
      style={{
        height: size,
        perspective: '900px',
        clipPath: 'inset(-120px 0 -120px 0)',
      }}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={pageKey}
          // Enter: rises from "under" the previous card — slightly smaller
          //   and lower, fades up into position.
          initial={{ scale: 0.92, y: 14, opacity: 0.35 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          // Exit: swipes off to the left with a rotation, like discarding
          //   the top card of a deck.
          exit={{ x: '-110%', rotate: -16, opacity: 0 }}
          transition={{
            // Faster enter so the new page settles by the time the old
            // one finishes its swipe out — feels stacked, not laggy.
            scale:   { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            y:       { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            x:       { duration: 0.55, ease: [0.32, 0, 0.67, 0] },
            rotate:  { duration: 0.55, ease: [0.32, 0, 0.67, 0] },
          }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformOrigin: 'center center' }}
        >
          {items.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const shouldShift = hoveredIndex !== null && index > hoveredIndex;
            const zIndex = isHovered ? items.length + 1 : index;

            // ── Navigation bubble (back or forward) ──────────────────
            if (item.kind === 'back' || item.kind === 'forward') {
              const isBack = item.kind === 'back';
              const label = isBack ? `-${item.count}` : `+${item.count}`;
              const ariaLabel = isBack
                ? `-${item.count} ${moreSuffix}`
                : `+${item.count} ${moreSuffix}`;
              return (
                <motion.button
                  key={item.kind}
                  type="button"
                  aria-label={ariaLabel}
                  className="relative outline-none rounded-full focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep cursor-pointer p-0 border-0 bg-transparent"
                  style={{
                    width: size,
                    height: size,
                    zIndex,
                    marginLeft: index === 0 ? 0 : -size * diff,
                  }}
                  onClick={isBack ? goToPrevPage : goToNextPage}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  // The +X / -Y bubbles also need to participate in the
                  // sibling-shift dance, otherwise their stationary
                  // position lets the logos that shifted past them slip
                  // partially behind, which looked broken.
                  animate={{
                    scale: isHovered ? 1.08 : 1,
                    x: shouldShift ? shift : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 240, damping: 20 }}
                  whileTap={{ scale: 0.94 }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/70 shadow-[0_6px_20px_rgba(0,0,0,0.18)] flex items-center justify-center bg-gradient-to-br from-teal-dark to-teal text-white font-mono text-sm font-semibold">
                    {label}
                  </div>
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        role="tooltip"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 bottom-full mb-3 z-50 pointer-events-none"
                      >
                        <div className="transform -translate-x-1/2 whitespace-nowrap rounded-md bg-navy-deep/95 backdrop-blur-md border border-white/15 text-white text-xs font-mono tracking-wider px-3 py-1.5 shadow-xl">
                          {moreSuffix}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            }

            // ── Client avatar ────────────────────────────────────────
            const client = item.client;
            const shouldScale = isHovered;

            return (
              <motion.div
                key={client.name}
                role="img"
                aria-label={client.name}
                className="relative outline-none rounded-full focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
                style={{
                  width: size,
                  height: size,
                  zIndex,
                  marginLeft: index === 0 ? 0 : -size * diff,
                  cursor: 'pointer',
                }}
                tabIndex={0}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
                onKeyDown={(e) => handleKey(e, index)}
                animate={{
                  scale: shouldScale ? focusScale : 1,
                  x: shouldShift ? shift : 0,
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              >
                <div className="client-avatar-bubble w-full h-full rounded-full overflow-hidden border-2 border-white/70 bg-white shadow-[0_6px_20px_rgba(0,0,0,0.18)] flex items-center justify-center">
                  <img
                    src={client.logo}
                    alt={client.name}
                    width={size}
                    height={size}
                    loading="lazy"
                    decoding="async"
                    className="w-[78%] h-[78%] object-contain transition-all duration-300"
                  />
                </div>

                <AnimatePresence>
                  {shouldScale && (
                    <motion.div
                      role="tooltip"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 bottom-full mb-3 z-50 pointer-events-none"
                    >
                      <div className="transform -translate-x-1/2 whitespace-nowrap rounded-md bg-navy-deep/95 backdrop-blur-md border border-white/15 text-white text-xs font-mono tracking-wider px-3 py-1.5 shadow-xl">
                        {client.name}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Clients() {
  const { t, lang } = useLang();

  // Responsive: show fewer avatars on smaller screens
  const [{ size, maxVisible }, setConfig] = useState(() => getResponsiveConfig());

  useEffect(() => {
    const handleResize = () => setConfig(getResponsiveConfig());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="clients" className="py-14 sm:py-20 border-t border-white/10 overflow-hidden">
      <div className="px-6 md:px-14 lg:px-28 flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal mb-6"
          >
            <div className="w-8 h-px bg-teal" />
            {t.clients.label}
          </motion.div>

          <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-normal">
            <Suspense fallback={
              <span className="inline-block opacity-0">
                {t.clients.headingPre} {t.clients.headingEm}
              </span>
            }>
              <SplitText
                key={`clients-heading-${lang}`}
                className="inline-block"
                delay={40}
                duration={1}
                splitType="chars"
                from={{ opacity: 0, y: 20 }}
                to={{ opacity: 1, y: 0 }}
              >
                {t.clients.headingPre} <em className="italic text-teal">{t.clients.headingEm}</em>
              </SplitText>
            </Suspense>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[0.55rem] tracking-[0.15em] uppercase text-gray-300"
        >
          {t.clients.sub}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-6 px-4 sm:px-6 md:px-14 lg:px-28 pt-8 pb-2"
      >
        <ClientAvatars
          clients={CLIENTS}
          size={size}
          maxVisible={maxVisible}
          moreSuffix={t.clients.moreSuffix}
        />

        <p className="font-mono text-[0.6rem] sm:text-[0.65rem] tracking-[0.25em] uppercase text-gray-300 mt-6 text-center">
          <span className="text-teal font-semibold">+{CLIENTS.length}</span>{' '}
          {t.clients.countLabel}
        </p>
      </motion.div>
    </section>
  );
}

function getResponsiveConfig() {
  // maxVisible is also the page size for the "+X" pager.
  if (typeof window === 'undefined') return { size: 64, maxVisible: 15 };
  const w = window.innerWidth;
  if (w >= 1280) return { size: 68, maxVisible: 15 };
  if (w >= 1024) return { size: 64, maxVisible: 13 };
  if (w >= 768)  return { size: 58, maxVisible: 11 };
  if (w >= 480)  return { size: 52, maxVisible: 8 };
  return { size: 48, maxVisible: 6 };
}
