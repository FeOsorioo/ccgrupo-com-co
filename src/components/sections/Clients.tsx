import { motion } from 'motion/react';

const clients = [
  "Salud Total", "Compensar", "Colsubsidio", "Famisanar", "Sanitas", 
  "Keralty", "Cafam", "Sura", "Comfenalco", "Medimás"
];

export default function Clients() {
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
            05 / 05 — Clientes
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-[clamp(2rem,3.5vw,3rem)]"
          >
            Nuestros <em className="italic text-gradient">Clientes</em>
          </motion.h2>
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[0.55rem] tracking-[0.15em] uppercase text-gray-300"
        >
          Clientes satisfechos a nivel global
        </motion.div>
      </div>

      <div className="flex w-full">
        <motion.div 
          className="flex w-max"
          animate={{ x: "-50%" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...clients, ...clients, ...clients].map((client, i) => (
            <div 
              key={i} 
              className="w-[200px] h-[100px] border border-white/10 flex items-center justify-center -mr-px relative group hover:border-teal/30 hover:z-10 transition-all duration-300 bg-navy-deep"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 font-body font-medium text-gray-200 group-hover:text-white transition-colors">
                {client}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
