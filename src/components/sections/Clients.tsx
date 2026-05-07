import { useRef, useState, lazy, Suspense } from 'react';
import { motion } from 'motion/react';
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

export default function Clients() {
  const { t, lang } = useLang();
  const errRef = useRef<Record<number, boolean>>({});
  const [, forceRender] = useState(0);
  const track = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  const handleErr = (i: number) => {
    errRef.current[i] = true;
    forceRender(n => n + 1);
  };

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

          <div className="font-display text-[clamp(2rem,3.5vw,3rem)]">
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
          </div>
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

      {/* Marquee track */}
      <div className="clients-marquee-wrap relative overflow-hidden">
        {/* Fade edges */}
        <div className="clients-marquee-fade clients-marquee-fade-l pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#060d1f] to-transparent" />
        <div className="clients-marquee-fade clients-marquee-fade-r pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#060d1f] to-transparent" />

        {/* clients-marquee-item width set via CSS so each breakpoint shows N logos in 100vw */}
        <div className="clients-marquee flex">
          {track.map(({ name, logo }, i) => (
            <div
              key={`${name}-${i}`}
              className="clients-marquee-item shrink-0 flex items-center justify-center px-6 py-8 group"
              style={errRef.current[i] ? { display: 'none' } : undefined}
            >
              <img
                src={logo}
                alt={name}
                loading="lazy"
                onError={() => handleErr(i)}
                className="object-contain h-10 sm:h-12 w-full max-w-[100px] sm:max-w-[120px]
                           grayscale opacity-50
                           group-hover:grayscale-0 group-hover:opacity-100
                           transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
