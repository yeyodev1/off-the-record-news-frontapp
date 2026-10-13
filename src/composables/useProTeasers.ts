import { ref } from 'vue'
import { proService } from '@/services/pro.service'
import type { ProTeaser } from '@/types'

const teasers = ref<ProTeaser[]>([])
const sealedThisWeek = ref(0)
let request: Promise<void> | null = null

/**
 * Tráileres de OTR PRO para intercalar en el stream. Se piden una vez por
 * visita; si fallan, la portada sigue sin ellos.
 */
export function useProTeasers() {
  if (!request) {
    request = proService
      .teasers()
      .then((feed) => {
        teasers.value = feed.items
        sealedThisWeek.value = feed.sealedThisWeek
      })
      .catch(() => {
        request = null
      })
  }
  return { teasers, sealedThisWeek }
}
