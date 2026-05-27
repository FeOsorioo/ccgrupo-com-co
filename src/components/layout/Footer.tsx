import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Linkedin, Instagram, Facebook, Youtube } from 'lucide-react';
import { useLang } from '../../i18n';
import ThemedLogo from '../ui/ThemedLogo';

interface Props {
  onNavigate?: (view: string) => void;
}

const scrollToService = (id: string, onNavigate?: (view: string) => void) => {
  const targetId = `service-${id}`;
  const alreadyOnHome = !!document.getElementById(targetId);

  if (alreadyOnHome) {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  // Not on home: switch view first, then wait for the Services section to mount.
  onNavigate?.('home');
  // handleNavigate calls window.scrollTo(0,0); give it a frame, then anchor-scroll.
  setTimeout(() => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 200);
};

export default function Footer({ onNavigate }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLang();

  const logoFallback = (
    <div className="w-8 h-8 border-2 border-teal rounded-md flex items-center justify-center font-mono text-[0.55rem] font-bold text-teal">
      CCG
    </div>
  );

  return (
    <footer className="bg-navy-deep pt-16 sm:pt-20 pb-10 sm:pb-12 px-4 sm:px-6 md:px-14 lg:px-28 border-t border-white/10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-14 mb-12 sm:mb-16">
        <div className="lg:col-span-2 min-w-0 text-center sm:text-left">
          <div
            className="flex items-center justify-center sm:justify-start gap-3 mb-5 sm:mb-6 min-h-[2.5rem] min-w-0"
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
                    className="h-16 sm:h-20 w-auto max-w-[11rem] sm:max-w-none object-contain"
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
          <p className="font-body text-sm font-light leading-relaxed text-gray-200 max-w-xs mx-auto sm:mx-0 mb-4 sm:mb-5 min-w-0">
            {t.footer.description}
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-3 max-w-xs mx-auto sm:mx-0 min-w-0">
            <div className="w-5 h-px bg-teal/50 shrink-0" />
            <span className="font-mono text-xs tracking-[0.15em] uppercase text-teal/70 leading-relaxed">
              {t.footer.tagline}
            </span>
          </div>
        </div>

        <div className="text-center sm:text-left">
          <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-gray-300 mb-4 sm:mb-6">{t.footer.servicesTitle}</h3>
          <ul className="space-y-3 sm:space-y-4">
            {t.footer.serviceLinks.map(item => (
              <li key={item.id}>
                <a
                  href={`#service-${item.id}`}
                  onClick={(e) => { e.preventDefault(); scrollToService(item.id, onNavigate); }}
                  className="font-body text-sm font-light text-gray-200 hover:text-teal transition-colors text-center sm:text-left inline-block"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-gray-300 mb-4 sm:mb-6">{t.footer.companyTitle}</h3>
          <ul className="space-y-3 sm:space-y-4">
            {t.footer.companyLinks.map(item => (
              <li key={item.name}>
                {item.href.startsWith('http') ? (
                  <a href={item.href} target="_blank" rel="noreferrer" className="font-body text-sm font-light text-gray-200 hover:text-teal transition-colors">{item.name}</a>
                ) : item.href === 'contact' ? (
                  <button onClick={() => onNavigate?.('contact')} className="font-body text-sm font-light text-gray-200 hover:text-teal transition-colors">{item.name}</button>
                ) : (
                  <a href={item.href} className="font-body text-sm font-light text-gray-200 hover:text-teal transition-colors">{item.name}</a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-gray-300 mb-4 sm:mb-6">{t.footer.contactTitle}</h3>
          <div className="space-y-3 sm:space-y-4 font-body text-sm font-light text-gray-200">
            <p className="font-body text-sm font-light leading-relaxed">{t.footer.contact.address}</p>
            <p className="font-body text-sm font-light leading-relaxed">{t.footer.location}</p>
            <a href={`mailto:${t.footer.contact.email}`} className="font-body text-sm font-light block hover:text-teal transition-colors">{t.footer.contact.email}</a>
            <a href="tel:+573016125291" className="font-body text-sm font-light block hover:text-teal transition-colors">{t.footer.contact.phone}</a>
          </div>
        </div>
      </div>

      <div className="pt-8 sm:pt-10 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center lg:items-center gap-5 sm:gap-6 text-center lg:text-left">
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4 min-w-0">
          <span className="font-mono text-xs tracking-[0.12em] uppercase text-gray-300">
            {t.footer.copyright}
          </span>
          <button
            onClick={() => onNavigate?.('privacy')}
            className="font-mono text-xs tracking-[0.12em] uppercase text-gray-300 hover:text-teal transition-colors"
          >
            {t.footer.privacy}
          </button>
        </div>

        <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 sm:gap-4">
          {[
            { Icon: Linkedin,  href: 'https://www.linkedin.com/company/contact-center-grupo-sas', label: 'LinkedIn' },
            { Icon: Instagram, href: 'https://www.instagram.com/contact_center_grupo/',                    label: 'Instagram' },
            { Icon: Facebook,  href: 'https://www.facebook.com/CONTACTCENTERGROUP',               label: 'Facebook' },
            { Icon: Youtube,   href: 'https://www.youtube.com/channel/UCK1VihHdl_RjnuLkG5rhopQ', label: 'YouTube' },
          ].map(({ Icon, href, label }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center text-gray-200 hover:border-teal hover:text-teal hover:bg-teal/10 transition-all duration-300"
            >
              <Icon size={14} />
            </a>
          ))}
          <a
            href={t.nav.contactHref}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center text-gray-200 hover:border-teal hover:text-teal hover:bg-teal/10 transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>

        <span className="font-mono text-xs tracking-[0.12em] uppercase text-gray-300 max-w-full text-center lg:text-right">
          {t.footer.location}
        </span>
      </div>
    </footer>
  );
}
