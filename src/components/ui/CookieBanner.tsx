import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X } from 'lucide-react';
import { useLang } from '../../i18n';

const CONSENT_KEY = 'ccg_cookie_consent';
const CONSENT_TTL_MS = 180 * 24 * 60 * 60 * 1000; // 6 months

type ConsentValue = 'accepted' | 'rejected';
interface StoredConsent { value: ConsentValue; ts: number; }

function readConsent(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    // Legacy: plain string (old format before expiry was added)
    if (raw === 'accepted' || raw === 'rejected') return { value: raw, ts: Date.now() };
    const parsed: StoredConsent = JSON.parse(raw);
    return parsed;
  } catch {
    return null;
  }
}

function isExpired(stored: StoredConsent): boolean {
  return Date.now() - stored.ts > CONSENT_TTL_MS;
}

function grantConsent(value: ConsentValue) {
  const payload: StoredConsent = { value, ts: Date.now() };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: value === 'accepted' ? 'granted' : 'denied',
      ad_storage: 'denied',
    });
  }
}

export default function CookieBanner({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const [visible, setVisible] = useState(false);
  const { t, lang } = useLang();
  const ck = t.cookie ?? {
    message: lang === 'en'
      ? 'We use cookies to improve your experience and measure site performance.'
      : lang === 'pt'
        ? 'Usamos cookies para melhorar sua experiência e medir o desempenho do site.'
        : 'Usamos cookies para mejorar tu experiencia y medir el rendimiento del sitio.',
    policy: lang === 'en' ? 'Privacy policy' : lang === 'pt' ? 'Política de privacidade' : 'Política de privacidad',
    accept: lang === 'en' ? 'Accept' : lang === 'pt' ? 'Aceitar' : 'Aceptar',
    reject: lang === 'en' ? 'Reject' : lang === 'pt' ? 'Recusar' : 'Rechazar',
  };

  useEffect(() => {
    const stored = readConsent();
    if (!stored || isExpired(stored)) {
      // Show after a short delay so it doesn't clash with preloader
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
    // Re-apply consent to gtag on page load (consent mode requires this each session)
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: stored.value === 'accepted' ? 'granted' : 'denied',
        ad_storage: 'denied',
      });
    }
  }, []);

  const handle = (value: ConsentValue) => {
    grantConsent(value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60000] w-[calc(100%-3rem)] max-w-2xl"
        >
          <div className="relative overflow-hidden bg-navy-deep/96 backdrop-blur-2xl border border-white/12 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)] px-5 py-5 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Icon */}
            <div className="w-9 h-9 rounded-xl border border-teal/30 bg-teal/10 flex items-center justify-center shrink-0">
              <Cookie size={16} className="text-teal" />
            </div>

            {/* Text */}
            <div className="flex-1 text-gray-300 font-light text-xs leading-relaxed">
              <span>{ck.message}{' '}</span>
              {onNavigate && (
                <button
                  onClick={() => { if (onNavigate) onNavigate('privacy'); }}
                  className="text-teal hover:underline"
                >
                  {ck.policy}
                </button>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => handle('rejected')}
                className="w-full sm:w-auto font-mono text-[0.5rem] tracking-[0.2em] uppercase px-4 py-2 border border-white/15 text-gray-300 hover:border-white/40 hover:text-white transition-all duration-200 rounded-lg"
              >
                {ck.reject}
              </button>
              <button
                onClick={() => handle('accepted')}
                className="w-full sm:w-auto font-mono text-[0.5rem] tracking-[0.2em] uppercase px-4 py-2 bg-teal text-navy-deep hover:bg-teal-bright transition-all duration-200 rounded-lg"
              >
                {ck.accept}
              </button>
            </div>

            {/* Dismiss */}
            <button
              onClick={() => handle('rejected')}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-300 transition-colors sm:hidden"
              aria-label={lang === 'en' ? 'Close' : 'Cerrar'}
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
