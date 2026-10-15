import { computed, onMounted, onUnmounted, ref } from 'vue'
import { adminService } from '@/services/admin.service'
import type { ApiError, MesaLive } from '@/types'

export type SignalFilter = 'all' | 'drafted' | 'discarded'

const REFRESH_MS = 60_000

/**
 * Estado de la vista "En vivo". Se refresca sola cada minuto, pero solo con la
 * pestaña a la vista: nadie necesita que el panel consulte el API de fondo.
 */
export function useMesaLive(hours = 12) {
  const live = ref<MesaLive | null>(null)
  const loading = ref(false)
  const error = ref('')
  const filter = ref<SignalFilter>('all')
  let timer: ReturnType<typeof setInterval> | null = null

  async function load() {
    loading.value = true
    error.value = ''
    try {
      live.value = await adminService.mesaLive(hours)
    } catch (e) {
      error.value = (e as ApiError).message
    } finally {
      loading.value = false
    }
  }

  const signals = computed(() => {
    const all = live.value?.signals ?? []
    if (filter.value === 'drafted') return all.filter((s) => s.article || s.status === 'drafted')
    if (filter.value === 'discarded')
      return all.filter((s) => s.status === 'discarded' || s.status === 'duplicate')
    return all
  })

  function tick() {
    if (document.visibilityState === 'visible' && !loading.value) load()
  }

  function onVisibility() {
    if (document.visibilityState === 'visible') load()
  }

  onMounted(() => {
    load()
    timer = setInterval(tick, REFRESH_MS)
    document.addEventListener('visibilitychange', onVisibility)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
    document.removeEventListener('visibilitychange', onVisibility)
  })

  return { live, loading, error, filter, signals, load }
}
