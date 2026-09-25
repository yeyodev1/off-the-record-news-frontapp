import type { Edition, Section } from '@/types'

/**
 * El copy es configuración: todos los textos y datos de la marca viven acá.
 * Los componentes solo consumen y pintan.
 */
export const site = {
  name: 'Off the Record',
  tagline: 'Lo que importa en Ecuador, sin rodeos.',
  description:
    'Noticias de Ecuador en formato breve: qué pasó, por qué importa y qué sigue. Lee en dos minutos, profundiza si quieres.',
  url: 'https://off-the-record-news-frontapp.vercel.app',
  email: 'redaccion@offtherecord.ec',
  // Solo dígitos con código de país, ej: 593984934039
  whatsapp: '',
  // Usuario del bot sin @. Vacío mientras no exista el bot.
  telegramBot: '',
  social: {
    instagram: '',
    x: '',
    tiktok: '',
  },
  nav: [
    { label: 'Política', to: '/seccion/politica' },
    { label: 'Economía', to: '/seccion/economia' },
    { label: 'Asamblea', to: '/seccion/legislativo' },
    { label: 'Seguridad', to: '/seccion/seguridad' },
    { label: 'Negocios', to: '/seccion/negocios' },
    { label: 'Mundo', to: '/seccion/mundo' },
  ],

  // Rótulos del formato smart brevity
  labels: {
    whyItMatters: 'Por qué importa',
    keyPoints: 'Los detalles',
    bigPicture: 'El panorama',
    whatsNext: 'Qué sigue',
    goDeeper: 'Profundiza',
    sources: 'Fuentes',
    breaking: 'Última hora',
    latest: 'Lo último',
    pro: 'Pro',
  },

  sections: {
    politica: 'Política',
    economia: 'Economía',
    legislativo: 'Asamblea',
    seguridad: 'Seguridad',
    sociedad: 'Sociedad',
    mundo: 'Mundo',
    negocios: 'Negocios',
    tecnologia: 'Tecnología',
  } satisfies Record<Section, string>,

  editions: {
    manana: { name: 'El Mañanero', time: '5:00', blurb: 'Todo lo que pasó ayer y lo que viene hoy, antes del café.' },
    noche: { name: 'Cierre de la noche', time: '20:00', blurb: 'El resumen del día en tres minutos de lectura.' },
    economia: { name: 'Economía', time: 'Semanal', blurb: 'Dólares, deuda, empleo y mercados que te afectan.' },
    legislativo: { name: 'Asamblea', time: 'Semanal', blurb: 'Qué se vota, quién lo empuja y qué cambia para ti.' },
  } satisfies Record<Edition, { name: string; time: string; blurb: string }>,

  newsletter: {
    title: 'Boletines Off the Record',
    subtitle: 'Te llegan a tu correo dos veces al día. Cortos, claros y con lo que de verdad importa.',
    price: 'Desde 3 USD al mes',
    cta: 'Quiero suscribirme',
    pendingNote: 'Te escribiremos para activar tu suscripción y el pago.',
  },

  pro: {
    title: 'Off the Record Pro',
    subtitle:
      'Inteligencia política y económica para empresas: monitoreo diario, alertas y análisis de lo que se mueve en el poder.',
    features: [
      'Monitoreo diario de Asamblea, Ejecutivo e instituciones',
      'Alertas inmediatas sobre temas que afectan a tu sector',
      'Notas Pro con el contexto completo y fuentes',
      'Boletines temáticos a la medida de tu equipo',
    ],
    cta: 'Solicitar información',
  },

  tips: {
    title: 'Cuéntanos lo que sabes',
    subtitle:
      'Si viste algo que debería ser noticia, escríbenos. Revisamos cada mensaje y protegemos tu identidad.',
    telegramCta: 'Escríbenos por Telegram',
    formCta: 'Enviar denuncia',
    success: 'Recibimos tu mensaje. Gracias por confiar en nosotros.',
  },

  about: {
    title: 'Qué es Off the Record',
    paragraphs: [
      'Off the Record cuenta lo que pasa en Ecuador de forma breve y directa. Cada nota te dice qué pasó, por qué importa y qué sigue, para que te enteres en dos minutos.',
      'Una mesa de redacción asistida por inteligencia artificial monitorea cientos de fuentes: medios, periodistas, políticos e instituciones. Un equipo de periodistas revisa y aprueba lo que se publica.',
      'Si quieres más, cada nota tiene un "Profundiza" con el contexto completo y las fuentes citadas.',
    ],
  },

  footer: {
    note: 'Periodismo breve para Ecuador. Redacción asistida por IA y revisada por periodistas.',
  },
} as const

