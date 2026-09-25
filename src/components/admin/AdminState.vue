<script setup lang="ts">
import { admin } from '@/config/admin'

/** Carga, error o vacío: los tres estados que toda lista del panel necesita. */
defineProps<{
  loading?: boolean
  error?: string
  empty?: boolean
  emptyText?: string
  emptyIcon?: string
}>()

const emit = defineEmits<{ retry: [] }>()
</script>

<template>
  <div v-if="loading" class="state">
    <i class="fa-solid fa-spinner fa-spin state__icon"></i>
    <p>{{ admin.loading }}</p>
  </div>
  <div v-else-if="error" class="state state--error">
    <i class="fa-solid fa-circle-exclamation state__icon"></i>
    <p>{{ error }}</p>
    <button class="state__retry" type="button" @click="emit('retry')">
      <i class="fa-solid fa-rotate-right"></i> {{ admin.retry }}
    </button>
  </div>
  <div v-else-if="empty" class="state">
    <i class="state__icon" :class="emptyIcon || 'fa-regular fa-folder-open'"></i>
    <p>{{ emptyText }}</p>
  </div>
</template>

<style scoped lang="scss">
.state {
  @include card;
  @include flex(column, center, center, 0.5rem);
  padding: 2.5rem 1.25rem;
  text-align: center;
  color: $ink-muted;
  font-size: $text-sm;

  &__icon {
    font-size: 1.5rem;
  }

  &--error {
    color: $danger;
    border-color: rgba($danger, 0.3);
    background: $danger-bg;
  }

  &__retry {
    margin-top: 0.4rem;
    font-weight: 600;
    font-size: $text-sm;
    color: $ink;
    padding: 0.45rem 0.9rem;
    border: 1px solid $line;
    border-radius: $radius-pill;
    background: $surface;
  }
}
</style>
