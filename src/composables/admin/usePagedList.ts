import { onMounted, reactive, ref, watch, type Ref } from 'vue'
import type { ApiError, Paginated } from '@/types'

/**
 * Listado paginado con filtros. Cambiar un filtro vuelve a la página 1;
 * la búsqueda de texto espera a que se deje de tipear.
 */
export function usePagedList<T extends { id: string }, F extends object>(
  fetcher: (filters: F, page: number) => Promise<Paginated<T>>,
  initial: F,
) {
  const filters = reactive({ ...initial }) as F
  const items = ref([]) as Ref<T[]>
  const page = ref(1)
  const pages = ref(1)
  const total = ref(0)
  const loading = ref(false)
  const error = ref('')

  // Si llegan respuestas en desorden, solo vale la última pedida.
  let requestId = 0

  async function load(target = page.value) {
    const id = ++requestId
    loading.value = true
    error.value = ''
    try {
      const res = await fetcher({ ...filters }, target)
      if (id !== requestId) return
      items.value = res.items
      page.value = res.page || target
      pages.value = Math.max(1, res.pages || 1)
      total.value = res.total
    } catch (e) {
      if (id === requestId) error.value = (e as ApiError).message
    } finally {
      if (id === requestId) loading.value = false
    }
  }

  function replace(item: T) {
    items.value = items.value.map((it) => (it.id === item.id ? item : it))
  }

  function remove(id: string) {
    const before = items.value.length
    items.value = items.value.filter((it) => it.id !== id)
    if (items.value.length < before) total.value = Math.max(0, total.value - 1)
  }

  let timer: ReturnType<typeof setTimeout> | undefined
  watch(
    () => ({ ...filters }),
    () => {
      clearTimeout(timer)
      timer = setTimeout(() => load(1), 300)
    },
  )

  onMounted(() => load(1))

  return { filters, items, page, pages, total, loading, error, load, replace, remove }
}
