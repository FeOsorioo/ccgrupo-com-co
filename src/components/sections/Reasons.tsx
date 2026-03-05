import { motion } from 'motion/react';
import { Brain, BarChart3, Globe2, Settings, Link2, Stethoscope } from 'lucide-react';

const reasons = [
  {
    icon: Brain,
    title: "IA + Talento Humano",
    desc: "Fusionamos agentes virtuales autónomos con talento humano capacitado para operaciones de máxima eficiencia y empatía."
  },
  {
    icon: BarChart3,
    title: "Decisiones con Datos",
    desc: "Transformamos datos en acciones en tiempo real con Power BI y analítica avanzada para resultados medibles."
  },
  {
    icon: Globe2,
    title: "Alcance Global",
    desc: "Operamos en 4 idiomas con capacidad nearshore para EE.UU. y mercados internacionales desde Bogotá."
  },
  {
    icon: Settings,
    title: "Autonomía Operativa",
    desc: "Modelos basados en productividad y autonomía que superan al BPO tradicional en velocidad y resultados."
  },
  {
    icon: Link2,
    title: "Omnicanalidad Real",
    desc: "WhatsApp, email, SMS, chatbots y voz unificados en una sola plataforma para cero fricción."
  },
  {
    icon: Stethoscope,
    title: "Verticales Especializadas",
    desc: "Expertise en salud, finanzas y telco con soluciones como agendamiento inteligente para IPS y clínicas."
  }
];

export default function Reasons() {
  return (
    <section id="reasons" className="py-32 px-6 md:px-14 lg:px-28">
      <div className="max-w-3xl mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal mb-6"
        >
          <div className="w-8 h-px bg-teal" />
          04 / 05 — Diferencial
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-[clamp(2.5rem,4.5vw,4.2rem)] leading-tight"
        >
          ¿Por qué elegir a Contact Center <em className="italic text-gradient">Grupo?</em>
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
        {reasons.map((reason, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-navy-deep p-12 relative group overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-dark to-teal-bright transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
            <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="font-mono text-[0.55rem] tracking-[0.2em] text-teal mb-8">
                0{i + 1}
              </div>
              <div className="w-12 h-12 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center text-teal mb-6">
                <reason.icon size={24} strokeWidth={1.5} />
              </div>
              <h4 className="font-display text-2xl mb-4 text-white group-hover:text-teal transition-colors duration-300">
                {reason.title}
              </h4>
              <p className="text-sm font-light leading-relaxed text-gray-200">
                {reason.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
