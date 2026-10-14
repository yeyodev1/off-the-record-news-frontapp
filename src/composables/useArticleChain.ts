import { ref, watch, type Ref } from 'vue'
import { articlesService } from '@/services/articles.service'
import { useReadingMode } from './useReadingMode'
import type { Article } from '@/types'

const PAGE_SIZE = 12

/**
 * Lectura continua (Andersson, 13/10): al terminar una nota no aparece "más
 * notas", sigue la siguiente completa, en el orden del modo del lector, sin fin.
 */
export function useArticleChain(currentSlug: Ref<string>) {
  const { mode } = useReadingMode()
  const chain = ref<Article[]>([])
  const loading = ref(false)
  const done = ref(false)

  let queue: string[] = []
  let seen = new Set<string>()
  let page = 0
  let pages = 1
  let generation = 0

  function reset() {
    generation++
    chain.value = []
    queue = []
    seen = new Set(currentSlug.value ? [currentSlug.value] : [])
    page = 0
    pages = 1
    done.value = false
    loading.value = false
  }

  async function refill(gen: number) {
    while (!queue.length && page < pages) {
      const result = await articlesService.list({
        orden: 'principales',
        modo: mode.value,
        page: page + 1,
        limit: PAGE_SIZE,
      })
      if (gen !== generation) return
      page = result.page || page + 1
      pages = result.pages || 1
      queue = result.items.map((item) => item.slug).filter((slug) => !seen.has(slug))
    }
  }

  async function next() {
    if (loading.value || done.value || !currentSlug.value) return
    const gen = generation
    loading.value = true
    try {
      await refill(gen)
      const slug = queue.shift()
      if (gen !== generation) return
      if (!slug) {
        done.value = true
        return
      }
      seen.add(slug)
      const data = await articlesService.bySlug(slug, mode.value)
      if (gen !== generation) return
      if (data.status !== 'retracted') chain.value = [...chain.value, data as Article]
    } catch {
      // Una nota que no carga no corta la lectura: se pasa a la siguiente.
    } finally {
      if (gen === generation) loading.value = false
    }
  }

  watch([currentSlug, mode], reset, { immediate: true })

  return { chain, loading, done, next }
}
