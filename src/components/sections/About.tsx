import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect, lazy, Suspense } from 'react';
import ScrambledText from '../ui/ScrambledText';
import SplitText from '../ui/SplitText';
import { useLang } from '../../i18n';

const LiquidEther = lazy(() => import('../ui/LiquidEther'));

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      let start = 0;
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
    { val: 4,  suffix: '',  label: t.about.stats[2] },
    { val: 92, suffix: '%', label: t.about.stats[3] },
  ];

  return (
    <section id="about" className="py-32 px-6 md:px-14 lg:px-28 grid lg:grid-cols-2 gap-24 items-center relative overflow-hidden">
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

      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal"
        >
          <div className="w-8 h-px bg-teal" />
          {t.about.label}
        </motion.div>

        <div className="font-display text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.1]">
          <SplitText
            key={`about-heading-${lang}`}
            className="inline-block"
            delay={30}
            duration={1}
            splitType="words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
          >
            {t.about.headingPre} <span className="text-teal font-medium italic">BPO</span> {t.about.headingPost}
          </SplitText>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg font-light leading-relaxed text-gray-200"
        >
          <ScrambledText className="inline" scrambleChars="!@#$%^&*()_+-=[]{}|;:,.<>?/~" radius={150} duration={0.8}>
            {`${t.about.descPre} `}
          </ScrambledText>
          <em className="italic text-gradient font-medium">BPO</em>
          <ScrambledText className="inline" scrambleChars="!@#$%^&*()_+-=[]{}|;:,.<>?/~" radius={150} duration={0.8}>
            {` ${t.about.descPost}`}
          </ScrambledText>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-lg font-light leading-relaxed text-gray-200"
        >
          {t.about.evoPre} <em className="italic text-gradient">BPO</em> {t.about.evoMid} <strong className="text-white font-medium">{t.about.evoStrong}</strong>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pl-6 border-l-2 border-teal font-display text-2xl italic text-teal"
        >
          {t.about.quote}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-10 border border-white/10 relative overflow-hidden group hover:border-teal/30 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="font-display text-6xl leading-none text-gradient mb-2">
                <Counter target={stat.val} suffix={stat.suffix} />
              </div>
              <div className="font-mono text-[0.55rem] tracking-[0.15em] uppercase text-gray-300 mt-4 leading-relaxed">
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
