import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Llama a `onReach` cuando el centinela entra en pantalla (con margen, para
 * que la siguiente página llegue antes de que el lector toque el final). Sin
 * IntersectionObserver, el botón "Ver más notas" queda como respaldo.
 */
export function useInfiniteScroll(onReach: () => void) {
  const sentinel = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!('IntersectionObserver' in window)) return
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) onReach()
      },
      { rootMargin: '600px 0px' },
    )
    if (sentinel.value) observer.observe(sentinel.value)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { sentinel }
}
