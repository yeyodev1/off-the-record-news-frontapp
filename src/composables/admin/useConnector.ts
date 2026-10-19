import { ref } from 'vue'
import { admin } from '@/config/admin'
import { adminService } from '@/services/admin.service'
import { useToastStore } from '@/stores/toast'
import type { ApiError, McpStatus } from '@/types'

/** Estado de la página del conector: la llave, la URL recién generada y la bitácora. */
export function useConnector() {
  const toast = useToastStore()
  const t = admin.connector

  const status = ref<McpStatus | null>(null)
  const loading = ref(false)
  const error = ref('')
  const busy = ref(false)
  /** Solo existe en memoria justo después de generar la llave. */
  const freshUrl = ref('')

  async function load() {
    loading.value = true
    error.value = ''
    try {
      status.value = await adminService.mcpStatus()
    } catch (e) {
      error.value = (e as ApiError).message
    } finally {
      loading.value = false
    }
  }

  async function generate() {
    busy.value = true
    try {
      const { url } = await adminService.mcpRotate()
      freshUrl.value = url
      toast.success(t.generated)
      await load()
    } catch (e) {
      toast.error((e as ApiError).message)
    } finally {
      busy.value = false
    }
  }

  async function revoke() {
    busy.value = true
    try {
      await adminService.mcpRevoke()
      freshUrl.value = ''
      toast.success(t.revoked)
      await load()
    } catch (e) {
      toast.error((e as ApiError).message)
    } finally {
      busy.value = false
    }
  }

  return { status, loading, error, busy, freshUrl, load, generate, revoke }
}
