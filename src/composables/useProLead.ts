import { reactive, ref } from 'vue'
import { proService } from '@/services/pro.service'
import { ui } from '@/config/site'
import type { ApiError, ProPlan } from '@/types'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Solicitud de OTR PRO: plan, datos de la empresa y, si quiere, reunión con ventas. */
export function useProLead() {
  const form = reactive({
    name: '',
    role: '',
    company: '',
    email: '',
    phone: '',
    plan: 'semanal' as ProPlan,
    message: '',
    wantsMeeting: false,
  })
  const submitting = ref(false)
  const error = ref('')
  const doneMessage = ref('')

  function validate(): string {
    if (!form.name.trim()) return ui.proPage.nameRequired
    if (!form.company.trim()) return ui.proPage.companyRequired
    if (!EMAIL_RE.test(form.email.trim())) return ui.forms.invalidEmail
    return ''
  }

  async function submit() {
    error.value = validate()
    if (error.value || submitting.value) return
    submitting.value = true
    try {
      const { message } = await proService.lead({
        name: form.name.trim(),
        role: form.role.trim(),
        company: form.company.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        plan: form.plan,
        message: form.message.trim(),
        wantsMeeting: form.wantsMeeting,
      })
      doneMessage.value = message
    } catch (e) {
      error.value = (e as ApiError).message || ui.forms.genericError
    } finally {
      submitting.value = false
    }
  }

  return { form, submitting, error, doneMessage, submit }
}
