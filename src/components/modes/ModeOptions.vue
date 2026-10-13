<script setup lang="ts">
import { site } from '@/config/site'
import { READING_MODES } from '@/composables/useReadingMode'
import type { ReadingMode } from '@/types'

/** Las tres miradas como botones. `compact` deja solo el nombre (hoja inferior). */
withDefaults(defineProps<{ current?: ReadingMode | null; compact?: boolean }>(), {
  current: null,
  compact: false,
})
const emit = defineEmits<{ pick: [mode: ReadingMode] }>()
</script>

<template>
  <ul class="modes" :class="{ 'modes--compact': compact }">
    <li v-for="key in READING_MODES" :key="key">
      <button
        type="button"
        class="modes__btn"
        :class="{ 'modes__btn--on': current === key }"
        :style="{ '--mode': site.modes[key].color }"
        :aria-pressed="current === key"
        @click="emit('pick', key)"
      >
        <span class="modes__name">
          <i :class="site.modes[key].icon" aria-hidden="true"></i>
          {{ site.modes[key].name }}
        </span>
        <span v-if="!compact" class="modes__wants">{{ site.modes[key].wants }}</span>
      </button>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.modes {
  list-style: none;
  @include flex-cards(220px, 0.6rem);

  // Hoja inferior: las tres en fila.
  &--compact {
    @include flex-cards(calc(33% - 0.5rem), 0.5rem);
  }

  &__btn {
    @include flex(column, flex-start, flex-start, 0.35rem);
    width: 100%;
    height: 100%;
    padding: 0.85rem 1rem;
    text-align: left;
    background: $surface;
    border: 1px solid $box-line;
    border-left: 4px solid var(--mode);
    color: $ink;
    @include transition(background);
    @include focus-ring;

    &:hover {
      background: $sand;
    }

    &--on {
      background: var(--mode);
      border-color: var(--mode);
      color: $paper;

      &:hover {
        background: var(--mode);
      }

      .modes__wants {
        color: rgba($paper, 0.8);
      }
    }
  }

  &--compact &__btn {
    padding: 0.6rem 0.7rem;
  }

  &--compact &__name {
    font-size: $text-sm;
    white-space: nowrap;
  }

  &__name {
    @include flex(row, center, flex-start, 0.45rem);
    font-weight: 800;
    font-size: $text-base;
  }

  &__wants {
    font-size: $text-sm;
    line-height: 1.4;
    color: $ink-soft;
  }
}
</style>
