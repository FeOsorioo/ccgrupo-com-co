import { motion } from 'motion/react';
import { Brain, BarChart3, Globe2, Settings, Link2 } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from '../ui/ScrollStack';
import SplitText from '../ui/SplitText';
import { useLang } from '../../i18n';

const icons = [Globe2, Settings, BarChart3, Link2, Brain, BarChart3];

export default function Reasons() {
  const { t, lang } = useLang();
  const reasonsEs = [
    {
      title: 'Omnicanalidad como pilar del exito',
      desc: 'Unificamos todos tus canales (WhatsApp, voz, chat, redes y CRM) en una sola operacion donde cada conversacion tiene contexto y continuidad. Asi logramos que la experiencia del cliente sea fluida y que cada interaccion avance hacia un resultado.',
    },
    {
      title: 'Automatizacion que si resuelve',
      desc: 'Deja que los humanos hagan lo importante y automatiza los procesos operativos. La automatizacion escala, optimiza tiempos y multiplica oportunidades reales para responder, calificar, agendar y ejecutar sin sacrificar tiempo.',
    },
    {
      title: 'Decisiones basadas en datos',
      desc: 'Convertimos la operacion en informacion accionable con dashboards en tiempo real (Looker Studio y Power BI). Cada dato cuenta una historia clara: que esta pasando, donde mejorar y como crecer con control.',
    },
    {
      title: 'Soluciones disenadas para ti',
      desc: 'Entendemos como funciona tu operacion y construimos soluciones a la medida de tus procesos, objetivos y clientes. No adaptamos tu negocio a la tecnologia: adaptamos la tecnologia para que tu negocio funcione mejor.',
    },
    {
      title: 'La tecnologia potencia el talento humano',
      desc: 'Combinamos IA con equipos humanos para lograr soluciones agiles, cercanas y escalables. La tecnologia nos impulsa, pero las personas nos inspiran.',
    },
  ];
  const reasonItems = lang === 'en' ? t.reasons.items : reasonsEs;

  return (
    <section id="reasons" className="py-20 px-6 md:px-14 lg:px-28">
      <div className="max-w-3xl mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal mb-6"
        >
          <div className="w-8 h-px bg-teal" />
          {t.reasons.label}
        </motion.div>

        <div className="font-display text-[clamp(2.5rem,4.5vw,4.2rem)] leading-tight">
          <SplitText className="inline-block" delay={30} duration={1} splitType="words" from={{ opacity: 0, y: 20 }} to={{ opacity: 1, y: 0 }}>
            {t.reasons.headingPre} Contact Center <em className="italic text-gradient">{t.reasons.headingEm}</em>
          </SplitText>
        </div>
      </div>

      <div className="h-[800px] w-full border border-white/10 rounded-3xl overflow-hidden bg-navy-mid/30 backdrop-blur-sm">
        <ScrollStack itemDistance={50} itemStackDistance={20} stackPosition="15%" scaleEndPosition="5%" itemScale={0.05}>
          {reasonItems.map((reason, i) => {
            const Icon = icons[i];
            return (
              <ScrollStackItem key={i} itemClassName="flex flex-col justify-center bg-navy-deep border border-white/10">
                <div className="font-mono text-[0.55rem] tracking-[0.2em] text-teal mb-6">0{i + 1}</div>
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center text-teal shrink-0">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-display text-3xl mb-4 text-white">{reason.title}</h4>
                    <p className="text-lg font-light leading-relaxed text-gray-200 max-w-xl">{reason.desc}</p>
                  </div>
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>
    </section>
  );
}
