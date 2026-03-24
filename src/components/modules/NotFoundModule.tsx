import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Home } from 'lucide-react';
import { useLang } from '../../i18n';

interface Props {
  onBack: () => void;
}

export default function NotFoundModule({ onBack }: Props) {
  const { t } = useLang();

  useEffect(() => {
    const prev = document.title;
    document.title = '404 — Página no encontrada | CCGrupo';
    return () => { document.title = prev; };
  }, []);

  return (
    <div className="min-h-screen bg-navy-deep text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-xl"
      >
        {/* 404 */}
        <div className="font-mono text-[clamp(6rem,15vw,12rem)] font-bold leading-none text-teal/10 select-none mb-0">
          404
        </div>

        {/* CCG mark */}
        <div className="w-14 h-14 border-2 border-teal/40 rounded-xl flex items-center justify-center mx-auto -mt-6 mb-8 bg-navy-deep">
          <span className="font-mono text-sm font-bold text-teal tracking-wider">CCG</span>
        </div>

        <div className="font-mono text-[0.55rem] tracking-[0.35em] uppercase text-teal mb-4">
          Página no encontrada
        </div>
        <h1 className="font-display text-3xl md:text-4xl text-white mb-4 leading-tight">
          Esta página no existe
        </h1>
        <p className="font-body text-sm font-light text-gray-300 leading-relaxed mb-10 max-w-sm mx-auto">
          La URL que buscas no existe o fue movida. Vuelve al inicio para explorar nuestros servicios.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-2 font-mono text-[0.6rem] tracking-[0.2em] uppercase px-8 py-3.5 bg-teal text-navy-deep hover:bg-teal-bright transition-all duration-300"
          >
            <Home size={14} />
            {t.nav.links[0]?.name ?? 'Inicio'}
          </button>
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-2 font-mono text-[0.6rem] tracking-[0.2em] uppercase px-8 py-3.5 border border-white/20 text-white hover:border-teal hover:text-teal transition-all duration-300"
          >
            <ArrowLeft size={14} />
            {t.back}
          </button>
        </div>
      </motion.div>

      {/* Bottom label */}
      <div className="absolute bottom-8 font-mono text-[0.45rem] tracking-[0.25em] uppercase text-gray-600 select-none">
        ccgrupo.com.co
      </div>
    </div>
  );
}
