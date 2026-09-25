<script setup lang="ts">
defineProps<{
  label: string
  value: number | string
  icon: string
  to?: string
  highlight?: boolean
}>()
</script>

<template>
  <component
    :is="to ? 'RouterLink' : 'div'"
    :to="to"
    class="stat"
    :class="{ 'stat--highlight': highlight }"
  >
    <span class="stat__icon"><i :class="icon"></i></span>
    <span class="stat__value">{{ value }}</span>
    <span class="stat__label">{{ label }}</span>
  </component>
</template>

<style scoped lang="scss">
.stat {
  @include card;
  @include flex(column, flex-start, flex-start, 0.2rem);
  padding: 0.9rem 1rem;
  @include transition(border-color);

  &[href]:hover {
    border-color: $ink;
  }

  &__icon {
    font-size: 0.85rem;
    color: $ink-muted;
  }

  &__value {
    @include display($text-xl, 800);
    font-variant-numeric: tabular-nums;
  }

  &__label {
    font-size: $text-xs;
    color: $ink-muted;
    font-weight: 600;
  }

  &--highlight {
    border-color: rgba($stamp, 0.4);

    .stat__value,
    .stat__icon {
      color: $stamp;
    }
  }
}
</style>
