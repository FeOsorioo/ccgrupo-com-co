import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        const next = prev + Math.floor(Math.random() * 6) + 3;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-navy-deep z-[50000] flex flex-col items-center justify-center gap-8"
      exit={{ opacity: 0, pointerEvents: 'none' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="font-mono text-xs tracking-[0.5em] uppercase text-gray-200">
        Contact Center <b className="text-teal font-medium">Grupo</b>
      </div>
      <div className="font-display text-[clamp(4rem,12vw,9rem)] leading-none text-gradient">
        {count}
      </div>
      <div className="w-[180px] h-[1px] bg-gray-400 overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-teal-dark to-teal-bright"
          style={{ width: `${count}%` }}
        />
      </div>
      <div className="font-mono text-[0.55rem] tracking-[0.4em] uppercase text-gray-300">
        Cargando experiencia
      </div>
    </motion.div>
  );
}
