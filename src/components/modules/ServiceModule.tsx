import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Footer from '../layout/Footer';
import BackgroundEffects from '../ui/BackgroundEffects';
import { getServiceById } from '../../data';

interface ServiceModuleProps {
  serviceId: string;
  onBack: () => void;
}

export default function ServiceModule({ serviceId, onBack }: ServiceModuleProps) {
  const service = getServiceById(serviceId);

  if (!service) return null;

  return (
    <div className="min-h-screen bg-navy text-white relative">
      <BackgroundEffects />
      
      {/* Custom Navbar for Module */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-14 py-6 flex justify-between items-center bg-navy-deep/85 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
           <img 
              src="https://www.ccgrupo.com.co/wp-content/uploads/2025/03/logo-original-b-.webp" 
              alt="CCGrupo Logo" 
              className="h-10 w-auto object-contain"
            />
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-teal hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Volver
        </button>
      </nav>

      <main className="pt-32 pb-20 px-6 md:px-14 lg:px-28 relative z-10">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal mb-6">
              <div className="w-8 h-px bg-teal" />
              Servicio {service.id}
            </div>
            <h1 className="font-display text-[clamp(3rem,5vw,5rem)] leading-[1.1] mb-8">
              {service.title}
            </h1>
            <p className="text-xl font-light leading-relaxed text-gray-200 mb-10">
              {service.details.longDesc}
            </p>
            <div className="flex flex-wrap gap-3">
              {service.tags.map(tag => (
                <span key={tag} className="font-mono text-xs tracking-wider uppercase px-4 py-2 border border-white/10 rounded-full text-teal bg-teal/5">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 relative group">
              <div className="absolute inset-0 bg-teal/20 mix-blend-overlay z-10" />
              <img 
                src={service.details.heroImage} 
                alt={service.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-teal/20 rounded-full flex items-center justify-center bg-navy-deep/80 backdrop-blur-md">
              <service.icon size={48} className="text-teal" strokeWidth={1} />
            </div>
          </motion.div>
        </div>

        {/* Features & Benefits */}
        <div className="grid lg:grid-cols-3 gap-12 border-t border-white/10 pt-20">
          <div className="lg:col-span-1">
            <h3 className="font-display text-3xl mb-8">Características</h3>
            <ul className="space-y-6">
              {service.details.features.map((feature, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <CheckCircle size={20} className="text-teal shrink-0 mt-1 group-hover:text-white transition-colors" />
                  <span className="text-gray-300 font-light">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div className="lg:col-span-2">
            <h3 className="font-display text-3xl mb-8">Beneficios Clave</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {service.details.benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors rounded-xl"
                >
                  <h4 className="font-mono text-sm uppercase tracking-widest text-teal mb-4">{benefit.title}</h4>
                  <p className="text-gray-300 font-light leading-relaxed">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-32 p-12 md:p-20 border border-white/10 rounded-3xl bg-gradient-to-br from-teal/10 to-transparent text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-5xl mb-6">¿Listo para transformar tu operación?</h2>
            <p className="text-xl font-light text-gray-300 mb-10 max-w-2xl mx-auto">
              Agenda una consultoría gratuita y descubre cómo nuestra solución de {service.title} puede escalar tu negocio.
            </p>
            <button 
              onClick={() => window.open('https://ccgrupo.com.co/contacto/', '_blank')}
              className="font-mono text-sm tracking-[0.25em] uppercase px-10 py-4 bg-teal text-navy-deep hover:bg-white transition-all duration-300"
            >
              Agendar Demo
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
