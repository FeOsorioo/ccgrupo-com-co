import { motion } from 'motion/react';
import { Building2, ArrowLeftRight, Wifi } from 'lucide-react';
import { HexagonBackground } from '../ui/hexagon-background';
import { useLang } from '../../i18n';
import { useTheme } from '../../hooks/useTheme';

const modalityIcons = [Building2, ArrowLeftRight, Wifi];

export default function Talento() {
  const { t } = useLang();
  const ta = t.talento;
  const { isDark } = useTheme();

  return (
    <section
      id="talento"
      className={`${isDark ? 'bg-navy-deep' : 'bg-white'} py-16 sm:py-20 px-5 sm:px-6 md:px-14 lg:px-28 overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* ── LEFT COLUMN ── */}
        <div className="space-y-8">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 font-mono text-xs tracking-[0.35em] uppercase text-teal"
          >
            <div className="w-6 h-px bg-teal" />
            {ta.label}
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className={`font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.02em] ${isDark ? 'text-white' : 'text-navy-deep'}`}
          >
            <span className="block">{ta.heading}</span>
            <span className="block text-teal">{ta.headingEnd}</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-base md:text-lg font-light leading-relaxed max-w-xl ${isDark ? 'text-white/70' : 'text-gray-600'}`}
          >
            {ta.sub}
          </motion.p>

          {/* Language chips */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-3"
          >
            <p className={`font-mono text-[0.6rem] tracking-[0.3em] uppercase ${isDark ? 'text-white/50' : 'text-gray-400'}`}>
              {ta.langsLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {ta.langs.map((lang, i) => (
                <span
                  key={lang}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-teal/30 bg-teal/5 text-sm font-medium ${isDark ? 'text-white' : 'text-navy-deep'}`}
                >
                  <span className="text-base leading-none" aria-hidden="true">
                    {ta.langFlags[i]}
                  </span>
                  {lang}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Modality cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-3 gap-3"
          >
            {ta.modalities.map((mod, i) => {
              const Icon = modalityIcons[i];
              return (
                <div
                  key={mod.title}
                  className={`border rounded-xl p-4 text-center hover:border-teal/40 hover:-translate-y-1 transition-all duration-300 ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-gray-200 bg-white'}`}
                >
                  <Icon
                    size={22}
                    strokeWidth={1.5}
                    className="mx-auto mb-2 text-teal"
                  />
                  <p className={`font-semibold text-xs mb-1 ${isDark ? 'text-white' : 'text-navy-deep'}`}>
                    {mod.title}
                  </p>
                  <p className={`text-[0.65rem] leading-snug ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                    {mod.desc}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="space-y-5">
          {/* Geo section title */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`relative rounded-2xl overflow-hidden ${isDark ? 'border border-white/10' : 'border border-gray-100'}`}
          >
            <HexagonBackground
              className="absolute inset-0 bg-transparent"
              hexagonSize={36}
              hexagonMargin={3}
              hexagonProps={{
                className:
                  'before:bg-teal/5 dark:before:bg-teal/5 after:bg-transparent dark:after:bg-transparent transition-colors duration-500',
              }}
            >
              <div className="relative z-10 px-5 py-4">
                <p className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-teal mb-1">
                  {ta.label}
                </p>
                <p className={`text-sm font-semibold leading-snug ${isDark ? 'text-white' : 'text-navy-deep'}`}>
                  {ta.geoTitle}
                </p>
              </div>
            </HexagonBackground>
          </motion.div>

          {/* Country grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {ta.countries.map((country, i) => (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`flex items-center gap-3 border rounded-xl p-3 ${
                  country.active
                    ? 'border-teal/40 bg-teal/5'
                    : isDark ? 'border-white/10 bg-white/[0.03]' : 'border-gray-200 bg-white'
                }`}
              >
                <span className="text-2xl leading-none flex-shrink-0" aria-hidden="true">
                  {ta.countryFlags[i]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={`font-semibold text-sm leading-tight truncate ${isDark ? 'text-white' : 'text-navy-deep'}`}>
                    {country.name}
                  </p>
                  <p className={`text-xs leading-tight truncate ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                    {country.region}
                  </p>
                </div>
                {country.active && (
                  <span className="flex-shrink-0 bg-teal text-navy-deep text-[9px] font-bold px-2 py-0.5 rounded-full ml-auto whitespace-nowrap">
                    Activa
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="flex items-center gap-5"
          >
            <span className={`flex items-center gap-1.5 text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
              <span className="w-2.5 h-2.5 rounded-full bg-teal flex-shrink-0" />
              {ta.legendActive}
            </span>
            <span className={`flex items-center gap-1.5 text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
              <span className="w-2.5 h-2.5 rounded-full bg-gray-300 flex-shrink-0" />
              {ta.legendExplored}
            </span>
          </motion.div>

          {/* Bottom badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-teal/10 border border-teal/30 rounded-xl px-4 py-2 text-sm text-teal font-semibold">
              🌍 {ta.badge}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
