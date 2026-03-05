import { motion } from 'motion/react';

export default function BackgroundEffects() {
  return (
    <>
      {/* Grain Effect */}
      <div className="fixed inset-[-100%] w-[300%] h-[300%] pointer-events-none z-[40] opacity-[0.03] animate-grain bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E')]"></div>

      {/* Glow Orbs */}
      <motion.div 
        animate={{ x: [0, -60, 0], y: [0, 80, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="fixed -top-[10%] -right-[5%] w-[500px] h-[500px] rounded-full bg-radial-teal opacity-30 blur-[120px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(0,180,216,0.15), transparent 70%)' }}
      />
      <motion.div 
        animate={{ x: [0, 50, 0], y: [0, -60, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-[20%] -left-[8%] w-[400px] h-[400px] rounded-full bg-radial-blue opacity-20 blur-[120px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(0,119,182,0.1), transparent 70%)' }}
      />
    </>
  );
}
