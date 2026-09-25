import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { adminService, type ArticleInput } from '@/services/admin.service'
import { useToastStore } from '@/stores/toast'
import { admin } from '@/config/admin'
import { useAdminStats } from './useAdminStats'
import type { ApiError, Article, ArticleSource, Section } from '@/types'

interface ArticleForm {
  title: string
  lede: string
  whyItMatters: string
  bigPicture: string
  keyPoints: string[]
  body: string[]
  whatsNext: string
  section: Section
  tags: string
  isPro: boolean
  isBreaking: boolean
  sources: ArticleSource[]
}

function blank(): ArticleForm {
  return {
    title: '',
    lede: '',
    whyItMatters: '',
    bigPicture: '',
    keyPoints: [''],
    body: [''],
    whatsNext: '',
    section: 'politica',
    tags: '',
    isPro: false,
    isBreaking: false,
    sources: [],
  }
}

/** Carga, edición y guardado de una nota. La vista solo pinta el formulario. */
export function useArticleForm(id: string | undefined) {
  const router = useRouter()
  const toast = useToastStore()
  const { refreshStats } = useAdminStats()

  const form = reactive<ArticleForm>(blank())
  const article = ref<Article | null>(null)
  const loading = ref(Boolean(id))
  const loadError = ref('')
  const saving = ref(false)
  const publishing = ref(false)
  const uploading = ref(false)
  const isNew = computed(() => !article.value)

  function fill(a: Article) {
    article.value = a
    Object.assign(form, {
      title: a.title,
      lede: a.lede,
      whyItMatters: a.whyItMatters,
      bigPicture: a.bigPicture,
      keyPoints: a.keyPoints.length ? [...a.keyPoints] : [''],
      body: a.body.length ? [...a.body] : [''],
      whatsNext: a.whatsNext,
      section: a.section,
      tags: a.tags.join(', '),
      isPro: a.isPro,
      isBreaking: a.isBreaking,
      sources: a.sources.map((s) => ({ ...s })),
    })
  }

  async function load() {
    if (!id) return
    loading.value = true
    loadError.value = ''
    try {
      fill(await adminService.article(id))
    } catch (e) {
      loadError.value = (e as ApiError).message
    } finally {
      loading.value = false
    }
  }

  // Lo que viaja al API: sin viñetas vacías ni fuentes sin nombre.
  function payload(): ArticleInput {
    const clean = (list: string[]) => list.map((s) => s.trim()).filter(Boolean)
    return {
      title: form.title.trim(),
      lede: form.lede.trim(),
      whyItMatters: form.whyItMatters.trim(),
      bigPicture: form.bigPicture.trim(),
      keyPoints: clean(form.keyPoints),
      body: clean(form.body),
      whatsNext: form.whatsNext.trim(),
      section: form.section,
      tags: clean(form.tags.split(',')),
      isPro: form.isPro,
      isBreaking: form.isBreaking,
      sources: form.sources
        .map((s) => ({ name: s.name.trim(), url: s.url.trim() }))
        .filter((s) => s.name || s.url),
    }
  }

  async function save(silent = false): Promise<Article | null> {
    if (!form.title.trim()) {
      toast.error('El titular es obligatorio')
      return null
    }
    saving.value = true
    try {
      if (article.value) {
        fill(await adminService.updateArticle(article.value.id, payload()))
        if (!silent) toast.success(admin.editor.saved)
      } else {
        const created = await adminService.createArticle(payload())
        fill(created)
        toast.success(admin.editor.created)
        refreshStats()
        router.replace(`/admin/notas/${created.id}`)
      }
      return article.value
    } catch (e) {
      toast.error((e as ApiError).message)
      return null
    } finally {
      saving.value = false
    }
  }

  async function publish() {
    const saved = await save(true)
    if (!saved) return
    publishing.value = true
    try {
      fill(await adminService.publishArticle(saved.id))
      toast.success(admin.editor.published)
      refreshStats()
    } catch (e) {
      toast.error((e as ApiError).message)
    } finally {
      publishing.value = false
    }
  }

  async function uploadImage(file: File, credit: string) {
    if (!article.value) return
    uploading.value = true
    try {
      fill(await adminService.uploadImage(article.value.id, file, credit))
      toast.success(admin.editor.fields.uploaded)
    } catch (e) {
      toast.error((e as ApiError).message)
    } finally {
      uploading.value = false
    }
  }

  return {
    form,
    article,
    loading,
    loadError,
    saving,
    publishing,
    uploading,
    isNew,
    load,
    save,
    publish,
    uploadImage,
  }
}
