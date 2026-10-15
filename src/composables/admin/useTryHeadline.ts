import { ref } from 'vue'
import { adminService } from '@/services/admin.service'
import { useToastStore } from '@/stores/toast'
import type { ApiError, TryResult } from '@/types'

/** Prueba en seco: valora un titular con las instrucciones activas, sin guardar nada. */
export function useTryHeadline() {
  const toast = useToastStore()
  const title = ref('')
  const summary = ref('')
  const result = ref<TryResult | null>(null)
  const running = ref(false)

  async function run() {
    if (title.value.trim().length < 5) return
    running.value = true
    try {
      result.value = await adminService.tryHeadline({
        title: title.value.trim(),
        summary: summary.value.trim() || undefined,
      })
    } catch (e) {
      toast.error((e as ApiError).message)
    } finally {
      running.value = false
    }
  }

  return { title, summary, result, running, run }
}
