import { computed, ref, type Ref } from 'vue'
import { useToastStore } from '@/stores/toast'
import { ui } from '@/components/news/uiCopy'

export function useShare(url: Ref<string>, title: Ref<string>) {
  const toast = useToastStore()
  const copied = ref(false)

  const whatsappUrl = computed(
    () => `https://wa.me/?text=${encodeURIComponent(`${title.value} ${url.value}`)}`,
  )
  const xUrl = computed(
    () =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title.value)}&url=${encodeURIComponent(url.value)}`,
  )

  async function copy() {
    try {
      await navigator.clipboard.writeText(url.value)
      copied.value = true
      toast.success(ui.article.copied)
      setTimeout(() => (copied.value = false), 2500)
    } catch {
      // Sin permiso de portapapeles: se deja el enlace a mano.
      window.prompt(ui.article.copyLink, url.value)
    }
  }

  return { whatsappUrl, xUrl, copied, copy }
}
