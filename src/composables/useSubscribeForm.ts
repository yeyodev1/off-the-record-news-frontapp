import { reactive, ref } from 'vue'
import { subscribersService } from '@/services/subscribers.service'
import { ui } from '@/config/site'
import type { ApiError, Edition } from '@/types'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useSubscribeForm(plan: 'newsletter' | 'pro', defaultEditions: Edition[] = []) {
  const form = reactive({
    email: '',
    name: '',
    company: '',
    editions: [...defaultEditions] as Edition[],
  })
  const submitting = ref(false)
  const error = ref('')
  const doneMessage = ref('')

  function validate(): string {
    if (!EMAIL_RE.test(form.email.trim())) return ui.forms.invalidEmail
    if (plan === 'newsletter' && !form.editions.length) return ui.forms.noEditions
    return ''
  }

  async function submit() {
    error.value = validate()
    if (error.value || submitting.value) return
    submitting.value = true
    try {
      const { message } = await subscribersService.subscribe({
        email: form.email.trim(),
        name: form.name.trim() || undefined,
        plan,
        editions: form.editions,
        company: plan === 'pro' ? form.company.trim() || undefined : undefined,
      })
      doneMessage.value = message || ' '
    } catch (e) {
      error.value = (e as ApiError).message || ui.forms.genericError
    } finally {
      submitting.value = false
    }
  }

  return { form, submitting, error, doneMessage, submit }
}
