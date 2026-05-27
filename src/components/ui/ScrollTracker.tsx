import { useEffect, useState } from 'react';
import { useLang } from '../../i18n';

const SECTIONS = [
  { id: 'hero' },
  { id: 'journey' },
  { id: 'sectores' },
  { id: 'reasons' },
  { id: 'talento' },
  { id: 'clients' },
] as const;

export default function ScrollTracker() {
  const [active, setActive] = useState(0);
  const { t } = useLang();

  const sectionLabels: Record<string, string> = {
    hero:     'Inicio',
    journey:  t.journey?.label ?? 'Ecosistema',
    sectores: t.nav.links[0]?.name ?? 'Soluciones',
    reasons:  t.reasons?.label ?? 'Diferencial',
    talento:  t.talento?.label ?? 'Talento',
    clients:  'Clientes',
  };

  useEffect(() => {
    /* Find which section is closest to a sentinel line near the top of the
       viewport. This avoids the dead-zone you get with a plain
       IntersectionObserver when a section is taller than the threshold
       band, or when the user is between two observed sections. */
    const sentinelOffset = 120; // px from top — accounts for fixed nav

    const updateActive = () => {
      const sentinel = sentinelOffset;
      let bestIndex = 0;
      let bestDistance = Infinity;

      SECTIONS.forEach(({ id }, index) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Section is "current" when its top is at or just above the sentinel
        // line. Pick the section whose top is closest to (but not far below)
        // the sentinel.
        if (rect.top <= sentinel && rect.bottom > sentinel) {
          // Direct match — sentinel is inside this section
          bestIndex = index;
          bestDistance = 0;
          return;
        }
        // Fallback: track the closest section above the sentinel
        const dist = sentinel - rect.top;
        if (dist >= 0 && dist < bestDistance) {
          bestDistance = dist;
          bestIndex = index;
        }
      });

      setActive(bestIndex);
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        updateActive();
      });
    };

    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed left-10 top-1/2 -translate-y-1/2 z-[9000] hidden lg:flex flex-col items-center gap-2">
      <span className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-gray-300 [writing-mode:vertical-lr] rotate-180 mb-3 select-none">
        {t.common.scroll}
      </span>
      {SECTIONS.map(({ id }, index) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className={`group relative w-2 h-2 rounded-full border transition-all duration-400 ${
            active === index
              ? 'border-teal bg-teal shadow-[0_0_12px_rgba(0,180,216,0.4)]'
              : 'border-gray-300 bg-transparent hover:border-teal/50'
          }`}
        >
          <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 font-mono text-[0.5rem] tracking-[0.1em] uppercase text-teal whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {sectionLabels[id]}
          </span>
        </button>
      ))}
    </div>
  );
}
