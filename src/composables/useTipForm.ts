import { computed, reactive, ref } from 'vue'
import { tipsService } from '@/services/tips.service'
import { ui } from '@/components/news/uiCopy'
import type { ApiError } from '@/types'

export const TIP_MIN_LENGTH = 20

export function useTipForm() {
  const form = reactive({ name: '', contact: '', text: '' })
  const submitting = ref(false)
  const error = ref('')
  const doneMessage = ref('')

  const length = computed(() => form.text.trim().length)
  const isLongEnough = computed(() => length.value >= TIP_MIN_LENGTH)

  async function submit() {
    error.value = isLongEnough.value ? '' : ui.forms.shortTip
    if (error.value || submitting.value) return
    submitting.value = true
    try {
      const { message } = await tipsService.send({
        name: form.name.trim() || undefined,
        contact: form.contact.trim() || undefined,
        text: form.text.trim(),
      })
      doneMessage.value = message || ' '
    } catch (e) {
      error.value = (e as ApiError).message || ui.forms.genericError
    } finally {
      submitting.value = false
    }
  }

  return { form, length, isLongEnough, submitting, error, doneMessage, submit }
}
