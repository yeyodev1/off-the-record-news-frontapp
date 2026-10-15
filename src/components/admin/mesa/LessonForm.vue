<script setup lang="ts">
import { ref } from 'vue'
import { admin, lessonAreas } from '@/config/admin'
import type { LessonArea, LessonInput } from '@/types'

defineProps<{ busy?: boolean }>()
const emit = defineEmits<{ save: [input: LessonInput, reset: () => void] }>()
const t = admin.mesa.train

const area = ref<LessonArea>('valoracion')
const instruction = ref('')

function reset() {
  instruction.value = ''
}

function submit() {
  const text = instruction.value.trim()
  if (text.length < 5) return
  emit('save', { area: area.value, instruction: text }, reset)
}
</script>

<template>
  <form class="lform" @submit.prevent="submit">
    <h2 class="lform__title">{{ t.newTitle }}</h2>
    <fieldset class="lform__areas">
      <legend>{{ t.area }}</legend>
      <label
        v-for="(meta, key) in lessonAreas"
        :key="key"
        class="lform__area"
        :class="{ 'lform__area--active': area === key }"
      >
        <input v-model="area" type="radio" name="lesson-area" :value="key" />
        <i :class="meta.icon"></i>
        <span>
          <strong>{{ meta.label }}</strong>
          <small>{{ meta.hint }}</small>
        </span>
      </label>
    </fieldset>
    <div>
      <label for="lesson-text">{{ t.instruction }}</label>
      <textarea
        id="lesson-text"
        v-model="instruction"
        rows="3"
        :placeholder="t.placeholder"
      ></textarea>
    </div>
    <button
      class="btn btn--primary lform__save"
      type="submit"
      :disabled="busy || instruction.trim().length < 5"
    >
      <i v-if="busy" class="fa-solid fa-spinner fa-spin"></i>
      {{ busy ? t.saving : t.save }}
    </button>
  </form>
</template>

<style scoped lang="scss">
.lform {
  @include card;
  @include flex(column, stretch, flex-start, 0.8rem);
  padding: 1rem;

  &__title {
    @include display($text-base, 700);
  }

  &__areas {
    @include flex-cards(150px, 0.5rem);
    border: 0;
    padding: 0;
    margin: 0;

    legend {
      font-size: $text-sm;
      font-weight: 600;
      margin-bottom: 0.4rem;
    }
  }

  &__area {
    @include flex(row, flex-start, flex-start, 0.55rem);
    margin: 0;
    padding: 0.6rem 0.7rem;
    border: 1px solid $line;
    border-radius: $radius-sm;
    cursor: pointer;
    font-weight: 400;

    input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }

    i {
      margin-top: 0.15rem;
      color: $ink-muted;
    }

    span {
      @include flex(column, flex-start, flex-start, 0.1rem);
      font-size: $text-sm;
    }

    small {
      font-size: $text-xs;
      color: $ink-muted;
    }

    &:focus-within {
      @include focus-ring;
    }

    &--active {
      border-color: $accent;
      background: $accent-soft;

      i {
        color: $accent-deep;
      }
    }
  }

  &__save {
    padding: 0.7rem 1.3rem;
    gap: 0.4rem;

    @include from('md') {
      align-self: flex-start;
    }
  }
}
</style>
