import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import CircularText from '../ui/CircularText';
import { useLang } from '../../i18n';

interface Props {
  onNavigate?: (view: string) => void;
}

export default function Hero({ onNavigate }: Props) {
  const { t, lang } = useLang();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();
  const y1      = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroCopy = lang === 'en'
    ? {
        line1: 'Technology drives us,',
        line2: 'people',
        line3a: 'inspire',
        line3b: 'us.',
        desc: 'We integrate technology, processes and knowledge to build solutions that make your business more agile, efficient and profitable.',
      }
    : {
        line1: 'La tecnología nos impulsa,',
        line2: 'las personas',
        line3a: 'nos',
        line3b: 'inspiran.',
        desc: 'Integramos tecnología, procesos y conocimiento para construir soluciones que hacen tu negocio más ágil, eficiente y rentable.',
      };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    class Particle {
      x: number; y: number; vx: number; vy: number; r: number; o: number;
      constructor() {
        this.x  = Math.random() * w;
        this.y  = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.r  = Math.random() * 1.5 + 0.5;
        this.o  = Math.random() * 0.3 + 0.05;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }
      draw() {
        if (!ctx) return;
        const light = document.documentElement.classList.contains('light');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = light
          ? `rgba(0,100,180,${this.o * 2.8})`
          : `rgba(0,180,216,${this.o})`;
        ctx.fill();
      }
    }

    const particles: Particle[] = Array.from({ length: 60 }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => { p.update(); p.draw(); });
      const light = document.documentElement.classList.contains('light');
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x, dy = p1.y - p2.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = light
              ? `rgba(0,100,180,${0.15 * (1 - d / 150)})`
              : `rgba(0,180,216,${0.05 * (1 - d / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-6 pt-32 pb-24">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />


      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="font-display text-[clamp(3.2rem,8.5vw,8.5rem)] leading-[1.05] tracking-tight font-normal">
          <div className="overflow-hidden">
            <motion.div initial={{ y: '115%' }} animate={{ y: 0 }} transition={{ delay: 2.1, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}>
              {heroCopy.line1}
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div initial={{ y: '115%' }} animate={{ y: 0 }} transition={{ delay: 2.3, duration: 1.3, ease: [0.16, 1, 0.3, 1] }} className="italic text-gradient">
              {heroCopy.line2}
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div initial={{ y: '115%' }} animate={{ y: 0 }} transition={{ delay: 2.5, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}>
              {heroCopy.line3a} <span className="italic text-gradient">{heroCopy.line3b}</span>
            </motion.div>
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.9 }}
          className="max-w-xl mt-10 text-lg font-light leading-relaxed text-gray-200"
        >
          {heroCopy.desc}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.9 }}
          className="flex flex-wrap justify-center gap-5 mt-12"
        >
          <button
            onClick={() => onNavigate?.('contact')}
            className="group relative font-mono text-label tracking-[0.2em] uppercase px-10 py-4 bg-gradient-to-br from-teal-dark to-teal text-white overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(0,180,216,0.35)]"
          >
            <span className="relative z-10">{t.hero.cta1}</span>
            <div className="absolute inset-0 bg-gradient-to-br from-teal to-teal-bright opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-mono text-label tracking-[0.2em] uppercase px-10 py-4 bg-transparent border border-white/10 text-gray-100 hover:border-teal hover:text-teal hover:bg-teal/10 transition-all duration-300"
          >
            {t.hero.cta2}
          </button>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="font-mono text-label tracking-[0.35em] uppercase text-gray-300">{t.hero.scroll}</span>
        <div className="w-px h-12 bg-gradient-to-b from-teal to-transparent animate-pulse" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.8, duration: 1 }}
        className="absolute bottom-10 right-10 hidden lg:block z-20"
      >
        <CircularText text="CONTACT*CENTER*GRUPO*BPO*" onHover="speedUp" spinDuration={20} className="text-teal font-mono text-xs" />
      </motion.div>
    </section>
  );
}
