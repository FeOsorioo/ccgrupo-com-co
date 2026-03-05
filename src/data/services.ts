import { Zap, Headphones, Globe } from 'lucide-react';
import type { ServiceData } from '../types';

export const servicesData: ServiceData[] = [
  {
    id: '01',
    title: 'Automatización',
    desc: 'Agiliza tus comunicaciones, automatiza procesos y brinda respuestas instantáneas. Menos esfuerzo, máxima eficiencia con IA de última generación.',
    tags: ['Chatbots IA', 'RPA', 'n8n', 'Power BI', 'NLP'],
    link: 'https://ccgrupo.com.co/automatizacion/',
    icon: Zap,
    gradient: 'from-[#071a2c] via-navy-deep to-[#0a1e30]',
    details: {
      heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
      longDesc: 'Nuestra suite de automatización utiliza lo último en Inteligencia Artificial y RPA para transformar procesos manuales en flujos de trabajo eficientes y sin errores. Desde la atención al cliente hasta el procesamiento de datos, liberamos el potencial humano de tu empresa.',
      features: [
        'Chatbots con IA Generativa (GPT-4)',
        'Automatización de Procesos Robóticos (RPA)',
        'Integración de APIs y Webhooks',
        'Análisis de Sentimiento en Tiempo Real',
        'Dashboards de Power BI Automatizados',
      ],
      benefits: [
        { title: 'Reducción de Costos', desc: 'Disminuye los costos operativos hasta en un 40% automatizando tareas repetitivas.' },
        { title: 'Disponibilidad 24/7', desc: 'Tus clientes reciben atención inmediata en cualquier momento del día.' },
        { title: 'Escalabilidad', desc: 'Maneja picos de demanda sin necesidad de contratar personal temporal.' },
      ],
    },
  },
  {
    id: '02',
    title: 'Contact Center',
    desc: 'Gestionamos y optimizamos tus operaciones con talento bilingüe de primer nivel, garantizando la mejor experiencia para tus clientes a nivel global.',
    tags: ['Ventas', 'Soporte', 'Nearshore', 'Multilingüe', 'Marcación Predictiva'],
    link: 'https://ccgrupo.com.co/contact-center/',
    icon: Headphones,
    gradient: 'from-[#0c0f24] via-navy-deep to-[#10162e]',
    details: {
      heroImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop',
      longDesc: 'Más que un Call Center, somos un centro de experiencia. Combinamos talento humano altamente capacitado con tecnología de vanguardia para ofrecer interacciones memorables. Nuestro enfoque en la cultura y el bienestar se traduce en menor rotación y mayor calidad.',
      features: [
        'Agentes Bilingües (Español, Inglés, Francés, Portugués)',
        'Soporte Técnico Nivel 1, 2 y 3',
        'Ventas y Telemarketing',
        'Atención al Cliente Omnicanal',
        'Back Office y Procesamiento de Datos',
      ],
      benefits: [
        { title: 'Calidad Garantizada', desc: 'Monitoreo y QA constante con herramientas de Speech Analytics.' },
        { title: 'Flexibilidad', desc: 'Modelos de contratación flexibles que se adaptan a tus necesidades.' },
        { title: 'Infraestructura Robusta', desc: 'Tecnología de punta y redundancia para garantizar la continuidad.' },
      ],
    },
  },
  {
    id: '03',
    title: 'Omnicanalidad',
    desc: 'Unifica todos tus canales de comunicación en una sola plataforma. Agentes autónomos, mensajes masivos y chatbots inteligentes para un servicio fluido y eficiente.',
    tags: ['WhatsApp', 'Email', 'SMS Masivos', 'Agentes Autónomos', 'Voz'],
    link: 'https://ccgrupo.com.co/omnicanalidad/',
    icon: Globe,
    gradient: 'from-[#0d1a1e] via-navy-deep to-[#091a22]',
    details: {
      heroImage: 'https://images.unsplash.com/photo-1557200130-472295220db0?q=80&w=2043&auto=format&fit=crop',
      longDesc: 'Conecta con tus clientes donde ellos estén. Nuestra plataforma omnicanal centraliza WhatsApp, Facebook, Instagram, Email, SMS y Voz en una sola interfaz, permitiendo una gestión fluida y unificada de todas las interacciones.',
      features: [
        'Bandeja de Entrada Unificada',
        'Enrutamiento Inteligente de Interacciones',
        'Historial de Cliente Centralizado',
        'Campañas de Mensajería Masiva (WhatsApp/SMS)',
        'Integración con CRM (Salesforce, HubSpot, etc.)',
      ],
      benefits: [
        { title: 'Mejor Experiencia', desc: 'Tus clientes no tienen que repetir su historia en cada canal.' },
        { title: 'Mayor Conversión', desc: 'Contacta a tus leads en el momento y canal adecuado.' },
        { title: 'Visibilidad Total', desc: 'Obtén una visión 360° de todas las interacciones de tus clientes.' },
      ],
    },
  },
];

export const getServiceById = (id: string): ServiceData | undefined =>
  servicesData.find(s => s.id === id);
