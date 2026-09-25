import { onMounted, reactive, ref, watch } from 'vue'
import { adminService, type SourceInput } from '@/services/admin.service'
import { useToastStore } from '@/stores/toast'
import { admin } from '@/config/admin'
import type { ApiError, Source } from '@/types'

/** CRUD de fuentes. /admin/sources no pagina: devuelve el arreglo completo. */
export function useSources() {
  const toast = useToastStore()
  const filters = reactive({ kind: '', category: '' })
  const items = ref<Source[]>([])
  const loading = ref(false)
  const error = ref('')
  const saving = ref(false)

  async function load() {
    loading.value = true
    error.value = ''
    try {
      items.value = await adminService.sources({ ...filters })
    } catch (e) {
      error.value = (e as ApiError).message
    } finally {
      loading.value = false
    }
  }

  async function save(input: SourceInput, id?: string): Promise<boolean> {
    saving.value = true
    try {
      if (id) {
        const updated = await adminService.updateSource(id, input)
        items.value = items.value.map((s) => (s.id === id ? updated : s))
      } else {
        items.value = [await adminService.createSource(input), ...items.value]
      }
      toast.success(admin.sources.saved)
      return true
    } catch (e) {
      toast.error((e as ApiError).message)
      return false
    } finally {
      saving.value = false
    }
  }

  async function toggle(source: Source) {
    try {
      const updated = await adminService.updateSource(source.id, { isActive: !source.isActive })
      items.value = items.value.map((s) => (s.id === source.id ? updated : s))
      toast.success(updated.isActive ? admin.sources.activated : admin.sources.paused)
    } catch (e) {
      toast.error((e as ApiError).message)
    }
  }

  async function remove(source: Source) {
    try {
      await adminService.deleteSource(source.id)
      items.value = items.value.filter((s) => s.id !== source.id)
      toast.success(admin.sources.deleted)
    } catch (e) {
      toast.error((e as ApiError).message)
    }
  }

  watch(() => ({ ...filters }), load)
  onMounted(load)

  return { filters, items, loading, error, saving, load, save, toggle, remove }
}
