<script setup lang="ts">
import { ref } from 'vue'
import { admin } from '@/config/admin'
import { formatDateTime } from '@/composables/admin/format'
import AdminBadge from '../AdminBadge.vue'
import type { Lesson } from '@/types'

const props = defineProps<{ lesson: Lesson; busy?: boolean }>()
const emit = defineEmits<{
  update: [body: Partial<Pick<Lesson, 'instruction' | 'active'>>, done: () => void]
  remove: []
}>()
const t = admin.mesa.train

const editing = ref(false)
const draft = ref('')

function startEdit() {
  draft.value = props.lesson.instruction
  editing.value = true
}

function saveEdit() {
  const text = draft.value.trim()
  if (text.length < 5 || text === props.lesson.instruction) {
    editing.value = false
    return
  }
  emit('update', { instruction: text }, () => (editing.value = false))
}
</script>

<template>
  <li class="lesson" :class="{ 'lesson--off': !lesson.active }">
    <div class="lesson__top">
      <label class="lesson__switch">
        <input
          type="checkbox"
          :checked="lesson.active"
          :disabled="busy"
          @change="emit('update', { active: !lesson.active }, () => {})"
        />
        <span>{{ lesson.active ? t.active : t.inactive }}</span>
      </label>
      <AdminBadge :tone="lesson.origin === 'correccion' ? 'accent' : 'muted'">
        {{ lesson.origin === 'correccion' ? t.correction : t.manual }}
      </AdminBadge>
      <span class="lesson__meta">
        {{ formatDateTime(lesson.createdAt) }}
        <template v-if="lesson.createdByName"> · {{ t.by }} {{ lesson.createdByName }}</template>
      </span>
    </div>

    <form v-if="editing" class="lesson__edit" @submit.prevent="saveEdit">
      <textarea v-model="draft" rows="3" :aria-label="t.instruction"></textarea>
      <div class="lesson__edit-actions">
        <button class="btn btn--ghost" type="button" @click="editing = false">
          {{ admin.cancel }}
        </button>
        <button class="btn btn--primary" type="submit" :disabled="busy">{{ admin.save }}</button>
      </div>
    </form>
    <p v-else class="lesson__text">{{ lesson.instruction }}</p>

    <p v-if="lesson.example" class="lesson__example">
      <i class="fa-solid fa-quote-left"></i>
      <a v-if="lesson.example.url" :href="lesson.example.url" target="_blank" rel="noopener">{{
        lesson.example.title
      }}</a>
      <template v-else>{{ lesson.example.title }}</template>
      <AdminBadge
        v-if="lesson.example.verdict"
        :tone="lesson.example.verdict === 'es_noticia' ? 'success' : 'stamp'"
      >
        {{ lesson.example.verdict === 'es_noticia' ? t.verdictYes : t.verdictNo }}
      </AdminBadge>
    </p>

    <footer v-if="!editing" class="lesson__actions">
      <button type="button" class="lesson__btn" :disabled="busy" @click="startEdit">
        <i class="fa-solid fa-pen"></i> {{ t.edit }}
      </button>
      <button
        type="button"
        class="lesson__btn lesson__btn--danger"
        :disabled="busy"
        @click="emit('remove')"
      >
        <i class="fa-solid fa-trash"></i> {{ admin.delete }}
      </button>
    </footer>
  </li>
</template>

<style scoped lang="scss">
.lesson {
  @include card;
  @include flex(column, stretch, flex-start, 0.55rem);
  padding: 0.85rem 1rem;

  &--off {
    opacity: 0.6;
  }

  &__top {
    @include flex(row, center, flex-start, 0.5rem);
    flex-wrap: wrap;
  }

  &__switch {
    @include flex(row, center, flex-start, 0.4rem);
    margin: 0;
    font-size: $text-xs;
    font-weight: 700;
    cursor: pointer;

    input {
      width: 1.1rem;
      height: 1.1rem;
      padding: 0;
      accent-color: $success;
    }
  }

  &__meta {
    margin-left: auto;
    font-size: $text-xs;
    color: $ink-muted;
  }

  &__text {
    font-size: $text-sm;
    white-space: pre-line;
  }

  &__edit {
    @include flex(column, stretch, flex-start, 0.5rem);
  }

  &__edit-actions {
    @include flex(row, center, flex-end, 0.4rem);

    .btn {
      padding: 0.5rem 1rem;
    }
  }

  &__example {
    @include flex(row, center, flex-start, 0.4rem);
    flex-wrap: wrap;
    font-size: $text-xs;
    color: $ink-soft;
    background: $sand;
    border-radius: $radius-sm;
    padding: 0.45rem 0.6rem;

    a {
      color: $accent-deep;
      font-weight: 600;
    }
  }

  &__actions {
    @include flex(row, center, flex-end, 0.4rem);
  }

  &__btn {
    @include flex(row, center, center, 0.35rem);
    min-height: 2.25rem;
    padding: 0.35rem 0.8rem;
    font-size: $text-xs;
    font-weight: 600;
    border-radius: $radius-pill;
    color: $ink-soft;

    &:hover {
      background: $sand;
    }

    &--danger {
      color: $stamp;
    }

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
}
</style>
