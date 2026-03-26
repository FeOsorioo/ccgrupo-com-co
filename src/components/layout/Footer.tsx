import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Linkedin, Instagram, Facebook, Youtube } from 'lucide-react';
import { useLang } from '../../i18n';
import ThemedLogo from '../ui/ThemedLogo';

interface Props {
  onNavigate?: (view: string) => void;
}

export default function Footer({ onNavigate }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLang();

  const logoFallback = (
    <div className="w-8 h-8 border-2 border-teal rounded-md flex items-center justify-center font-mono text-[0.55rem] font-bold text-teal">
      CCG
    </div>
  );

  return (
    <footer className="bg-navy pt-20 pb-12 px-6 md:px-14 lg:px-28 border-t border-white/10">
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        <div className="lg:col-span-2">
          <div
            className="flex items-center gap-3 mb-6 cursor-pointer min-h-[2.5rem]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence mode="wait">
              {!isHovered ? (
                <motion.div
                  key="logo-img"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <ThemedLogo
                    alt="CCGrupo Logo"
                    className="h-12 w-auto object-contain"
                    fallback={logoFallback}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="logo-text"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 border-2 border-teal rounded-md flex items-center justify-center font-mono text-[0.55rem] font-bold text-teal">
                    CCG
                  </div>
                  <div className="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-white font-normal">
                    Contact Center <span className="text-teal font-semibold">Grupo</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <p className="text-sm font-light leading-relaxed text-gray-200 max-w-xs">
            {t.footer.desc}
          </p>
        </div>

        <div>
          <h5 className="font-mono text-[0.55rem] tracking-[0.25em] uppercase text-gray-300 mb-6">{t.footer.servicesTitle}</h5>
          <ul className="space-y-4">
            {t.footer.serviceLinks.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => { onNavigate?.(item.id); window.scrollTo(0, 0); }}
                  className="text-sm font-light text-gray-200 hover:text-teal transition-colors text-left"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-mono text-[0.55rem] tracking-[0.25em] uppercase text-gray-300 mb-6">{t.footer.companyTitle}</h5>
          <ul className="space-y-4">
            {t.footer.companyLinks.map(item => (
              <li key={item.name}>
                {item.href.startsWith('http') ? (
                  <a href={item.href} target="_blank" rel="noreferrer" className="text-sm font-light text-gray-200 hover:text-teal transition-colors">{item.name}</a>
                ) : item.href === 'contact' ? (
                  <button onClick={() => onNavigate?.('contact')} className="text-sm font-light text-gray-200 hover:text-teal transition-colors">{item.name}</button>
                ) : (
                  <a href={item.href} className="text-sm font-light text-gray-200 hover:text-teal transition-colors">{item.name}</a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-mono text-[0.55rem] tracking-[0.25em] uppercase text-gray-300 mb-6">{t.footer.contactTitle}</h5>
          <div className="space-y-4 text-sm font-light text-gray-200">
            <p>Cra. 20 #133 - 74, La Calleja</p>
            <p>{t.footer.location}</p>
            <a href="mailto:info@ccgrupo.com.co" className="block hover:text-teal transition-colors">info@ccgrupo.com.co</a>
            <a href="tel:+60117443732" className="block hover:text-teal transition-colors">(601) 7443732</a>
          </div>
        </div>
      </div>

      <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span className="font-mono text-[0.5rem] tracking-[0.15em] uppercase text-gray-300">
            {t.footer.copyright}
          </span>
          <button
            onClick={() => onNavigate?.('privacy')}
            className="font-mono text-[0.5rem] tracking-[0.15em] uppercase text-gray-300 hover:text-teal transition-colors"
          >
            {t.footer.privacy}
          </button>
        </div>

        <div className="flex gap-4">
          {[
            { Icon: Linkedin,  href: 'https://www.linkedin.com/company/contact-center-grupo-sas', label: 'LinkedIn' },
            { Icon: Instagram, href: 'https://www.instagram.com/contact_center_grupo/',           label: 'Instagram' },
            { Icon: Facebook,  href: 'https://www.facebook.com/CONTACTCENTERGROUP',               label: 'Facebook' },
            { Icon: Youtube,   href: 'https://www.youtube.com/channel/UCK1VihHdl_RjnuLkG5rhopQ', label: 'YouTube' },
          ].map(({ Icon, href, label }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="w-9 h-9 border border-white/10 rounded-lg flex items-center justify-center text-gray-200 hover:border-teal hover:text-teal hover:bg-teal/10 transition-all duration-300"
            >
              <Icon size={14} />
            </a>
          ))}
          <a
            href="https://www.tiktok.com/@contactcentergbpo"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
            className="w-9 h-9 border border-white/10 rounded-lg flex items-center justify-center text-gray-200 hover:border-teal hover:text-teal hover:bg-teal/10 transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
            </svg>
          </a>
        </div>

        <span className="font-mono text-[0.5rem] tracking-[0.15em] uppercase text-gray-300">
          {t.footer.location}
        </span>
      </div>
    </footer>
  );
}
