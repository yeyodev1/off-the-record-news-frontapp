import type {
  ArticleOrigin,
  ArticleStatus,
  Signal,
  Source,
  StoryStatus,
  Subscriber,
  TelegramRole,
  Tip,
} from '@/types'

/**
 * Copy de la mesa de redacción. Vive aparte de site.ts porque es una
 * herramienta interna: nada de esto lo ve el lector.
 */

export type Tone = 'success' | 'warning' | 'muted' | 'stamp' | 'accent' | 'info'

export interface AdminNavItem {
  label: string
  to: string
  icon: string
  /** Si es true, solo marca activo con coincidencia exacta. */
  exact?: boolean
  /** Aparece en la barra inferior del celular. */
  primary?: boolean
  badge?: 'pending'
}

export const adminNav: AdminNavItem[] = [
  { label: 'Mesa', to: '/admin', icon: 'fa-solid fa-gauge', exact: true, primary: true },
  {
    label: 'Por aprobar',
    to: '/admin/cola',
    icon: 'fa-solid fa-inbox',
    primary: true,
    badge: 'pending',
  },
  { label: 'Notas', to: '/admin/notas', icon: 'fa-solid fa-newspaper', primary: true },
  { label: 'Hechos', to: '/admin/hechos', icon: 'fa-solid fa-layer-group', primary: true },
  { label: 'Señales', to: '/admin/senales', icon: 'fa-solid fa-satellite-dish' },
  { label: 'Fuentes', to: '/admin/fuentes', icon: 'fa-solid fa-rss' },
  { label: 'Suscriptores', to: '/admin/suscriptores', icon: 'fa-solid fa-users' },
  { label: 'Denuncias', to: '/admin/denuncias', icon: 'fa-solid fa-user-secret' },
  { label: 'Boletines', to: '/admin/boletines', icon: 'fa-solid fa-envelope-open-text' },
  { label: 'Telegram', to: '/admin/telegram', icon: 'fa-brands fa-telegram' },
]

