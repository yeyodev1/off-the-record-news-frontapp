import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import { site } from '@/config/site'

/**
 * En la lectura continua, la dirección y el título de la pestaña siguen a la
 * nota que se está leyendo: así compartir o recargar lleva a esa nota. Se usa
 * history.replaceState para no recargar la página ni romper el "atrás".
 */
export function useActiveStory(container: Ref<HTMLElement | null>) {
  let observer: IntersectionObserver | null = null
  let mutations: MutationObserver | null = null

  function activate(el: Element) {
    const slug = el.getAttribute('data-slug')
    if (!slug) return
    const path = `/nota/${slug}`
    if (window.location.pathname !== path) {
      window.history.replaceState({ ...window.history.state, current: path }, '', path)
    }
    document.title = `${el.getAttribute('data-title') ?? ''} — ${site.name}`
  }

  function observeAll() {
    container.value?.querySelectorAll('[data-slug]').forEach((el) => observer?.observe(el))
  }

  onMounted(() => {
    if (!('IntersectionObserver' in window) || !container.value) return
    // La nota activa es la que cruza la franja alta de la pantalla.
    observer = new IntersectionObserver(
      (entries) => entries.filter((e) => e.isIntersecting).forEach((e) => activate(e.target)),
      { rootMargin: '-30% 0px -65% 0px' },
    )
    observeAll()
    mutations = new MutationObserver(observeAll)
    mutations.observe(container.value, { childList: true, subtree: true })
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    mutations?.disconnect()
  })
}
