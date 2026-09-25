import { ref } from 'vue'
import { adminService } from '@/services/admin.service'
import { useToastStore } from '@/stores/toast'
import { admin } from '@/config/admin'
import { useAdminStats } from './useAdminStats'
import type { ApiError, PipelineRun } from '@/types'

// De módulo: si el editor cambia de pantalla mientras corre la mesa y vuelve,
// el spinner sigue ahí en vez de invitar a lanzar otra corrida.
const running = ref(false)
const lastResult = ref<PipelineRun | null>(null)

export function useNewsroom() {
  const toast = useToastStore()
  const { refreshStats } = useAdminStats()

  const runs = ref<PipelineRun[]>([])
  const page = ref(1)
  const pages = ref(1)
  const loadingRuns = ref(false)
  const runsError = ref('')

  async function loadRuns(target = 1) {
    loadingRuns.value = true
    runsError.value = ''
    try {
      const res = await adminService.runs(target)
      runs.value = res.items
      page.value = res.page || target
      pages.value = Math.max(1, res.pages || 1)
    } catch (e) {
      runsError.value = (e as ApiError).message
    } finally {
      loadingRuns.value = false
    }
  }

  async function runNow() {
    if (running.value) return
    running.value = true
    try {
      lastResult.value = await adminService.runNewsroom(true)
      toast.success(
        `${admin.dashboard.runDone}: ${lastResult.value.drafted} ${admin.run.drafted.toLowerCase()}`,
      )
      await Promise.all([refreshStats(), loadRuns(1)])
    } catch (e) {
      toast.error((e as ApiError).message)
    } finally {
      running.value = false
    }
  }

  return { running, lastResult, runs, page, pages, loadingRuns, runsError, loadRuns, runNow }
}
