import { computed, ref, watch, type Ref } from 'vue'
import { articlesService } from '@/services/articles.service'
import { site } from '@/config/site'
import type { ApiError, ArticleCard, Section } from '@/types'

const PAGE_SIZE = 12

export function isSection(value: string): value is Section {
  return Object.prototype.hasOwnProperty.call(site.sections, value)
}

export function useSectionFeed(section: Ref<string>) {
  const items = ref<ArticleCard[]>([])
  const page = ref(1)
  const pages = ref(1)
  const loading = ref(false)
  const loadingMore = ref(false)
  const error = ref('')

  const isValid = computed(() => isSection(section.value))
  const name = computed(() => (isSection(section.value) ? site.sections[section.value] : ''))
  const hasMore = computed(() => page.value < pages.value)

  async function fetchPage(target: number) {
    const result = await articlesService.list({ section: section.value, page: target, limit: PAGE_SIZE })
    page.value = result.page || target
    pages.value = result.pages || 1
    return result.items
  }

  async function load() {
    items.value = []
    page.value = 1
    pages.value = 1
    error.value = ''
    if (!isValid.value) return
    loading.value = true
    try {
      items.value = await fetchPage(1)
    } catch (e) {
      error.value = (e as ApiError).message || 'Error desconocido'
    } finally {
      loading.value = false
      // Después del afterEach del router, que pone el título genérico "Sección".
      document.title = `${name.value} — ${site.name}`
    }
  }

  async function loadMore() {
    if (loadingMore.value || !hasMore.value) return
    loadingMore.value = true
    try {
      const next = await fetchPage(page.value + 1)
      const seen = new Set(items.value.map((item) => item.id))
      items.value.push(...next.filter((item) => !seen.has(item.id)))
    } catch (e) {
      error.value = (e as ApiError).message || 'Error desconocido'
    } finally {
      loadingMore.value = false
    }
  }

  watch(section, load, { immediate: true })

  return { items, name, isValid, hasMore, loading, loadingMore, error, reload: load, loadMore }
}
