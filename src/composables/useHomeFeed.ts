import { computed, onMounted, ref, watch } from 'vue'
import { articlesService } from '@/services/articles.service'
import { useReadingMode } from './useReadingMode'
import type { ApiError, HomeFeed } from '@/types'

/** "Las 5 cosas que tienes que saber" y el bloque de la otra orilla, según el modo. */
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

  const topFive = computed(() => feed.value?.topFive ?? [])
  const otherSide = computed(() => feed.value?.otherSide ?? [])
  const isEmpty = computed(() => !loading.value && !error.value && !topFive.value.length)

  onMounted(() => load())
  watch(mode, () => load({ quiet: Boolean(feed.value) }))

  return { feed, topFive, otherSide, loading, error, isEmpty, reload: () => load() }
}
