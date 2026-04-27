import { Fragment, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, ChevronDown, Globe } from 'lucide-react';
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
    goHome: lang === 'en' ? 'Go home' : lang === 'es' ? 'Ir al inicio' : 'Ir para o início',
    languageGroup: lang === 'en' ? 'Select language' : lang === 'es' ? 'Seleccionar idioma' : 'Selecionar idioma',
    themeToggle: lang === 'en' ? 'Toggle theme' : lang === 'es' ? 'Cambiar tema' : 'Mudar tema',
    openMenu: lang === 'en' ? 'Open navigation menu' : lang === 'es' ? 'Abrir menú de navegación' : 'Abrir menu de navegação',
    closeMenu: lang === 'en' ? 'Close navigation menu' : lang === 'es' ? 'Cerrar menú de navegación' : 'Fechar menu de navegação',
    menuDialog: lang === 'en' ? 'Navigation menu' : lang === 'es' ? 'Menú de navegación' : 'Menu de navegação',
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
          className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-14 py-5 flex items-center justify-between ${
          hidden ? 'pointer-events-none -translate-y-4 opacity-0' : 'opacity-100'
        } ${
          isScrolled ? 'bg-navy-deep/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
        }`}
      >
        {/* Logo container */}
        <button
          onClick={() => scrollToSection('#hero')}
          className="relative z-50 transition-transform duration-300 hover:scale-[1.02]"
          aria-label={labels.goHome}
        >
          <ThemedLogo width={160} className="h-auto" />
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8">
            {t.nav.links.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  className="font-mono text-label uppercase tracking-[0.2em] text-white hover:text-teal transition-colors relative group pb-1"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-teal transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

          {/* Language Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!isLangOpen)}
              className="flex items-center gap-2 font-mono text-label tracking-[0.15em] text-white hover:text-teal transition-colors px-3 py-1.5 border border-white/10 rounded-lg hover:border-teal/30"
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

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label={labels.themeToggle}
            className="w-8 h-8 flex items-center justify-center text-white hover:text-teal transition-colors"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* CTA */}
          <button
            onClick={() => onNavigate?.('contact')}
            className="font-mono text-label uppercase tracking-[0.2em] px-7 py-2.5 border border-teal/40 text-teal hover:bg-teal hover:text-navy-deep hover:border-teal hover:shadow-[0_0_30px_rgba(0,180,216,0.25)] transition-all duration-300"
          >
            {t.nav.contact}
          </button>
        </div>

        {/* Mobile right side */}
        <div className="flex md:hidden items-center gap-3">
          {/* Mobile lang toggle (keep simple for space) */}
          <div className="flex items-center gap-1 font-mono text-label tracking-[0.1em]" role="group" aria-label={labels.languageGroup}>
            {languages.map((l, i) => (
              <Fragment key={l.code}>
                <button
                  onClick={() => setLanguage(l.code)}
                  className={`transition-colors ${lang === l.code ? 'text-teal font-bold' : 'text-gray-300'}`}
                >
                  {l.label}
                </button>
                {i < languages.length - 1 && <span className="text-gray-500">|</span>}
              </Fragment>
            ))}
          </div>
          <button
            onClick={toggle}
            aria-label={labels.themeToggle}
            className="text-white hover:text-teal transition-colors p-1"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            aria-label={labels.openMenu}
            aria-expanded={isMobileMenuOpen}
            className="text-white p-1"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
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
            className="fixed inset-0 z-[10001] bg-navy-deep/95 backdrop-blur-2xl flex flex-col items-center justify-start gap-10 overflow-y-auto overscroll-contain px-6 py-8 sm:px-8 sm:py-10"
          >
            <button
              aria-label={labels.closeMenu}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 text-white p-2"
              onClick={() => setMobileOpen(false)}
            >
              <X size={32} />
            </button>

            <ul className="flex flex-col items-center w-full max-w-md pt-16 sm:pt-20">
              {t.nav.links.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="w-full border-b border-white/10 first:border-t"
                >
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="w-full flex justify-between items-center py-5 sm:py-6 font-display text-2xl sm:text-3xl text-white hover:text-teal hover:pl-4 transition-all duration-300"
                  >
                    <span>{link.name}</span>
                    <span className="font-mono text-xs tracking-widest text-teal">0{index + 1}</span>
                  </button>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 sm:mt-8 pb-8"
            >
              <button
                onClick={() => { setMobileOpen(false); onNavigate?.('contact'); }}
                className="font-mono text-xs tracking-[0.25em] uppercase px-10 py-4 bg-gradient-to-br from-teal-dark to-teal text-white hover:shadow-[0_8px_40px_rgba(0,180,216,0.35)] transition-all duration-300"
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
