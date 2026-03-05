import { Linkedin, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy pt-20 pb-12 px-6 md:px-14 lg:px-28 border-t border-white/10">
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 border-2 border-teal rounded-md flex items-center justify-center font-mono text-[0.55rem] font-bold text-teal">
              CCG
            </div>
            <div className="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-white font-normal">
              Contact Center <span className="text-teal font-semibold">Grupo</span>
            </div>
          </div>
          <p className="text-sm font-light leading-relaxed text-gray-200 max-w-xs">
            BPO de nueva generación. Ecosistema de soluciones de Contact Center con IA. Más de 15 años transformando operaciones.
          </p>
        </div>

        <div>
          <h5 className="font-mono text-[0.55rem] tracking-[0.25em] uppercase text-gray-300 mb-6">Servicios</h5>
          <ul className="space-y-4">
            {['Automatización', 'Contact Center', 'Omnicanalidad', 'Mensajes Masivos', 'Agentes Autónomos'].map(item => (
              <li key={item}>
                <a href="#" className="text-sm font-light text-gray-200 hover:text-teal transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-mono text-[0.55rem] tracking-[0.25em] uppercase text-gray-300 mb-6">Empresa</h5>
          <ul className="space-y-4">
            {['Nosotros', 'Contacto', 'Posting'].map(item => (
              <li key={item}>
                <a href="#" className="text-sm font-light text-gray-200 hover:text-teal transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-mono text-[0.55rem] tracking-[0.25em] uppercase text-gray-300 mb-6">Contacto</h5>
          <div className="space-y-4 text-sm font-light text-gray-200">
            <p>Cra. 20 #133 – 74, La Calleja</p>
            <p>Bogotá, Colombia</p>
            <a href="mailto:info@ccgrupo.com.co" className="block hover:text-teal transition-colors">info@ccgrupo.com.co</a>
            <p>(601) 7443732</p>
          </div>
        </div>
      </div>

      <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="font-mono text-[0.5rem] tracking-[0.15em] uppercase text-gray-300">
          © 2025 Contact Center Grupo S.A.S.
        </span>

        <div className="flex gap-4">
          {[
            { Icon: Linkedin, href: 'https://www.linkedin.com/company/contact-center-grupo-sas' },
            { Icon: Instagram, href: 'https://www.instagram.com/contact_center_grupo/' },
            { Icon: Facebook, href: 'https://www.facebook.com/CONTACTCENTERGROUP' },
            { Icon: Youtube, href: 'https://www.youtube.com/channel/UCK1VihHdl_RjnuLkG5rhopQ' },
            { Icon: Twitter, href: 'https://twitter.com' } // Placeholder for TikTok/X
          ].map(({ Icon, href }, i) => (
            <a 
              key={i} 
              href={href} 
              target="_blank" 
              rel="noreferrer"
              className="w-9 h-9 border border-white/10 rounded-lg flex items-center justify-center text-gray-200 hover:border-teal hover:text-teal hover:bg-teal/10 transition-all duration-300"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>

        <span className="font-mono text-[0.5rem] tracking-[0.15em] uppercase text-gray-300">
          Bogotá, Colombia
        </span>
      </div>
    </footer>
  );
}
