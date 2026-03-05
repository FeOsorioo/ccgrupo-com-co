import { motion } from 'motion/react';

const items = [
  "Automatización", "Contact Center", "Omnicanalidad", "Agentes Autónomos", 
  "Power BI", "Inteligencia Artificial", "Mensajes Masivos", "BPO Inteligente"
];

export default function Marquee() {
  return (
    <div className="py-6 border-y border-white/10 bg-white/[0.03] overflow-hidden">
      <motion.div 
        className="flex w-max"
        animate={{ x: "-50%" }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-8 px-8 whitespace-nowrap">
            <div className="w-1.5 h-1.5 bg-teal rotate-45 shrink-0" />
            <span className="font-display text-xl text-gray-200 italic">{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
