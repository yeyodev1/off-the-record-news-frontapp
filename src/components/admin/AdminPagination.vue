<script setup lang="ts">
import { admin } from '@/config/admin'

defineProps<{ page: number; pages: number; total?: number }>()
const emit = defineEmits<{ go: [page: number] }>()
</script>

<template>
  <nav v-if="pages > 1" class="pager" aria-label="Paginación">
    <button class="pager__btn" type="button" :disabled="page <= 1" @click="emit('go', page - 1)">
      <i class="fa-solid fa-chevron-left"></i> <span>{{ admin.prev }}</span>
    </button>
    <span class="pager__info">
      {{ page }} / {{ pages }}<template v-if="total !== undefined"> · {{ total }}</template>
    </span>
    <button
      class="pager__btn"
      type="button"
      :disabled="page >= pages"
      @click="emit('go', page + 1)"
    >
      <span>{{ admin.next }}</span> <i class="fa-solid fa-chevron-right"></i>
    </button>
  </nav>
</template>

<style scoped lang="scss">
.pager {
  @include flex(row, center, space-between, 0.5rem);
  margin-top: 1.25rem;

  &__btn {
    @include flex(row, center, center, 0.4rem);
    font-size: $text-sm;
    font-weight: 600;
    padding: 0.55rem 1rem;
    border: 1px solid $line;
    border-radius: $radius-pill;
    background: $surface;

    &:disabled {
      opacity: 0.4;
      cursor: default;
    }
  }

  &__info {
    font-size: $text-sm;
    color: $ink-muted;
    font-variant-numeric: tabular-nums;
  }
}
</style>
