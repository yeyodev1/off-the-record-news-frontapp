import { ref } from 'vue'
import { adminService } from '@/services/admin.service'
import { useToastStore } from '@/stores/toast'
import { admin } from '@/config/admin'
import { usePagedList } from './usePagedList'
import type { ApiError, Edition, NewsletterIssue } from '@/types'

export function useNewsletters() {
  const toast = useToastStore()
  const history = usePagedList<NewsletterIssue, Record<string, never>>(
    (_f, page) => adminService.newsletters(page),
    {},
  )

  const edition = ref<Edition>('manana')
  const current = ref<NewsletterIssue | null>(null)
  const generating = ref(false)
  const sending = ref(false)

  async function generate() {
    generating.value = true
    try {
      current.value = await adminService.previewNewsletter(edition.value)
      history.load(1)
    } catch (e) {
      toast.error((e as ApiError).message)
    } finally {
      generating.value = false
    }
  }

  async function send() {
    const issue = current.value
    if (!issue || issue.status === 'sent') return
    sending.value = true
    try {
      const sent = await adminService.sendNewsletter(issue.id)
      current.value = sent
      history.replace(sent)
      toast.success(`${admin.newsletters.sent}: ${sent.recipients} ${admin.newsletters.recipients}`)
    } catch (e) {
      toast.error((e as ApiError).message)
    } finally {
      sending.value = false
    }
  }

  function show(issue: NewsletterIssue) {
    current.value = issue
    edition.value = issue.edition
  }

  return { history, edition, current, generating, sending, generate, send, show }
}