/** Textos de interfaz: botones, estados vacíos, errores y formularios. */
export const ui = {
  nav: {
    newsletters: 'Boletines',
    pro: 'Pro',
    subscribe: 'Suscríbete',
    desk: 'Mesa',
    sectionsAria: 'Secciones',
    home: 'Portada',
  },
  footer: {
    sections: 'Secciones',
    brand: 'Off the Record',
    about: 'Nosotros',
    tips: 'Denuncias',
    pro: 'Off the Record Pro',
    newsletters: 'Boletines',
    contact: 'Contacto',
    madeBy: 'Hecho por',
  },
  feed: {
    readStory: 'Leer la nota',
    seeSection: 'Ver todo',
    more: 'Más noticias',
    loadMore: 'Cargar más',
    loadingMore: 'Cargando…',
    empty: 'Todavía no hay notas publicadas aquí. Vuelve en un rato.',
    errorTitle: 'No pudimos cargar las noticias',
    retry: 'Reintentar',
    breakingAria: 'Noticias de última hora',
  },
  article: {
    by: 'Por',
    minutes: (n: number) => `${n} min de lectura`,
    close: 'Cerrar',
    lockedTitle: 'Esta nota completa es para Off the Record Pro',
    lockedText: 'El contexto completo, los antecedentes y las fuentes de esta nota están reservados para suscriptores Pro.',
    lockedCta: 'Conoce Off the Record Pro',
    share: 'Compartir',
    copyLink: 'Copiar enlace',
    copied: 'Enlace copiado',
    related: 'Más de',
    notFoundTitle: 'No encontramos esta nota',
    notFoundText: 'Puede que el enlace esté mal escrito o que la nota ya no esté publicada.',
    backHome: 'Volver a la portada',
    proBadge: 'Pro',
  },
  sources: {
    title: 'Fuentes verificadas',
    note: (n: number) =>
      n === 1
        ? 'Esta nota se basa en la publicación de un medio. Puedes leer el original.'
        : `Esta nota se basa en ${n} medios e instituciones. Puedes leer cada original.`,
    open: 'Ver nota original',
    nth: (i: number) => `Nota ${i}`,
    basedOn: (n: number) => (n === 1 ? 'Basada en 1 fuente' : `Basada en ${n} fuentes`),
  },
  section: {
    notFoundTitle: 'Esa sección no existe',
    notFoundText: 'Estas son las secciones que cubrimos:',
  },
  forms: {
    email: 'Correo electrónico',
    emailPlaceholder: 'tu@correo.com',
    name: 'Nombre',
    optional: '(opcional)',
    company: 'Empresa',
    contact: 'Cómo contactarte',
    contactPlaceholder: 'Correo, teléfono o usuario de Telegram',
    tipText: 'Qué pasó',
    tipPlaceholder: 'Cuéntanos qué viste, dónde y cuándo. Mientras más detalle, mejor.',
    tipMin: (n: number) => `Mínimo 20 caracteres (${n}/20)`,
    editions: 'Elige tus boletines',
    sending: 'Enviando…',
    invalidEmail: 'Escribe un correo válido.',
    noEditions: 'Elige al menos un boletín.',
    shortTip: 'Cuéntanos un poco más: mínimo 20 caracteres.',
    genericError: 'No se pudo enviar. Revisa tu conexión e inténtalo otra vez.',
    doneTitle: 'Listo, ya estás en la lista',
    proDoneTitle: 'Recibimos tu solicitud',
    tipDoneTitle: 'Mensaje recibido',
    homeBoxLink: 'Elegir boletines',
    homeBoxNote: 'Recibirás El Mañanero y el Cierre de la noche.',
    tipsOr: 'o usa el formulario',
    tipsPrivacy: 'Nombre y contacto son opcionales. Solo los usamos para verificar lo que nos cuentas.',
  },
  pro: {
    eyebrow: 'Para empresas',
    featuresTitle: 'Qué incluye',
    formTitle: 'Hablemos',
  },
  about: {
    ctaTips: 'Envíanos una denuncia',
    ctaNewsletters: 'Suscríbete a los boletines',
  },
  notFound: {
    code: '404',
    title: 'Esta página no existe',
    text: 'Puede que el enlace esté mal escrito o que la página se haya movido.',
    cta: 'Volver a la portada',
  },
} as const

export function whatsappLink(message = 'Hola, quiero más información'): string {
  if (!site.whatsapp) return '#'
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
}

export function telegramLink(): string {
  return site.telegramBot ? `https://t.me/${site.telegramBot}` : ''
}
