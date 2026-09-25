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

export type ArticleStatus = 'pending' | 'published' | 'rejected'
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
  createdAt: string
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
