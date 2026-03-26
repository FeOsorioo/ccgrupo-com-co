import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLang } from '../../i18n';
import ThemedLogo from '../ui/ThemedLogo';

interface Props {
  onNavigate?: (view: string) => void;
}

export default function Navbar({ onNavigate }: Props) {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setMobileOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const { isDark, toggle }                = useTheme();
  const { lang, t, toggleLang }           = useLang();

  const labels = {
    goHome: lang === 'en' ? 'Go home' : 'Ir al inicio',
    languageGroup: lang === 'en' ? 'Select language' : 'Seleccionar idioma',
    themeToggle: lang === 'en' ? 'Toggle theme' : 'Cambiar tema',
    openMenu: lang === 'en' ? 'Open navigation menu' : 'Abrir menu de navegacion',
    closeMenu: lang === 'en' ? 'Close navigation menu' : 'Cerrar menu de navegacion',
    menuDialog: lang === 'en' ? 'Navigation menu' : 'Menu de navegacion',
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const logoFallback = (
    <div className="w-8 h-8 border-2 border-teal rounded-md flex items-center justify-center font-mono text-[0.55rem] font-bold text-teal">
      CCG
    </div>
  );

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[10000] px-6 md:px-14 py-6 flex justify-between items-center transition-all duration-500 ${
          isScrolled
            ? 'bg-navy-deep/85 backdrop-blur-xl border-b border-white/5 py-4'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <button
          type="button"
          aria-label={labels.goHome}
          className="flex items-center gap-3 cursor-pointer min-h-[3rem] bg-transparent border-0 p-0"
          onClick={() => scrollToSection('#hero')}
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <AnimatePresence mode="wait">
            {!isLogoHovered ? (
              <motion.div
                key="logo-img"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <ThemedLogo
                  alt="CCGrupo Logo"
                  className="h-14 md:h-16 w-auto object-contain"
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
                <div className="font-mono text-[0.65rem] tracking-[0.25em] uppercase font-normal hidden sm:block">
                  Contact Center <span className="text-teal font-semibold">Grupo</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8">
            {t.nav.links.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gray-200 hover:text-teal transition-colors relative group pb-1"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-teal transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

          {/* Language toggle */}
          <div className="flex items-center gap-1.5 font-mono text-[0.55rem] tracking-[0.1em] select-none" role="group" aria-label={labels.languageGroup}>
            <button
              onClick={() => lang !== 'es' && toggleLang()}
              aria-label="Espanol"
              aria-pressed={lang === 'es'}
              className={`transition-colors ${lang === 'es' ? 'text-teal font-semibold' : 'text-gray-300 hover:text-gray-100'}`}
            >
              ES
            </button>
            <span aria-hidden="true" className="text-gray-400">|</span>
            <button
              onClick={() => lang !== 'en' && toggleLang()}
              aria-label="English"
              aria-pressed={lang === 'en'}
              className={`transition-colors ${lang === 'en' ? 'text-teal font-semibold' : 'text-gray-300 hover:text-gray-100'}`}
            >
              EN
            </button>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label={labels.themeToggle}
            className="w-8 h-8 flex items-center justify-center text-gray-200 hover:text-teal transition-colors"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* CTA */}
          <button
            onClick={() => onNavigate?.('contact')}
            className="font-mono text-[0.6rem] uppercase tracking-[0.2em] px-7 py-2.5 border border-teal/40 text-teal hover:bg-teal hover:text-navy-deep hover:border-teal hover:shadow-[0_0_30px_rgba(0,180,216,0.25)] transition-all duration-300"
          >
            {t.nav.contact}
          </button>
        </div>

        {/* Mobile right side */}
        <div className="flex md:hidden items-center gap-3">
          {/* Mobile lang toggle */}
          <div className="flex items-center gap-1 font-mono text-[0.55rem] tracking-[0.1em]" role="group" aria-label={labels.languageGroup}>
            <button
              onClick={() => lang !== 'es' && toggleLang()}
              aria-label="Espanol"
              aria-pressed={lang === 'es'}
              className={`transition-colors ${lang === 'es' ? 'text-teal' : 'text-gray-300'}`}
            >
              ES
            </button>
            <span aria-hidden="true" className="text-gray-400">|</span>
            <button
              onClick={() => lang !== 'en' && toggleLang()}
              aria-label="English"
              aria-pressed={lang === 'en'}
              className={`transition-colors ${lang === 'en' ? 'text-teal' : 'text-gray-300'}`}
            >
              EN
            </button>
          </div>
          <button
            onClick={toggle}
            aria-label={labels.themeToggle}
            className="text-gray-200 hover:text-teal transition-colors p-1"
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
            className="fixed inset-0 z-[10001] bg-navy-deep/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8"
          >
            <button
              aria-label={labels.closeMenu}
              className="absolute top-6 right-6 text-white p-2"
              onClick={() => setMobileOpen(false)}
            >
              <X size={32} />
            </button>

            <ul className="flex flex-col items-center w-full max-w-md">
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
                    className="w-full flex justify-between items-center py-6 font-display text-3xl text-white hover:text-teal hover:pl-4 transition-all duration-300"
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
              className="mt-12"
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
