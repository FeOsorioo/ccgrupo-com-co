import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Inicio', href: '#hero' },
  { name: 'Nosotros', href: '#about' },
  { name: 'Servicios', href: '#services' },
  { name: 'Diferencial', href: '#reasons' },
  { name: 'Clientes', href: '#clients' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('#hero')}>
          <div className="w-8 h-8 border-2 border-teal rounded-md flex items-center justify-center font-mono text-[0.55rem] font-bold text-teal">
            CCG
          </div>
          <div className="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-white font-normal hidden sm:block">
            Contact Center <span className="text-teal font-semibold">Grupo</span>
          </div>
        </div>

        <ul className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <li key={link.name}>
              <button
                onClick={() => scrollToSection(link.href)}
                className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gray-200 hover:text-white transition-colors relative group pb-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-teal transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={() => window.open('https://ccgrupo.com.co/contacto/', '_blank')}
            className="hidden md:block font-mono text-[0.6rem] uppercase tracking-[0.2em] px-7 py-2.5 border border-teal/40 text-teal hover:bg-teal hover:text-navy-deep hover:border-teal hover:shadow-[0_0_30px_rgba(0,180,216,0.25)] transition-all duration-300"
          >
            Contacto
          </button>
          
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10001] bg-navy-deep/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8"
          >
            <button
              className="absolute top-6 right-6 text-white p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>

            <ul className="flex flex-col items-center w-full max-w-md">
              {navLinks.map((link, index) => (
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
                onClick={() => window.open('https://ccgrupo.com.co/contacto/', '_blank')}
                className="font-mono text-xs tracking-[0.25em] uppercase px-10 py-4 bg-gradient-to-br from-teal-dark to-teal text-white hover:shadow-[0_8px_40px_rgba(0,180,216,0.35)] transition-all duration-300"
              >
                Contacto
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
