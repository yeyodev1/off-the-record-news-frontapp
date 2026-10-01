/** Forma con la que httpBase rechaza cualquier error del API. */
export interface ApiError {
  status: number
  message: string
  data?: unknown
}

export interface Paginated<T> {
  items: T[]
  total: number
  page: number
  pages: number
}

/** Lo que devuelve el backapp en /auth/login y /auth/me. */
export interface SessionUser {
  id: string
  email: string
  name: string
  phone: string
  accountType: 'customer' | 'admin' | string
}

// ─── Off the Record: contrato del API ───────────────────────────────────

export type Section =
  | 'politica'
  | 'economia'
  | 'legislativo'
  | 'seguridad'
  | 'sociedad'
  | 'mundo'
  | 'negocios'
  | 'tecnologia'

export type ArticleStatus = 'pending' | 'published' | 'rejected' | 'retracted'
export type ArticleOrigin = 'ai' | 'telegram' | 'manual'
export type Edition = 'manana' | 'noche' | 'economia' | 'legislativo'

export interface ScoreBreakdown {
  total: number
  cercania: number
  inmediatez: number
  personaje: number
  relevancia: number
  impacto: number
  reasoning: string
}

export interface ArticleImage {
  url: string
  credit: string
  sourceName: string
  sourceUrl: string
  kind: 'photo' | 'illustration' | 'infographic'
}

export interface Infographic {
  title: string
  unit: string
  items: { label: string; value: number }[]
}

export interface ArticleSource {
  name: string
  url: string
  /** Lo que dice esa nota, en palabras del propio medio. */
  summary?: string
}

export interface VerificationFlag {
  level: 'error' | 'aviso'
  kind: string
  text: string
}

/** Resultado del verificador: cifras, enlaces y nombres contra el corpus. */
export interface Verification {
  checkedAt: string
  errors: number
  warnings: number
  flags: VerificationFlag[]
}

/** Bloque "Actualización HH:MM" de una nota publicada. */
export interface ArticleUpdate {
  id: string
  text: string
  sources: ArticleSource[]
  publishedAt: string | null
  /** Solo en el panel. */
  status?: 'pending' | 'published' | 'rejected'
  verification?: Verification | null
  createdAt?: string
}

export interface Retraction {
  at: string | null
  reason: string
  by?: string
}

export interface HistoryEntry {
  action: string
  by: string
  at: string
  note: string
}

export interface Article {
  id: string
  slug: string
  title: string
  lede: string
  whyItMatters: string
  keyPoints: string[]
  body: string[]
  bigPicture: string
  whatsNext: string
  section: Section
  tags: string[]
  image: ArticleImage | null
  infographic: Infographic | null
  sources: ArticleSource[]
  score: ScoreBreakdown | null
  status: ArticleStatus
  origin: ArticleOrigin
  author: string
  isPro: boolean
  isBreaking: boolean
  readingMinutes: number
  views: number
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  /** Solo en el detalle público: true si el body está reservado a Pro. */
  locked?: boolean
  updates?: ArticleUpdate[]
  lastUpdatedAt?: string | null
  retraction?: Retraction | null
  /** Descargo de generación asistida, armado por el API. */
  disclaimer?: string
  reviewedBy?: string
  /** Solo en el panel. */
  verification?: Verification | null
  history?: HistoryEntry[]
  storyId?: string | null
}

/** Nota retirada: el API devuelve solo esto, sin el contenido. */
export interface RetractedArticle {
  id: string
  slug: string
  title: string
  section: Section
  status: 'retracted'
  publishedAt: string | null
  retraction: Retraction
}

export type StoryStatus = 'ready' | 'watchlist' | 'covered' | 'archived' | 'blocked' | 'discarded'

/** Un hecho: el mismo acontecimiento contado por varias fuentes. */
export interface Story {
  id: string
  title: string
  summary: string
  status: StoryStatus
  reason: string
  score: number
  bestScore: ScoreBreakdown | null
  section: Section
  signalCount: number
  sourceNames: string[]
  hasOfficialSource: boolean
  accusation: boolean
  familyVeto?: boolean
  firstSignalAt: string
  lastSignalAt: string
  articleId: string | null
}

export type ArticleCard = Omit<Article, 'body' | 'score' | 'status'>

export interface HomeFeed {
  lead: ArticleCard | null
  breaking: ArticleCard[]
  latest: ArticleCard[]
  bySection: { section: Section; items: ArticleCard[] }[]
}

export interface Source {
  id: string
  name: string
  kind: 'rss' | 'perplexity' | 'web'
  category: 'medio' | 'periodista' | 'politico' | 'institucion'
  url: string
  query: string
  weight: number
  isActive: boolean
  lastCheckedAt: string | null
  lastError: string
  createdAt: string
}

export interface Signal {
  id: string
  sourceId: string | null
  sourceName: string
  title: string
  url: string
  summary: string
  imageUrl: string
  publishedAt: string | null
  status: 'new' | 'scored' | 'discarded' | 'drafted' | 'duplicate'
  score: ScoreBreakdown | null
  articleId: string | null
  storyId?: string | null
  accusation?: boolean
  createdAt: string
}

export type TelegramRole = 'pending' | 'editor' | 'reporter' | 'disabled'

export interface TelegramMember {
  id: string
  telegramId: string
  name: string
  username: string
  role: TelegramRole
  lastSeenAt: string
  createdAt: string
}

export interface TelegramTeam {
  configured: boolean
  bot: { username: string; name: string } | null
  webhook: { url: string; pendingUpdates: number; lastError: string } | null
  mesa: { chatId: string; title: string; setBy: string }
  envEditors: string[]
  envReporters: string[]
  members: TelegramMember[]
}

export interface Subscriber {
  id: string
  email: string
  name: string
  plan: 'newsletter' | 'pro'
  editions: Edition[]
  status: 'pending_payment' | 'active' | 'canceled' | 'expired'
  company: string
  paidUntil: string | null
  createdAt: string
}

export interface Tip {
  id: string
  channel: 'telegram' | 'web'
  name: string
  contact: string
  text: string
  mediaUrls: string[]
  status: 'new' | 'reviewing' | 'used' | 'discarded'
  createdAt: string
}

export interface NewsletterIssue {
  id: string
  edition: Edition
  subject: string
  intro: string
  html: string
  articleIds: string[]
  status: 'draft' | 'sent'
  recipients: number
  sentAt: string | null
  createdAt: string
}

export interface PipelineRun {
  id: string
  trigger: 'cron' | 'manual'
  startedAt: string
  finishedAt: string | null
  signalsFound: number
  signalsNew: number
  scored: number
  drafted: number
  clustered?: number
  updates?: number
  skippedReason: string
  errors: string[]
}

export interface AdminStats {
  pending: number
  publishedToday: number
  publishedTotal: number
  signalsToday: number
  subscribersActive: number
  subscribersPending: number
  tipsNew: number
  lastRun: PipelineRun | null
}
