import { Fragment, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLang, type Lang } from '../../i18n';
import ThemedLogo from '../ui/ThemedLogo';

interface Props {
  onNavigate?: (view: string) => void;
  hidden?: boolean;
}

export default function Navbar({ onNavigate, hidden = false }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileOpen] = useState(false);
  const [isLangOpen, setLangOpen] = useState(false);
  const { isDark, toggle } = useTheme();
  const { lang, t, setLanguage } = useLang();
  const langRef = useRef<HTMLDivElement>(null);

  const labels = {
    goHome: t.common.goHome,
    languageGroup: t.common.selectLanguage,
    themeToggle: t.common.themeToggle,
    openMenu: t.common.openMenu,
    closeMenu: t.common.closeMenu,
    menuDialog: t.common.menuDialog,
  };

  const languages: { code: Lang; label: string }[] = [
    { code: 'es', label: 'ES' },
    { code: 'en', label: 'EN' },
    { code: 'pt', label: 'PT' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    if (href === '#hero') {
      onNavigate?.('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      onNavigate?.('home');
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
          className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 sm:px-6 md:px-14 lg:px-28 py-2 sm:py-2.5 flex items-center justify-between ${
          hidden ? 'pointer-events-none -translate-y-4 opacity-0' : 'opacity-100'
        } ${
          isScrolled ? 'bg-navy-deep/80 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        {/* Logo container */}
        <button
          onClick={() => scrollToSection('#hero')}
          className="relative z-50 transition-transform duration-300 hover:scale-[1.02]"
          aria-label={labels.goHome}
        >
          <ThemedLogo className="h-10 sm:h-11 w-auto" />
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-5">
          <ul className="flex gap-5">
            {t.nav.links.map((link) => (
              <li key={link.name}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-white hover:text-teal transition-colors relative group pb-1"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-teal transition-all duration-300 group-hover:w-full" />
                  </a>
                ) : (
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-white hover:text-teal transition-colors relative group pb-1"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-teal transition-all duration-300 group-hover:w-full" />
                  </button>
                )}
              </li>
            ))}
          </ul>

          {/* Language Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 h-9 font-mono text-label tracking-[0.15em] text-white hover:text-teal transition-colors px-3 border border-white/10 rounded-lg hover:border-teal/30"
              aria-label={labels.languageGroup}
              aria-expanded={isLangOpen}
            >
              <Globe size={14} className="text-teal" />
              <span>{lang.toUpperCase()}</span>
              <ChevronDown size={12} className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 right-0 w-32 bg-navy-deep/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 font-mono text-xs tracking-wider transition-colors hover:bg-white/5 flex items-center justify-between ${
                        lang === l.code ? 'text-teal bg-teal/5' : 'text-white'
                      }`}
                    >
                      {l.label}
                      {lang === l.code && <div className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_8px_#00b4d8]" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Animated theme toggle — desktop */}
          <motion.button
            onClick={toggle}
            aria-label={labels.themeToggle}
            className="w-9 h-9 flex items-center justify-center text-white hover:text-teal transition-colors relative"
            whileTap={{ scale: 0.9 }}
          >
            <svg
              strokeWidth="3"
              strokeLinecap="round"
              width={100} height={100}
              viewBox="0 0 100 100"
              fill="none"
              className="h-[18px] w-[18px]"
            >
              {/* Moon shine ring — visible in dark mode */}
              <motion.path
                d="M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C39 45 49.5 59.5 70 49.5Z"
                className="stroke-teal"
                initial={{ opacity: 0, scale: 2, strokeDasharray: '20, 1000' }}
                animate={isDark ? {
                  opacity: [0, 1, 0],
                  strokeDashoffset: [0, -50, -100],
                  transition: { duration: 0.75 }
                } : { opacity: 0 }}
              />
              {/* Sun rays — visible in light mode */}
              {[
                'M50 2V11', 'M85 15L78 22', 'M98 50H89', 'M85 85L78 78',
                'M50 98V89', 'M23 78L16 84', 'M11 50H2', 'M23 23L16 16'
              ].map((d, i) => (
                <motion.path
                  key={d}
                  d={d}
                  className="stroke-teal"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={!isDark ? {
                    pathLength: 1, opacity: 1,
                    transition: { delay: i * 0.05, duration: 0.3 }
                  } : { pathLength: 0, opacity: 0 }}
                />
              ))}
              {/* Main circle — morphs sun↔moon */}
              <motion.path
                fill="transparent"
                initial={{ d: 'M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C60 29 69.5 38 70 49.5Z' }}
                animate={{
                  d: isDark
                    ? 'M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C39 45 49.5 59.5 70 49.5Z'
                    : 'M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C60 29 69.5 38 70 49.5Z',
                  rotate: isDark ? -360 : 0,
                  scale: isDark ? 2 : 1,
                  stroke: 'var(--color-teal, #00b4d8)',
                  fill: 'var(--color-teal, #00b4d8)',
                  fillOpacity: 0.35,
                  strokeOpacity: 1,
                }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
              />
            </svg>
          </motion.button>

          {/* CTA */}
          <button
            onClick={() => onNavigate?.('contact')}
            className="inline-flex items-center justify-center h-9 font-mono text-[0.6rem] uppercase tracking-[0.15em] px-5 border border-teal/40 rounded-lg text-teal hover:bg-teal hover:text-navy-deep hover:border-teal hover:shadow-[0_0_30px_rgba(0,180,216,0.25)] transition-all duration-300"
          >
            {t.nav.contact}
          </button>
        </div>

        {/* Mobile right side */}
        <div className="flex md:hidden items-center gap-2 sm:gap-3">
          {/* Mobile lang toggle (keep simple for space) */}
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-navy-deep/60 backdrop-blur-md px-2 py-1 font-mono text-[0.62rem] tracking-[0.1em]" role="group" aria-label={labels.languageGroup}>
            {languages.map((l, i) => (
              <Fragment key={l.code}>
                <button
                  onClick={() => setLanguage(l.code)}
                  className={`rounded-full px-2.5 py-1 transition-colors ${lang === l.code ? 'bg-teal/10 text-teal font-bold' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
                >
                  {l.label}
                </button>
                {i < languages.length - 1 && <span className="text-gray-500/80">|</span>}
              </Fragment>
            ))}
          </div>
          {/* Animated theme toggle — mobile */}
          <motion.button
            onClick={toggle}
            aria-label={labels.themeToggle}
            className="w-9 h-9 rounded-full border border-white/10 bg-navy-deep/60 backdrop-blur-md flex items-center justify-center text-white hover:text-teal hover:border-teal/30 transition-all"
            whileTap={{ scale: 0.9 }}
          >
            <svg
              strokeWidth="3"
              strokeLinecap="round"
              width={100} height={100}
              viewBox="0 0 100 100"
              fill="none"
              className="h-[18px] w-[18px]"
            >
              <motion.path
                d="M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C39 45 49.5 59.5 70 49.5Z"
                className="stroke-teal"
                initial={{ opacity: 0, scale: 2, strokeDasharray: '20, 1000' }}
                animate={isDark ? {
                  opacity: [0, 1, 0],
                  strokeDashoffset: [0, -50, -100],
                  transition: { duration: 0.75 }
                } : { opacity: 0 }}
              />
              {[
                'M50 2V11', 'M85 15L78 22', 'M98 50H89', 'M85 85L78 78',
                'M50 98V89', 'M23 78L16 84', 'M11 50H2', 'M23 23L16 16'
              ].map((d, i) => (
                <motion.path
                  key={d}
                  d={d}
                  className="stroke-teal"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={!isDark ? {
                    pathLength: 1, opacity: 1,
                    transition: { delay: i * 0.05, duration: 0.3 }
                  } : { pathLength: 0, opacity: 0 }}
                />
              ))}
              <motion.path
                fill="transparent"
                initial={{ d: 'M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C60 29 69.5 38 70 49.5Z' }}
                animate={{
                  d: isDark
                    ? 'M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C39 45 49.5 59.5 70 49.5Z'
                    : 'M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C60 29 69.5 38 70 49.5Z',
                  rotate: isDark ? -360 : 0,
                  scale: isDark ? 2 : 1,
                  stroke: 'var(--color-teal, #00b4d8)',
                  fill: 'var(--color-teal, #00b4d8)',
                  fillOpacity: 0.35,
                  strokeOpacity: 1,
                }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
              />
            </svg>
          </motion.button>
          <button
            aria-label={labels.openMenu}
            aria-expanded={isMobileMenuOpen}
            className="w-9 h-9 rounded-full border border-white/10 bg-navy-deep/60 backdrop-blur-md flex items-center justify-center text-white hover:text-teal hover:border-teal/30 transition-all"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={labels.menuDialog}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10001] bg-navy-deep/95 backdrop-blur-2xl flex flex-col items-center justify-start gap-8 sm:gap-10 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-10"
          >
            <button
              aria-label={labels.closeMenu}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full border border-white/10 bg-navy-deep/70 backdrop-blur-md text-white flex items-center justify-center hover:text-teal hover:border-teal/30 transition-all"
              onClick={() => setMobileOpen(false)}
            >
              <X size={24} />
            </button>

            <ul className="flex flex-col items-center w-full max-w-md pt-14 sm:pt-20">
              {t.nav.links.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="w-full border-b border-white/10 first:border-t"
                >
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileOpen(false)}
                      className="w-full flex justify-between items-center py-4 sm:py-6 font-display text-xl sm:text-3xl leading-tight text-white hover:text-teal hover:pl-4 transition-all duration-300"
                    >
                      <span>{link.name}</span>
                      <span className="font-mono text-xs tracking-widest text-teal">0{index + 1}</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="w-full flex justify-between items-center py-4 sm:py-6 font-display text-xl sm:text-3xl leading-tight text-white hover:text-teal hover:pl-4 transition-all duration-300"
                    >
                      <span>{link.name}</span>
                      <span className="font-mono text-xs tracking-widest text-teal">0{index + 1}</span>
                    </button>
                  )}
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-1 sm:mt-8 pb-4 sm:pb-8"
            >
              <button
                onClick={() => { setMobileOpen(false); onNavigate?.('contact'); }}
                className="font-mono text-xs tracking-[0.25em] uppercase px-9 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-br from-teal-dark to-teal text-white rounded-full hover:shadow-[0_8px_40px_rgba(0,180,216,0.35)] transition-all duration-300"
              >
                {t.nav.contact}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
