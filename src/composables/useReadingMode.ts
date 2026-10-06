import { computed, ref } from 'vue'
import { site } from '@/config/site'
import { metricsService } from '@/services/metrics.service'
import type { ReadingMode } from '@/types'

const MODE_KEY = 'otr_modo'
const OTHER_SIDE_KEY = 'otr_otra_orilla'

export const READING_MODES = Object.keys(site.modes) as ReadingMode[]

function isMode(value: unknown): value is ReadingMode {
  return typeof value === 'string' && READING_MODES.includes(value as ReadingMode)
}

// El modo vive solo en el dispositivo (§6 del spec): localStorage puede fallar en
// modo privado, y entonces se lee en independiente sin guardar nada.
function read(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Sin almacenamiento el modo dura lo que dura la pestaña.
  }
}

const stored = read(MODE_KEY)
const mode = ref<ReadingMode>(isMode(stored) ? stored : 'independiente')
const hasChosen = ref(isMode(stored))
const showOtherSide = ref(read(OTHER_SIDE_KEY) !== 'off')
// La hoja de selección se abre desde la cabecera ("Cambiar") o en la primera visita.
const pickerOpen = ref(false)

function setMode(next: ReadingMode, event: 'elegir' | 'cambiar' = 'cambiar') {
  if (!isMode(next)) return
  const changed = next !== mode.value || !hasChosen.value
  mode.value = next
  hasChosen.value = true
  pickerOpen.value = false
  write(MODE_KEY, next)
  // La métrica es un extra: nunca bloquea ni rompe la lectura.
  if (changed) metricsService.mode(next, event).catch(() => {})
}

function toggleOtherSide() {
  showOtherSide.value = !showOtherSide.value
  write(OTHER_SIDE_KEY, showOtherSide.value ? 'on' : 'off')
}

export function useReadingMode() {
  const info = computed(() => site.modes[mode.value])
  return {
    mode,
    info,
    hasChosen,
    pickerOpen,
    showOtherSide,
    setMode,
    toggleOtherSide,
    openPicker: () => (pickerOpen.value = true),
    closePicker: () => (pickerOpen.value = false),
  }
}
