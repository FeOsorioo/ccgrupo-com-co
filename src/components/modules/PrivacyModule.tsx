import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, FileText, X } from 'lucide-react';
import BackgroundEffects from '../ui/BackgroundEffects';
import Footer from '../layout/Footer';
import ThemedLogo from '../ui/ThemedLogo';
import { useLang } from '../../i18n';

const pdfUrls: Record<number, string> = {
  0: '/policies/acoso_laboral.pdf',
  1: '/policies/POLITICA-SG-SST.pdf',
  2: '/policies/Politica-de-alcohol-y-otros.pdf',
  3: '/policies/pag.web-REV-JURIDICA-POLITICA-DE-PREVENCION-CONTRA-EL-ACOSO-SEXUAL-EN-EL-ENTORNO-LABORAL-CONTACT-CENTER-GRUPO-S.A.S.pdf',
  4: '/policies/PAGINA-WEB-POLITICA-TELETRABAJO.pdf',
  5: '/policies/PAGINA-WEB-POLITICA-IGUALDAD-Y-EQUIDAD-LABORAL-CON-ENFOQUE-DE-GENERO.pdf',
  6: '/policies/PAGINA-WEB-POLITICA-DESCONEXION-LABORAL.pdf',
};

interface Props { onBack: () => void; }

export default function PrivacyModule({ onBack }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { t } = useLang();
  const pt = t.privacy;

  return (
    <div className="min-h-screen bg-navy text-white relative">
      <BackgroundEffects />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-14 py-6 flex justify-between items-center bg-navy-deep/85 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
          <ThemedLogo
            alt="CCGrupo Logo"
            className="h-12 w-auto object-contain"
            fallback={(
              <div className="w-8 h-8 border-2 border-teal rounded-md flex items-center justify-center font-mono text-[0.55rem] font-bold text-teal">
                CCG
              </div>
            )}
          />
        </div>
        <button onClick={onBack} className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-teal hover:text-white transition-colors">
          <ArrowLeft size={16} />
          {t.back}
        </button>
      </nav>

      <main className="pt-32 pb-20 px-6 md:px-14 lg:px-28 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-teal mb-4 block">{pt.label}</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{pt.heading}</h1>
          <p className="text-gray-200 text-lg font-light max-w-2xl leading-relaxed">{pt.desc}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pt.policies.map((policy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActiveIndex(index)}
              className="group relative p-8 border border-white/10 bg-navy-mid/40 hover:border-teal/40 hover:bg-navy-mid/70 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 border border-teal/30 flex items-center justify-center mb-6 group-hover:border-teal group-hover:bg-teal/10 transition-all duration-300">
                <FileText size={20} className="text-teal" />
              </div>
              <h2 className="text-lg font-medium text-white mb-3 leading-snug">{policy.title}</h2>
              <p className="text-sm font-light text-gray-200 leading-relaxed mb-6">{policy.desc}</p>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-teal group-hover:text-teal-bright transition-colors">
                {pt.viewDoc}
              </span>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />

      {/* PDF viewer modal */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[10002] bg-navy-deep/95 backdrop-blur-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 md:px-14 py-5 border-b border-white/10 shrink-0">
              <div>
                <span className="font-mono text-[0.55rem] tracking-[0.25em] uppercase text-teal block mb-1">{pt.modalLabel}</span>
                <h2 className="text-lg md:text-xl font-medium text-white">{pt.policies[activeIndex].title}</h2>
              </div>
              <button
                onClick={() => setActiveIndex(null)}
                className="w-10 h-10 flex items-center justify-center border border-white/10 text-gray-200 hover:border-teal hover:text-teal transition-all duration-300"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 relative">
              <iframe
                src={`${pdfUrls[activeIndex]}#toolbar=1&navpanes=0`}
                className="absolute inset-0 w-full h-full"
                title={pt.policies[activeIndex].title}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
