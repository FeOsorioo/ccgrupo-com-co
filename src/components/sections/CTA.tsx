import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import SplitText from '../ui/SplitText';
import LiquidEther from '../ui/LiquidEther';

interface Props {
  onNavigate?: (view: string) => void;
}

export default function CTA({ onNavigate }: Props) {
  return (
    <section className="py-56 px-6 relative overflow-hidden text-center">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <LiquidEther
          colors={['#023e8a', '#0077b6', '#0096c7']}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs tracking-[0.35em] uppercase text-teal mb-8"
        >
          ¿Listo para transformar tu operación?
        </motion.div>
        
        <div className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-[1.1] mb-8">
          <SplitText
            className="inline-block"
            delay={40}
            duration={1}
            splitType="words"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="center"
          >
            Hablemos del <em className="italic font-bold text-teal-bright animate-pulse inline-block drop-shadow-[0_0_25px_rgba(0,229,255,0.8)]">futuro</em> de tu empresa
          </SplitText>
        </div>
        
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
          onClick={() => onNavigate ? onNavigate('contact') : window.open('https://ccgrupo.com.co/contacto/', '_blank')}
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
