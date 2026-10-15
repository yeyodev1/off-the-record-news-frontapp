import type {
  ArticleOrigin,
  LessonArea,
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
  { label: 'Entrenar la mesa', to: '/admin/mesa', icon: 'fa-solid fa-brain' },
  { label: 'OTR PRO', to: '/admin/pro', icon: 'fa-solid fa-lock' },
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

  mesa: {
    title: 'La mesa por dentro',
    subtitle: 'Mira cómo trabajan los agentes y enséñales lo que la Mesa quiere.',
    tabs: { live: 'En vivo', agents: 'Agentes', train: 'Instrucciones extra' },
    agents: {
      intro:
        'Esto es lo que la IA lee en cada paso. Cambiarlo cambia cómo trabaja desde el próximo ciclo. Los formatos técnicos (campos de la nota) y la regla de no inventar datos quedan fijos.',
      empty: 'No se pudieron cargar los agentes.',
      rules: 'reglas',
      original: 'Original',
      modifiedBy: 'Modificada',
      by: 'por',
      rule: 'Regla',
      addRule: 'Agregar regla',
      moveUp: 'Subir regla',
      moveDown: 'Bajar regla',
      removeRule: 'Quitar regla',
      save: 'Guardar cambios',
      saving: 'Guardando…',
      discard: 'Descartar',
      restore: 'Restaurar original',
      restoreTitle: '¿Volver a las reglas originales?',
      restoreMessage: 'Se pierden los cambios guardados en esta sección.',
      restored: 'Sección restaurada. La mesa usa las reglas originales desde el próximo ciclo.',
      saved: 'Guardado. La mesa lo usa desde el próximo ciclo.',
      emptyWarning:
        'Esta sección quedó sin reglas: la IA no tendrá ninguna indicación en este punto.',
      blankWarning: 'Hay reglas vacías o muy cortas (mínimo 3 caracteres). Complétalas o quítalas.',
      tooMany: 'Máximo 40 reglas por sección.',
    },
    refresh: 'Actualizar',
    refreshing: 'Actualizando…',
    lastHours: 'Últimas 12 horas',
    health: {
      title: 'Estado',
      aiOk: 'IA funcionando',
      aiDown: 'IA caída',
      searchOk: 'Búsqueda web funcionando',
      searchDown: 'Búsqueda web detenida',
      lastRun: 'Último ciclo',
      noRun: 'Todavía no corre ningún ciclo',
      inSchedule: 'En horario (5:00 a 23:00)',
      offSchedule: 'Fuera de horario: la mesa descansa hasta las 5:00',
    },
    sources: {
      title: 'Fuentes',
      active: 'activas',
      rss: 'RSS',
      search: 'por búsqueda',
      checked: 'revisadas en 24 h',
      errors: 'Fuentes con error',
      manage: 'Gestionar fuentes',
    },
    funnel: {
      title: 'El proceso, paso a paso',
      steps: [
        {
          key: 'collected',
          label: 'Recolección',
          icon: 'fa-solid fa-satellite-dish',
          agent: 'Lee los RSS y busca en la web las fuentes sin RSS. Entra lo de las últimas 48 h.',
        },
        {
          key: 'scored',
          label: 'Valoración',
          icon: 'fa-solid fa-scale-balanced',
          agent: 'El editor (Jev) decide si es noticia, de qué sección y cuánto pesa, de 0 a 10.',
        },
        {
          key: 'stories',
          label: 'Agrupación en hechos',
          icon: 'fa-solid fa-layer-group',
          agent: 'Junta en un solo hecho lo que cuentan varios medios.',
        },
        {
          key: 'drafted',
          label: 'Redacción',
          icon: 'fa-solid fa-pen-nib',
          agent:
            'Escribe la nota con el material y el verificador revisa cifras, nombres y enlaces.',
        },
        {
          key: 'published',
          label: 'Publicadas',
          icon: 'fa-solid fa-newspaper',
          agent: 'Salen a la portada y se reescriben con el enfoque de cada modo.',
        },
      ],
      discarded: 'descartadas',
    },
    runs: { title: 'Últimos ciclos', empty: 'No hubo ciclos en estas horas.' },
    signals: {
      title: 'Qué entró y qué se decidió',
      empty: 'No entraron señales en estas horas.',
      filters: { all: 'Todas', drafted: 'Entraron a nota', discarded: 'Descartadas' },
      score: 'Puntaje',
      story: 'Hecho',
      article: 'Nota',
      yesNews: 'Esto sí era noticia',
      notNews: 'Esto no era noticia',
    },
    correction: {
      titleYes: '¿Por qué sí era noticia?',
      titleNo: '¿Por qué no era noticia?',
      label: 'Explícalo como se lo dirías a un periodista nuevo',
      placeholder:
        'Ej: las renuncias de concejales de Guayaquil sí son noticia aunque sean locales',
      save: 'Enseñar a la mesa',
      saving: 'Guardando…',
      done: 'La mesa lo va a tener en cuenta desde el próximo ciclo',
    },
    train: {
      intro:
        'Lo que escribas aquí lo lee la IA en cada paso de la mesa. No hace falta tocar código: escribe la regla como se la dirías a un periodista, y desde el próximo ciclo la aplica. Puedes apagarla o borrarla cuando quieras.',
      newTitle: 'Nueva instrucción',
      area: 'Área',
      instruction: 'Instrucción',
      placeholder: 'Ej: en el modo correísta, prioriza las declaraciones de asambleístas de RC',
      save: 'Guardar instrucción',
      saving: 'Guardando…',
      saved: 'Instrucción guardada. Se aplica desde el próximo ciclo',
      updated: 'Instrucción actualizada',
      deleted: 'Instrucción borrada',
      deleteConfirm: '¿Borrar esta instrucción? La mesa dejará de tenerla en cuenta.',
      empty: 'Todavía no hay instrucciones en esta área.',
      emptyAll:
        'Todavía no hay instrucciones. Escribe la primera arriba o corrige una decisión desde En vivo.',
      active: 'Activa',
      inactive: 'Apagada',
      edit: 'Editar',
      manual: 'Escrita a mano',
      correction: 'Corrección de una decisión',
      verdictYes: 'Sí era noticia',
      verdictNo: 'No era noticia',
      by: 'por',
    },
    tryIt: {
      title: 'Probar un titular',
      hint: 'Mira cómo lo valoraría la mesa hoy, con las instrucciones que tiene activas. No publica nada.',
      headline: 'Titular',
      summary: 'Resumen (opcional)',
      run: 'Probar',
      running: 'Valorando…',
      wouldDraft: 'Entraría a nota',
      wouldNot: 'No entraría a nota',
      score: 'Puntaje',
      threshold: 'umbral',
      section: 'Sección',
      notNews: 'No es noticia',
      duplicate: 'Ya publicado',
      accusation: 'Acusa a alguien',
      family: 'Familia vetada',
      lessons: 'instrucciones usadas',
      parts: {
        cercania: 'Cercanía',
        inmediatez: 'Inmediatez',
        personaje: 'Personaje',
        relevancia: 'Relevancia',
        impacto: 'Impacto',
      },
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
    subtitle:
      'Instituciones, medios, programas, políticos, periodistas, sociedad civil, lo internacional y lo viral. Los periodistas suman fuentes en el Google Sheet.',
    sheetUrl:
      'https://docs.google.com/spreadsheets/d/1pBAN0zF6WzosGTyMUh6xnvN6GIw16c3CV4_CEw1_-9g/edit',
    openSheet: 'Abrir Sheet de fuentes',
    sync: 'Traer del Sheet',
    syncing: 'Trayendo…',
    synced: (r: { created: number; updated: number; deactivated: number; skipped?: string }) =>
      r.skipped ??
      `Sheet al día: ${r.created} nuevas, ${r.updated} actualizadas, ${r.deactivated} apagadas`,
    fromSheet: 'Del Sheet',
    everyMinutes: 'Cada cuántos minutos (0 = automático)',
    notes: 'Notas (cargo, cuenta de X…)',
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

  followUps: {
    title: 'Patitas de la noticia',
    empty: 'La IA no propuso seguimientos para esta nota.',
    framingTitle: 'Titular por mirada',
    framingPending: 'Se arma al publicar (texto base mientras tanto).',
  },

  pro: {
    title: 'OTR PRO',
    subtitle:
      'Tráileres de las notas PRO para la portada gratuita y empresas interesadas en el servicio.',
    tabTeasers: 'Tráileres',
    tabLeads: 'Interesados',
    pasteLabel: 'Pega la nota que se envió a los clientes PRO',
    pastePlaceholder:
      'Ej.: Carondelet negocia tres nombres para reemplazar a Rosero en el CPCCS: …',
    generate: 'Armar tráiler',
    generating: 'Armando…',
    generated: 'Tráiler armado. Revísalo y publícalo.',
    publish: 'Publicar en portada',
    unpublish: 'Archivar',
    published: 'Tráiler publicado',
    archived: 'Tráiler archivado',
    saved: 'Tráiler guardado',
    deleted: 'Tráiler eliminado',
    emptyTeasers: 'Todavía no hay tráileres. Pega una nota PRO para armar el primero.',
    emptyLeads: 'Todavía no hay empresas interesadas.',
    titleLabel: 'Titular del tráiler',
    whyLabel: 'Por qué importa',
    meeting: 'Pide reunión',
    plans: { semanal: 'Informe semanal', diario: 'Semanal + diario 24/7' },
    teaserStatus: { draft: 'Borrador', published: 'En portada', archived: 'Archivado' },
    leadStatus: {
      new: 'Nuevo',
      contacted: 'Contactado',
      meeting: 'Reunión agendada',
      won: 'Cliente',
      lost: 'Perdido',
    },
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
    golden: (corrected: number, total: number) =>
      `Golden set: ${corrected} de ${total} hechos corregidos`,
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
  institucion: 'Institución',
  medio: 'Medio',
  programa: 'Programa / noticiero',
  politico: 'Político',
  periodista: 'Periodista',
  sociedad_civil: 'Sociedad civil',
  internacional: 'Internacional',
  redes: 'Redes / viral',
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

export const lessonAreas: Record<LessonArea, { label: string; hint: string; icon: string }> = {
  general: { label: 'General', hint: 'Vale para todos los pasos', icon: 'fa-solid fa-globe' },
  valoracion: {
    label: 'Valoración',
    hint: 'Qué es noticia y qué no, y cuánto pesa',
    icon: 'fa-solid fa-scale-balanced',
  },
  redaccion: { label: 'Redacción', hint: 'Cómo se escribe la nota', icon: 'fa-solid fa-pen-nib' },
  modos: {
    label: 'Modos',
    hint: 'Noboísta, correísta e independiente: orden y enfoque',
    icon: 'fa-solid fa-sliders',
  },
  fotos: { label: 'Fotos', hint: 'Qué foto sirve y cuál no', icon: 'fa-solid fa-image' },
}