export const admin = {
  brand: 'Mesa de redacción',
  viewSite: 'Ver sitio',
  logout: 'Cerrar sesión',
  more: 'Más',
  loading: 'Cargando…',
  retry: 'Reintentar',
  prev: 'Anterior',
  next: 'Siguiente',
  save: 'Guardar',
  cancel: 'Cancelar',
  delete: 'Eliminar',
  status: 'Estado',
  all: 'Todos',
  searchPlaceholder: 'Buscar por título…',

  dashboard: {
    title: 'Mesa de redacción',
    subtitle: 'La IA monitorea las fuentes; tú decides qué se publica.',
    runNow: 'Correr la mesa ahora',
    running: 'La mesa está trabajando… puede tardar unos minutos',
    runDone: 'Corrida terminada',
    lastRun: 'Última corrida',
    history: 'Historial de corridas',
    noRuns: 'Todavía no hay corridas.',
    stats: {
      pending: 'Por aprobar',
      publishedToday: 'Publicadas hoy',
      publishedTotal: 'Publicadas en total',
      signalsToday: 'Señales hoy',
      subscribersActive: 'Suscriptores activos',
      subscribersPending: 'Pendientes de pago',
      tipsNew: 'Denuncias nuevas',
    },
  },

  run: {
    manual: 'Manual',
    cron: 'Automática',
    found: 'Señales encontradas',
    fresh: 'Nuevas',
    scored: 'Valoradas',
    drafted: 'Notas redactadas',
    clustered: 'Agrupadas en hechos',
    updates: 'Actualizaciones',
    inProgress: 'En curso',
    errors: 'Errores',
  },

  queue: {
    title: 'Por aprobar',
    subtitle: 'Notas que la IA dejó listas. Revisa, ajusta y publica.',
    empty: 'No hay notas esperando. La mesa está al día.',
    publish: 'Publicar',
    reject: 'Rechazar',
    edit: 'Editar',
    rewrite: 'Reescribir con IA',
    published: 'Nota publicada',
    rejected: 'Nota rechazada',
    rejectTitle: '¿Rechazar esta nota?',
    rejectMessage: 'No se publicará. Puedes recuperarla luego desde Notas.',
    wait: 'Esperar más fuentes',
    waited: 'El hecho volvió a la watchlist. Se redacta de nuevo cuando llegue otra fuente.',
  },

  verification: {
    title: 'Verificación',
    clean: 'Sin observaciones: cifras, enlaces y nombres están en las fuentes.',
    summary: (errors: number, warnings: number) =>
      `${errors} error${errors === 1 ? '' : 'es'} · ${warnings} aviso${warnings === 1 ? '' : 's'}`,
    help: 'Un error impide que la nota salga sola. Revisa cada punto contra las fuentes antes de publicar.',
    none: 'Esta nota no pasó por el verificador.',
  },

  retract: {
    button: 'Retirar nota',
    title: '¿Retirar esta nota publicada?',
    message:
      'Sale de la portada y su URL muestra un aviso público de retiro. Queda en el historial.',
    reason: 'Motivo (se muestra al lector, opcional)',
    reasonPlaceholder: 'Ej: un dato central no se pudo confirmar.',
    done: 'Nota retirada',
  },

  updates: {
    title: 'Actualizaciones',
    empty: 'Sin actualizaciones.',
    publish: 'Publicar',
    reject: 'Descartar',
    published: 'Actualización publicada',
    rejected: 'Actualización descartada',
    pending: 'Por aprobar',
  },

  history: {
    title: 'Historial',
  },

  rewrite: {
    title: 'Reescribir con IA',
    help: 'Dile a la IA qué cambiar: tono, enfoque, largo, datos a destacar.',
    placeholder: 'Ej: más corto, enfoca en el impacto para los hogares, quita adjetivos.',
    confirm: 'Reescribir',
    working: 'Reescribiendo…',
    done: 'Nota reescrita',
  },

  score: {
    label: 'Puntaje',
    cercania: 'Cercanía',
    inmediatez: 'Inmediatez',
    personaje: 'Personaje',
    relevancia: 'Relevancia',
    impacto: 'Impacto',
    none: 'Sin puntaje',
  },

  articles: {
    title: 'Notas',
    subtitle: 'Todo lo que pasó por la mesa.',
    new: 'Nueva nota',
    empty: 'No hay notas con esos filtros.',
    section: 'Sección',
    status: 'Estado',
    deleteTitle: '¿Eliminar esta nota?',
    deleteMessage: 'Se borra para siempre. Esta acción no se puede deshacer.',
    deleted: 'Nota eliminada',
  },

  editor: {
    newTitle: 'Nueva nota',
    editTitle: 'Editar nota',
    back: 'Volver a notas',
    save: 'Guardar',
    saved: 'Cambios guardados',
    created: 'Nota creada',
    publish: 'Publicar',
    published: 'Nota publicada',
    fields: {
      title: 'Titular',
      lede: 'Entrada (una oración)',
      whyItMatters: 'Por qué importa',
      bigPicture: 'El panorama',
      keyPoints: 'Los detalles',
      body: 'Profundiza (párrafos)',
      whatsNext: 'Qué sigue',
      section: 'Sección',
      tags: 'Etiquetas (separadas por coma)',
      isPro: 'Nota Pro (profundiza bloqueado)',
      isBreaking: 'Última hora',
      sources: 'Fuentes citadas',
      sourceName: 'Medio o nombre',
      sourceUrl: 'Enlace',
      image: 'Imagen',
      credit: 'Crédito (ej: Foto: Primicias)',
      upload: 'Subir imagen',
      uploading: 'Subiendo…',
      uploaded: 'Imagen subida',
      imageNeedsSave: 'Guarda la nota primero para poder subir la imagen.',
      addItem: 'Agregar',
    },
    fromText: {
      toggle: 'Pegar texto y que la IA arme la nota',
      help: 'Pega un comunicado, un hilo o una nota ajena. La IA la convierte en formato breve y la deja por aprobar.',
      text: 'Texto',
      sourceUrl: 'Enlace de origen (opcional)',
      submit: 'Armar la nota',
      working: 'La IA está redactando…',
      done: 'Nota armada. Revísala antes de publicar.',
      minLength: 'Pega al menos unas líneas de texto.',
    },
  },

  stories: {
    title: 'Hechos',
    subtitle:
      'Cada hecho junta las piezas de varios medios sobre el mismo acontecimiento. La watchlist espera más fuentes.',
    empty: 'No hay hechos con ese estado en los últimos 7 días.',
    sources: (n: number) => (n === 1 ? '1 fuente' : `${n} fuentes`),
    signals: (n: number) => (n === 1 ? '1 pieza' : `${n} piezas`),
    official: 'Fuente oficial',
    accusation: 'Acusación',
    familyVeto: 'Familia vetada',
    draft: 'Redactar ahora',
    drafting: 'Redactando…',
    drafted: 'Nota redactada. Quedó por aprobar.',
    discard: 'Descartar',
    discarded: 'Hecho descartado',
    openArticle: 'Ver nota',
    showPieces: 'Ver piezas',
    hidePieces: 'Ocultar piezas',
  },

  telegram: {
    title: 'Telegram',
    subtitle: 'El bot de la Mesa: aquí das acceso al equipo y ves si todo está conectado.',
    bot: 'Bot',
    notConfigured: 'Falta TELEGRAM_BOT_TOKEN en el servidor.',
    open: 'Abrir en Telegram',
    webhook: 'Conexión',
    webhookOk: 'Conectado: Telegram entrega los mensajes al API.',
    webhookMissing: 'Sin conectar. Toca "Reconfigurar bot".',
    pending: (n: number) => `${n} mensaje${n === 1 ? '' : 's'} en cola`,
    lastError: 'Último error de Telegram',
    configure: 'Reconfigurar bot',
    configuring: 'Configurando…',
    configured: 'Bot configurado: webhook, descripción y comandos al día.',
    mesa: 'Grupo Mesa',
    mesaSet: (title: string) => `Las tarjetas llegan a ${title || 'el grupo configurado'}.`,
    mesaMissing:
      'Todavía no hay grupo. Crea un grupo, agrega al bot y que un editor escriba /mesa ahí.',
    team: 'Equipo',
    teamEmpty:
      'Nadie pidió acceso todavía. Cada persona del equipo le escribe /unirme al bot por privado y aparece aquí.',
    role: 'Rol',
    remove: 'Quitar',
    removed: 'Persona quitada del equipo',
    roleSaved: 'Rol actualizado. Le avisamos por Telegram.',
    fromEnv: 'Ids fijos en el servidor',
    steps: [
      'Cada persona del equipo abre el bot y escribe /unirme.',
      'Aquí le asignas Editor (aprueba y publica) o Reportero (sus notas quedan por aprobar).',
      'Crea un grupo, agrega al bot y que un editor escriba /mesa: ahí llegan las tarjetas con botones.',
      'En el grupo se usa /nota <texto> para mandar notas y /mata <id> para retirar.',
    ],
  },

  signals: {
    title: 'Señales',
    subtitle: 'Lo que la IA encontró en las fuentes, con su valoración.',
    empty: 'No hay señales con esos filtros.',
    minScore: 'Puntaje mínimo',
    draft: 'Redactar',
    drafting: 'Redactando…',
    drafted: 'Nota redactada. Quedó por aprobar.',
    discard: 'Descartar',
    discarded: 'Señal descartada',
    openArticle: 'Ver nota',
    openSource: 'Abrir fuente',
  },

  sources: {
    title: 'Fuentes',
    subtitle: 'Medios, periodistas, políticos e instituciones que vigila la mesa.',
    empty: 'No hay fuentes todavía.',
    add: 'Nueva fuente',
    editTitle: 'Editar fuente',
    newTitle: 'Nueva fuente',
    name: 'Nombre',
    kind: 'Tipo',
    category: 'Categoría',
    url: 'URL (feed RSS o página)',
    query: 'Consulta para Perplexity',
    weight: 'Peso (0.5 a 2)',
    isActive: 'Activa',
    lastChecked: 'Última revisión',
    never: 'Nunca',
    saved: 'Fuente guardada',
    deleted: 'Fuente eliminada',
    deleteTitle: '¿Eliminar esta fuente?',
    deleteMessage: 'La mesa dejará de vigilarla.',
    activated: 'Fuente activada',
    paused: 'Fuente pausada',
  },

  subscribers: {
    title: 'Suscriptores',
    subtitle: 'Activa los pagos confirmados y administra los vencimientos.',
    empty: 'No hay suscriptores con esos filtros.',
    searchPlaceholder: 'Buscar por correo o nombre…',
    plan: 'Plan',
    activate: 'Activar',
    cancel: 'Cancelar suscripción',
    paidUntil: 'Vence',
    noExpiryLabel: 'No vence',
    activateTitle: 'Activar suscripción',
    activateHelp: 'Elige hasta cuándo queda activa. Es obligatorio escoger una opción.',
    optionDate: 'Vence en una fecha',
    optionNoExpiry: 'No vence (acceso indefinido)',
    dateLabel: 'Fecha de vencimiento',
    presets: [
      { label: '+1 mes', months: 1 },
      { label: '+3 meses', months: 3 },
      { label: '+6 meses', months: 6 },
      { label: '+1 año', months: 12 },
    ],
    activated: 'Suscripción activada',
    canceled: 'Suscripción cancelada',
    cancelTitle: '¿Cancelar esta suscripción?',
    cancelMessage: 'Dejará de recibir boletines y contenido Pro.',
  },

  tips: {
    title: 'Denuncias',
    subtitle: 'Lo que llega por Telegram y por la web.',
    empty: 'No hay denuncias con ese estado.',
    anonymous: 'Anónimo',
    changeStatus: 'Estado',
    updated: 'Estado actualizado',
    toArticle: 'Convertir en nota',
    converting: 'Redactando…',
    converted: 'Nota creada desde la denuncia',
    media: 'Adjuntos',
  },

  newsletters: {
    title: 'Boletines',
    subtitle: 'Genera la vista previa de una edición, revísala y envíala.',
    edition: 'Edición',
    preview: 'Generar vista previa',
    generating: 'Generando…',
    send: 'Enviar a suscriptores',
    sending: 'Enviando…',
    sent: 'Boletín enviado',
    sendTitle: '¿Enviar este boletín?',
    sendMessage: 'Se envía ahora a todos los suscriptores activos de esta edición.',
    history: 'Historial',
    empty: 'Todavía no hay boletines.',
    noPreview: 'Elige una edición y genera la vista previa.',
    recipients: 'destinatarios',
    statusSent: 'Enviado',
    statusDraft: 'Borrador',
    view: 'Ver',
  },

  lens: {
    title: 'Lente por modo',
    help: 'La IA propone; tú corriges. Cada corrección queda como par del golden set para calibrar los pesos.',
    none: 'Todavía sin lente. Recalcula para que la IA lo proponga.',
    recompute: 'Recalcular con IA',
    recomputing: 'Calculando…',
    recomputed: 'Lente recalculado',
    presence: 'Presencia en el hecho',
    oficialismo: 'Oficialismo',
    correismo: 'Correísmo',
    oposicion: 'Otra oposición',
    institucional: 'Instituciones y control',
    solidez: (n: number) => `Solidez S${n}`,
    documents: 'Documentos primarios',
    contradiction: 'Contradicción detectada',
    relevance: 'Relevancia por modo (0-100)',
    proposed: 'IA',
    stance: 'Postura',
    stanceNone: 'Sin valorar',
    stanceSaveHint: 'Las posturas y los números se guardan con "Guardar".',
  },

  modes: {
    title: 'Modos de lectura',
    subtitle: (days: number) => `Elecciones anónimas de los últimos ${days} días.`,
    choose: 'eligieron',
    change: 'cambiaron',
    views: 'vistas',
    partisan: 'Eligen un modo partidista',
    partisanGoal: 'Meta: 20% en 60 días. Si no se llega, se replantea la pantalla de entrada.',
    thermometer: 'Termómetro de orillas (7 días)',
    nothing: 'Sin lecturas todavía.',
    golden: (corrected: number, total: number) => `Golden set: ${corrected} de ${total} hechos corregidos`,
    error: 'No se pudieron cargar las métricas de modos.',
  },
}

