<script setup lang="ts">
withDefaults(defineProps<{ title: string; message?: string; note?: string; inverted?: boolean }>(), {
  message: '',
  note: '',
  inverted: false,
})
</script>

<template>
  <div class="done" :class="{ 'done--inverted': inverted }" role="status" aria-live="polite">
    <i class="fa-solid fa-circle-check done__icon" aria-hidden="true"></i>
    <div class="done__body">
      <p class="done__title">{{ title }}</p>
      <p v-if="message.trim()" class="done__text">{{ message }}</p>
      <p v-if="note" class="done__note">{{ note }}</p>
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.done {
  @include flex(row, flex-start, flex-start, 0.9rem);
  padding: 1.25rem;
  border: 1px solid $ink;
  background: $paper;
  color: $ink;

  &__icon {
    font-size: 1.4rem;
    color: $accent;
    margin-top: 0.15rem;
  }

  &__body {
    @include flex(column, stretch, flex-start, 0.4rem);
  }

  &__title {
    font-family: $font-display;
    font-weight: 800;
    font-size: $text-lg;
    line-height: 1.2;
  }

  &__text {
    color: $ink-soft;
  }

  &__note {
    font-size: $text-sm;
    color: $ink-soft;
    padding-left: 0.75rem;
    border-left: 2px solid $accent;
  }

  &--inverted {
    background: transparent;
    border-color: rgba($paper, 0.4);
    color: $paper;
  }

  &--inverted &__text,
  &--inverted &__note {
    color: rgba($paper, 0.8);
  }
}
</style>
