import { motion } from 'motion/react';
import { Zap } from 'lucide-react';
import CircularText from '../ui/CircularText';
import SplitText from '../ui/SplitText';
import { HexagonBackground } from '../ui/hexagon-background';
import { servicesData as services } from '../../data';
import { useLang } from '../../i18n';

interface ServicesProps {
  onNavigate?: (view: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const { t, lang } = useLang();
  const customServicesEs: Record<string, { title: string; subtitle?: string; desc: string; tags: string[] }> = {
    '01': {
      title: 'Experiencia del Cliente',
      subtitle: 'Experiencias que hacen que tus clientes se queden',
      desc: 'Gestionamos y optimizamos cada punto de contacto para que la atencion sea agil, consistente y alineada a tu marca. Mas que respuestas, construimos experiencias que generan confianza, continuidad y fidelizacion.',
      tags: ['Servicio al cliente', 'PQR', 'Reservas', 'Pedidos', 'Mesa de ayuda', 'Soporte omnicanal'],
    },
    '02': {
      title: 'Leads & Ventas',
      subtitle: 'Procesos comerciales que convierten en serio',
      desc: 'Disenamos y ejecutamos sistemas de ventas donde cada lead tiene seguimiento, contexto y una alta probabilidad de cierre. Conectamos canales, CRM y equipo comercial para que ninguna oportunidad se pierda.',
      tags: ['Captacion', 'Seguimiento', 'WhatsApp ventas', 'CRM', 'Reactivacion', 'Cierre'],
    },
    '03': {
      title: 'Agentes Autonomos',
      subtitle: 'Agentes que trabajan 24/7 por tu negocio',
      desc: 'Automatizamos conversaciones y tareas clave para que tu empresa responda en todo momento sin depender de disponibilidad humana. Implementamos agentes que atienden, filtran, agendan y conectan con tus procesos reales.',
      tags: ['IA 24/7', 'WhatsApp IA', 'Chat IA', 'Leads IA', 'Social IA', 'Autonomo'],
    },
    '04': {
      title: 'Digital Studio',
      desc: 'Creamos tecnologia a la medida que conecta tus procesos, equipos y datos en un solo ecosistema. Puede ser un CRM, una app, un portal de clientes, plataformas de capacitacion o lo que se te ocurra.',
      tags: ['CRM', 'Apps', 'Portales', 'Capacitacion', 'Integracion', 'Eficiencia'],
    },
  };

  return (
    <section id="services" className="pt-24 relative">
      <div className="px-6 md:px-14 lg:px-28 pb-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal mb-6"
        >
          <div className="w-8 h-px bg-teal" />
          {t.services.label}
        </motion.div>

        <div className="font-display text-[clamp(4rem,10vw,9rem)] leading-[0.95]">
          <SplitText className="inline-block" delay={50} duration={1.2} splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }}>
            {lang === 'en'
              ? <>Our<br /><span className="text-stroke text-transparent">ecosystem</span></>
              : <>Nuestro<br /><span className="text-stroke text-transparent">ecosistema</span></>}
          </SplitText>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="absolute top-0 right-6 md:right-14 lg:right-28 hidden lg:block"
        >
          <CircularText
            text={lang === 'en'
              ? 'AUTOMATION*OMNICHANNEL*CONTACT*CENTER*'
              : 'AUTOMATIZACION*OMNICANALIDAD*CONTACT*CENTER*'}
            onHover="goBonkers"
            spinDuration={25}
            className="text-teal font-mono text-[10px]"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Zap size={24} className="text-white opacity-50" />
          </div>
        </motion.div>
      </div>

      <div className="border-t border-white/10">
        {services.map((svc, i) => {
          const isReversed = i % 2 !== 0;
          const svcT = t.services.items[svc.id as keyof typeof t.services.items];
          const svcDetailT = t.serviceDetails[svc.id as keyof typeof t.serviceDetails];
          const customEs = lang === 'es' ? customServicesEs[svc.id] : undefined;
          const subtitle = customEs?.subtitle ?? svcT?.subtitle;
          const title = customEs?.title ?? svcT?.title ?? svc.title;
          const desc  = customEs?.desc  ?? svcT?.desc  ?? svc.desc;
          const tags  = customEs?.tags  ?? svcDetailT?.tags ?? svc.tags;

          const textCol = (
            <div key="text" className="p-10 lg:p-20 flex flex-col justify-center">
              <div className="font-mono text-6xl font-light text-navy-light mb-8 text-stroke-teal">
                {svc.id}
              </div>
              <h3 className="font-display text-[clamp(2.5rem,4vw,3.8rem)] leading-tight mb-6">
                {title}
              </h3>
              {subtitle && (
                <p className="font-mono text-[0.58rem] tracking-[0.18em] uppercase text-teal mb-5">
                  {subtitle}
                </p>
              )}
              <p className="text-lg font-light leading-relaxed text-gray-200 max-w-md mb-8">
                {desc}
              </p>
              <div className="flex flex-wrap gap-2 mb-10">
                {tags.map(tag => (
                  <span key={tag} className="font-mono text-[0.5rem] tracking-[0.15em] uppercase px-4 py-2 border border-white/10 text-gray-200 transition-all duration-300 hover:border-teal hover:text-teal hover:bg-teal/10">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => onNavigate?.(svc.id)}
                className="inline-flex items-center gap-4 font-mono text-xs tracking-[0.2em] uppercase text-teal group/link hover:text-white transition-colors"
              >
                {t.services.explore}
                <span className="w-8 h-px bg-teal relative transition-all duration-300 group-hover/link:w-12 after:content-[''] after:absolute after:right-0 after:-top-[3px] after:w-2 after:h-2 after:border-r after:border-t after:border-teal after:rotate-45" />
              </button>
            </div>
          );

          const iconCol = (
            <div key="icon" className="relative min-h-[40vh] lg:min-h-auto overflow-hidden flex items-center justify-center">
              <div className={`service-panel-bg absolute inset-0 bg-gradient-to-br ${svc.gradient} transition-transform duration-1000 ease-out group-hover:scale-105`} />
              <HexagonBackground
                className="absolute inset-0 bg-transparent"
                hexagonSize={40}
                hexagonMargin={4}
                hexagonProps={{
                  className: 'before:bg-white/5 dark:before:bg-white/5 after:bg-transparent dark:after:bg-transparent hover:before:bg-teal/30 dark:hover:before:bg-teal/30 transition-colors duration-500',
                }}
              >
                <div className="flex items-center justify-center h-full w-full">
                  <div className="relative z-10 text-center pointer-events-none">
                    <div className="w-20 h-20 border border-teal/20 rounded-2xl flex items-center justify-center text-3xl mb-5 bg-teal/5 backdrop-blur-md mx-auto text-teal">
                      <svc.icon size={32} strokeWidth={1.5} />
                    </div>
                    <div className="font-mono text-[0.5rem] tracking-[0.3em] uppercase text-gray-300">
                      {title}
                    </div>
                  </div>
                </div>
              </HexagonBackground>
            </div>
          );

          return (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              className="group grid lg:grid-cols-2 min-h-[75vh] border-b border-white/10 overflow-hidden relative transition-colors duration-500 hover:bg-white/[0.02]"
            >
              {isReversed ? [iconCol, textCol] : [textCol, iconCol]}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
