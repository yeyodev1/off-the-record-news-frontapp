import APIBase from './httpBase'
import type { Article, ArticleCard, HomeFeed, Paginated } from '@/types'

export interface ArticleListParams {
  section?: string
  tag?: string
  page?: number
  limit?: number
}

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

  async top(): Promise<HomeFeed> {
    const { data } = await this.get<HomeFeed>('articles/top')
    return data
  }

  async bySlug(slug: string): Promise<Article> {
    const { data } = await this.get<Article>(`articles/${encodeURIComponent(slug)}`)
    return data
  }
}

export const articlesService = new ArticlesService()
