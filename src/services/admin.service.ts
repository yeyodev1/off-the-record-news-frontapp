import APIBase from './httpBase'
import type {
  AdminStats,
  Article,
  Edition,
  NewsletterIssue,
  Paginated,
  PipelineRun,
  Signal,
  Source,
  Subscriber,
  Tip,
} from '@/types'

/** Las llamadas que esperan a la IA pueden tardar minutos. */
const SLOW = { timeout: 300000 }

type Query = Record<string, string | number | boolean | undefined | null>

/** Arma el querystring omitiendo filtros vacíos, para no mandar "status=". */
function qs(params: Query): string {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue
    search.set(key, String(value))
  }
  const text = search.toString()
  return text ? `?${text}` : ''
}

export type ArticleInput = Partial<Omit<Article, 'id' | 'slug' | 'createdAt' | 'updatedAt'>>
export type SourceInput = Omit<Source, 'id' | 'createdAt' | 'lastCheckedAt' | 'lastError'>

class AdminService extends APIBase {
  async stats(): Promise<AdminStats> {
    const { data } = await this.get<AdminStats>('admin/stats')
    return data
  }

  // ─── Notas ────────────────────────────────────────────────────────────
  async articles(params: Query): Promise<Paginated<Article>> {
    const { data } = await this.get<Paginated<Article>>(`admin/articles${qs(params)}`)
    return data
  }

  async article(id: string): Promise<Article> {
    const { data } = await this.get<Article>(`admin/articles/${id}`)
    return data
  }

  async createArticle(body: ArticleInput): Promise<Article> {
    const { data } = await this.post<Article>('admin/articles', body)
    return data
  }

  async updateArticle(id: string, body: ArticleInput): Promise<Article> {
    const { data } = await this.put<Article>(`admin/articles/${id}`, body)
    return data
  }

  async publishArticle(id: string): Promise<Article> {
    const { data } = await this.post<Article>(`admin/articles/${id}/publish`, {})
    return data
  }

  async rejectArticle(id: string): Promise<Article> {
    const { data } = await this.post<Article>(`admin/articles/${id}/reject`, {})
    return data
  }

  async rewriteArticle(id: string, instructions: string): Promise<Article> {
    const { data } = await this.post<Article>(
      `admin/articles/${id}/rewrite`,
      { instructions },
      undefined,
      SLOW,
    )
    return data
  }

  async uploadImage(id: string, file: File, credit: string): Promise<Article> {
    const form = new FormData()
    form.append('image', file)
    form.append('credit', credit)
    const { data } = await this.post<Article>(`admin/articles/${id}/image`, form, undefined, {
      timeout: 60000,
    })
    return data
  }

  async deleteArticle(id: string): Promise<void> {
    await this.delete(`admin/articles/${id}`)
  }

  async articleFromText(text: string, sourceUrl?: string): Promise<Article> {
    const { data } = await this.post<Article>(
      'admin/articles/from-text',
      { text, sourceUrl },
      undefined,
      SLOW,
    )
    return data
  }

  // ─── Señales ──────────────────────────────────────────────────────────
  async signals(params: Query): Promise<Paginated<Signal>> {
    const { data } = await this.get<Paginated<Signal>>(`admin/signals${qs(params)}`)
    return data
  }

  async draftSignal(id: string): Promise<Article> {
    const { data } = await this.post<Article>(`admin/signals/${id}/draft`, {}, undefined, SLOW)
    return data
  }

  async discardSignal(id: string): Promise<Signal> {
    const { data } = await this.post<Signal>(`admin/signals/${id}/discard`, {})
    return data
  }

  // ─── Fuentes ──────────────────────────────────────────────────────────
  async sources(params: Query = {}): Promise<Source[]> {
    const { data } = await this.get<Source[]>(`admin/sources${qs(params)}`)
    return data
  }

  async createSource(body: SourceInput): Promise<Source> {
    const { data } = await this.post<Source>('admin/sources', body)
    return data
  }

  async updateSource(id: string, body: Partial<SourceInput>): Promise<Source> {
    const { data } = await this.put<Source>(`admin/sources/${id}`, body)
    return data
  }

  async deleteSource(id: string): Promise<void> {
    await this.delete(`admin/sources/${id}`)
  }

  // ─── Mesa (pipeline) ──────────────────────────────────────────────────
  async runNewsroom(force = true): Promise<PipelineRun> {
    const { data } = await this.post<PipelineRun>('admin/newsroom/run', { force }, undefined, SLOW)
    return data
  }

  async runs(page = 1): Promise<Paginated<PipelineRun>> {
    const { data } = await this.get<Paginated<PipelineRun>>(`admin/newsroom/runs${qs({ page })}`)
    return data
  }

  // ─── Suscriptores ─────────────────────────────────────────────────────
  async subscribers(params: Query): Promise<Paginated<Subscriber>> {
    const { data } = await this.get<Paginated<Subscriber>>(`admin/subscribers${qs(params)}`)
    return data
  }

  async activateSubscriber(
    id: string,
    paidUntil: string | null,
    noExpiry: boolean,
  ): Promise<Subscriber> {
    const { data } = await this.post<Subscriber>(`admin/subscribers/${id}/activate`, {
      paidUntil,
      noExpiry,
    })
    return data
  }

  async cancelSubscriber(id: string): Promise<Subscriber> {
    const { data } = await this.post<Subscriber>(`admin/subscribers/${id}/cancel`, {})
    return data
  }

  // ─── Denuncias ────────────────────────────────────────────────────────
  async tips(params: Query): Promise<Paginated<Tip>> {
    const { data } = await this.get<Paginated<Tip>>(`admin/tips${qs(params)}`)
    return data
  }

  async updateTip(id: string, status: Tip['status']): Promise<Tip> {
    const { data } = await this.put<Tip>(`admin/tips/${id}`, { status })
    return data
  }

  async draftTip(id: string): Promise<Article> {
    const { data } = await this.post<Article>(`admin/tips/${id}/draft`, {}, undefined, SLOW)
    return data
  }

  // ─── Boletines ────────────────────────────────────────────────────────
  async newsletters(page = 1): Promise<Paginated<NewsletterIssue>> {
    const { data } = await this.get<Paginated<NewsletterIssue>>(`admin/newsletters${qs({ page })}`)
    return data
  }

  async previewNewsletter(edition: Edition): Promise<NewsletterIssue> {
    const { data } = await this.post<NewsletterIssue>(
      'admin/newsletters/preview',
      { edition },
      undefined,
      SLOW,
    )
    return data
  }

  async sendNewsletter(id: string): Promise<NewsletterIssue> {
    const { data } = await this.post<NewsletterIssue>(
      `admin/newsletters/${id}/send`,
      {},
      undefined,
      {
        timeout: 120000,
      },
    )
    return data
  }
}

export const adminService = new AdminService()