export const stanceOptions = [
  'oficialista',
  'opositora',
  'correista',
  'institucional',
  'neutral',
  'no_aplica',
] as const

export const stanceLabels: Record<(typeof stanceOptions)[number], string> = {
  oficialista: 'Oficialista',
  opositora: 'Opositora',
  correista: 'Correísta',
  institucional: 'Institucional',
  neutral: 'Neutral',
  no_aplica: 'No aplica',
}

export const articleStatusLabels: Record<ArticleStatus, { label: string; tone: Tone }> = {
  pending: { label: 'Por aprobar', tone: 'warning' },
  published: { label: 'Publicada', tone: 'success' },
  rejected: { label: 'Rechazada', tone: 'stamp' },
  retracted: { label: 'Retirada', tone: 'stamp' },
}

export const storyStatusLabels: Record<StoryStatus, { label: string; tone: Tone }> = {
  ready: { label: 'Lista', tone: 'success' },
  watchlist: { label: 'Watchlist', tone: 'warning' },
  covered: { label: 'Con nota', tone: 'accent' },
  archived: { label: 'Archivado', tone: 'muted' },
  blocked: { label: 'Bloqueado', tone: 'stamp' },
  discarded: { label: 'Descartado', tone: 'muted' },
}

export const telegramRoleLabels: Record<TelegramRole, { label: string; tone: Tone }> = {
  pending: { label: 'Pendiente', tone: 'warning' },
  editor: { label: 'Editor', tone: 'success' },
  reporter: { label: 'Reportero', tone: 'accent' },
  disabled: { label: 'Desactivado', tone: 'muted' },
}

