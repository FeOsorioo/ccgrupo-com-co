import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle, ChevronDown, Network, Zap, BarChart3 } from 'lucide-react';
import Footer from '../layout/Footer';
import BackgroundEffects from '../ui/BackgroundEffects';
import { HexagonBackground } from '../ui/hexagon-background';
import ThemedLogo from '../ui/ThemedLogo';
import { getServiceById } from '../../data';
import { useLang } from '../../i18n';

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

  if (!service) return null;

  const sm       = t.serviceModule;
  const sd       = t.serviceDetails[serviceId as keyof typeof t.serviceDetails];
  const si       = t.services.items[serviceId as keyof typeof t.services.items];
  const title    = si?.title    ?? service.title;
  const subtitle = si?.subtitle ?? service.subtitle;
  const showIconPlaceholder = !service.details.heroImage || imageError;

  const homeCrumb = t.nav.links[0]?.name ?? (lang === 'en' ? 'Home' : 'Inicio');
  const servicesCrumb = t.nav.links[2]?.name ?? (lang === 'en' ? 'Services' : 'Servicios');
  const backHomeLabel = lang === 'en' ? 'Back to home' : 'Volver al inicio';

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
      { rel: 'alternate',  href: `${BASE}${path}`,     hreflang: 'es-co' },
      { rel: 'alternate',  href: `${BASE}/en${path}`,  hreflang: 'en'    },
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
    <div className="min-h-screen bg-navy text-white relative">
      <BackgroundEffects />

      {/* Custom Navbar for Module */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-14 py-6 flex justify-between items-center bg-navy-deep/85 backdrop-blur-xl border-b border-white/5">
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

      <main className="pt-32 pb-20 px-6 md:px-14 lg:px-28 relative z-10">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
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
            <p className="text-xl font-light leading-relaxed text-gray-200 mb-10">
              {sd?.longDesc ?? service.details.longDesc}
            </p>
            <div className="flex flex-wrap gap-3">
              {(sd?.tags ?? service.tags).map(tag => (
                <span key={tag} className="font-mono text-xs tracking-wider uppercase px-4 py-2 border border-white/10 rounded-full text-teal bg-teal/5">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {showIconPlaceholder ? (
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-teal/20 relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`} />
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
                      <div className="w-24 h-24 border border-teal/30 rounded-3xl flex items-center justify-center bg-navy-deep/60 backdrop-blur-md mx-auto mb-4">
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
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 relative group">
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

            {/* Decorative icon badge */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-teal/20 rounded-full flex items-center justify-center bg-navy-deep/80 backdrop-blur-md">
              <service.icon size={48} className="text-teal" strokeWidth={1} />
            </div>
          </motion.div>
        </div>

        {/* Features & Benefits */}
        <div className="grid lg:grid-cols-3 gap-12 border-t border-white/10 pt-20">
          <div className="lg:col-span-1">
            <h3 className="font-display text-3xl mb-8">{sm.features}</h3>
            <ul className="space-y-6">
              {(sd?.features ?? service.details.features).map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-4 group"
                >
                  <CheckCircle size={20} className="text-teal shrink-0 mt-1 group-hover:text-white transition-colors" />
                  <span className="text-gray-300 font-light">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-3xl mb-8">{sm.benefits}</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {(sd?.benefits ?? service.details.benefits).map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors rounded-xl"
                >
                  <h4 className="font-mono text-sm uppercase tracking-widest text-teal mb-4">{benefit.title}</h4>
                  <p className="text-gray-300 font-light leading-relaxed">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Sub-products (AVA Suite, etc.) */}
        {localizedSubProducts && localizedSubProducts.length > 0 && (
          <div className="mt-24 border-t border-white/10 pt-20">
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

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {localizedSubProducts.map((product, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300 rounded-2xl group"
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

        {/* FAQ */}
        {(sd?.faq ?? service.details.faq) && (sd?.faq ?? service.details.faq)!.length > 0 && (
          <div className="mt-24 border-t border-white/10 pt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal mb-4">
                <div className="w-8 h-px bg-teal" />
                {sm.faqLabel}
              </div>
              <h3 className="font-display text-4xl">FAQ</h3>
            </motion.div>

            <div className="max-w-3xl space-y-3">
              {(sd?.faq ?? service.details.faq)!.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="border border-white/10 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-answer-${i}`}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.03] transition-colors"
                  >
                    <span className="font-body font-medium text-white pr-4">{item.question}</span>
                    <ChevronDown
                      size={18}
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
                        <p className="px-6 pb-6 text-gray-300 font-light leading-relaxed border-t border-white/5 pt-4">
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

        {/* Base Unificada */}
        {(() => {
          const PILLAR_ICONS = [Network, Zap, BarChart3];
          return (
            <div className="mt-24 border-t border-white/10 pt-20">
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
                <p className="font-display text-2xl md:text-4xl leading-snug text-white max-w-3xl mx-auto">
                  {sm.baseBlock.title}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                {sm.baseBlock.pillars.map((pillar, i) => {
                  const PillarIcon = PILLAR_ICONS[i];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex flex-col items-center text-center p-8 border border-teal/20 bg-teal/5 rounded-2xl"
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
        <div className="mt-24 p-12 md:p-20 border border-white/10 rounded-3xl bg-gradient-to-br from-teal/10 to-transparent text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-5xl mb-6">{sm.ctaTitle}</h2>
            <p className="text-xl font-light text-gray-300 mb-10 max-w-2xl mx-auto">
              {sm.ctaDescPre} {title} {sm.ctaDescPost}
            </p>
            <button
              onClick={() => onNavigate?.('contact')}
              className="font-mono text-sm tracking-[0.25em] uppercase px-10 py-4 bg-teal text-navy-deep hover:bg-white transition-all duration-300"
            >
              {sm.ctaButton}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
