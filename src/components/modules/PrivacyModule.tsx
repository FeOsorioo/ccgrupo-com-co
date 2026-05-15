import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, FileText, X, ExternalLink } from 'lucide-react';
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

interface Props {
  onBack: () => void;
  onNavigate?: (view: string) => void;
}

export default function PrivacyModule({ onBack, onNavigate }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { t } = useLang();
  const pt = t.privacy;

  return (
    <div className="min-h-screen bg-navy-deep text-white relative overflow-x-hidden">
      <BackgroundEffects />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-14 py-4 sm:py-6 flex justify-between items-center gap-4 bg-navy-deep/85 backdrop-blur-xl border-b border-white/5">
        <button type="button" onClick={onBack} className="flex items-center gap-3 min-w-0 cursor-pointer bg-transparent border-0 p-0" aria-label={t.common.goHome}>
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
        <button onClick={onBack} className="flex items-center gap-2 font-mono text-[0.65rem] sm:text-xs uppercase tracking-widest text-teal hover:text-white transition-colors shrink-0">
          <ArrowLeft size={16} />
          {t.back}
        </button>
      </nav>

      <main className="pt-28 sm:pt-32 pb-20 px-4 sm:px-6 md:px-14 lg:px-28 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16"
        >
          <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-teal mb-4 block">{pt.label}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl">{pt.heading}</h1>
          <p className="text-base sm:text-lg font-light max-w-2xl leading-relaxed text-gray-200">{pt.desc}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {pt.policies.map((policy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActiveIndex(index)}
              className="group relative p-6 sm:p-8 border border-white/10 bg-navy-mid/40 hover:border-teal/40 hover:bg-navy-mid/70 transition-all duration-300 cursor-pointer rounded-2xl min-w-0"
            >
              <div className="w-12 h-12 border border-teal/30 flex items-center justify-center mb-6 group-hover:border-teal group-hover:bg-teal/10 transition-all duration-300 shrink-0">
                <FileText size={20} className="text-teal" />
              </div>
              <h2 className="text-base sm:text-lg font-medium text-white mb-3 leading-snug break-words">{policy.title}</h2>
              <p className="text-sm font-light text-gray-200 leading-relaxed mb-6 break-words">{policy.desc}</p>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-teal group-hover:text-teal-bright transition-colors">
                {pt.viewDoc}
              </span>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer onNavigate={onNavigate} />

      {/* PDF viewer modal */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[10002] bg-navy-deep/95 backdrop-blur-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-start sm:items-center justify-between gap-4 px-4 sm:px-6 md:px-14 py-4 sm:py-5 border-b border-white/10 shrink-0 flex-wrap">
              <div className="min-w-0 max-w-full">
                <span className="font-mono text-[0.55rem] tracking-[0.25em] uppercase text-teal block mb-1">{pt.modalLabel}</span>
                <h2 className="text-sm sm:text-base md:text-xl font-medium text-white leading-snug break-words">{pt.policies[activeIndex].title}</h2>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-auto">
                <a
                  href={pdfUrls[activeIndex]}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 font-mono text-[0.55rem] tracking-[0.15em] uppercase px-4 py-2.5 border border-teal/50 text-teal hover:bg-teal hover:text-navy-deep transition-all duration-300"
                >
                  <ExternalLink size={12} />
                  {t.common.openPdf}
                </a>
                <button
                  onClick={() => setActiveIndex(null)}
                  className="w-10 h-10 flex items-center justify-center border border-white/10 text-gray-200 hover:border-teal hover:text-teal transition-all duration-300"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="flex-1 relative bg-gray-900/30 min-h-0">
              <object
                data={`${pdfUrls[activeIndex]}#toolbar=1&navpanes=0`}
                type="application/pdf"
                className="absolute inset-0 w-full h-full"
                aria-label={pt.policies[activeIndex].title}
              >
                {/* Fallback for browsers/devices that can't embed PDFs */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8 text-center">
                  <FileText size={56} className="text-teal/40" />
                  <div>
                    <p className="text-white font-medium mb-2">{pt.policies[activeIndex].title}</p>
                    <p className="text-gray-400 text-sm mb-6">
                      {t.common.pdfUnsupported}
                    </p>
                    <a
                      href={pdfUrls[activeIndex]}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.2em] uppercase px-8 py-3 bg-teal text-navy-deep font-semibold hover:bg-teal-bright transition-colors duration-300"
                    >
                      <ExternalLink size={14} />
                      {t.common.openPdfNewTab}
                    </a>
                  </div>
                </div>
              </object>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
