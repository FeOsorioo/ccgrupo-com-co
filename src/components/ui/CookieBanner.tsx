import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X } from 'lucide-react';
import { useLang } from '../../i18n';

const CONSENT_KEY = 'ccg_cookie_consent';

type ConsentValue = 'accepted' | 'rejected';

function grantConsent(value: ConsentValue) {
  localStorage.setItem(CONSENT_KEY, value);
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: value === 'accepted' ? 'granted' : 'denied',
      ad_storage: 'denied',
    });
  }
}

export default function CookieBanner({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const [visible, setVisible] = useState(false);
  const { t } = useLang();
  const ck = t.cookie;

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      // Show after a short delay so it doesn't clash with preloader
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
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
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9700] w-[calc(100%-3rem)] max-w-2xl"
        >
          <div className="bg-navy border border-white/15 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)] px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Icon */}
            <div className="w-9 h-9 rounded-xl border border-teal/30 bg-teal/10 flex items-center justify-center shrink-0">
              <Cookie size={16} className="text-teal" />
            </div>

            {/* Text */}
            <p className="flex-1 text-gray-300 font-light text-xs leading-relaxed">
              {ck.message}{' '}
              {onNavigate && (
                <button
                  onClick={() => { handle('accepted'); onNavigate('privacy'); }}
                  className="text-teal hover:underline"
                >
                  {ck.policy}
                </button>
              )}
            </p>

            {/* Actions */}
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => handle('rejected')}
                className="font-mono text-[0.5rem] tracking-[0.2em] uppercase px-4 py-2 border border-white/15 text-gray-300 hover:border-white/40 hover:text-white transition-all duration-200 rounded-lg"
              >
                {ck.reject}
              </button>
              <button
                onClick={() => handle('accepted')}
                className="font-mono text-[0.5rem] tracking-[0.2em] uppercase px-4 py-2 bg-teal text-navy-deep hover:bg-teal-bright transition-all duration-200 rounded-lg"
              >
                {ck.accept}
              </button>
            </div>

            {/* Dismiss */}
            <button
              onClick={() => handle('rejected')}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-300 transition-colors sm:hidden"
              aria-label="Cerrar"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
