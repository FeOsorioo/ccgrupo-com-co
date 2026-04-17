import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useLang } from '../../i18n';
import { BRAND_ASSETS } from '../../config/branding';

const LOADER_CSS = `
  @keyframes ccg-box-orbit {
    0%   { transform: rotate(0deg)   scale(1)    opacity: 1;   }
    25%  { transform: rotate(90deg)  scale(0.75) opacity: 0.7; }
    50%  { transform: rotate(180deg) scale(1)    opacity: 1;   }
    75%  { transform: rotate(270deg) scale(0.75) opacity: 0.7; }
    100% { transform: rotate(360deg) scale(1)    opacity: 1;   }
  }
  @keyframes ccg-box-pulse {
    0%,100% { transform: scale(1);    opacity: 0.9; }
    50%     { transform: scale(0.55); opacity: 0.4; }
  }
  @keyframes ccg-logo-glow {
    0%,100% { filter: drop-shadow(0 0 8px rgba(0,180,216,0.5)); }
    50%     { filter: drop-shadow(0 0 20px rgba(0,229,255,0.8)); }
  }
  .ccg-loader-orbit {
    position: absolute;
    inset: 0;
    animation: ccg-box-orbit 3s linear infinite;
    transform-origin: center;
  }
  .ccg-loader-box {
    animation: ccg-box-pulse 1.2s ease-in-out infinite;
    border-radius: 10px;
  }
  .ccg-loader-logo-img {
    animation: ccg-logo-glow 2s ease-in-out infinite;
  }
`;

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount]     = useState(0);
  const [logoSrc, setLogoSrc] = useState(BRAND_ASSETS.loaderLogo);
  const [hideLogo, setHideLogo] = useState(false);
  const { lang } = useLang();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        const next = prev + Math.floor(Math.random() * 6) + 3;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 900);
          return 100;
        }
        return next;
      });
    }, 45);
    return () => clearInterval(interval);
  }, [onComplete]);

  /* Box positions: top / right / bottom / left */
  const BOXES = [
    { top: 0,    left: '50%', transform: 'translateX(-50%)', delay: '0s'    },
    { top: '50%',right: 0,   transform: 'translateY(-50%)', delay: '0.3s'  },
    { bottom: 0, left: '50%',transform: 'translateX(-50%)', delay: '0.6s'  },
    { top: '50%',left: 0,    transform: 'translateY(-50%)', delay: '0.9s'  },
  ];

  return (
    <motion.div
      className="fixed inset-0 bg-navy-deep z-[50000] flex flex-col items-center justify-center gap-10"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <style>{LOADER_CSS}</style>

      {/* ── Box ring + logo ─────────────────────────── */}
      <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>

        {/* Orbit ring (subtle) */}
        <div
          className="absolute rounded-full border border-teal/10"
          style={{ width: 140, height: 140 }}
        />
        <div
          className="absolute rounded-full border border-teal/5"
          style={{ width: 110, height: 110 }}
        />

        {/* 4 orbiting boxes */}
        {BOXES.map((pos, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: 22,
              height: 22,
              ...pos,
            }}
          >
            <div
              className="ccg-loader-box w-full h-full"
              style={{
                background: `linear-gradient(135deg, #00b4d8, #00e5ff)`,
                boxShadow: `0 0 12px rgba(0,180,216,0.5)`,
                animationDelay: pos.delay,
              }}
            />
          </div>
        ))}

        {/* Corner accent boxes (diagonal) */}
        {[
          { top: 10,   left: 10   },
          { top: 10,   right: 10  },
          { bottom: 10,left: 10   },
          { bottom: 10,right: 10  },
        ].map((pos, i) => (
          <div
            key={`corner-${i}`}
            className="absolute"
            style={{ width: 10, height: 10, ...pos }}
          >
            <div
              className="w-full h-full rounded-sm"
              style={{
                background: 'rgba(0,180,216,0.25)',
                border: '1px solid rgba(0,229,255,0.3)',
                animation: `ccg-box-pulse 1.2s ease-in-out infinite`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          </div>
        ))}

        {/* Center logo */}
        <div
          className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(0,180,216,0.15), rgba(0,229,255,0.08))',
            border: '1px solid rgba(0,180,216,0.3)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 0 30px rgba(0,180,216,0.2)',
          }}
        >
          {!hideLogo ? (
            <img
              src={logoSrc}
              alt="CCGrupo"
              className="ccg-loader-logo-img h-10 w-auto object-contain"
              onError={() => {
                if (logoSrc !== BRAND_ASSETS.legacyLogo) {
                  setLogoSrc(BRAND_ASSETS.legacyLogo);
                  return;
                }
                setHideLogo(true);
              }}
            />
          ) : (
            <span className="font-mono text-xs font-bold text-teal">CCG</span>
          )}
        </div>
      </div>

      {/* ── Counter ─────────────────────────────────── */}
      <div className="flex flex-col items-center gap-3">
        <div className="font-display text-[clamp(3rem,10vw,7rem)] leading-none text-gradient tabular-nums">
          {count}%
        </div>
        <div className="w-44 h-px bg-white/10 overflow-hidden rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-teal-dark to-teal-bright rounded-full"
            style={{ width: `${count}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="font-mono text-[0.52rem] tracking-[0.4em] uppercase text-gray-400">
          {lang === 'en' ? 'Loading experience' : 'Cargando experiencia'}
        </div>
      </div>
    </motion.div>
  );
}
