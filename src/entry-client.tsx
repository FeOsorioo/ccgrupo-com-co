import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';
import './index.css';

function initGoogleAnalytics() {
  const gaId = import.meta.env.VITE_GA_ID;
  if (!gaId || gaId.length < 6 || typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };

  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    wait_for_update: 500,
  });

  const CONSENT_TTL_MS = 180 * 24 * 60 * 60 * 1000;
  const raw = localStorage.getItem('ccg_cookie_consent');
  if (raw) {
    try {
      const stored = raw === 'accepted' || raw === 'rejected'
        ? { value: raw as 'accepted' | 'rejected', ts: Date.now() }
        : (JSON.parse(raw) as { value: 'accepted' | 'rejected'; ts: number });
      if (stored.value === 'accepted' && (Date.now() - stored.ts) < CONSENT_TTL_MS) {
        window.gtag('consent', 'update', { analytics_storage: 'granted' });
      }
    } catch {
      // malformed consent data — leave as denied
    }
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  window.gtag('js', new Date());
  window.gtag('config', gaId, { anonymize_ip: true });
}

initGoogleAnalytics();

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <App initialPath={window.location.pathname} />
  </StrictMode>,
);
