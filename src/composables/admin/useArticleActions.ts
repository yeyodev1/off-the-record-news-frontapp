import { ref } from 'vue'
import { adminService } from '@/services/admin.service'
import { useToastStore } from '@/stores/toast'
import { admin } from '@/config/admin'
import { useAdminStats } from './useAdminStats'
import type { ApiError, Article } from '@/types'

/**
 * Acciones editoriales sobre una nota. Devuelven la nota actualizada o null
 * si el API falló (el toast ya avisó), para que la vista decida qué hacer.
 */
export function useArticleActions() {
  const toast = useToastStore()
  const { refreshStats } = useAdminStats()
  // Id de la nota con una acción en vuelo: bloquea sus botones, no los de todas.
  const busyId = ref<string | null>(null)

  async function run(
    id: string,
    action: () => Promise<Article>,
    success: string,
  ): Promise<Article | null> {
    busyId.value = id
    try {
      const updated = await action()
      toast.success(success)
      refreshStats()
      return updated
    } catch (e) {
      toast.error((e as ApiError).message)
      return null
    } finally {
      busyId.value = null
    }
  }

  const publish = (a: Article) =>
    run(a.id, () => adminService.publishArticle(a.id), admin.queue.published)
  const reject = (a: Article) =>
    run(a.id, () => adminService.rejectArticle(a.id), admin.queue.rejected)
  const rewrite = (a: Article, instructions: string) =>
    run(a.id, () => adminService.rewriteArticle(a.id, instructions), admin.rewrite.done)

  return { busyId, publish, reject, rewrite }
}
