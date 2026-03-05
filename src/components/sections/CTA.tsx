import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-56 px-6 relative overflow-hidden text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial-teal opacity-10 blur-[100px] pointer-events-none rounded-full" 
           style={{ background: 'radial-gradient(circle, rgba(0,180,216,0.15), transparent 65%)' }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs tracking-[0.35em] uppercase text-teal mb-8"
        >
          ¿Listo para transformar tu operación?
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-[1.1] mb-8"
        >
          Hablemos del <em className="italic text-gradient">futuro</em> de tu empresa
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg font-light leading-relaxed text-gray-200 max-w-lg mx-auto mb-12"
        >
          Descubre cómo nuestro ecosistema de soluciones puede impulsar tu negocio con inteligencia artificial y talento humano.
        </motion.p>
        
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          onClick={() => window.open('https://ccgrupo.com.co/contacto/', '_blank')}
          className="group relative inline-flex items-center gap-4 font-mono text-[0.7rem] tracking-[0.25em] uppercase px-14 py-5 bg-gradient-to-br from-teal-dark to-teal text-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_50px_rgba(0,180,216,0.4)]"
        >
          <span className="relative z-10">Agendar Reunión</span>
          <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
          <div className="absolute inset-0 bg-gradient-to-br from-teal to-teal-bright opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </div>
    </section>
  );
}
