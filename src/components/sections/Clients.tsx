import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import SplitText from '../ui/SplitText';
import { useLang } from '../../i18n';

const CLIENTS = [
  { name: 'Salud Total',  logo: '/clients/salud-total.svg'  },
  { name: 'Compensar',   logo: '/clients/compensar.svg'    },
  { name: 'Colsubsidio', logo: '/clients/colsubsidio.svg'  },
  { name: 'Famisanar',   logo: '/clients/famisanar.svg'    },
  { name: 'Sanitas',     logo: '/clients/sanitas.svg'      },
  { name: 'Keralty',     logo: '/clients/keralty.svg'      },
  { name: 'Cafam',       logo: '/clients/cafam.svg'        },
  { name: 'Sura',        logo: '/clients/sura.svg'         },
  { name: 'Comfenalco',  logo: '/clients/comfenalco.svg'   },
  { name: 'Medimás',     logo: '/clients/medimas.svg'      },
];

export default function Clients() {
  const { t } = useLang();
  // Per-slot error state stored by index
  const errRef = useRef<Record<number, boolean>>({});
  const [, forceRender] = useState(0);
  const track = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  const handleErr = (i: number) => {
    errRef.current[i] = true;
    forceRender(n => n + 1);
  };

  return (
    <section id="clients" className="py-24 border-t border-white/10 overflow-hidden">
      <div className="px-6 md:px-14 lg:px-28 flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal mb-6"
          >
            <div className="w-8 h-px bg-teal" />
            {t.clients.label}
          </motion.div>

          <div className="font-display text-[clamp(2rem,3.5vw,3rem)]">
            <SplitText className="inline-block" delay={40} duration={1} splitType="chars" from={{ opacity: 0, y: 20 }} to={{ opacity: 1, y: 0 }}>
              {t.clients.headingPre} <em className="italic text-teal">{t.clients.headingEm}</em>
            </SplitText>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[0.55rem] tracking-[0.15em] uppercase text-gray-300"
        >
          {t.clients.sub}
        </motion.div>
      </div>

      <div className="flex w-full">
        <motion.div
          className="flex w-max"
          animate={{ x: '-50%' }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {track.map(({ name, logo }, i) => (
            <div
              key={`${name}-${i}`}
              className="w-[200px] h-[100px] border border-white/10 flex items-center justify-center -mr-px relative group hover:border-teal/30 hover:z-10 transition-all duration-300 bg-navy-deep shrink-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {!errRef.current[i] ? (
                <img
                  src={logo}
                  alt={name}
                  loading="lazy"
                  onError={() => handleErr(i)}
                  className="relative z-10 h-10 w-auto max-w-[140px] object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300 brightness-0 invert"
                />
              ) : (
                <span className="relative z-10 font-body font-medium text-gray-200 group-hover:text-white transition-colors text-sm px-4 text-center leading-tight">
                  {name}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