export const originLabels: Record<ArticleOrigin, { label: string; icon: string }> = {
  ai: { label: 'IA', icon: 'fa-solid fa-robot' },
  telegram: { label: 'Telegram', icon: 'fa-brands fa-telegram' },
  manual: { label: 'Manual', icon: 'fa-solid fa-pen-nib' },
}

export const signalStatusLabels: Record<Signal['status'], { label: string; tone: Tone }> = {
  new: { label: 'Nueva', tone: 'info' },
  scored: { label: 'Valorada', tone: 'accent' },
  discarded: { label: 'Descartada', tone: 'muted' },
  drafted: { label: 'Redactada', tone: 'success' },
  duplicate: { label: 'Duplicada', tone: 'muted' },
}

export const sourceKindLabels: Record<Source['kind'], string> = {
  rss: 'RSS',
  perplexity: 'Perplexity',
  web: 'Web',
}

export const sourceCategoryLabels: Record<Source['category'], string> = {
  medio: 'Medio',
  periodista: 'Periodista',
  politico: 'Político',
  institucion: 'Institución',
}

export const subscriberStatusLabels: Record<Subscriber['status'], { label: string; tone: Tone }> = {
  pending_payment: { label: 'Pago pendiente', tone: 'warning' },
  active: { label: 'Activo', tone: 'success' },
  canceled: { label: 'Cancelado', tone: 'stamp' },
  expired: { label: 'Vencido', tone: 'muted' },
}

export const planLabels: Record<Subscriber['plan'], string> = {
  newsletter: 'Boletín',
  pro: 'Pro',
}

export const tipStatusLabels: Record<Tip['status'], { label: string; tone: Tone }> = {
  new: { label: 'Nueva', tone: 'stamp' },
  reviewing: { label: 'En revisión', tone: 'warning' },
  used: { label: 'Usada', tone: 'success' },
  discarded: { label: 'Descartada', tone: 'muted' },
}

export const scoreKeys = ['cercania', 'inmediatez', 'personaje', 'relevancia', 'impacto'] as const

/** Colores del puntaje: >=7 verde, 5–7 ámbar, <5 apagado. */
export function scoreTone(value: number): Tone {
  if (value >= 7) return 'success'
  if (value >= 5) return 'warning'
  return 'muted'
}
