import { ref, watch, type Ref } from 'vue'
import { articlesService } from '@/services/articles.service'
import { site } from '@/config/site'
import { useReadingMode } from './useReadingMode'
import type { ApiError, Article, RetractedArticle } from '@/types'

export function useArticle(slug: Ref<string>) {
  const article = ref<Article | null>(null)
  const retracted = ref<RetractedArticle | null>(null)
  const loading = ref(true)
  const notFound = ref(false)
  const error = ref('')
  const { mode } = useReadingMode()

  async function load() {
    if (!slug.value) return
    loading.value = true
    notFound.value = false
    error.value = ''
    retracted.value = null
    try {
      const data = await articlesService.bySlug(slug.value, mode.value)
      document.title = `${data.title} — ${site.name}`
      if (data.status === 'retracted') {
        article.value = null
        retracted.value = data as RetractedArticle
        return
      }
      article.value = data as Article
    } catch (e) {
      const apiError = e as ApiError
      article.value = null
      if (apiError.status === 404) notFound.value = true
      else error.value = apiError.message || 'Error desconocido'
    } finally {
      loading.value = false
    }
  }

  // Cambiar de mirada dentro de la nota la vuelve a pedir con su encuadre.
  watch([slug, mode], load, { immediate: true })

  return { article, retracted, loading, notFound, error, reload: load }
}
