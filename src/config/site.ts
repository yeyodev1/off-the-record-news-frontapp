import type { Edition, ReadingMode, Section, Stance } from '@/types'

/**
 * El copy es configuración: todos los textos y datos de la marca viven acá.
 * Los componentes solo consumen y pintan.
 */
export const site = {
  name: 'Off the Record',
  tagline: 'Todo lo que tienes que saber, desde todas las miradas.',
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
  // Solo Ecuador y solo estas cinco secciones (reunión del 13/10/2026): sin "Mundo".
  nav: [
    { label: 'Portada', to: '/' },
    { label: 'Política', to: '/seccion/politica' },
    { label: 'Economía', to: '/seccion/economia' },
    { label: 'Asamblea', to: '/seccion/legislativo' },
    { label: 'Seguridad', to: '/seccion/seguridad' },
    { label: 'Negocios', to: '/seccion/negocios' },
  ],

  // Barra superior de la cabecera
  topLinks: [
    { label: 'Newsletter gratuita', to: '/boletines' },
    { label: 'Podcast', to: '/podcast' },
    { label: 'Entrar', to: '/login' },
  ],

  // Quiénes firman. Las notas de la mesa automática firman como redacción, con el sello OTR.
  hosts: {
    names: 'Boscán y La Moni',
    boscan: { name: 'Andersson Boscán', photo: '/img/boscan.jpg' },
    moni: { name: 'Mónica Velásquez', photo: '/img/la-moni.jpg' },
  },
  authorPhotos: {
    'Andersson Boscán': '/img/boscan.jpg',
    'Mónica Velásquez': '/img/la-moni.jpg',
    'La Moni': '/img/la-moni.jpg',
  } as Record<string, string>,
  newsroomName: 'Redacción OTR',

  // Rótulos del formato smart brevity
  labels: {
    whyItMatters: 'Por qué importa',
    keyPoints: 'Los detalles',
    bigPicture: 'El panorama',
    whatsNext: 'Qué sigue',
    inNumbers: 'En cifras',
    context: 'El contexto',
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
    manana: {
      name: 'El Mañanero',
      time: '5:00',
      blurb: 'Todo lo que pasó ayer y lo que viene hoy, antes del café.',
    },
    noche: {
      name: 'Cierre de la noche',
      time: '20:00',
      blurb: 'El resumen del día en tres minutos de lectura.',
    },
    economia: {
      name: 'Economía',
      time: 'Semanal',
      blurb: 'Dólares, deuda, empleo y mercados que te afectan.',
    },
    legislativo: {
      name: 'Asamblea',
      time: 'Semanal',
      blurb: 'Qué se vota, quién lo empuja y qué cambia para ti.',
    },
  } satisfies Record<Edition, { name: string; time: string; blurb: string }>,

  newsletter: {
    title: 'Boletines Off the Record',
    subtitle:
      'Te llegan a tu correo dos veces al día. Cortos, claros y con lo que de verdad importa.',
    price: 'Desde 3 USD al mes',
    cta: 'Quiero suscribirme',
    pendingNote: 'Te escribiremos para activar tu suscripción y el pago.',
  },

  // OTR PRO: la venta casi automática que el fundador narró el 13/10/2026.
  pro: {
    title: 'Off the Record PRO',
    eyebrow: 'Para CEOs y directorios',
    subtitle:
      'Inteligencia e información para CEOs y boards ejecutivos. Compilamos todo lo que un ejecutivo tiene que conocer para decidir y usamos nuestras fuentes políticas para encontrar lo que los medios no publican.',
    why: 'Los medios no cuentan por qué se fue el viceministro de Pesca: no le interesa al gran público. A una atunera sí. Hacemos periodismo con intereses empresariales.',
    unpublished:
      'Lo no publicado: muchas noticias se saben pero no se publican porque no son verificables al estándar de un periódico. Cuando vienen de buenas fuentes, conviene que las sepas. Eso es el off the record.',
    features: [
      'Informe semanal con lo más duro e importante de la semana y lo no publicado',
      'Notificaciones diarias, 24/7 todo el año: lo público y lo que no es público',
      'Pregúntale a la redacción: "Averíguame la postura del presidente sobre los apagones"',
      'Pronto: elige tus temas (comercio exterior, petróleo…) para no recibir ruido',
    ],
    delivery:
      'Se entrega por la aplicación de Off the Record y, muy pronto, con tu sesión PRO en esta misma página.',
    plans: [
      {
        key: 'semanal',
        name: 'Informe semanal',
        price: 'USD 1.500',
        per: 'al mes',
        items: ['Informe semanal completo', 'Lo no publicado, cada semana'],
      },
      {
        key: 'diario',
        name: 'Semanal + diario 24/7',
        price: 'Hasta USD 3.000',
        per: 'al mes',
        items: [
          'Todo el informe semanal',
          'Notificaciones diarias, 24/7',
          'Preguntas directas a la redacción',
        ],
      },
    ],
    terms: 'Contrato mínimo de 6 meses. Para medianas y grandes empresas.',
    cta: 'Quiero OTR PRO',
    meeting: 'Prefiero una reunión con un ejecutivo de ventas',
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
  // Tres miradas (reunión del 13/10/2026). El color es el del diseño de la portada.
  modes: {
    noboista: {
      name: 'Noboísta',
      short: 'noboísta',
      abbr: 'Noboísta',
      color: '#5B2D8E',
      icon: 'fa-solid fa-landmark',
      wants: 'Leer los hechos que reafirman la narrativa oficial, sin que nadie los tuerza.',
      shows:
        'Primero los hechos que sostienen la versión del gobierno: lo que decide, logra y responde. Lo que dicen sus críticos va después, con su fuente.',
    },
    correista: {
      name: 'Correísta',
      short: 'correísta',
      abbr: 'Correísta',
      color: '#1AA3B2',
      icon: 'fa-solid fa-people-group',
      wants: 'Leer los hechos desde la visión de la oposición, sin que nadie los tuerza.',
      shows:
        'Primero lo que la oposición cuestiona, denuncia o reclama, y las cifras que pesan contra el gobierno. La versión oficial va después, con su fuente.',
    },
    independiente: {
      name: 'Independientes',
      short: 'independiente',
      abbr: 'Indep.',
      color: '#111111',
      icon: 'fa-regular fa-newspaper',
      wants: 'Las dos orillas, equilibradas.',
      shows:
        'El orden editorial de Off the Record: valor noticioso y novedad, con la versión oficial y la de la oposición con el mismo peso.',
    },
  } satisfies Record<
    ReadingMode,
    {
      name: string
      short: string
      abbr: string
      color: string
      icon: string
      wants: string
      shows: string
    }
  >,

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
      'Eliges una mirada para leer Off the Record: noboísta, correísta o independiente. El noboísta no tuerce los hechos, pero va primero a los que reafirman la narrativa oficial; el correísta busca la visión de la oposición; el independiente equilibra ambos. Los hechos son los mismos para todos.',
    changesTitle: 'Qué cambia con el modo',
    changes: [
      'El orden de los hechos en la portada, también en "Las 5 cosas que tienes que saber", y en las secciones: cada hecho tiene una relevancia distinta para cada modo.',
      'Qué cobertura ves primero dentro de cada nota: "Lo que dicen las partes" abre con la orilla de tu modo y sigue con la otra. Las dos están siempre.',
      'La redacción de la nota: el titular, la entrada, el "Por qué importa", los detalles y el cuerpo cuentan el mismo hecho con el enfoque de tu mirada.',
      'Si te suscribes y das tu consentimiento, el orden y los titulares de tus boletines.',
    ],
    neverTitle: 'Qué no cambia nunca',
    never: [
      'Los hechos son los mismos para todos: las mismas cifras, los mismos nombres y las mismas fuentes. Un verificador automático descarta cualquier titular de una mirada que diga algo que la nota no dice.',
      'Lo grande le llega a todos: una noticia de primer orden está arriba en los tres modos.',
      'Lo último se muestra completo y en orden cronológico en todos los modos.',
      'Nada se oculta: un hecho que baja en tu modo sigue en su sección, en el buscador y en su dirección.',
      'La línea editorial y las reglas de redacción son las mismas en las tres miradas. Ninguna es propaganda.',
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
    lockedText:
      'El contexto completo, los antecedentes y las fuentes de esta nota están reservados para suscriptores Pro.',
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
    nextStory: 'Sigue leyendo',
    keepReading: 'Siguiente nota',
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
    tipsPrivacy:
      'Nombre y contacto son opcionales. Solo los usamos para verificar lo que nos cuentas.',
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
  home: {
    topFiveTitle: 'Las 5 cosas que tienes que saber',
    updated: (time: string, minutes: number) => `Actualizado ${time} · ${minutes} min en total`,
    updatedShort: (time: string, minutes: number) => `${time} · ${minutes} min`,
    orderFor: 'Orden para modo',
    tabs: { principales: 'Principales', leidas: 'Más leídas', ultimo: 'Lo último' },
    tabsAria: 'Orden de las notas',
    seeMore: 'Ver más notas',
    photo: 'Foto',
    archive: 'Archivo',
    chart: 'Gráfico',
    data: 'Datos / OTR',
    profundiza: (n: number) => `Profundiza · ${n} min de lectura`,
    profundizaShort: (n: number) => `Profundiza · ${n} min`,
    by: 'Por',
  },
  proCard: {
    badge: 'PRO · No publicado',
    plan: 'Plan mensual para empresas',
    unlock: 'Desbloquear PRO',
    footnote: (n: number) =>
      `Información que no sale en medios · ${n} ${n === 1 ? 'nota sellada' : 'notas selladas'} esta semana`,
    lockedAria: 'Contenido reservado para OTR PRO',
  },
  newsletterBand: {
    title: 'Todo lo que tienes que saber, cada mañana.',
    text: 'La newsletter gratuita de OTR respeta tu modo de lectura.',
    cta: 'Suscríbete gratis',
  },
  header: {
    pro: 'OTR PRO · Entra al círculo',
    proShort: 'PRO',
    menu: 'Menú',
    closeMenu: 'Cerrar menú',
  },
  podcast: {
    title: 'El podcast de Off the Record',
    text: 'Boscán y La Moni conversan lo que pasó en la semana y lo que no salió en los medios. Muy pronto aquí. Mientras tanto, recibe la newsletter gratuita.',
    cta: 'Suscríbete a la newsletter',
  },
  proPage: {
    plansTitle: 'Planes',
    whatTitle: 'Qué recibes',
    formTitle: 'Activa OTR PRO para tu empresa',
    formNote: 'Te escribimos en horas, no en días.',
    role: 'Cargo',
    phone: 'Teléfono o WhatsApp',
    plan: 'Plan',
    message: 'Qué temas le importan a tu empresa',
    messagePlaceholder: 'Ej.: comercio exterior y petróleo',
    nameRequired: 'Escribe tu nombre.',
    companyRequired: 'Escribe el nombre de tu empresa.',
    doneTitle: 'Recibimos tu solicitud',
    teasersTitle: 'Lo que OTR PRO contó esta semana',
  },
  modes: {
    barLabel: 'Estás leyendo OTR en modo',
    barHelp: 'Los hechos son los mismos para todos; el modo cambia el orden y el enfoque.',
    barHow: 'Cómo funciona',
    serviceOf: 'Un servicio de',
    chooserTitle: '¿Cómo quieres leer OTR?',
    chooserSubtitle: 'Puedes cambiarlo cuando quieras.',
    chooserNote:
      'Los hechos son los mismos para todos. Cambia el orden y qué cobertura ves primero.',
    chooserSkip: 'Ahora no',
    sheetTitle: 'Elige cómo leer OTR',
    label: (mode: string) => `Estás leyendo OTR en modo ${mode}`,
    change: 'Cambiar',
    selectorAria: 'Modo de lectura',
    howLink: 'Cómo funcionan los modos',
    current: 'Modo actual',
    forMode: (mode: string) => `Lo más relevante en modo ${mode}`,
    otherSide: 'Lo que tu orilla no está mirando',
    otherSideNote: 'Hechos que pesan en la otra orilla y en la tuya pasan de largo.',
    otherSideFor: (mode: string) => `Alta relevancia en modo ${mode}`,
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
