import { ref } from 'vue'
import { admin } from '@/config/admin'
import { adminService } from '@/services/admin.service'
import { useToastStore } from '@/stores/toast'
import type { ApiError, MesaChatTurn, MesaProposal } from '@/types'

/**
 * Entrenar la mesa por chat: el editor escribe en lenguaje normal, la mesa
 * propone una lección o una regla, y el editor confirma. El historial se manda
 * en cada vuelta para que la mesa siga el hilo.
 */
export function useMesaChat() {
  const toast = useToastStore()
  const t = admin.mesa.chat
  const turns = ref<MesaChatTurn[]>([{ role: 'mesa', text: t.greeting }])
  const draft = ref('')
  const sending = ref(false)
  const applying = ref(false)
  const proposal = ref<MesaProposal | null>(null)

  async function send() {
    const message = draft.value.trim()
    if (!message || sending.value) return
    turns.value.push({ role: 'editor', text: message })
    draft.value = ''
    proposal.value = null
    sending.value = true
    try {
      const history = turns.value.map((turn) => ({ role: turn.role, text: turn.text }))
      const { proposal: next } = await adminService.mesaChat(message, history)
      turns.value.push({ role: 'mesa', text: next.summary })
      if (next.kind === 'lesson' || next.kind === 'agent_rule') proposal.value = next
    } catch (e) {
      toast.error((e as ApiError).message || t.error)
      turns.value.push({ role: 'mesa', text: t.error })
    } finally {
      sending.value = false
    }
  }

  async function apply() {
    const current = proposal.value
    if (!current || applying.value) return
    applying.value = true
    try {
      const { applied } = await adminService.mesaChatApply(current)
      toast.success(applied === 'lesson' ? t.appliedLesson : t.appliedRule)
      turns.value.push({
        role: 'mesa',
        text: applied === 'lesson' ? t.appliedLesson : t.appliedRule,
      })
      proposal.value = null
    } catch (e) {
      toast.error((e as ApiError).message || t.error)
    } finally {
      applying.value = false
    }
  }

  function dismiss() {
    proposal.value = null
  }

  function reset() {
    turns.value = [{ role: 'mesa', text: t.greeting }]
    proposal.value = null
    draft.value = ''
  }

  return { turns, draft, sending, applying, proposal, send, apply, dismiss, reset }
}
