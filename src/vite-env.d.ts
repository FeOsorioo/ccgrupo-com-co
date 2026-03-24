/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID:  string;
  readonly VITE_EMAILJS_TEMPLATE_ID: string;
  readonly VITE_EMAILJS_PUBLIC_KEY:  string;
  readonly VITE_WHATSAPP_NUMBER:     string;
  readonly VITE_GA_ID:               string;
  readonly GEMINI_API_KEY:           string;
  readonly APP_URL:                  string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Google Analytics gtag global
interface Window {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
}
