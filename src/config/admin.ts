import type { ArticleOrigin, ArticleStatus, Signal, Source, Subscriber, Tip } from '@/types'

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
  { label: 'Señales', to: '/admin/senales', icon: 'fa-solid fa-satellite-dish', primary: true },
  { label: 'Fuentes', to: '/admin/fuentes', icon: 'fa-solid fa-rss' },
  { label: 'Suscriptores', to: '/admin/suscriptores', icon: 'fa-solid fa-users' },
  { label: 'Denuncias', to: '/admin/denuncias', icon: 'fa-solid fa-user-secret' },
  { label: 'Boletines', to: '/admin/boletines', icon: 'fa-solid fa-envelope-open-text' },
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
}

export const articleStatusLabels: Record<ArticleStatus, { label: string; tone: Tone }> = {
  pending: { label: 'Por aprobar', tone: 'warning' },
  published: { label: 'Publicada', tone: 'success' },
  rejected: { label: 'Rechazada', tone: 'stamp' },
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
