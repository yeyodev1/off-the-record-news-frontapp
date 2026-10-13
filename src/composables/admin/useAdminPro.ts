import { onMounted, ref } from 'vue'
import { adminService } from '@/services/admin.service'
import { useToastStore } from '@/stores/toast'
import { admin } from '@/config/admin'
import type { ApiError, ProLead, ProTeaser } from '@/types'

/** Tráileres PRO de la portada y empresas interesadas en el servicio. */
export function useAdminPro() {
  const toast = useToastStore()
  const t = admin.pro
  const teasers = ref<ProTeaser[]>([])
  const leads = ref<ProLead[]>([])
  const loading = ref(false)
  const error = ref('')
  const text = ref('')
  const generating = ref(false)

  async function load() {
    loading.value = true
    error.value = ''
    try {
      const [t1, l1] = await Promise.all([adminService.proTeasers(), adminService.proLeads()])
      teasers.value = t1.items
      leads.value = l1.items
    } catch (e) {
      error.value = (e as ApiError).message
    } finally {
      loading.value = false
    }
  }

  async function generate() {
    if (generating.value || text.value.trim().length < 40) return
    generating.value = true
    try {
      teasers.value = [await adminService.proTeaserFromText(text.value.trim()), ...teasers.value]
      text.value = ''
      toast.success(t.generated)
    } catch (e) {
      toast.error((e as ApiError).message)
    } finally {
      generating.value = false
    }
  }

  async function saveTeaser(teaser: ProTeaser, patch: Partial<ProTeaser>, message = t.saved) {
    try {
      const updated = await adminService.updateProTeaser(teaser.id, patch)
      teasers.value = teasers.value.map((x) => (x.id === teaser.id ? updated : x))
      toast.success(message)
    } catch (e) {
      toast.error((e as ApiError).message)
    }
  }

  async function removeTeaser(teaser: ProTeaser) {
    try {
      await adminService.deleteProTeaser(teaser.id)
      teasers.value = teasers.value.filter((x) => x.id !== teaser.id)
      toast.success(t.deleted)
    } catch (e) {
      toast.error((e as ApiError).message)
    }
  }

  async function setLeadStatus(lead: ProLead, status: ProLead['status']) {
    try {
      const updated = await adminService.setProLeadStatus(lead.id, status)
      leads.value = leads.value.map((x) => (x.id === lead.id ? updated : x))
    } catch (e) {
      toast.error((e as ApiError).message)
    }
  }

  onMounted(load)

  return {
    teasers,
    leads,
    loading,
    error,
    text,
    generating,
    load,
    generate,
    saveTeaser,
    removeTeaser,
    setLeadStatus,
  }
}
