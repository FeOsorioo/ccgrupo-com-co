import { motion } from 'motion/react';
import { ArrowRight, Zap, Headphones, Globe } from 'lucide-react';
import CircularText from '../ui/CircularText';

const services = [
  {
    id: '01',
    title: 'Automatización',
    desc: 'Agiliza tus comunicaciones, automatiza procesos y brinda respuestas instantáneas. Menos esfuerzo, máxima eficiencia con IA de última generación.',
    tags: ['Chatbots IA', 'RPA', 'n8n', 'Power BI', 'NLP'],
    link: 'https://ccgrupo.com.co/automatizacion/',
    icon: Zap,
    gradient: 'from-[#071a2c] via-navy-deep to-[#0a1e30]'
  },
  {
    id: '02',
    title: 'Contact Center',
    desc: 'Gestionamos y optimizamos tus operaciones con talento bilingüe de primer nivel, garantizando la mejor experiencia para tus clientes a nivel global.',
    tags: ['Ventas', 'Soporte', 'Nearshore', 'Multilingüe', 'Marcación Predictiva'],
    link: 'https://ccgrupo.com.co/contact-center/',
    icon: Headphones,
    gradient: 'from-[#0c0f24] via-navy-deep to-[#10162e]'
  },
  {
    id: '03',
    title: 'Omnicanalidad',
    desc: 'Unifica todos tus canales de comunicación en una sola plataforma. Agentes autónomos, mensajes masivos y chatbots inteligentes para un servicio fluido y eficiente.',
    tags: ['WhatsApp', 'Email', 'SMS Masivos', 'Agentes Autónomos', 'Voz'],
    link: 'https://ccgrupo.com.co/omnicanalidad/',
    icon: Globe,
    gradient: 'from-[#0d1a1e] via-navy-deep to-[#091a22]'
  }
];

export default function Services() {
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
          03 / 05 — Servicios
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-[clamp(4rem,10vw,9rem)] leading-[0.95]"
        >
          Nuestro<br />
          <span className="text-stroke text-transparent">ecosistema</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="absolute top-0 right-6 md:right-14 lg:right-28 hidden lg:block"
        >
          <CircularText
            text="AUTOMATIZACIÓN*OMNICANALIDAD*CONTACT*CENTER*"
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
        {services.map((svc, i) => (
          <motion.div
            key={svc.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            className={`group grid lg:grid-cols-2 min-h-[75vh] border-b border-white/10 overflow-hidden relative transition-colors duration-500 hover:bg-white/[0.02] ${
              i % 2 !== 0 ? 'lg:rtl' : ''
            }`}
          >
            <div className={`p-10 lg:p-20 flex flex-col justify-center ${i % 2 !== 0 ? 'lg:ltr' : ''}`}>
              <div className="font-mono text-6xl font-light text-navy-light mb-8 text-stroke-teal">
                {svc.id}
              </div>
              <h3 className="font-display text-[clamp(2.5rem,4vw,3.8rem)] leading-tight mb-6">
                {svc.title}
              </h3>
              <p className="text-lg font-light leading-relaxed text-gray-200 max-w-md mb-8">
                {svc.desc}
              </p>
              <div className="flex flex-wrap gap-2 mb-10">
                {svc.tags.map(tag => (
                  <span key={tag} className="font-mono text-[0.5rem] tracking-[0.15em] uppercase px-4 py-2 border border-white/10 text-gray-200 transition-all duration-300 hover:border-teal hover:text-teal hover:bg-teal/10">
                    {tag}
                  </span>
                ))}
              </div>
              <a 
                href={svc.link} 
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-4 font-mono text-xs tracking-[0.2em] uppercase text-teal group/link"
              >
                Explorar 
                <span className="w-8 h-px bg-teal relative transition-all duration-300 group-hover/link:w-12 after:content-[''] after:absolute after:right-0 after:-top-[3px] after:w-2 after:h-2 after:border-r after:border-t after:border-teal after:rotate-45" />
              </a>
            </div>

            <div className={`relative min-h-[40vh] lg:min-h-auto overflow-hidden flex items-center justify-center ${i % 2 !== 0 ? 'lg:ltr' : ''}`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${svc.gradient} transition-transform duration-1000 ease-out group-hover:scale-105`} />
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 border border-teal/20 rounded-2xl flex items-center justify-center text-3xl mb-5 bg-teal/5 backdrop-blur-md mx-auto text-teal">
                  <svc.icon size={32} strokeWidth={1.5} />
                </div>
                <div className="font-mono text-[0.5rem] tracking-[0.3em] uppercase text-gray-300">
                  {svc.title} Inteligente
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
