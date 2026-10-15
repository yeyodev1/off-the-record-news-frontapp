import { computed, ref, watch, type Ref } from 'vue'
import type { AgentSection } from '@/types'

export const MAX_RULES = 40
const MIN_CHARS = 3

interface DraftRule {
  id: number
  text: string
}

/**
 * Copia editable de las reglas de una sección. Cada regla lleva un id propio
 * para que Vue no confunda los textareas al subir, bajar o quitar.
 */
export function useRuleDraft(section: Ref<AgentSection>) {
  let seq = 0
  const rules = ref<DraftRule[]>([])

  function reset() {
    rules.value = section.value.rules.map((text) => ({ id: seq++, text }))
  }
  watch(section, reset, { immediate: true })

  const values = computed(() => rules.value.map((r) => r.text.trim()))
  const dirty = computed(
    () =>
      values.value.length !== section.value.rules.length ||
      values.value.some((v, i) => v !== section.value.rules[i]),
  )
  const hasBlank = computed(() => values.value.some((v) => v.length < MIN_CHARS))
  const tooMany = computed(() => rules.value.length > MAX_RULES)

  function add() {
    rules.value.push({ id: seq++, text: '' })
  }

  function remove(index: number) {
    rules.value.splice(index, 1)
  }

  function move(index: number, delta: -1 | 1) {
    const target = index + delta
    if (target < 0 || target >= rules.value.length) return
    const list = [...rules.value]
    const [item] = list.splice(index, 1)
    if (!item) return
    list.splice(target, 0, item)
    rules.value = list
  }

  return { rules, values, dirty, hasBlank, tooMany, reset, add, remove, move }
}
