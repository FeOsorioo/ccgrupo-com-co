import { useState, useEffect, type FC } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle, ChevronDown, Network, Zap, BarChart3 } from 'lucide-react';
import Footer from '../layout/Footer';
import BackgroundEffects from '../ui/BackgroundEffects';
import { HexagonBackground } from '../ui/hexagon-background';
import ThemedLogo from '../ui/ThemedLogo';
import TiltCard from '../ui/TiltCard';
import { getServiceById } from '../../data';
import { useLang } from '../../i18n';

// ── Mock UI illustrations — bilingual, theme-aware, 5 unique variants ───────
function createWhyMocks(lang: string): FC[] {
  const isEn = lang === 'en';
  const s = {
    inbox:      isEn ? 'Active inbox'              : 'Bandeja activa',
    unattended: isEn ? '+127 unattended'            : '+127 sin atender',
    waiting:    isEn ? 'Waiting for response…'     : 'Esperando respuesta…',
    coverage:   isEn ? 'Time coverage'             : 'Cobertura horaria',
    covered:    isEn ? 'Covered'                   : 'Cubierto',
    noCoverage: isEn ? 'No coverage'               : 'Sin cobertura',
    dashboard:  isEn ? 'Control panel'             : 'Panel de control',
    respTime:   isEn ? 'Resp. time'                : 'T. respuesta',
    resolved:   isEn ? 'Resolved'                  : 'Resueltos',
    open:       isEn ? 'Open'                      : 'Abiertos',
    noVisib:    isEn ? 'No operation visibility'   : 'Sin visibilidad',
    scaleCost:  isEn ? 'Cost to scale'             : 'Costo de escalar',
    internal:   isEn ? 'Internal'                  : 'Interno',
    outsource:  isEn ? 'Outsource = less cost'     : 'Externalizar = menos costo',
    dbTitle:    isEn ? 'Lead database'             : 'Base de leads',
    dormant:    isEn ? 'Dormant leads'             : 'Leads dormidos',
    noContact:  isEn ? 'Never contacted'           : 'Sin contactar',
    lastSeen:   isEn ? 'Last activity'             : 'Últ. actividad',
  };

  const rowCls   = 'flex items-center gap-2 px-2 py-1.5 rounded-lg border';
  const cellCls  = 'p-2 rounded-lg border';
  const rowStyle = { background: 'color-mix(in srgb, var(--c-fg) 5%, transparent)', borderColor: 'color-mix(in srgb, var(--c-fg) 8%, transparent)' };
  const fgStyle  = { color: 'var(--c-fg)' };

  return [
    // 0 — Chat inbox overflow
    () => (
      <div className="p-3 flex flex-col gap-1.5">
        <div className="flex items-center justify-between mb-1">
          <span className="font-mono text-[0.42rem] tracking-widest text-teal/60 uppercase">{s.inbox}</span>
          <span className="font-mono text-[0.42rem] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full border border-red-400/20">{s.unattended}</span>
        </div>
        {(['Juan P.', 'María L.', 'Carlos H.', 'Ana R.']).map((name, i) => (
          <div key={i} className={rowCls} style={rowStyle}>
            <div className="w-5 h-5 rounded-full bg-teal/20 border border-teal/30 flex items-center justify-center text-[0.4rem] font-bold text-teal shrink-0">{name[0]}</div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="text-[0.5rem] font-medium" style={fgStyle}>{name}</span>
                <span className="text-gray-500 text-[0.4rem]">{(i + 1) * 3}min</span>
              </div>
              <div className="text-gray-500 text-[0.4rem] truncate">{s.waiting}</div>
            </div>
            <div className="w-3.5 h-3.5 rounded-full bg-teal/80 text-navy-deep flex items-center justify-center text-[0.38rem] font-bold shrink-0">{i + 2}</div>
          </div>
        ))}
      </div>
    ),

    // 1 — Coverage gaps (24/7)
    () => (
      <div className="p-3">
        <div className="font-mono text-[0.42rem] tracking-widest text-teal/60 uppercase mb-2">{s.coverage}</div>
        <div className="grid grid-cols-7 gap-0.5 mb-2">
          {(isEn ? ['M','T','W','T','F','S','S'] : ['L','M','X','J','V','S','D']).map((d, col) => (
            <div key={col} className="flex flex-col items-center gap-0.5">
              <span className="font-mono text-[0.38rem] text-gray-400">{d}</span>
              {[0,1,2,3].map(row => (
                <div key={row} className={`h-4 w-full rounded-sm ${col < 5 && row < 2 ? 'bg-teal/30 border border-teal/20' : 'bg-red-500/20 border border-red-500/20'}`} />
              ))}
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-teal/30 border border-teal/20" /><span className="text-gray-400 text-[0.4rem]">{s.covered}</span></div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-red-500/20 border border-red-500/20" /><span className="text-gray-400 text-[0.4rem]">{s.noCoverage}</span></div>
        </div>
      </div>
    ),

    // 2 — Real-time metrics (unknown)
    () => (
      <div className="p-3">
        <div className="font-mono text-[0.42rem] tracking-widest text-teal/60 uppercase mb-2">{s.dashboard}</div>
        <div className="grid grid-cols-2 gap-1.5 mb-2">
          {[{ label: s.respTime, value: '?? min' }, { label: s.resolved, value: '?? %' }, { label: s.open, value: '???' }, { label: 'CSAT', value: '??/10' }].map((m, i) => (
            <div key={i} className={cellCls} style={rowStyle}>
              <div className="font-mono text-[0.38rem] text-gray-400 mb-0.5">{m.label}</div>
              <div className="font-mono text-sm font-bold text-red-400/70">{m.value}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
          <span className="text-[0.4rem] text-amber-400/80">{s.noVisib}</span>
        </div>
      </div>
    ),

    // 3 — Internal cost vs CCGrupo
    () => (
      <div className="p-3">
        <div className="font-mono text-[0.42rem] tracking-widest text-teal/60 uppercase mb-2">{s.scaleCost}</div>
        <div className="flex items-end justify-center gap-6 mb-2">
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 rounded-t-md bg-gradient-to-t from-red-500/40 to-red-500/10 border border-red-500/30 flex items-start justify-center pt-1" style={{ height: '72px' }}>
              <span className="font-mono text-[0.4rem] text-red-400">↑↑↑</span>
            </div>
            <span className="font-mono text-[0.4rem] text-gray-400">{s.internal}</span>
            <span className="font-mono text-[0.4rem] text-red-400 font-bold">$$$$$</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 rounded-t-md bg-gradient-to-t from-teal/40 to-teal/10 border border-teal/30 flex items-start justify-center pt-1" style={{ height: '40px' }}>
              <span className="font-mono text-[0.4rem] text-teal">↑</span>
            </div>
            <span className="font-mono text-[0.4rem] text-gray-400">CCGrupo</span>
            <span className="font-mono text-[0.4rem] text-teal font-bold">$</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-teal/10 border border-teal/20">
          <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse shrink-0" />
          <span className="text-[0.4rem] text-teal/80">{s.outsource}</span>
        </div>
      </div>
    ),

    // 4 — Dormant lead database (unused contacts)
    () => (
      <div className="p-3">
        <div className="font-mono text-[0.42rem] tracking-widest text-teal/60 uppercase mb-2">{s.dbTitle}</div>
        <div className="space-y-1 mb-2">
          {[
            { id: '#1042', tag: isEn ? 'Cold' : 'Frío',     days: isEn ? '47d ago' : 'hace 47d',  pct: 82 },
            { id: '#0891', tag: isEn ? 'Old'  : 'Antiguo',  days: isEn ? '120d ago': 'hace 120d', pct: 64 },
            { id: '#1198', tag: s.noContact,                 days: '—',                            pct: 0  },
            { id: '#0734', tag: isEn ? 'Cold' : 'Frío',     days: isEn ? '60d ago' : 'hace 60d',  pct: 55 },
          ].map((lead, i) => (
            <div key={i} className={rowCls} style={rowStyle}>
              <span className="font-mono text-[0.38rem] text-teal/60 shrink-0">{lead.id}</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="font-mono text-[0.38rem] text-amber-400/80">{lead.tag}</span>
                  <span className="text-gray-500 text-[0.38rem]">{lead.days}</span>
                </div>
                <div className="w-full h-1 rounded-full bg-white/10">
                  <div className="h-1 rounded-full bg-amber-400/50" style={{ width: `${lead.pct}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
          <span className="text-[0.4rem] text-amber-400/80">{s.dormant}: 847 {isEn ? 'contacts' : 'contactos'}</span>
        </div>
      </div>
    ),
  ];
}

interface ServiceModuleProps {
  serviceId: string;
  onBack: () => void;
  onNavigate?: (view: string) => void;
}

const AUTONOMOUS_SUBPRODUCTS_EN: Record<string, { name: string; tagline?: string; desc: string }> = {
  '01': {
    name: 'AVA Assistant',
    tagline: 'Flagship Product',
    desc: 'Autonomous personal assistant available 24/7 through WhatsApp, Signal and Telegram. Executes tasks, answers requests and supports internal and commercial processes with no interruptions.',
  },
  '02': {
    name: 'AVA Chat',
    desc: 'AI-powered support on WebChat, WhatsApp and chat channels. Resolves inquiries, manages requests and escalates to a human when needed.',
  },
  '03': {
    name: 'AVA Bot',
    desc: 'AI voice agent for inbound and outbound calls. It speaks, understands and acts in real time with natural intonation and advanced language processing.',
  },
  '04': {
    name: 'AVA Leads',
    desc: 'Qualifies, nurtures and automatically follows up leads until booking or close. Integrates with CRM and notifies the human team at the right moment.',
  },
  '05': {
    name: 'AVA Social',
    desc: 'Agent that manages social networks by answering messages, handling comments and reactions as a 24/7 digital community manager.',
  },
  '06': {
    name: 'WhatsApp AI',
    desc: 'Support and sales channel powered by AI directly in WhatsApp Business. Automates responses, qualifies leads and closes opportunities in the highest-usage channel.',
  },
};

export default function ServiceModule({ serviceId, onBack, onNavigate }: ServiceModuleProps) {
  const service = getServiceById(serviceId);
  const [imageError, setImageError] = useState(false);
  const [openFaq, setOpenFaq]       = useState<number | null>(null);
  const { t, lang } = useLang();
  const whyMocks = createWhyMocks(lang);

  if (!service) return null;

  type ServiceDetailsContent = {
    longDesc?: string;
    tags?: string[];
    features?: string[];
    benefits?: { title: string; desc: string }[];
    faq?: { question: string; answer: string }[];
    ctaTitle?: string;
    ctaDesc?: string;
    whatWeDoDesc?: string;
    whatWeDoBoxes?: { title: string; desc: string }[];
    whyYouNeedUsItems?: { title: string; desc: string }[];
    whatYouCanAchieveItems?: string[];
    midBanner?: { title?: string; desc?: string; buttonLabel?: string };
  };

  const sm       = t.serviceModule;
  const sd       = (t.serviceDetails[serviceId as keyof typeof t.serviceDetails] ?? {}) as ServiceDetailsContent;
  const si       = t.services.items[serviceId as keyof typeof t.services.items];
  const title    = si?.title    ?? service.title;
  const subtitle = si?.subtitle ?? service.subtitle;
  const showIconPlaceholder = !service.details.heroImage || imageError;

  const homeCrumb = t.nav.links[0]?.name ?? t.common.home;
  const servicesCrumb = t.nav.links[2]?.name ?? t.common.services;
  const backHomeLabel = t.common.backHome;

  const localizedSubProducts = service.subProducts?.map((product) => {
    if (lang !== 'en' || service.id !== '03') return product;
    const translated = AUTONOMOUS_SUBPRODUCTS_EN[product.number];
    return translated ? { ...product, ...translated } : product;
  });

  // SEO: dynamic page title
  useEffect(() => {
    const prev = document.title;
    document.title = `${title} | CCGrupo`;
    return () => { document.title = prev; };
  }, [title]);

  // SEO: dynamic OG / Twitter / description meta
  useEffect(() => {
    const BASE = 'https://ccgrupo.com.co';
    const path = `/servicio/${serviceId}`;
    const desc = (sd?.longDesc ?? service.details.longDesc).slice(0, 160);
    const fullTitle = `${title} | CCGrupo`;

    const selectors: Record<string, [string, string]> = {
      ogTitle:  ['meta[property="og:title"]',          'content'],
      ogDesc:   ['meta[property="og:description"]',    'content'],
      ogUrl:    ['meta[property="og:url"]',            'content'],
      twTitle:  ['meta[name="twitter:title"]',         'content'],
      twDesc:   ['meta[name="twitter:description"]',   'content'],
      metaDesc: ['meta[name="description"]',           'content'],
    };

    const prev: Record<string, string> = {};
    const updates: Record<string, string> = {
      ogTitle: fullTitle, ogDesc: desc, ogUrl: `${BASE}${path}`,
      twTitle: fullTitle, twDesc: desc, metaDesc: desc,
    };

    Object.entries(selectors).forEach(([key, [sel, attr]]) => {
      const el = document.querySelector(sel);
      if (el) {
        prev[key] = el.getAttribute(attr) ?? '';
        el.setAttribute(attr, updates[key]);
      }
    });

    return () => {
      Object.entries(selectors).forEach(([key, [sel, attr]]) => {
        const el = document.querySelector(sel);
        if (el && prev[key] !== undefined) el.setAttribute(attr, prev[key]);
      });
    };
  }, [serviceId, title, sd?.longDesc, service.details.longDesc]);

  // SEO: BreadcrumbList + hreflang per service page
  useEffect(() => {
    const BASE = 'https://ccgrupo.com.co';
    const path = `/servicio/${serviceId}`;

    const linkDefs = [
      { rel: 'canonical',  href: `${BASE}${path}` },
      { rel: 'alternate',  href: `${BASE}${path}`,     hreflang: 'es-co'     },
      { rel: 'alternate',  href: `${BASE}/en${path}`,  hreflang: 'en'        },
      { rel: 'alternate',  href: `${BASE}/pt${path}`,  hreflang: 'pt'        },
      { rel: 'alternate',  href: `${BASE}${path}`,     hreflang: 'x-default' },
    ];
    const linkEls = linkDefs.map(attrs => {
      const el = document.createElement('link');
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      el.setAttribute('data-service', serviceId);
      document.head.appendChild(el);
      return el;
    });

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-service', serviceId);
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: homeCrumb,     item: `${BASE}/`          },
        { '@type': 'ListItem', position: 2, name: servicesCrumb, item: `${BASE}/#services` },
        { '@type': 'ListItem', position: 3, name: title,         item: `${BASE}${path}`    },
      ],
    });
    document.head.appendChild(script);

    return () => {
      [...linkEls, script].forEach(el => el.remove());
    };
  }, [serviceId, title, homeCrumb, servicesCrumb]);

  return (
    <div className="service-module-root min-h-screen bg-navy-deep text-white relative overflow-x-hidden">
      <BackgroundEffects />

      {/* Custom Navbar for Module */}
      <nav className="service-module-nav fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-14 py-4 sm:py-6 flex justify-between items-center bg-navy-deep/85 backdrop-blur-xl border-b border-white/5">
        <button
          type="button"
          aria-label={backHomeLabel}
          className="flex items-center gap-3 cursor-pointer bg-transparent border-0 p-0"
          onClick={onBack}
        >
          <ThemedLogo
            alt="CCGrupo Logo"
            className="h-12 w-auto object-contain"
            fallback={(
              <div className="w-8 h-8 border-2 border-teal rounded-md flex items-center justify-center font-mono text-[0.55rem] font-bold text-teal">
                CCG
              </div>
            )}
          />
        </button>
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-teal hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          {t.back}
        </button>
      </nav>

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 md:px-14 lg:px-28 relative z-10">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 xl:gap-16 items-start mb-16 sm:mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal mb-6">
              <div className="w-8 h-px bg-teal" />
              {sm.servicePrefix} {service.id}
            </div>
            <h1 className="font-display text-[clamp(3rem,5vw,5rem)] leading-[1.1] mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="font-mono text-sm tracking-[0.2em] uppercase text-teal mb-8">
                {subtitle}
              </p>
            )}
            <p className="text-lg sm:text-xl font-light leading-relaxed text-gray-200 mb-8 sm:mb-10 max-w-3xl">
              {sd?.longDesc ?? service.details.longDesc}
            </p>
            <div className="flex flex-wrap gap-3 mb-8 max-w-3xl">
              {(sd?.tags ?? service.tags).map(tag => (
                <span key={tag} className="font-mono text-xs tracking-wider uppercase px-4 py-2 border border-white/10 rounded-full text-teal bg-teal/5">
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => onNavigate?.('contact')}
              className="inline-flex items-center gap-2 font-mono text-sm tracking-[0.2em] uppercase px-7 sm:px-8 py-3 border border-teal text-teal hover:bg-teal hover:text-navy-deep transition-all duration-300 cursor-pointer"
            >
              {sm.hablemos}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {showIconPlaceholder ? (
              <div className="service-module-panel aspect-[4/3] rounded-2xl overflow-hidden border border-teal/20 relative w-full">
                <div className={`service-panel-bg absolute inset-0 bg-gradient-to-br ${service.gradient}`} />
                <HexagonBackground
                  className="absolute inset-0 bg-transparent"
                  hexagonSize={40}
                  hexagonMargin={4}
                  hexagonProps={{
                    className: 'before:bg-white/5 dark:before:bg-white/5 after:bg-transparent dark:after:bg-transparent hover:before:bg-teal/30 dark:hover:before:bg-teal/30 transition-colors duration-500',
                  }}
                >
                  <div className="flex items-center justify-center h-full w-full relative z-10">
                    <div className="text-center">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 border border-teal/30 rounded-3xl flex items-center justify-center bg-navy-deep/60 backdrop-blur-md mx-auto mb-4">
                        <service.icon size={48} className="text-teal" strokeWidth={0.75} />
                      </div>
                      <div className="font-mono text-[0.55rem] tracking-[0.3em] uppercase text-gray-300">
                        {title}
                      </div>
                    </div>
                  </div>
                </HexagonBackground>
              </div>
            ) : (
              <div className="service-module-panel aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 relative group">
                <div className="absolute inset-0 bg-teal/20 mix-blend-overlay z-10" />
                <img
                  src={service.details.heroImage}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={() => setImageError(true)}
                />
              </div>
            )}

            {/* Decorative icon badge — hidden on small screens to avoid overflow */}
            <div className="hidden sm:flex absolute -bottom-8 -left-8 lg:-bottom-10 lg:-left-10 w-32 h-32 sm:w-40 sm:h-40 border border-teal/20 rounded-full items-center justify-center bg-navy-deep/80 backdrop-blur-md">
              <service.icon size={48} className="text-teal" strokeWidth={1} />
            </div>
          </motion.div>
        </div>

        {/* ¿Qué hacemos? */}
        {sd?.whatWeDoBoxes && sd.whatWeDoBoxes.length > 0 && (
          <div className="mt-20 sm:mt-24 border-t border-white/10 pt-16 sm:pt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <div className="flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal mb-4">
                <div className="w-8 h-px bg-teal" />
                {sm.whatWeDo}
              </div>
              {sd.whatWeDoDesc && (
                <p className="text-lg font-light text-gray-200 leading-relaxed max-w-3xl">{sd.whatWeDoDesc}</p>
              )}
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {sd.whatWeDoBoxes.map((box, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="service-module-card p-6 sm:p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:-translate-y-1 transition-all duration-300 rounded-xl"
                >
                  <div className="font-mono text-[0.45rem] tracking-[0.3em] uppercase text-teal/60 mb-3">0{i + 1}</div>
                  <h4 className="font-mono text-sm uppercase tracking-widest text-teal mb-3">{box.title}</h4>
                  <p className="text-gray-300 font-light leading-relaxed">{box.desc}</p>
                  {service.id === '01' && i === 3 && (
                    <button
                      onClick={() => onNavigate?.('03')}
                      className="mt-4 font-mono text-xs tracking-wider uppercase text-teal hover:text-white transition-colors cursor-pointer underline underline-offset-4"
                    >
                      {t.common.learnAboutAA}
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Sub-products (AVA Suite, etc.) */}
        {localizedSubProducts && localizedSubProducts.length > 0 && (
          <div className="mt-20 sm:mt-24 border-t border-white/10 pt-16 sm:pt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal mb-4">
                <div className="w-8 h-px bg-teal" />
                {sm.productSuite}
              </div>
              <h3 className="font-display text-4xl">{sm.ourAgents}</h3>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {localizedSubProducts.map((product, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="service-module-card service-module-feature p-6 sm:p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-teal/30 hover:-translate-y-1 transition-all duration-300 rounded-2xl group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl border border-teal/20 bg-teal/5 flex items-center justify-center shrink-0 group-hover:border-teal/50 transition-colors">
                      <product.icon size={22} className="text-teal" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-gray-400 mb-0.5">
                        AVA {product.number}
                      </div>
                      <h4 className="font-display text-lg leading-tight">{product.name}</h4>
                    </div>
                  </div>
                  {product.tagline && (
                    <div className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-teal mb-3 px-3 py-1 border border-teal/30 rounded-full inline-block bg-teal/5">
                      {product.tagline}
                    </div>
                  )}
                  <p className="text-gray-300 font-light text-sm leading-relaxed">{product.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ¿Por qué nos necesitas? — TiltCards */}
        {sd?.whyYouNeedUsItems && sd.whyYouNeedUsItems.length > 0 && (
          <div className="mt-14 sm:mt-16 border-t border-white/10 pt-12 sm:pt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <div className="flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal mb-3">
                <div className="w-8 h-px bg-teal" />
                {sm.whyYouNeedUs}
              </div>
            </motion.div>

            <div
              className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
              style={{ ['--why-cols' as string]: sd.whyYouNeedUsItems.length }}
            >
              {sd.whyYouNeedUsItems.map((item, i) => {
                const MockUI = whyMocks[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="h-full"
                  >
                    <TiltCard className="h-full">
                      <div className="service-module-tile h-full flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-navy-deep/80 backdrop-blur-sm hover:border-teal/30 transition-colors duration-300">
                        {/* Mock UI illustration */}
                        <div className="bg-gradient-to-br from-teal/5 to-navy-deep border-b border-white/[0.07] min-h-[130px] sm:min-h-[160px]">
                          <MockUI />
                        </div>
                        {/* Text content */}
                        <div className="p-5 flex flex-col gap-2 flex-1">
                          <div className="font-mono text-[0.5rem] tracking-[0.3em] uppercase text-teal/50">
                            {String(i + 1).padStart(2, '0')}
                          </div>
                          <h4 className="font-mono text-sm uppercase tracking-wide text-white leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-white/70 font-light text-sm leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                        {/* Bottom teal line on hover */}
                        <div className="h-px w-full bg-gradient-to-r from-teal/50 via-teal/20 to-transparent" />
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* FAQ · ¿Qué puedes lograr? — 2-col layout */}
        {(() => {
          const faqItems   = sd?.faq ?? service.details.faq;
          const hasFaq     = faqItems && faqItems.length > 0;
          const hasAchieve = sd?.whatYouCanAchieveItems && sd.whatYouCanAchieveItems.length > 0;
          if (!hasFaq && !hasAchieve) return null;

          return (
            <div className="mt-14 sm:mt-16 border-t border-white/10 pt-12 sm:pt-16">
              <div className={`grid gap-8 sm:gap-10 ${hasFaq && hasAchieve ? 'lg:grid-cols-2' : ''}`}>

                {/* FAQ */}
                {hasFaq && (
                  <div>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="mb-6"
                    >
                      <div className="flex items-center gap-3 font-mono text-xs tracking-[0.35em] uppercase text-teal mb-2">
                        <div className="w-6 h-px bg-teal" />
                        {sm.faqLabel}
                      </div>
                      <h3 className="font-display text-2xl">FAQ</h3>
                    </motion.div>
                    <div className="space-y-2">
                      {faqItems!.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.06 }}
                          className="service-module-accordion border border-white/10 rounded-xl overflow-hidden"
                        >
                          <button
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            aria-expanded={openFaq === i}
                            aria-controls={`faq-answer-${i}`}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.03] transition-colors gap-3"
                          >
                            <span className="font-body font-medium text-white text-sm">{item.question}</span>
                            <ChevronDown
                              size={15}
                              className={`text-teal shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                            />
                          </button>
                          <AnimatePresence>
                            {openFaq === i && (
                              <motion.div
                                id={`faq-answer-${i}`}
                                role="region"
                                aria-label={item.question}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                              >
                                <p className="px-4 pb-4 text-gray-300 font-light text-sm leading-relaxed border-t border-white/5 pt-3">
                                  {item.answer}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ¿Qué puedes lograr con nosotros? */}
                {hasAchieve && (
                  <div>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="mb-6"
                    >
                      <div className="flex items-center gap-3 font-mono text-xs tracking-[0.35em] uppercase text-teal mb-2">
                        <div className="w-6 h-px bg-teal" />
                        {sm.whatYouCanAchieve}
                      </div>
                    </motion.div>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {sd!.whatYouCanAchieveItems!.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="service-module-achievement flex items-start gap-3 group p-3 rounded-lg hover:bg-white/[0.02] transition-colors"
                        >
                          <CheckCircle size={15} className="text-teal shrink-0 mt-0.5 group-hover:text-white transition-colors" />
                          <span className="text-gray-300 font-light text-sm">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })()}

        {/* Mid-page banner (services 02 and 04) */}
        {sd?.midBanner?.title && (
          <div className="mt-20 sm:mt-24 border-t border-white/10 pt-16 sm:pt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 sm:p-10 lg:p-12 border border-teal/20 bg-teal/5 rounded-2xl text-center"
            >
              <p className="font-display text-2xl sm:text-3xl md:text-4xl text-white mb-3">{sd.midBanner.title}</p>
              {sd.midBanner.desc && (
                <p className="text-base sm:text-lg font-light text-gray-200 mb-8 max-w-2xl mx-auto">{sd.midBanner.desc}</p>
              )}
              <button
                onClick={() => onNavigate?.('contact')}
                className="font-mono text-sm tracking-[0.25em] uppercase px-7 sm:px-8 py-3 bg-teal text-navy-deep hover:bg-white transition-all duration-300 cursor-pointer"
              >
                {sd.midBanner.buttonLabel}
              </button>
            </motion.div>
          </div>
        )}

        {/* Base Unificada */}
        {(() => {
          const PILLAR_ICONS = [Network, Zap, BarChart3];
          return (
            <div className="mt-20 sm:mt-24 border-t border-white/10 pt-16 sm:pt-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-14"
              >
                <div className="inline-flex items-center gap-3 font-mono text-[0.6rem] tracking-[0.35em] uppercase text-teal mb-5">
                  <div className="w-6 h-px bg-teal" />
                  {sm.baseBlock.label}
                  <div className="w-6 h-px bg-teal" />
                </div>
                <p className="font-display text-xl sm:text-2xl md:text-4xl leading-snug text-white max-w-3xl mx-auto">
                  {sm.baseBlock.title}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
                {sm.baseBlock.pillars.map((pillar, i) => {
                  const PillarIcon = PILLAR_ICONS[i];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex flex-col items-center text-center p-6 sm:p-8 border border-teal/20 bg-teal/5 rounded-2xl hover:-translate-y-1 hover:border-teal/40 transition-all duration-300"
                    >
                      <div className="w-14 h-14 rounded-xl border border-teal/30 bg-teal/10 flex items-center justify-center mb-5">
                        <PillarIcon size={24} className="text-teal" strokeWidth={1.5} />
                      </div>
                      <div className="font-mono text-[0.45rem] tracking-[0.3em] uppercase text-teal/60 mb-2">0{i + 1}</div>
                      <h4 className="font-mono text-sm uppercase tracking-widest text-white mb-3">{pillar.title}</h4>
                      <p className="text-gray-300 font-light text-sm leading-relaxed">{pillar.desc}</p>
                    </motion.div>
                  );
                })}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center font-mono text-[0.55rem] tracking-[0.2em] uppercase text-gray-400 max-w-2xl mx-auto"
              >
                {sm.baseBlock.guarantee}
              </motion.p>
            </div>
          );
        })()}

        {/* CTA */}
        <div className="service-module-cta mt-16 sm:mt-20 lg:mt-24 p-6 sm:p-12 md:p-20 border border-white/10 rounded-3xl bg-gradient-to-br from-teal/10 to-transparent text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-6">{sd?.ctaTitle ?? sm.ctaTitle}</h2>
            <p className="text-base sm:text-xl font-light text-gray-300 mb-10 max-w-2xl mx-auto">
              {sd?.ctaDesc ?? `${sm.ctaDescPre} ${title} ${sm.ctaDescPost}`}
            </p>
            <button
              onClick={() => onNavigate?.('contact')}
              className="font-mono text-sm tracking-[0.25em] uppercase px-10 py-4 bg-teal text-navy-deep hover:bg-white transition-all duration-300 cursor-pointer"
            >
              {sm.ctaButton}
            </button>
          </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
