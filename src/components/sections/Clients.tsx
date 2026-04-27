import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import SplitText from '../ui/SplitText';
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

      <div className="flex w-full">
        <motion.div
          className="flex w-max"
          animate={{ x: '-50%' }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        >
          {track.map(({ name, logo }, i) => (
            <div
              key={`${name}-${i}`}
              className="w-[220px] sm:w-[280px] md:w-[320px] h-[130px] sm:h-[180px] border border-white/10 flex items-center justify-center -mr-px relative group hover:border-teal/30 hover:z-10 transition-all duration-300 bg-navy-deep shrink-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {!errRef.current[i] ? (
                <img
                  src={logo}
                  alt={name}
                  loading="lazy"
                  onError={() => handleErr(i)}
                  className="relative z-10 h-14 sm:h-24 w-auto max-w-[180px] sm:max-w-[260px] object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                />
              ) : (
                <span className="relative z-10 font-body font-medium text-white group-hover:text-white transition-colors text-base px-4 text-center leading-tight">
                  {name}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
