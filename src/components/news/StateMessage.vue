<script setup lang="ts">
withDefaults(
  defineProps<{ title?: string; text?: string; icon?: string; actionLabel?: string }>(),
  { title: '', text: '', icon: 'fa-solid fa-circle-exclamation', actionLabel: '' },
)
defineEmits<{ action: [] }>()
</script>

<template>
  <div class="state" role="status">
    <i :class="icon" class="state__icon" aria-hidden="true"></i>
    <p v-if="title" class="state__title">{{ title }}</p>
    <p v-if="text" class="state__text">{{ text }}</p>
    <slot />
    <button v-if="actionLabel" type="button" class="btn btn--ghost state__action" @click="$emit('action')">
      <i class="fa-solid fa-rotate-right" aria-hidden="true"></i> {{ actionLabel }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.state {
  @include flex(column, center, center, 0.6rem);
  text-align: center;
  padding: $space-lg 1rem;
  border-top: 1px solid $line;
  border-bottom: 1px solid $line;

  &__icon {
    font-size: 1.4rem;
    color: $ink-muted;
  }

  &__title {
    font-family: $font-display;
    font-weight: 800;
    font-size: $text-lg;
  }

  &__text {
    color: $ink-soft;
    max-width: 46ch;
  }

  &__action {
    margin-top: 0.5rem;
    padding: 0.6rem 1.2rem;
  }
}
</style>
