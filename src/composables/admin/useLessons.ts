import { computed, onMounted, ref } from 'vue'
import { admin, lessonAreas } from '@/config/admin'
import { adminService } from '@/services/admin.service'
import { useToastStore } from '@/stores/toast'
import type { ApiError, Lesson, LessonArea, LessonInput } from '@/types'

/** Instrucciones de la Mesa: lo que la IA lee en cada paso del ciclo. */
export function useLessons() {
  const toast = useToastStore()
  const t = admin.mesa.train
  const lessons = ref<Lesson[]>([])
  const loading = ref(false)
  const error = ref('')
  const saving = ref(false)
  const busyId = ref<string | null>(null)

  async function load() {
    loading.value = true
    error.value = ''
    try {
      lessons.value = await adminService.lessons()
    } catch (e) {
      error.value = (e as ApiError).message
    } finally {
      loading.value = false
    }
  }

  // Agrupadas en el orden de las áreas, y solo las que tienen algo.
  const groups = computed(() =>
    (Object.keys(lessonAreas) as LessonArea[])
      .map((area) => ({ area, items: lessons.value.filter((l) => l.area === area) }))
      .filter((g) => g.items.length),
  )

  async function create(input: LessonInput): Promise<boolean> {
    saving.value = true
    try {
      lessons.value = [await adminService.createLesson(input), ...lessons.value]
      toast.success(t.saved)
      return true
    } catch (e) {
      toast.error((e as ApiError).message)
      return false
    } finally {
      saving.value = false
    }
  }

  async function update(
    lesson: Lesson,
    body: Partial<Pick<Lesson, 'instruction' | 'area' | 'active'>>,
  ): Promise<boolean> {
    busyId.value = lesson.id
    try {
      const next = await adminService.updateLesson(lesson.id, body)
      lessons.value = lessons.value.map((l) => (l.id === next.id ? next : l))
      toast.success(t.updated)
      return true
    } catch (e) {
      toast.error((e as ApiError).message)
      return false
    } finally {
      busyId.value = null
    }
  }

  async function remove(lesson: Lesson) {
    busyId.value = lesson.id
    try {
      await adminService.deleteLesson(lesson.id)
      lessons.value = lessons.value.filter((l) => l.id !== lesson.id)
      toast.info(t.deleted)
    } catch (e) {
      toast.error((e as ApiError).message)
    } finally {
      busyId.value = null
    }
  }

  onMounted(load)

  return { lessons, groups, loading, error, saving, busyId, load, create, update, remove }
}
