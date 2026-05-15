import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Home } from 'lucide-react';
import { useLang } from '../../i18n';

interface Props {
  onBack: () => void;
}

export default function NotFoundModule({ onBack }: Props) {
  const { t } = useLang();

  const copy = t.notFound;

  useEffect(() => {
    const prev = document.title;
    document.title = copy.pageTitle;
    return () => { document.title = prev; };
  }, [copy.pageTitle]);

  return (
    <div className="min-h-screen bg-navy-deep text-white flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-xl w-full"
      >
        <div className="font-mono text-[clamp(5rem,18vw,12rem)] font-bold leading-none text-teal/10 select-none mb-0">
          404
        </div>

        <div className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-teal/40 rounded-xl flex items-center justify-center mx-auto -mt-5 sm:-mt-6 mb-8 bg-navy-deep">
          <span className="font-mono text-sm font-bold text-teal tracking-wider">CCG</span>
        </div>

        <div className="font-mono text-[0.55rem] tracking-[0.35em] uppercase text-teal mb-4">
          {copy.badge}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-white mb-4 leading-tight max-w-lg mx-auto">
          {copy.heading}
        </h1>
        <p className="font-body text-sm font-light text-gray-300 leading-relaxed mb-10 max-w-sm mx-auto px-2">
          {copy.desc}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-md mx-auto">
          <button
            onClick={onBack}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 font-mono text-[0.6rem] tracking-[0.2em] uppercase px-8 py-3.5 bg-teal text-navy-deep hover:bg-teal-bright transition-all duration-300 min-w-[11rem]"
          >
            <Home size={14} />
            {t.nav.links[0]?.name ?? t.common.home}
          </button>
          <button
            onClick={onBack}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 font-mono text-[0.6rem] tracking-[0.2em] uppercase px-8 py-3.5 border border-white/20 text-white hover:border-teal hover:text-teal transition-all duration-300 min-w-[11rem]"
          >
            <ArrowLeft size={14} />
            {t.back}
          </button>
        </div>
      </motion.div>

      <div className="absolute bottom-8 font-mono text-[0.45rem] tracking-[0.25em] uppercase text-gray-600 select-none">
        ccgrupo.com.co
      </div>
    </div>
  );
}
