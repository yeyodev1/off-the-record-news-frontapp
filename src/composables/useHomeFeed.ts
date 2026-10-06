import { computed, onMounted, ref, watch } from 'vue'
import { articlesService } from '@/services/articles.service'
import { useReadingMode } from './useReadingMode'
import type { ApiError, HomeFeed } from '@/types'

export function useHomeFeed() {
  const feed = ref<HomeFeed | null>(null)
  const loading = ref(true)
  const error = ref('')
  const { mode } = useReadingMode()

  // Al cambiar de modo se reordena sin skeleton: lo que ya está en pantalla se queda
  // hasta que llega el orden nuevo.
  async function load({ quiet = false } = {}) {
    if (!quiet) loading.value = true
    error.value = ''
    try {
      feed.value = await articlesService.top(mode.value)
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

  const forMode = computed(() => feed.value?.forMode ?? [])
  const contradictions = computed(() => feed.value?.contradictions ?? [])
  const otherSide = computed(() => feed.value?.otherSide ?? [])

  onMounted(() => load())
  watch(mode, () => load({ quiet: Boolean(feed.value) }))

  return {
    feed,
    latest,
    sections,
    forMode,
    contradictions,
    otherSide,
    loading,
    error,
    isEmpty,
    reload: () => load(),
  }
}
