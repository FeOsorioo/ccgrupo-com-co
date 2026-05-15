import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { useLang } from '../../i18n';

const stepIcons = [Sparkles, Zap, TrendingUp];

const stepVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.45 },
  }),
};

export default function PostingSection() {
  const { t } = useLang();
  const ps = t.postingSection;

  // Split heading at em-dash so we can highlight the second half with the
  // brand gradient ("— donde todo empieza" / "— where it all begins")
  const parts = ps.heading.split(/\s*[—–]\s*/);
  const headingMain = parts[0] ?? ps.heading;
  const headingTail = parts.slice(1).join(' — ');

  return (
    <section
      id="posting-section"
      className="posting-section relative bg-[#FAFAF7] py-20 sm:py-28 px-5 sm:px-6 md:px-14 lg:px-28 overflow-hidden"
    >
      {/* Rainbow brand accent — full-width hairline at the top */}
      <div className="absolute top-0 inset-x-0 h-[3px] posting-rainbow-bar" />

      {/* Soft rainbow blur in background */}
      <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full posting-rainbow-blur pointer-events-none" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20 items-center">

        {/* LEFT — Editorial copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-7"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 font-mono text-[0.65rem] tracking-[0.32em] uppercase text-slate-500">
            <span className="posting-rainbow-dot" />
            {ps.label}
          </div>

          {/* Heading — sans display, with gradient on the tail */}
          <h2 className="font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[1.02] tracking-[-0.025em] text-slate-900">
            {headingMain}
            {headingTail && (
              <>
                <span className="text-slate-400 font-light"> — </span>
                <span className="posting-rainbow-text italic">{headingTail}</span>
              </>
            )}
          </h2>

          {/* Paragraph */}
          <p className="text-base sm:text-[1.075rem] leading-relaxed text-slate-600 max-w-xl">
            {ps.sub}
          </p>

          {/* Capability pills — clean, white, hover lift */}
          <div className="flex flex-wrap gap-2">
            {ps.caps.map((cap) => (
              <span
                key={cap}
                className="bg-white border border-slate-200 text-slate-700 text-xs font-medium px-4 py-2 rounded-full hover:border-slate-400 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200"
              >
                {cap}
              </span>
            ))}
          </div>

          {/* CTA — solid black pill, posting style */}
          <div className="pt-2">
            <a
              href="https://www.posting.com.co"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-700 text-white font-mono text-[0.65rem] tracking-[0.22em] uppercase pl-7 pr-5 py-4 rounded-full transition-all duration-200 group shadow-[0_8px_24px_rgba(15,23,42,0.18)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.25)]"
            >
              {ps.cta.replace(/\s*↗\s*$/, '')}
              <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-slate-900 transition-transform duration-200 group-hover:rotate-45">
                <ArrowUpRight size={14} strokeWidth={2.2} />
              </span>
            </a>
          </div>
        </motion.div>

        {/* RIGHT — Formula card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          {/* Rainbow glow behind the card */}
          <div className="absolute -inset-3 posting-rainbow-glow rounded-[2rem] pointer-events-none" />

          <div className="relative bg-white border border-slate-200/80 rounded-[1.75rem] p-6 sm:p-7 shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
            {/* Card label */}
            <div className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-slate-500 mb-5">
              {ps.formula.label}
            </div>

            <div className="space-y-2">
              {ps.formula.steps.map((step, i) => {
                const Icon = stepIcons[i];
                const isLast = i === ps.formula.steps.length - 1;

                return (
                  <div key={i}>
                    <motion.div
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={stepVariants}
                      className={`flex items-start gap-4 p-4 rounded-2xl border transition-colors ${
                        isLast
                          ? 'posting-formula-final border-transparent'
                          : 'bg-slate-50 border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div
                        className={`mt-0.5 flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${
                          isLast
                            ? 'bg-slate-900 text-white'
                            : 'bg-white border border-slate-200 text-slate-700'
                        }`}
                      >
                        <Icon size={16} strokeWidth={1.8} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className={`font-semibold text-[0.95rem] mb-0.5 ${isLast ? 'text-slate-900' : 'text-slate-900'}`}>
                          {step.title}
                        </div>
                        <div className="text-[0.8rem] text-slate-500 leading-relaxed">
                          {step.desc}
                        </div>
                      </div>
                    </motion.div>

                    {/* Connector */}
                    {!isLast && (
                      <div className="flex justify-center py-1">
                        <div className="w-px h-4 bg-slate-300" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
