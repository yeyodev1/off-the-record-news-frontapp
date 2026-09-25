import { ref, watch, type Ref } from 'vue'
import { articlesService } from '@/services/articles.service'
import { site } from '@/config/site'
import type { ApiError, Article, ArticleCard } from '@/types'

const RELATED_LIMIT = 4

export function useArticle(slug: Ref<string>) {
  const article = ref<Article | null>(null)
  const related = ref<ArticleCard[]>([])
  const loading = ref(true)
  const notFound = ref(false)
  const error = ref('')

  async function loadRelated(current: Article) {
    try {
      const page = await articlesService.list({ section: current.section, limit: RELATED_LIMIT + 1 })
      related.value = page.items.filter((item) => item.id !== current.id).slice(0, RELATED_LIMIT)
    } catch {
      // Las relacionadas son un extra: si fallan, la nota se lee igual.
      related.value = []
    }
  }

  async function load() {
    if (!slug.value) return
    loading.value = true
    notFound.value = false
    error.value = ''
    related.value = []
    try {
      article.value = await articlesService.bySlug(slug.value)
      document.title = `${article.value.title} — ${site.name}`
      loadRelated(article.value)
    } catch (e) {
      const apiError = e as ApiError
      article.value = null
      if (apiError.status === 404) notFound.value = true
      else error.value = apiError.message || 'Error desconocido'
    } finally {
      loading.value = false
    }
  }

  watch(slug, load, { immediate: true })

  return { article, related, loading, notFound, error, reload: load }
}
