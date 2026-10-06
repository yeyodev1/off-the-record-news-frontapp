import type { Edition, ReadingMode, Section, Stance } from '@/types'

/**
 * El copy es configuración: todos los textos y datos de la marca viven acá.
 * Los componentes solo consumen y pintan.
 */
export const site = {
  name: 'Off the Record',
  tagline: 'Lo que importa en Ecuador, sin rodeos.',
  description:
    'Noticias de Ecuador en formato breve: qué pasó, por qué importa y qué sigue. Lee en dos minutos, profundiza si quieres.',
  url: 'https://otr.com.ec',
  email: 'redaccion@offtherecord.ec',
  // Solo dígitos con código de país, ej: 593984934039
  whatsapp: '',
  // Usuario del bot sin @. Vacío mientras no exista el bot.
  telegramBot: 'OffTheRecord_agent_bot',
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

  // Modos de lectura. Los nombres los decide el fundador; agregar uno es una fila aquí
  // y su perfil de ponderación en el backend.
  modes: {
    noboista: {
      name: 'Noboísta',
      short: 'noboísta',
      icon: 'fa-solid fa-landmark',
      wants: 'Seguir al gobierno y sus decisiones, y enterarte de lo que la oposición le reclama.',
      shows: 'Primero los hechos del Ejecutivo y su bloque, con la cobertura oficialista arriba y la respuesta opositora debajo.',
    },
    correista: {
      name: 'Correísta',
      short: 'correísta',
      icon: 'fa-solid fa-people-group',
      wants: 'Seguir a la Revolución Ciudadana y a la oposición, y lo que el gobierno hace contra ella.',
      shows: 'Primero los hechos del correísmo y la Asamblea, con la cobertura correísta arriba y la versión oficialista debajo.',
    },
    anti_ambos: {
      name: 'Anti-ambos',
      short: 'anti-ambos',
      icon: 'fa-solid fa-scale-balanced',
      wants: 'Que no te vendan ni al uno ni al otro: datos, documentos y contradicciones de los dos lados.',
      shows: 'Primero los hechos con más pruebas y documentos, y la cobertura institucional y de control antes que la de partidos.',
    },
    independiente: {
      name: 'Independiente',
      short: 'independiente',
      icon: 'fa-regular fa-newspaper',
      wants: 'Todo, sin énfasis.',
      shows: 'El orden editorial de Off the Record tal cual: valor noticioso y novedad.',
    },
  } satisfies Record<ReadingMode, { name: string; short: string; icon: string; wants: string; shows: string }>,

  stances: {
    oficialista: 'Oficialismo',
    opositora: 'Oposición',
    correista: 'Correísmo',
    institucional: 'Instituciones y control',
    neutral: 'Otras fuentes',
    no_aplica: 'Otras fuentes',
    '': 'Otras fuentes',
  } satisfies Record<Stance, string>,

  howModes: {
    title: 'Cómo funcionan los modos de lectura',
    subtitle:
      'Eliges un lente para leer Off the Record. El lente cambia el orden y qué cobertura ves primero. Los hechos son los mismos para todos.',
    changesTitle: 'Qué cambia con el modo',
    changes: [
      'El orden de los hechos en la portada y en las secciones: cada hecho tiene una relevancia distinta para cada modo.',
      'Qué cobertura ves primero dentro de cada nota: "Lo que dicen las partes" abre con la orilla de tu modo y sigue con la otra. Las dos están siempre.',
      'Si te suscribes y das tu consentimiento, el orden de las notas en tus boletines.',
    ],
    neverTitle: 'Qué no cambia nunca',
    never: [
      'Los hechos son los mismos para todos. Escribimos una sola versión de cada nota: nunca hay cuatro redacciones del mismo hecho.',
      'La historia del día aparece primero en todos los modos.',
      'Lo último se muestra completo y en orden cronológico en todos los modos.',
      'Nada se oculta: un hecho que baja en tu modo sigue en su sección, en el buscador y en su dirección.',
      'La línea editorial y las reglas de redacción son las mismas en los cuatro modos.',
      'Siempre ves en qué modo estás leyendo y puedes cambiarlo con un toque.',
    ],
    privacyTitle: 'Tu modo y tus datos',
    privacy: [
      'Tu modo vive solo en este dispositivo. No lo guardamos con tu nombre, tu correo ni tu IP. Si cambias de celular, vuelves a elegir.',
      'Si quieres que tus boletines respeten tu modo, lo guardamos solo con tu consentimiento explícito, cifrado y en un campo propio. Lo borras con un toque desde cualquier correo. Sin consentimiento, tus boletines llegan en modo independiente.',
      'Contamos cuántas personas leen en cada modo y qué notas lee cada modo, siempre en conjunto y sin identificar a nadie.',
      'Nunca cruzamos tu modo con denuncias, con la base de Pro ni con ningún dato de identidad.',
    ],
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
    modes: 'Modos de lectura',
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
    updatedAt: (time: string) => `Actualizada a las ${time}`,
    updatesTitle: 'Actualizaciones',
    updateLabel: (time: string) => `Actualización ${time}`,
    disclaimerTitle: 'Cómo hicimos esta nota',
    retractedTitle: 'Retiramos esta nota',
    retractedText: (date: string) =>
      `Off the Record publicó esta nota y la retiró el ${date}. Dejamos este aviso en la misma dirección para que quede registro.`,
    retractedReason: 'Motivo',
  },
  sources: {
    title: 'Fuentes verificadas',
    note: (n: number) =>
      n === 1
        ? 'Esta nota se basa en la publicación de un medio. Esto es lo que dice:'
        : `Esta nota se basa en ${n} medios e instituciones. Esto es lo que dice cada uno:`,
    open: 'Ver nota original',
    readAt: (name: string) => `Leer en ${name}`,
    noSummary: 'El medio no publica un resumen de esta nota.',
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
  modes: {
    chooserTitle: '¿Cómo quieres leer OTR?',
    chooserSubtitle: 'Puedes cambiarlo cuando quieras.',
    chooserNote: 'Los hechos son los mismos para todos. Cambia el orden y qué cobertura ves primero.',
    chooserSkip: 'Ahora no',
    sheetTitle: 'Elige cómo leer OTR',
    label: (mode: string) => `Estás leyendo OTR en modo ${mode}`,
    change: 'Cambiar',
    selectorAria: 'Modo de lectura',
    howLink: 'Cómo funcionan los modos',
    current: 'Modo actual',
    forMode: (mode: string) => `Lo más relevante en modo ${mode}`,
    contradictions: 'Lo que ninguno de los dos quiere que veas',
    contradictionsNote: 'Contradicciones y promesas incumplidas de los dos lados.',
    otherSide: 'Lo que tu orilla no está mirando',
    otherSideNote: 'Hechos que pesan en la otra orilla y en la tuya pasan de largo.',
    otherSideHide: 'Ocultar',
    otherSideShow: 'Mostrar lo que tu orilla no está mirando',
    partiesTitle: 'Lo que dicen las partes',
    partiesNote: (mode: string) => `Ordenado para el modo ${mode}. Todas las fuentes están aquí.`,
    consent: 'Quiero que mi correo respete mi modo de lectura',
    consentNote: (mode: string) =>
      `Guardamos tu modo (${mode}) cifrado y solo para ordenar tus boletines. Lo borras con un enlace en cada correo. Sin marcar esto, tus boletines llegan en modo independiente.`,
    forgotten: 'Borramos tu modo de lectura. Tus boletines llegarán en modo independiente.',
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
