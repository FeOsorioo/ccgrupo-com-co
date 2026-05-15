import { useState } from 'react';
import { motion } from 'motion/react';
import { BRAND_ASSETS } from '../../config/branding';

export default function PageLoader() {
  const [logoSrc, setLogoSrc] = useState(BRAND_ASSETS.loaderLogo);
  const [showFallbackMark, setShowFallbackMark] = useState(false);

  return (
    <div className="fixed inset-0 z-[9999] bg-navy-deep flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-6"
      >
        {!showFallbackMark ? (
          <img
            src={logoSrc}
            alt="CCGrupo"
            width={192}
            height={192}
            decoding="async"
            className="w-[160px] sm:w-[176px] md:w-[192px] h-auto max-w-none object-contain"
            onError={() => {
              if (logoSrc !== BRAND_ASSETS.legacyLogo) {
                setLogoSrc(BRAND_ASSETS.legacyLogo);
                return;
              }
              setShowFallbackMark(true);
            }}
          />
        ) : (
          <div className="w-[160px] h-[160px] sm:w-[176px] sm:h-[176px] md:w-[192px] md:h-[192px] border-2 border-teal rounded-2xl flex items-center justify-center">
            <span className="font-mono text-3xl md:text-4xl font-bold text-teal tracking-wider">CCG</span>
          </div>
        )}

        {/* Progress bar */}
        <div className="w-32 h-px bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-teal to-teal-bright"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </div>
  );
}
