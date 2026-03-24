import { createContext, useContext, useState, type ReactNode } from 'react';

type Lang = 'es' | 'en';

const translations = {
  es: {
    back: 'Volver',
    nav: {
      links: [
        { name: 'Inicio',      href: '#hero' },
        { name: 'Nosotros',    href: '#about' },
        { name: 'Servicios',   href: '#services' },
        { name: 'Diferencial', href: '#reasons' },
        { name: 'Clientes',    href: '#clients' },
      ],
      contact: 'Contacto',
    },
    hero: {
      badge:  'BPO de Nueva Generación — +15 años transformando empresas',
      line1:  'Tecnología para',
      line2:  'crecer,',
      line3a: 'experiencias que',
      line3b: 'conectan',
      desc:   'Transformamos los procesos de las empresas para que sean más productivas, mejoren su atención y generen más ventas.',
      cta1:   'Comenzar ahora',
      cta2:   'Ver servicios',
      scroll: 'Scroll',
    },
    about: {
      label:       '02 / 05 — Nosotros',
      headingPre:  'Más de 15 años transformando el',
      headingPost: 'en Colombia',
      descPre:     'Somos un',
      descPost:    'de nueva generación que transforma los procesos de las empresas con CX, Leads & Ventas, Agentes Autónomos con IA y Digital Studio. Optimizamos la productividad, mejoramos la atención y generamos más ventas.',
      evoPre:      'Evolucionamos el',
      evoMid:      'tradicional hacia modelos basados en',
      evoStrong:   'productividad, automatización inteligente y resultados medibles',
      quote:       'Tecnología para crecer, experiencias que conectan.',
      stats: [
        'Años de experiencia en el sector BPO',
        'Más productividad en agentes',
        'Idiomas: español, inglés, italiano, francés',
        'Consultas resueltas en primera llamada',
      ],
    },
    marquee: {
      items: ['Automatización', 'Contact Center', 'Omnicanalidad', 'Agentes Autónomos', 'Power BI', 'Inteligencia Artificial', 'Mensajes Masivos', 'BPO Inteligente'],
    },
    services: {
      label:   '03 / 05 — Servicios',
      explore: 'Explorar',
      items: {
        '01': { title: 'CX – Experiencia del Cliente', subtitle: 'Experiencias que escalan negocios', desc: 'Operamos y optimizamos la atención al cliente en todos los puntos de contacto para mejorar satisfacción, continuidad y fidelización.' },
        '02': { title: 'Leads & Ventas',               subtitle: 'Conversión con Método',             desc: 'Diseñamos y operamos procesos comerciales que convierten oportunidades en ventas reales, con más velocidad, seguimiento y trazabilidad.' },
        '03': { title: 'Agentes Autónomos',            subtitle: 'Operación 24/7 sin Límites',        desc: 'Automatizamos interacciones con IA para escalar atención, captación y respuesta 24/7 sin incrementar tu estructura operativa.' },
        '04': { title: 'Digital Studio',               subtitle: 'Tecnología que Impulsa Resultados', desc: 'Creamos soluciones digitales a medida para conectar tecnología, operación y resultados.' },
      },
    },
    reasons: {
      label:      '04 / 05 — Diferencial',
      headingPre: '¿Por qué elegir a Contact Center',
      headingEm:  'Grupo?',
      items: [
        { title: 'Más que un Contact Center',       desc: 'No nos limitamos a atender contactos. Transformamos procesos, integramos tecnología y entregamos visibilidad gerencial para una mejor toma de decisiones.' },
        { title: 'IA + Talento Humano',             desc: 'Fusionamos agentes virtuales autónomos con talento humano capacitado para operaciones de máxima eficiencia, velocidad y empatía.' },
        { title: 'Ecosistema Integrado',            desc: 'CX, Ventas, Automatización y Tecnología en una sola operación coherente. Cada servicio potencia al siguiente para resultados compuestos.' },
        { title: 'Omnicanalidad Real',              desc: 'WhatsApp, email, SMS, chatbots y voz unificados en una sola plataforma para cero fricción y experiencia consistente en todos los canales.' },
        { title: 'Visibilidad Ejecutiva',           desc: 'Dashboards en tiempo real con Looker Studio y Power BI. Trazabilidad completa de la operación para decisiones basadas en datos.' },
        { title: 'Orientados a Resultados',         desc: 'No solo implementamos tecnología. Conectamos la operación con objetivos de negocio y medimos el impacto real en productividad, ventas y experiencia.' },
      ],
    },
    sectors: {
      label:      'Sectores',
      heading:    'Industrias que impulsamos',
      sub:        'Operamos en los sectores más exigentes con soluciones adaptadas a cada industria.',
      challenges: 'Retos del sector',
      solutions:  'Cómo lo resolvemos',
      kpisLabel:  'Resultados clave',
      cta:        'Hablar con un especialista',
      items: [
        {
          name:   'Salud',
          desc:   'Agendamiento, soporte a pacientes y gestión de citas con omnicanalidad.',
          detail: 'Operamos en clínicas, hospitales, IPS y EPS con soluciones de agendamiento inteligente, soporte a pacientes y gestión omnicanal. Garantizamos tiempos de respuesta, trazabilidad y experiencia de alta calidad en cada interacción.',
          challenges: ['Alta demanda de agendamiento telefónico y digital', 'Gestión de PQR y quejas de pacientes', 'Coordinación entre sedes y especialidades', 'Canales dispersos sin trazabilidad centralizada'],
          solutions:  ['Agendamiento multicanal con IA (WhatsApp, voz, chat)', 'Gestión de PQR y reclamos con trazabilidad total', 'Mesa de ayuda para pacientes y cuidadores', 'AVA Asistente para recordatorios y confirmaciones 24/7'],
          kpis: [{ label: 'Reducción en no-show', value: '−35%' }, { label: 'Resolución 1er contacto', value: '92%' }, { label: 'Disponibilidad', value: '24/7' }],
        },
        {
          name:   'Finanzas',
          desc:   'Cobranza, servicio al cliente y cumplimiento normativo con alta trazabilidad.',
          detail: 'Apoyamos bancos, aseguradoras, fintechs y cooperativas con operaciones de cobranza, servicio al cliente y cumplimiento regulatorio. Alta trazabilidad, seguridad operativa y eficiencia en cada interacción.',
          challenges: ['Mora y recuperación de cartera vencida', 'Cumplimiento regulatorio y SAGRILAFT', 'Atención de alto volumen con bajo costo por contacto', 'Experiencia inconsistente entre canales'],
          solutions:  ['Gestión de cobranza preventiva y temprana', 'Servicio omnicanal con trazabilidad completa', 'Automatización de consultas frecuentes con IA', 'Dashboards ejecutivos en tiempo real con Power BI'],
          kpis: [{ label: 'Recuperación de cartera', value: '+28%' }, { label: 'Reducción costo/contacto', value: '−40%' }, { label: 'Cumplimiento SLA', value: '99%' }],
        },
        {
          name:   'Retail',
          desc:   'Atención posventa, gestión de pedidos y fidelización de clientes.',
          detail: 'Operamos el servicio posventa y fidelización para marcas retail y e-commerce con alto volumen de interacciones. Omnicanalidad real y experiencia consistente en todos los puntos de contacto, incluso en picos estacionales.',
          challenges: ['Picos estacionales de alta demanda (Black Friday, navidad)', 'Gestión de devoluciones, cambios y garantías', 'Seguimiento de pedidos y coordinación con logística', 'Fidelización en canales digitales fragmentados'],
          solutions:  ['Atención posventa omnicanal (WhatsApp, email, voz)', 'Gestión de PQRS y logística inversa', 'AVA Chat para tracking automático de pedidos', 'Programas de fidelización y retención activa'],
          kpis: [{ label: 'Satisfacción cliente (NPS)', value: '+45' }, { label: 'Reducción PQRS reiterativas', value: '−50%' }, { label: 'Tiempo de respuesta', value: '<2 min' }],
        },
        {
          name:   'Gobierno',
          desc:   'Líneas de atención ciudadana, PQR y operaciones de alto volumen.',
          detail: 'Prestamos servicios a entidades gubernamentales con líneas de atención ciudadana de alto volumen, gestión de PQRSD y reportes de trazabilidad para cumplimiento institucional y rendición de cuentas.',
          challenges: ['Alto volumen de solicitudes ciudadanas', 'Gestión de PQRSD con tiempos regulados por ley', 'Transparencia, trazabilidad y auditoría institucional', 'Atención multicanal con presupuesto limitado'],
          solutions:  ['Líneas 01800 y centros de atención ciudadana', 'Gestión de PQRSD con trazabilidad y alertas automáticas', 'AVA Bot para orientación ciudadana y preguntas frecuentes', 'Dashboards de gestión para entes de control'],
          kpis: [{ label: 'Reducción tiempos de respuesta', value: '−60%' }, { label: 'Resolución 1er contacto', value: '88%' }, { label: 'Trazabilidad PQRSD', value: '100%' }],
        },
        {
          name:   'Educación',
          desc:   'Captación de estudiantes, soporte académico y plataformas e-learning.',
          detail: 'Apoyamos universidades, colegios y plataformas e-learning en la captación de estudiantes, soporte académico y desarrollo de soluciones digitales educativas. Reducimos la deserción y aceleramos las matrículas.',
          challenges: ['Captación y conversión de prospectos a estudiantes', 'Soporte académico y administrativo multicanal', 'Alta tasa de deserción estudiantil', 'Digitalización de procesos educativos'],
          solutions:  ['Captación de prospectos con seguimiento CRM automatizado', 'Soporte a estudiantes por WhatsApp, chat y voz', 'AVA Leads para nutrición y conversión de matrículas', 'Plataformas e-learning y portales estudiantiles a medida'],
          kpis: [{ label: 'Incremento en matrículas', value: '+32%' }, { label: 'Reducción deserción', value: '−25%' }, { label: 'Satisfacción estudiantil', value: '94%' }],
        },
        {
          name:   'Logística',
          desc:   'Seguimiento de envíos, atención de novedades y coordinación operativa.',
          detail: 'Operamos el servicio al cliente para empresas de transporte, mensajería y cadena de suministro con seguimiento de envíos en tiempo real, gestión de novedades y coordinación operativa eficiente.',
          challenges: ['Seguimiento masivo de envíos y gestión de novedades', 'Atención de reclamaciones por pérdida o daño', 'Coordinación entre bodegas, transportistas y clientes', 'Escalabilidad en temporadas de alta operación'],
          solutions:  ['Contact center especializado en logística y transporte', 'AVA Chat para tracking automático de envíos', 'Gestión de reclamaciones con trazabilidad end-to-end', 'Integración con TMS y sistemas logísticos vía API'],
          kpis: [{ label: 'Reducción llamadas de tracking', value: '−55%' }, { label: 'Resolución de novedades', value: '<4 h' }, { label: 'Satisfacción en entrega', value: '96%' }],
        },
      ],
    },
    clients: {
      label:      '05 / 05 — Clientes',
      headingPre: 'Nuestros',
      headingEm:  'Clientes',
      sub:        'Clientes satisfechos a nivel global',
    },
    cta: {
      label:       '¿Listo para transformar tu operación?',
      headingPre:  'Hablemos del',
      headingEm:   'futuro',
      headingPost: 'de tu empresa',
      desc:        'Descubre cómo nuestro ecosistema de CX, Ventas, IA y tecnología a medida puede impulsar tu productividad y resultados.',
      button:      'Agendar Reunión',
    },
    cookie: {
      message: 'Usamos cookies para mejorar tu experiencia y analizar el tráfico del sitio (Google Analytics). Puedes aceptar o rechazar su uso.',
      accept:  'Aceptar',
      reject:  'Rechazar',
      policy:  'Ver política de privacidad',
    },
    footer: {
      desc:          'BPO de nueva generación. Transformamos procesos con CX, Leads & Ventas, Agentes Autónomos con IA y Digital Studio. +15 años de experiencia.',
      servicesTitle: 'Servicios',
      companyTitle:  'Empresa',
      contactTitle:  'Contacto',
      serviceLinks:  [
        { name: 'CX – Experiencia del Cliente', id: '01' },
        { name: 'Leads & Ventas',               id: '02' },
        { name: 'Agentes Autónomos',            id: '03' },
        { name: 'Digital Studio',               id: '04' },
      ],
      companyLinks:  [
        { name: 'Nosotros', href: '#about' },
        { name: 'Contacto', href: 'contact' },
        { name: 'Posting',  href: 'https://posting.com.co' },
      ],
      copyright:     '© 2025 Contact Center Grupo S.A.S.',
      privacy:       'Políticas de Privacidad',
      location:      'Bogotá, Colombia',
    },
    contact: {
      label:      '— Contacto',
      headingPre: 'Hablemos de tu',
      headingEm:  'próximo proyecto',
      desc:       'Cuéntanos qué necesitas y un especialista de nuestro equipo se pondrá en contacto contigo en menos de 24 horas.',
      infoLabels: { location: 'Ubicación', email: 'Email', phone: 'Teléfono', schedule: 'Horario' },
      infoSubs:   { email: 'Respondemos en menos de 24 h', phone: 'Lunes a viernes, 8 am – 6 pm', schedule: 'Zona horaria Colombia (COT)', location: 'Bogotá, Colombia' },
      commercial: 'Con más de 15 años operando en el mercado BPO colombiano, CCGrupo es el aliado estratégico que transforma procesos, mejora la atención y genera más ventas. Presencia activa en Bogotá, Medellín y Cali, con capacidad para escalar operaciones a nivel nacional e internacional. Nuestro ecosistema integra CX, Leads & Ventas, Agentes Autónomos con IA y Digital Studio para que tu empresa crezca sin límites.',
      fields: {
        nombre:       'Nombre completo',
        empresa:      'Empresa',
        email:        'Correo electrónico',
        telefono:     'Teléfono / WhatsApp',
        servicio:     'Servicio de interés',
        mensaje:      'Cuéntanos sobre tu proyecto',
        selectPh:     'Selecciona una solución…',
        messagePh:    'Describe brevemente tu operación, el reto que enfrentas y qué esperas de nosotros…',
        submit:       'Enviar mensaje',
        sending:      'Enviando…',
        privacyNote:  'Tu información es confidencial y nunca será compartida con terceros.',
      },
      errors: {
        nombre:   'Ingresa tu nombre completo.',
        empresa:  'Ingresa el nombre de tu empresa.',
        email:    'Ingresa un correo electrónico válido.',
        telefono: 'Ingresa un número de contacto.',
        servicio: 'Selecciona el servicio de tu interés.',
        mensaje:  'Cuéntanos un poco más (mínimo 20 caracteres).',
      },
      success: {
        title: 'Mensaje enviado',
        pre:   'Gracias por contactarnos,',
        post:  '. Un especialista revisará tu solicitud y te responderá en las próximas 24 horas.',
        again: 'Enviar otro mensaje',
      },
    },
    privacy: {
      label:      'Transparencia y Cumplimiento',
      heading:    'Políticas de Privacidad',
      desc:       'Nuestro compromiso con la transparencia, el bienestar y la protección de la información de nuestros colaboradores y clientes.',
      modalLabel: 'Política',
      viewDoc:    'Ver documento →',
      policies: [
        { title: 'Política de Acoso Laboral',                              desc: 'Lineamientos para prevenir, corregir y sancionar el acoso laboral en el entorno de trabajo.' },
        { title: 'Política SG-SST',                                        desc: 'Sistema de Gestión de Seguridad y Salud en el Trabajo: compromisos y directrices para un entorno seguro.' },
        { title: 'Política de Alcohol y Otros',                            desc: 'Normas sobre el consumo de alcohol, sustancias psicoactivas y tabaco en el ambiente laboral.' },
        { title: 'Política de Acoso Sexual',                               desc: 'Mecanismos de prevención y atención del acoso sexual en el lugar de trabajo.' },
        { title: 'Política de Teletrabajo',                                desc: 'Condiciones, derechos y obligaciones para el desarrollo del trabajo remoto.' },
        { title: 'Política de Igualdad y Equidad Laboral con Enfoque de Género', desc: 'Compromisos de CCGrupo para garantizar igualdad de oportunidades y trato equitativo con perspectiva de género.' },
        { title: 'Política de Desconexión Laboral',                        desc: 'Derecho de los colaboradores a desconectarse fuera del horario laboral y en períodos de descanso.' },
      ],
    },
    serviceModule: {
      servicePrefix:  'Servicio',
      features:       'Características',
      benefits:       'Beneficios Clave',
      productSuite:   'Suite de Productos',
      ourAgents:      'Nuestros Agentes',
      faqLabel:       'Preguntas Frecuentes',
      ctaTitle:       '¿Listo para transformar tu operación?',
      ctaDescPre:     'Agenda una consultoría gratuita y descubre cómo nuestra solución de',
      ctaDescPost:    'puede escalar tu negocio.',
      ctaButton:      'Agendar Demo',
      baseBlock: {
        label:     'Base Unificada de Servicios',
        title:     'Todos nuestros servicios se apoyan en una base unificada de omnicanalidad, automatización inteligente y visibilidad de informes en tiempo real.',
        guarantee: 'Esta base garantiza productividad, trazabilidad, control y visibilidad ejecutiva en cada servicio.',
        pillars: [
          { title: 'Omnicanalidad Total',                     desc: 'Integración de todos los canales de comunicación en una sola operación cohesionada: voz, WhatsApp, email, chat, redes sociales y más.' },
          { title: 'Automatización Inteligente',              desc: 'Flujos automatizados con IA que optimizan cada proceso, reducen la carga operativa y escalan sin fricción.' },
          { title: 'Dashboard Ejecutivo en Tiempo Real',      desc: 'Visibilidad completa de la operación con Looker Studio y Power BI para toma de decisiones basada en datos reales.' },
        ],
      },
    },
    serviceDetails: {
      '01': {
        longDesc:  'Gestionamos la experiencia del cliente con omnicanalidad, IA y operación especializada para responder mejor, más rápido y con mayor control. Convertimos cada interacción en una oportunidad para fortalecer la marca, fidelizar clientes y escalar confianza.',
        tags:      ['Servicio al Cliente', 'PQR', 'Reservas', 'Gestión de Pedidos', 'Mesa de Ayuda', 'Soporte Omnicanal'],
        features:  ['Servicio al cliente multicanal (voz, chat, email)', 'Gestión de PQR, PQRSF y quejas', 'Reservas y toma de pedidos', 'Mesa de ayuda técnica y funcional', 'Soporte omnicanal integrado', 'Atención posventa y fidelización'],
        benefits:  [{ title: 'Mejor Experiencia del Cliente', desc: 'Satisfacción mejorada en cada punto de contacto con protocolos estructurados y atención omnicanal.' }, { title: 'Mayor Retención', desc: 'Reducción de churn y mayor fidelización mediante gestión proactiva de cada interacción.' }, { title: 'Control Operativo Total', desc: 'Trazabilidad y visibilidad en tiempo real sobre SLAs, tiempos de respuesta y calidad del servicio.' }],
        faq:       [{ question: '¿Qué tipos de empresas se benefician más?', answer: 'Empresas con alto volumen de atención, marcas con postventa crítica y organizaciones que necesitan escalar sin deteriorar la experiencia.' }, { question: '¿Cómo se integran con nuestros sistemas?', answer: 'Nos conectamos vía API con Salesforce, HubSpot, Zoho y sistemas propietarios en un proceso de onboarding de 2 a 4 semanas.' }, { question: '¿Ofrecen atención en múltiples idiomas?', answer: 'Sí. Operamos en español, inglés, italiano y francés con agentes nativos o bilingües certificados.' }, { question: '¿Cómo miden la calidad del servicio?', answer: 'Con NPS, CSAT, FCR y SLAs acordados por cliente, con visibilidad en tiempo real vía dashboard ejecutivo.' }],
      },
      '02': {
        longDesc:  'Transformamos el interés en ingresos con una operación comercial más inteligente, ágil y conectada. Integramos captación, WhatsApp y CRM en un solo flujo para que ninguna oportunidad se pierda y cada contacto se convierta en valor estratégico.',
        tags:      ['Captación de Leads', 'Seguimiento Multicanal', 'WhatsApp Ventas', 'Gestión CRM', 'Reactivación', 'Cierre de Oportunidades'],
        features:  ['Captación y calificación de leads', 'Seguimiento comercial multicanal', 'Ventas por WhatsApp Business', 'Gestión y automatización de CRM', 'Reactivación de clientes inactivos', 'Seguimiento y cierre de oportunidades'],
        benefits:  [{ title: 'Mayor Conversión', desc: 'Proceso estructurado que reduce la fuga de oportunidades y aumenta el porcentaje de cierre.' }, { title: 'Pipeline Visible', desc: 'Trazabilidad completa del embudo comercial con métricas de desempeño en tiempo real.' }, { title: 'Velocidad Comercial', desc: 'Respuesta rápida como palanca de cierre: cada lead atendido en el momento de mayor intención.' }],
        faq:       [{ question: '¿Qué diferencia su proceso del comercial tradicional?', answer: 'Integramos captación, WhatsApp y CRM en un solo flujo automatizado, con velocidad de respuesta y trazabilidad completa del embudo.' }, { question: '¿Con qué CRM trabajan?', answer: 'Integramos con Salesforce, HubSpot, Zoho CRM, Pipedrive y soluciones a medida vía API REST.' }, { question: '¿Cómo reactivan bases de clientes existentes?', answer: 'Con campañas segmentadas en WhatsApp, email y voz, combinando automatización e intervención humana en el momento de mayor intención de compra.' }, { question: '¿Cuál es el modelo de cobro?', answer: 'Flexible: por gestión (fee mensual), por resultado (comisión sobre venta) o mixto, según el acuerdo con cada cliente.' }],
      },
      '03': {
        longDesc:  'Implementamos agentes autónomos con IA para automatizar atención, captación y gestión operativa en tiempo real. Operación continua 24/7 que responde, filtra y escala sin fricción, reduciendo la carga operativa y ampliando la capacidad de respuesta sin crecer la estructura humana.',
        tags:      ['IA 24/7', 'WhatsApp IA', 'Chat IA', 'Leads IA', 'Social IA', 'Autónomo'],
        features:  ['Operación continua 24/7/365 sin pausas', 'Procesamiento de lenguaje natural (NLP) avanzado', 'Integración nativa con WhatsApp, Signal, Telegram y WebChat', 'Escalamiento automático a agente humano en casos complejos', 'Captación, filtrado y enrutamiento automático de contactos', 'Reducción de carga operativa en tareas repetitivas'],
        benefits:  [{ title: 'Disponibilidad Total', desc: 'Atiende miles de conversaciones simultáneas sin tiempos de espera, los 365 días del año.' }, { title: 'Escalabilidad sin Estructura', desc: 'Crece tu capacidad de atención sin incrementar proporcionalmente tu equipo humano.' }, { title: 'Menor Costo por Interacción', desc: 'Automatiza hasta el 80% de las interacciones repetitivas, liberando al equipo para tareas de alto valor.' }],
        faq:       [{ question: '¿Qué tan autónomo es realmente el agente?', answer: 'Ejecuta flujos completos: responder, calificar, agendar, notificar y registrar, sin intervención humana. Solo escala cuando detecta situaciones que requieren criterio humano.' }, { question: '¿Puede escalar a un agente humano?', answer: 'Sí. Detecta automáticamente conversaciones críticas o fuera de su alcance y transfiere con contexto completo al agente humano.' }, { question: '¿Cuánto tiempo toma implementar un agente?', answer: 'Entre 1 y 3 semanas según la complejidad de los flujos y las integraciones requeridas.' }, { question: '¿Los agentes aprenden con el tiempo?', answer: 'Sí. Con cada conversación el modelo se afina. El equipo de CCGrupo realiza revisiones periódicas para mejorar la precisión y cobertura.' }],
      },
      '04': {
        longDesc:  'Creamos soluciones digitales a medida que conectan sistemas, personas y procesos para impulsar la eficiencia y el crecimiento. Tecnología diseñada desde la necesidad del negocio, no desde la herramienta, con foco en adopción, integración y resultados medibles.',
        tags:      ['CRM', 'Apps', 'E-commerce', 'Agendamiento', 'Portales', 'Dashboards', 'Avatares IA'],
        features:  ['CRM personalizados a medida', 'Aplicaciones web y móviles', 'Diseño y desarrollo de páginas web corporativas', 'E-commerce y soluciones de pago integradas', 'Sistemas de agendamiento y reservas personalizados', 'Portales de clientes y proveedores', 'Dashboards ejecutivos y analítica en tiempo real', 'Plataformas de capacitación e-learning', 'Avatares digitales con IA'],
        benefits:  [{ title: 'Tecnología desde el Negocio', desc: 'Soluciones diseñadas desde la necesidad del proceso, no adaptaciones de software genérico.' }, { title: 'Ecosistema Integrado', desc: 'Conectamos operación, comercial, servicio y analítica en una arquitectura digital coherente.' }, { title: 'Adopción Real', desc: 'Foco en transferencia tecnológica y adopción efectiva, no solo en implementación técnica.' }],
        faq:       [{ question: '¿Con qué tecnologías trabajan?', answer: 'React, Next.js, Node.js, Python, React Native para móvil, y bases de datos relacionales y NoSQL según el proyecto.' }, { question: '¿Cuánto tarda un proyecto típico?', answer: 'Un MVP toma entre 4 y 8 semanas; un sistema completo entre 3 y 6 meses con entregas iterativas.' }, { question: '¿Ofrecen mantenimiento y soporte?', answer: 'Sí. Contamos con planes de soporte mensual, actualizaciones de seguridad y evolución del software incluida.' }, { question: '¿Pueden integrar con sistemas legados?', answer: 'Sí. Desarrollamos conectores y middleware para integrar con SAP, Oracle, sistemas propietarios y cualquier servicio con API.' }],
      },
    },
  },

  /* ─── English ─────────────────────────────────── */
  en: {
    back: 'Back',
    nav: {
      links: [
        { name: 'Home',      href: '#hero' },
        { name: 'About',     href: '#about' },
        { name: 'Services',  href: '#services' },
        { name: 'Advantage', href: '#reasons' },
        { name: 'Clients',   href: '#clients' },
      ],
      contact: 'Contact',
    },
    hero: {
      badge:  'Next-Gen BPO — +15 years transforming companies',
      line1:  'Technology to',
      line2:  'grow,',
      line3a: 'experiences that',
      line3b: 'connect',
      desc:   'We transform business processes to increase productivity, improve customer experience and generate more sales.',
      cta1:   'Get started',
      cta2:   'View services',
      scroll: 'Scroll',
    },
    about: {
      label:       '02 / 05 — About',
      headingPre:  'Over 15 years transforming',
      headingPost: 'in Colombia',
      descPre:     'We are a next-gen',
      descPost:    'that transforms business processes with CX, Leads & Sales, Autonomous AI Agents and Digital Studio. We optimize productivity, improve customer experience and generate more sales.',
      evoPre:      'We evolve traditional',
      evoMid:      'toward models based on',
      evoStrong:   'productivity, intelligent automation and measurable results',
      quote:       'Technology to grow, experiences that connect.',
      stats: [
        'Years of experience in the BPO sector',
        'More agent productivity',
        'Languages: Spanish, English, Italian, French',
        'Queries resolved on first call',
      ],
    },
    marquee: {
      items: ['Automation', 'Contact Center', 'Omnichannel', 'Autonomous Agents', 'Power BI', 'Artificial Intelligence', 'Mass Messaging', 'Smart BPO'],
    },
    services: {
      label:   '03 / 05 — Services',
      explore: 'Explore',
      items: {
        '01': { title: 'CX – Customer Experience',  subtitle: 'Experiences that Scale Business',      desc: 'We operate and optimize customer service across all touchpoints to improve satisfaction, continuity and loyalty.' },
        '02': { title: 'Leads & Sales',              subtitle: 'Conversion with Method',              desc: 'We design and operate commercial processes that convert opportunities into real sales, with more speed, follow-up and traceability.' },
        '03': { title: 'Autonomous Agents',          subtitle: '24/7 Operation without Limits',       desc: 'We automate interactions with AI to scale service, lead capture and response 24/7 without increasing your operational structure.' },
        '04': { title: 'Digital Studio',             subtitle: 'Technology that Drives Results',      desc: 'We create custom digital solutions to connect technology, operations and results.' },
      },
    },
    reasons: {
      label:      '04 / 05 — Advantage',
      headingPre: 'Why Choose Contact Center',
      headingEm:  'Grupo?',
      items: [
        { title: 'More Than a Contact Center',    desc: "We don't just handle contacts. We transform processes, integrate technology and deliver executive visibility for better decision-making." },
        { title: 'AI + Human Talent',             desc: 'We merge autonomous virtual agents with trained human talent for maximum efficiency, speed and empathy.' },
        { title: 'Integrated Ecosystem',          desc: 'CX, Sales, Automation and Technology in one coherent operation. Each service amplifies the next for compounded results.' },
        { title: 'True Omnichannel',              desc: 'WhatsApp, email, SMS, chatbots and voice unified in a single platform for zero friction and consistent cross-channel experience.' },
        { title: 'Executive Visibility',          desc: 'Real-time dashboards with Looker Studio and Power BI. Full operational traceability for data-driven decisions.' },
        { title: 'Results-Oriented',              desc: 'We don\'t just implement technology. We connect operations to business goals and measure real impact on productivity, sales and experience.' },
      ],
    },
    sectors: {
      label:      'Sectors',
      heading:    'Industries we power',
      sub:        'We operate in the most demanding sectors with solutions tailored to each industry.',
      challenges: 'Sector challenges',
      solutions:  'How we solve it',
      kpisLabel:  'Key results',
      cta:        'Talk to a specialist',
      items: [
        {
          name:   'Healthcare',
          desc:   'Scheduling, patient support and appointment management with omnichannel coverage.',
          detail: 'We operate in clinics, hospitals, and health insurers with intelligent scheduling, patient support and omnichannel management. We guarantee response times, traceability and high-quality experience in every interaction.',
          challenges: ['High demand for phone and digital scheduling', 'Patient complaint and PQR management', 'Coordination across facilities and specialties', 'Fragmented channels without centralized traceability'],
          solutions:  ['Multichannel AI scheduling (WhatsApp, voice, chat)', 'PQR and complaint management with full traceability', 'Help desk for patients and caregivers', 'AVA Assistant for reminders and confirmations 24/7'],
          kpis: [{ label: 'No-show reduction', value: '−35%' }, { label: 'First contact resolution', value: '92%' }, { label: 'Availability', value: '24/7' }],
        },
        {
          name:   'Finance',
          desc:   'Collections, customer service and regulatory compliance with full traceability.',
          detail: 'We support banks, insurers, fintechs and cooperatives with collections, customer service and regulatory compliance. High traceability, operational security and efficiency in every interaction.',
          challenges: ['Overdue debt and portfolio recovery', 'Regulatory compliance and AML requirements', 'High-volume service at low cost per contact', 'Inconsistent experience across channels'],
          solutions:  ['Preventive and early-stage collections management', 'Omnichannel service with full traceability', 'AI automation for frequent customer inquiries', 'Real-time executive dashboards with Power BI'],
          kpis: [{ label: 'Portfolio recovery', value: '+28%' }, { label: 'Cost per contact reduction', value: '−40%' }, { label: 'SLA compliance', value: '99%' }],
        },
        {
          name:   'Retail',
          desc:   'After-sales service, order management and customer loyalty programs.',
          detail: 'We operate after-sales service and loyalty programs for retail brands and e-commerce with high interaction volumes. True omnichannel and consistent experience at every touchpoint, even during seasonal peaks.',
          challenges: ['Seasonal demand peaks (Black Friday, holidays)', 'Returns, exchanges and warranty management', 'Order tracking and logistics coordination', 'Loyalty programs across fragmented digital channels'],
          solutions:  ['Omnichannel after-sales service (WhatsApp, email, voice)', 'PQRS management and reverse logistics', 'AVA Chat for automatic order tracking', 'Active loyalty and retention programs'],
          kpis: [{ label: 'Customer satisfaction (NPS)', value: '+45' }, { label: 'Repetitive PQRS reduction', value: '−50%' }, { label: 'Response time', value: '<2 min' }],
        },
        {
          name:   'Government',
          desc:   'Citizen service lines, PQR management and high-volume operations.',
          detail: 'We provide services to government entities with high-volume citizen service lines, PQRSD management and traceability reports for institutional compliance and accountability.',
          challenges: ['High volume of citizen requests', 'PQRSD management with legally regulated timelines', 'Transparency, traceability and institutional auditing', 'Multichannel service with limited budgets'],
          solutions:  ['0800 lines and citizen service centers', 'PQRSD management with traceability and automatic alerts', 'AVA Bot for citizen guidance and FAQs', 'Management dashboards for oversight bodies'],
          kpis: [{ label: 'Response time reduction', value: '−60%' }, { label: 'First contact resolution', value: '88%' }, { label: 'PQRSD traceability', value: '100%' }],
        },
        {
          name:   'Education',
          desc:   'Student recruitment, academic support and e-learning platforms.',
          detail: 'We support universities, schools and e-learning platforms in student recruitment, academic support and the development of custom digital education solutions. We reduce dropout rates and accelerate enrollments.',
          challenges: ['Prospect capture and conversion to enrolled students', 'Multichannel academic and administrative support', 'High student dropout rates', 'Digitization of educational processes'],
          solutions:  ['Prospect capture with automated CRM follow-up', 'Student support via WhatsApp, chat and voice', 'AVA Leads for enrollment nurturing and conversion', 'Custom e-learning platforms and student portals'],
          kpis: [{ label: 'Enrollment increase', value: '+32%' }, { label: 'Dropout reduction', value: '−25%' }, { label: 'Student satisfaction', value: '94%' }],
        },
        {
          name:   'Logistics',
          desc:   'Shipment tracking, incident resolution and operational coordination.',
          detail: 'We operate customer service for transportation, courier and supply chain companies with real-time shipment tracking, incident management and efficient operational coordination.',
          challenges: ['Mass shipment tracking and incident management', 'Claims handling for losses and damages', 'Coordination between warehouses, carriers and customers', 'Scalability during peak operational seasons'],
          solutions:  ['Contact center specialized in logistics and transport', 'AVA Chat for automatic shipment tracking', 'Claims management with end-to-end traceability', 'API integration with TMS and logistics systems'],
          kpis: [{ label: 'Tracking call reduction', value: '−55%' }, { label: 'Incident resolution', value: '<4 h' }, { label: 'Delivery satisfaction', value: '96%' }],
        },
      ],
    },
    clients: {
      label:      '05 / 05 — Clients',
      headingPre: 'Our',
      headingEm:  'Clients',
      sub:        'Satisfied clients worldwide',
    },
    cta: {
      label:       'Ready to transform your operation?',
      headingPre:  "Let's talk about the",
      headingEm:   'future',
      headingPost: 'of your company',
      desc:        'Discover how our ecosystem of CX, Sales, AI and custom technology can boost your productivity and results.',
      button:      'Schedule a Meeting',
    },
    cookie: {
      message: 'We use cookies to improve your experience and analyze site traffic (Google Analytics). You can accept or reject their use.',
      accept:  'Accept',
      reject:  'Reject',
      policy:  'View privacy policy',
    },
    footer: {
      desc:          'Next-generation BPO. We transform processes with CX, Leads & Sales, Autonomous AI Agents and Digital Studio. Over 15 years of experience.',
      servicesTitle: 'Services',
      companyTitle:  'Company',
      contactTitle:  'Contact',
      serviceLinks:  [
        { name: 'CX – Customer Experience', id: '01' },
        { name: 'Leads & Sales',            id: '02' },
        { name: 'Autonomous Agents',        id: '03' },
        { name: 'Digital Studio',           id: '04' },
      ],
      companyLinks:  [
        { name: 'About',   href: '#about' },
        { name: 'Contact', href: 'contact' },
        { name: 'Posting', href: 'https://posting.com.co' },
      ],
      copyright:     '© 2025 Contact Center Grupo S.A.S.',
      privacy:       'Privacy Policies',
      location:      'Bogotá, Colombia',
    },
    contact: {
      label:      '— Contact',
      headingPre: "Let's talk about your",
      headingEm:  'next project',
      desc:       'Tell us what you need and a specialist from our team will get in touch within 24 hours.',
      infoLabels: { location: 'Location', email: 'Email', phone: 'Phone', schedule: 'Schedule' },
      infoSubs:   { email: 'We respond within 24 h', phone: 'Mon – Fri, 8 am – 6 pm', schedule: 'Colombia Time Zone (COT)', location: 'Bogotá, Colombia' },
      commercial: 'With over 15 years in the Colombian BPO market, CCGrupo is the strategic partner that transforms processes, improves customer experience and generates more sales. Active presence in Bogotá, Medellín and Cali, with the capacity to scale operations nationally and internationally. Our ecosystem integrates CX, Leads & Sales, Autonomous AI Agents and Digital Studio so your business grows without limits.',
      fields: {
        nombre:      'Full name',
        empresa:     'Company',
        email:       'Email address',
        telefono:    'Phone / WhatsApp',
        servicio:    'Service of interest',
        mensaje:     'Tell us about your project',
        selectPh:    'Select a solution…',
        messagePh:   'Briefly describe your operation, the challenge you face and what you expect from us…',
        submit:      'Send message',
        sending:     'Sending…',
        privacyNote: 'Your information is confidential and will never be shared with third parties.',
      },
      errors: {
        nombre:   'Please enter your full name.',
        empresa:  'Please enter your company name.',
        email:    'Please enter a valid email address.',
        telefono: 'Please enter a contact number.',
        servicio: 'Please select a service of interest.',
        mensaje:  'Tell us a bit more (minimum 20 characters).',
      },
      success: {
        title: 'Message sent',
        pre:   'Thank you for contacting us,',
        post:  '. A specialist will review your request and respond within the next 24 hours.',
        again: 'Send another message',
      },
    },
    privacy: {
      label:      'Transparency & Compliance',
      heading:    'Workplace Policies',
      desc:       'Our commitment to transparency, well-being and the protection of information for our employees and clients.',
      modalLabel: 'Policy',
      viewDoc:    'View document →',
      policies: [
        { title: 'Workplace Harassment Policy',               desc: 'Guidelines to prevent, correct and sanction workplace harassment within the organization.' },
        { title: 'Occupational Health & Safety (SG-SST)',     desc: 'Occupational Health and Safety Management System: commitments and guidelines for a safe work environment.' },
        { title: 'Alcohol & Substance Policy',                desc: 'Rules on the consumption of alcohol, psychoactive substances and tobacco in the workplace.' },
        { title: 'Sexual Harassment Policy',                  desc: 'Prevention and response mechanisms for sexual harassment in the workplace.' },
        { title: 'Remote Work Policy',                        desc: 'Conditions, rights and obligations for the development of remote work.' },
        { title: 'Gender Equality & Equity Policy',           desc: "CCGrupo's commitments to ensure equal opportunities and equitable treatment with a gender perspective." },
        { title: 'Right to Disconnect Policy',                desc: "Employees' right to disconnect outside working hours and during rest periods." },
      ],
    },
    serviceModule: {
      servicePrefix:  'Service',
      features:       'Features',
      benefits:       'Key Benefits',
      productSuite:   'Product Suite',
      ourAgents:      'Our Agents',
      faqLabel:       'Frequently Asked Questions',
      ctaTitle:       'Ready to transform your operation?',
      ctaDescPre:     'Book a free consultation and discover how our',
      ctaDescPost:    'solution can scale your business.',
      ctaButton:      'Schedule a Demo',
      baseBlock: {
        label:     'Unified Service Foundation',
        title:     'All our services are built on a unified foundation of omnichannel, intelligent automation and real-time reporting visibility.',
        guarantee: 'This foundation guarantees productivity, traceability, control and executive visibility across every service.',
        pillars: [
          { title: 'Total Omnichannel',                   desc: 'Integration of all communication channels in one cohesive operation: voice, WhatsApp, email, chat, social media and more.' },
          { title: 'Intelligent Automation',              desc: 'AI-powered automated flows that optimize every process, reduce operational load and scale without friction.' },
          { title: 'Executive Dashboard in Real Time',    desc: 'Full operational visibility with Looker Studio and Power BI for data-driven decision making.' },
        ],
      },
    },
    serviceDetails: {
      '01': {
        longDesc:  'We manage customer experience with omnichannel, AI and specialized operations to respond better, faster and with greater control. We turn every interaction into an opportunity to strengthen the brand, build customer loyalty and scale trust.',
        tags:      ['Customer Service', 'PQR', 'Reservations', 'Order Management', 'Help Desk', 'Omnichannel Support'],
        features:  ['Multichannel customer service (voice, chat, email)', 'PQR, PQRSF and complaints management', 'Reservations and order taking', 'Technical and functional help desk', 'Integrated omnichannel support', 'After-sales service and loyalty programs'],
        benefits:  [{ title: 'Better Customer Experience', desc: 'Improved satisfaction at every touchpoint with structured protocols and omnichannel service.' }, { title: 'Higher Retention', desc: 'Reduced churn and greater loyalty through proactive management of every interaction.' }, { title: 'Full Operational Control', desc: 'Real-time traceability and visibility over SLAs, response times and service quality.' }],
        faq:       [{ question: 'What types of companies benefit most?', answer: 'Companies with high service volumes, brands with critical after-sales, and organizations that need to scale without degrading experience.' }, { question: 'How do you integrate with our systems?', answer: 'We connect via API with Salesforce, HubSpot, Zoho and proprietary systems in a 2-to-4-week onboarding process.' }, { question: 'Do you offer multilingual support?', answer: 'Yes. We operate in Spanish, English, Italian and French with certified native or bilingual agents.' }, { question: 'How do you measure service quality?', answer: 'Through NPS, CSAT, FCR and client-agreed SLAs, with real-time visibility via executive dashboard.' }],
      },
      '02': {
        longDesc:  'We transform interest into revenue with a smarter, more agile and connected commercial operation. We integrate lead capture, WhatsApp and CRM in a single flow so no opportunity is lost and every contact becomes strategic value.',
        tags:      ['Lead Generation', 'Multichannel Follow-up', 'WhatsApp Sales', 'CRM Management', 'Reactivation', 'Opportunity Closing'],
        features:  ['Lead capture and qualification', 'Multichannel commercial follow-up', 'WhatsApp Business sales', 'CRM management and automation', 'Inactive customer reactivation', 'Opportunity follow-up and closing'],
        benefits:  [{ title: 'Higher Conversion', desc: 'Structured process that reduces opportunity leakage and increases close rate.' }, { title: 'Visible Pipeline', desc: 'Full traceability of the commercial funnel with real-time performance metrics.' }, { title: 'Commercial Speed', desc: 'Fast response as a closing lever: every lead attended at peak purchase intent.' }],
        faq:       [{ question: 'How is your process different from traditional sales?', answer: 'We integrate lead capture, WhatsApp and CRM in a single automated flow, with response speed and full funnel traceability.' }, { question: 'Which CRMs do you work with?', answer: 'We integrate with Salesforce, HubSpot, Zoho CRM, Pipedrive and custom solutions via REST API.' }, { question: 'How do you reactivate existing customer bases?', answer: 'With segmented campaigns on WhatsApp, email and voice, combining automation and human intervention at peak purchase intent.' }, { question: 'What is the billing model?', answer: 'Flexible: per management (monthly fee), per result (sales commission) or mixed, depending on the client agreement.' }],
      },
      '03': {
        longDesc:  'We deploy autonomous AI agents to automate customer service, lead capture and operational management in real time. Continuous 24/7 operation that responds, filters and scales without friction, reducing operational load and expanding response capacity without growing the human structure.',
        tags:      ['AI 24/7', 'WhatsApp AI', 'Chat AI', 'Leads AI', 'Social AI', 'Autonomous'],
        features:  ['Continuous 24/7/365 operation with no downtime', 'Advanced Natural Language Processing (NLP)', 'Native integration with WhatsApp, Signal, Telegram and WebChat', 'Automatic escalation to human agent for complex cases', 'Automatic contact capture, filtering and routing', 'Reduction of operational load on repetitive tasks'],
        benefits:  [{ title: 'Total Availability', desc: 'Handles thousands of simultaneous conversations with no wait times, 365 days a year.' }, { title: 'Scalability without Structure', desc: 'Grow your service capacity without proportionally increasing your human team.' }, { title: 'Lower Cost per Interaction', desc: 'Automates up to 80% of repetitive interactions, freeing the team for high-value tasks.' }],
        faq:       [{ question: 'How autonomous is the agent really?', answer: 'It executes complete flows: respond, qualify, schedule, notify and record — without human intervention. It only escalates when it detects situations requiring human judgment.' }, { question: 'Can it escalate to a human agent?', answer: 'Yes. It automatically detects critical or out-of-scope conversations and transfers them with full context to a human agent.' }, { question: 'How long does deployment take?', answer: 'Between 1 and 3 weeks depending on flow complexity and required integrations.' }, { question: 'Do the agents learn over time?', answer: 'Yes. With every conversation the model refines itself. The CCGrupo team also performs periodic reviews to improve accuracy and coverage.' }],
      },
      '04': {
        longDesc:  'We create custom digital solutions that connect systems, people and processes to drive efficiency and growth. Technology designed from business needs, not tools — with a focus on adoption, integration and measurable results.',
        tags:      ['CRM', 'Apps', 'E-commerce', 'Scheduling', 'Portals', 'Dashboards', 'AI Avatars'],
        features:  ['Custom-built CRM systems', 'Web and mobile applications', 'Corporate website design and development', 'E-commerce and integrated payment solutions', 'Custom scheduling and reservation systems', 'Customer and supplier portals', 'Executive dashboards and real-time analytics', 'E-learning training platforms', 'AI digital avatars'],
        benefits:  [{ title: 'Technology from the Business', desc: 'Solutions designed from process needs, not adaptations of generic software.' }, { title: 'Integrated Ecosystem', desc: 'We connect operations, sales, service and analytics in a coherent digital architecture.' }, { title: 'Real Adoption', desc: 'Focus on technology transfer and effective adoption, not just technical implementation.' }],
        faq:       [{ question: 'What technologies do you use?', answer: 'React, Next.js, Node.js, Python, React Native for mobile, and both relational and NoSQL databases depending on the project.' }, { question: 'How long does a typical project take?', answer: 'An MVP takes 4 to 8 weeks; a full system takes 3 to 6 months with iterative deliveries.' }, { question: 'Do you offer maintenance and support?', answer: 'Yes. We have monthly support plans, security updates and software evolution included.' }, { question: 'Can you integrate with legacy systems?', answer: 'Yes. We develop connectors and middleware to integrate with SAP, Oracle, proprietary systems and any service with an API.' }],
      },
    },
  },
};

type Translations = typeof translations.es;

interface LangContextValue {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'es';
    return (localStorage.getItem('lang') as Lang) ?? 'es';
  });

  const toggleLang = () =>
    setLang(l => {
      const next: Lang = l === 'es' ? 'en' : 'es';
      localStorage.setItem('lang', next);
      return next;
    });

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
