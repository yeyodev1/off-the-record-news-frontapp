<script setup lang="ts">
import { ui } from '@/config/site'

withDefaults(
  defineProps<{ id: string; label: string; optional?: boolean; hint?: string; inverted?: boolean }>(),
  { optional: false, hint: '', inverted: false },
)
</script>

<template>
  <div class="field" :class="{ 'field--inverted': inverted }">
    <label :for="id" class="field__label">
      {{ label }} <span v-if="optional" class="field__optional">{{ ui.forms.optional }}</span>
    </label>
    <slot />
    <p v-if="hint" :id="`${id}-hint`" class="field__hint">{{ hint }}</p>
  </div>
</template>

<style scoped lang="scss">
.field {
  @include flex(column, stretch, flex-start, 0.35rem);

  &__label {
    margin: 0;
    font-size: $text-sm;
    font-weight: 700;
    color: $ink;
  }

  &__optional {
    font-weight: 400;
    color: $ink-muted;
  }

  &__hint {
    font-size: $text-xs;
    color: $ink-muted;
  }

  :slotted(input),
  :slotted(textarea) {
    border-radius: 0;
    border-color: $ink-muted;
    min-height: 2.9rem;
    font-size: 1rem;
  }

  :slotted(textarea) {
    resize: vertical;
    min-height: 9rem;
    line-height: 1.55;
  }

  &--inverted &__label {
    color: $paper;
  }

  &--inverted &__optional,
  &--inverted &__hint {
    color: rgba($paper, 0.65);
  }
}
</style>
