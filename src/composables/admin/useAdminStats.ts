import { computed, ref } from 'vue'
import { adminService } from '@/services/admin.service'
import type { AdminStats } from '@/types'

// Estado de módulo: el badge de "Por aprobar" del menú y el tablero leen lo mismo,
// y publicar desde la cola lo refresca sin recargar el layout.
const stats = ref<AdminStats | null>(null)
const loading = ref(false)
const error = ref('')

async function refreshStats() {
  loading.value = true
  error.value = ''
  try {
    stats.value = await adminService.stats()
  } catch (e) {
    error.value = (e as { message: string }).message
  } finally {
    loading.value = false
  }
}

export function useAdminStats() {
  const pending = computed(() => stats.value?.pending ?? 0)
  return { stats, loading, error, pending, refreshStats }
}
