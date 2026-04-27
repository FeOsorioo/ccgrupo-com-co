import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { useLang } from '../../i18n';

const LiquidEther = lazy(() => import('../ui/LiquidEther'));

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const startTime = performance.now();
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(ease * target));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const { t, lang } = useLang();
  const stats = [
    { val: 15, suffix: '+', label: t.about.stats[0] },
    { val: 40, suffix: '%', label: t.about.stats[1] },
    { val: 5,  suffix: '',  label: t.about.stats[2] },
    { val: 92, suffix: '%', label: t.about.stats[3] },
  ];

  return (
    <section id="about" className="relative overflow-hidden py-28 md:py-32 px-6 md:px-14 lg:px-28 bg-navy-deep">
      <div className="absolute inset-0 opacity-20 pointer-events-none -z-10">
        <Suspense fallback={null}>
          <LiquidEther
            colors={['#0f1d35', '#0077b6', '#060d1f']}
            mouseForce={20} cursorSize={100} isViscous viscous={30}
            iterationsViscous={32} iterationsPoisson={32} resolution={0.5}
            isBounce={false} autoDemo autoSpeed={0.5} autoIntensity={2.2}
            takeoverDuration={0.25} autoResumeDelay={3000} autoRampDuration={0.6}
          />
        </Suspense>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-20 items-start lg:items-center">
        <div className="space-y-8 max-w-2xl lg:pr-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal"
          >
            <div className="w-8 h-px bg-teal" />
            {t.about.label}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.08] tracking-[-0.03em]"
          >
            <span className="block text-white">{t.about.headingPre}</span>
            <span className="block text-teal">{t.about.headingHighlight}</span>
            <span className="block text-white/70 text-[0.62em] mt-3 leading-tight">{t.about.headingPost}</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="p-6 md:p-7 border border-white/10 bg-white/[0.03] rounded-2xl"
          >
            <p className="text-lg md:text-xl font-light leading-relaxed text-white/90">
              {t.about.desc}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="grid gap-3"
          >
            <div className="font-mono text-[0.55rem] tracking-[0.3em] uppercase text-teal/70">
              {lang === 'en' ? 'What we align' : lang === 'pt' ? 'O que alinhamos' : 'Lo que ordenamos'}
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {t.about.highlights.map((item) => (
                <div key={item} className="px-4 py-3 rounded-xl border border-teal/20 bg-teal/5 text-sm text-white/85 leading-snug">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="p-5 border border-teal/20 bg-navy-deep/40 rounded-2xl"
          >
            <p className="font-display text-xl md:text-2xl italic text-teal leading-snug">
              {t.about.quote}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 self-center justify-self-center lg:justify-self-end w-full max-w-[34rem]">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 md:p-10 border border-white/10 rounded-2xl relative overflow-hidden group hover:border-teal/30 hover:-translate-y-1 transition-all duration-300 bg-navy-deep/30 flex flex-col items-center text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="font-display text-6xl leading-none text-gradient mb-2 text-center">
                  <Counter target={stat.val} suffix={stat.suffix} />
                </div>
                <div className="font-mono text-xs tracking-[0.15em] uppercase text-white mt-4 leading-relaxed text-center">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
