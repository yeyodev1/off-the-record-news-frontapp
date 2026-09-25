import { computed, onMounted, ref } from 'vue'
import { articlesService } from '@/services/articles.service'
import type { ApiError, HomeFeed } from '@/types'

export function useHomeFeed() {
  const feed = ref<HomeFeed | null>(null)
  const loading = ref(true)
  const error = ref('')

  async function load() {
    loading.value = true
    error.value = ''
    try {
      feed.value = await articlesService.top()
    } catch (e) {
      error.value = (e as ApiError).message || 'Error desconocido'
    } finally {
      loading.value = false
    }
  }

  // La nota principal no se repite en "Lo último".
  const latest = computed(() => {
    const leadId = feed.value?.lead?.id
    return (feed.value?.latest ?? []).filter((item) => item.id !== leadId)
  })

  const sections = computed(() => (feed.value?.bySection ?? []).filter((block) => block.items.length))

  const isEmpty = computed(() => !loading.value && !error.value && !feed.value?.lead && !latest.value.length)

  onMounted(load)

  return { feed, latest, sections, loading, error, isEmpty, reload: load }
}
