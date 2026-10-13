import { computed, ref, watch, type Ref } from 'vue'
import { articlesService } from '@/services/articles.service'
import { useReadingMode } from './useReadingMode'
import type { ApiError, ArticleCard, StreamOrder } from '@/types'

const PAGE_SIZE = 8

// La pestaña elegida y lo cargado sobreviven a ir a una nota y volver: el
// navegador devuelve el scroll y la lista sigue ahí (README: conservar posición).
const cache = new Map<string, { items: ArticleCard[]; page: number; pages: number }>()

/** Stream de la portada: Principales, Más leídas o Lo último, con scroll infinito. */
export function useStream(order: Ref<StreamOrder>) {
  const { mode } = useReadingMode()
  const items = ref<ArticleCard[]>([])
  const page = ref(1)
  const pages = ref(1)
  const loading = ref(false)
  const loadingMore = ref(false)
  const error = ref('')

  const key = computed(() => `${order.value}:${mode.value}`)
  const hasMore = computed(() => page.value < pages.value)

  async function fetchPage(target: number) {
    const result = await articlesService.list({
      orden: order.value,
      modo: mode.value,
      page: target,
      limit: PAGE_SIZE,
    })
    page.value = result.page || target
    pages.value = result.pages || 1
    return result.items
  }

  function remember() {
    cache.set(key.value, { items: items.value, page: page.value, pages: pages.value })
  }

  async function load() {
    error.value = ''
    const cached = cache.get(key.value)
    if (cached) {
      page.value = cached.page
      pages.value = cached.pages
      items.value = cached.items
      return
    }
    loading.value = !items.value.length
    try {
      items.value = await fetchPage(1)
      remember()
    } catch (e) {
      error.value = (e as ApiError).message || 'Error desconocido'
    } finally {
      loading.value = false
    }
  }

  async function loadMore() {
    if (loadingMore.value || loading.value || !hasMore.value) return
    loadingMore.value = true
    try {
      const next = await fetchPage(page.value + 1)
      const seen = new Set(items.value.map((item) => item.id))
      items.value = [...items.value, ...next.filter((item) => !seen.has(item.id))]
      remember()
    } catch (e) {
      error.value = (e as ApiError).message || 'Error desconocido'
    } finally {
      loadingMore.value = false
    }
  }

  watch(key, load, { immediate: true })

  return { items, hasMore, loading, loadingMore, error, loadMore, reload: load }
}
