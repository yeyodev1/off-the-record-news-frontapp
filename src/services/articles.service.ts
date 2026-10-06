import APIBase from './httpBase'
import type { Article, ArticleCard, HomeFeed, Paginated, ReadingMode, RetractedArticle } from '@/types'

export interface ArticleListParams {
  section?: string
  tag?: string
  page?: number
  limit?: number
  modo?: ReadingMode
}

const modoQuery = (modo?: ReadingMode) => (modo ? `?modo=${encodeURIComponent(modo)}` : '')

class ArticlesService extends APIBase {
  async list(params: ArticleListParams = {}): Promise<Paginated<ArticleCard>> {
    const query = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== '') query.set(key, String(value))
    }
    const qs = query.toString()
    const { data } = await this.get<Paginated<ArticleCard>>(`articles${qs ? `?${qs}` : ''}`)
    return data
  }

  async top(modo?: ReadingMode): Promise<HomeFeed> {
    const { data } = await this.get<HomeFeed>(`articles/top${modoQuery(modo)}`)
    return data
  }

  /** Una nota retirada llega sin contenido, solo con el aviso de retiro. */
  async bySlug(slug: string, modo?: ReadingMode): Promise<Article | RetractedArticle> {
    const { data } = await this.get<Article | RetractedArticle>(
      `articles/${encodeURIComponent(slug)}${modoQuery(modo)}`,
    )
    return data
  }
}

export const articlesService = new ArticlesService()
