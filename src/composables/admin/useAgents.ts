import { onMounted, ref } from 'vue'
import { admin } from '@/config/admin'
import { adminService } from '@/services/admin.service'
import { useToastStore } from '@/stores/toast'
import type { AgentConfig, AgentSection, ApiError } from '@/types'

/** Reglas base de cada agente: lo que la IA lee en cada paso del ciclo. */
export function useAgents() {
  const toast = useToastStore()
  const t = admin.mesa.agents
  const agents = ref<AgentConfig[]>([])
  const loading = ref(false)
  const error = ref('')
  // "agente/sección" que está esperando al API.
  const busy = ref<string | null>(null)

  async function load() {
    loading.value = true
    error.value = ''
    try {
      agents.value = await adminService.agents()
    } catch (e) {
      error.value = (e as ApiError).message
    } finally {
      loading.value = false
    }
  }

  function replace(agentKey: string, section: AgentSection) {
    agents.value = agents.value.map((a) =>
      a.key !== agentKey
        ? a
        : { ...a, sections: a.sections.map((s) => (s.key === section.key ? section : s)) },
    )
  }

  async function run(agentKey: string, sectionKey: string, task: () => Promise<AgentSection>) {
    busy.value = `${agentKey}/${sectionKey}`
    try {
      replace(agentKey, await task())
      return true
    } catch (e) {
      toast.error((e as ApiError).message)
      return false
    } finally {
      busy.value = null
    }
  }

  async function save(agentKey: string, sectionKey: string, rules: string[]) {
    const ok = await run(agentKey, sectionKey, () =>
      adminService.saveAgentSection(agentKey, sectionKey, rules),
    )
    if (ok) toast.success(t.saved)
    return ok
  }

  async function restore(agentKey: string, sectionKey: string) {
    const ok = await run(agentKey, sectionKey, () =>
      adminService.resetAgentSection(agentKey, sectionKey),
    )
    if (ok) toast.success(t.restored)
    return ok
  }

  onMounted(load)

  return { agents, loading, error, busy, load, save, restore }
}
