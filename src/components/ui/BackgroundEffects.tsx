import { motion } from 'motion/react';
import { useTheme } from '../../hooks/useTheme';

export default function BackgroundEffects() {
  const { isDark } = useTheme();

  return (
    <>
      {/* Glow Orb — top right */}
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -60, 0], y: [0, 80, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed -top-[10%] -right-[5%] w-[500px] h-[500px] rounded-full pointer-events-none z-0 will-change-transform"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(0,180,216,0.15), transparent 70%)'
            : 'radial-gradient(circle, rgba(0,119,182,0.2), transparent 65%)',
          opacity: isDark ? 0.3 : 0.5,
          filter: 'blur(120px)',
        }}
      />

      {/* Glow Orb — bottom left */}
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 50, 0], y: [0, -60, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed bottom-[20%] -left-[8%] w-[400px] h-[400px] rounded-full pointer-events-none z-0 will-change-transform"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(0,119,182,0.1), transparent 70%)'
            : 'radial-gradient(circle, rgba(0,150,199,0.16), transparent 65%)',
          opacity: isDark ? 0.2 : 0.4,
          filter: 'blur(120px)',
        }}
      />
    </>
  );
}
