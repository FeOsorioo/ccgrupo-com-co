import { useState, useEffect, lazy, Suspense, type KeyboardEvent } from 'react';
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
  /** Max number of visible avatars before showing +X bubble */
  maxVisible: number;
  /** Overlap percentage between avatars (0–100) */
  overlap?: number;
  /** Hover scale factor */
  focusScale?: number;
  /** Suffix for the +X bubble ("más" / "more" / "mais") */
  moreSuffix: string;
}

function ClientAvatars({
  clients,
  size,
  maxVisible,
  overlap = 55,
  focusScale = 1.25,
  moreSuffix,
}: ClientAvatarsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const exceedMax = clients.length > maxVisible;
  // Reserve last slot for the "+X" bubble when we overflow
  const visibleCount = exceedMax ? maxVisible : clients.length;
  const visible = clients.slice(0, visibleCount);

  const diff = 1 - overlap / 100;
  const baseGap = size * (overlap / 100);
  const neededGap = (size * (1 + focusScale)) / 2;
  const shift = Math.max(0, neededGap - baseGap);

  const handleKey = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') setHoveredIndex(index);
  };

  // Total items in the row = visible avatars + (maybe) the +X bubble
  const total = visibleCount + (exceedMax ? 1 : 0);

  return (
    <div className="client-avatars flex items-center justify-center relative">
      {Array.from({ length: total }).map((_, index) => {
        const isLengthBubble = exceedMax && index === visibleCount;
        const client = visible[index];
        const isHovered = hoveredIndex === index;

        // Length bubble does not scale (it's not a real client)
        const shouldScale = isHovered && !isLengthBubble;
        // Siblings to the right shift away to make room for hovered item
        const shouldShift = hoveredIndex !== null && index > hoveredIndex;
        const zIndex = isHovered ? total + 1 : index;

        return (
          <motion.div
            key={isLengthBubble ? 'more-bubble' : client.name}
            role="img"
            aria-label={isLengthBubble ? `+${clients.length - maxVisible} ${moreSuffix}` : client.name}
            className="relative outline-none rounded-full focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
            style={{
              width: size,
              height: size,
              zIndex,
              marginLeft: index === 0 ? 0 : -size * diff,
              cursor: isLengthBubble ? 'default' : 'pointer',
            }}
            tabIndex={isLengthBubble ? -1 : 0}
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
            {/* Bubble */}
            <div className="client-avatar-bubble w-full h-full rounded-full overflow-hidden border-2 border-white/70 bg-white shadow-[0_6px_20px_rgba(0,0,0,0.18)] flex items-center justify-center">
              {isLengthBubble ? (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-teal-dark to-teal text-white font-mono text-sm font-semibold">
                  +{clients.length - maxVisible}
                </div>
              ) : (
                <img
                  src={client.logo}
                  alt={client.name}
                  width={size}
                  height={size}
                  loading="lazy"
                  decoding="async"
                  className="w-[78%] h-[78%] object-contain transition-all duration-300"
                />
              )}
            </div>

            {/* Tooltip on hover */}
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
    <section id="clients" className="py-24 border-t border-white/10 overflow-hidden">
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

      {/* Avatar stack — clients with hover-to-reveal name */}
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
  if (typeof window === 'undefined') return { size: 64, maxVisible: 14 };
  const w = window.innerWidth;
  if (w >= 1280) return { size: 68, maxVisible: 16 };
  if (w >= 1024) return { size: 64, maxVisible: 13 };
  if (w >= 768)  return { size: 58, maxVisible: 11 };
  if (w >= 480)  return { size: 52, maxVisible: 8 };
  return { size: 48, maxVisible: 6 };
}
