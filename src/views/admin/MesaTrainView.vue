<script setup lang="ts">
import { ref } from 'vue'
import { admin, lessonAreas } from '@/config/admin'
import { useLessons } from '@/composables/admin/useLessons'
import AdminState from '@/components/admin/AdminState.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import LessonForm from '@/components/admin/mesa/LessonForm.vue'
import LessonItem from '@/components/admin/mesa/LessonItem.vue'
import TryHeadline from '@/components/admin/mesa/TryHeadline.vue'
import type { Lesson, LessonInput } from '@/types'

const t = admin.mesa.train
const { lessons, groups, loading, error, saving, busyId, load, create, update, remove } =
  useLessons()

const toDelete = ref<Lesson | null>(null)

async function onCreate(input: LessonInput, reset: () => void) {
  if (await create(input)) reset()
}

async function onUpdate(
  lesson: Lesson,
  body: Partial<Pick<Lesson, 'instruction' | 'active'>>,
  done: () => void,
) {
  if (await update(lesson, body)) done()
}

async function confirmDelete() {
  const lesson = toDelete.value
  toDelete.value = null
  if (lesson) await remove(lesson)
}
</script>

<template>
  <div class="train">
    <p class="train__intro"><i class="fa-solid fa-lightbulb"></i> {{ t.intro }}</p>

    <div class="train__grid">
      <div class="train__main">
        <LessonForm :busy="saving" @save="onCreate" />

        <AdminState
          :loading="loading && !lessons.length"
          :error="error"
          :empty="!loading && !error && !lessons.length"
          :empty-text="t.emptyAll"
          empty-icon="fa-solid fa-brain"
          @retry="load"
        />

        <section v-for="group in groups" :key="group.area" class="train__group">
          <h2 class="train__group-title">
            <i :class="lessonAreas[group.area].icon"></i> {{ lessonAreas[group.area].label }}
            <span>{{ lessonAreas[group.area].hint }}</span>
          </h2>
          <ul class="train__list">
            <LessonItem
              v-for="lesson in group.items"
              :key="lesson.id"
              :lesson="lesson"
              :busy="busyId === lesson.id"
              @update="(body, done) => onUpdate(lesson, body, done)"
              @remove="toDelete = lesson"
            />
          </ul>
        </section>
      </div>

      <aside class="train__side">
        <TryHeadline />
      </aside>
    </div>

    <BaseModal
      :open="Boolean(toDelete)"
      :title="t.deleteConfirm"
      :confirm-label="admin.delete"
      danger
      @confirm="confirmDelete"
      @cancel="toDelete = null"
    />
  </div>
</template>

<style scoped lang="scss">
.train {
  @include flex(column, stretch, flex-start, 1rem);

  &__intro {
    font-size: $text-sm;
    color: $ink-soft;
    background: $accent-soft;
    border-radius: $radius-sm;
    padding: 0.8rem 0.9rem;

    i {
      color: $accent-deep;
      margin-right: 0.3rem;
    }
  }

  &__grid {
    @include flex(column, stretch, flex-start, 1rem);

    @include from('lg') {
      flex-direction: row;
      align-items: flex-start;
    }
  }

  &__main {
    @include flex(column, stretch, flex-start, 1rem);
    min-width: 0;

    @include from('lg') {
      flex: 1 1 60%;
    }
  }

  &__side {
    min-width: 0;

    @include from('lg') {
      flex: 1 1 40%;
      position: sticky;
      top: 1rem;
    }
  }

  &__group {
    @include flex(column, stretch, flex-start, 0.55rem);
  }

  &__group-title {
    @include display($text-base, 700);
    @include flex(row, baseline, flex-start, 0.4rem);
    flex-wrap: wrap;

    i {
      color: $ink-muted;
    }

    span {
      font-family: inherit;
      font-size: $text-xs;
      font-weight: 400;
      color: $ink-muted;
    }
  }

  &__list {
    @include flex(column, stretch, flex-start, 0.55rem);
  }
}
</style>
