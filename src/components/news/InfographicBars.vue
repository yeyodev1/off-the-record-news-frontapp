<script setup lang="ts">
import { computed } from 'vue'
import type { Infographic } from '@/types'

const props = defineProps<{ data: Infographic }>()

const number = new Intl.NumberFormat('es-EC', { maximumFractionDigits: 2 })

const rows = computed(() => {
  const max = Math.max(...props.data.items.map((item) => Math.abs(item.value)), 0) || 1
  return props.data.items.map((item) => ({
    ...item,
    width: Math.max((Math.abs(item.value) / max) * 100, 1.5),
    display: `${number.format(item.value)}${props.data.unit ? ` ${props.data.unit}` : ''}`,
  }))
})

// La barra más grande se destaca: es la que cuenta la historia.
const topValue = computed(() => Math.max(...props.data.items.map((item) => item.value)))
</script>

<template>
  <figure class="bars">
    <figcaption class="bars__title">{{ data.title }}</figcaption>
    <p v-if="data.unit" class="bars__unit">{{ data.unit }}</p>
    <ul class="bars__list">
      <li v-for="row in rows" :key="row.label" class="bars__row">
        <div class="bars__head">
          <span class="bars__label">{{ row.label }}</span>
          <span class="bars__value">{{ row.display }}</span>
        </div>
        <div class="bars__track" aria-hidden="true">
          <span
            class="bars__fill"
            :class="{ 'bars__fill--top': row.value === topValue }"
            :style="{ width: `${row.width}%` }"
          ></span>
        </div>
      </li>
    </ul>
  </figure>
</template>

<style scoped lang="scss">
.bars {
  padding: 1.25rem 0;
  border-top: 1px solid $ink;
  border-bottom: 1px solid $line;

  &__title {
    font-family: $font-display;
    font-weight: 800;
    font-size: $text-lg;
    line-height: 1.2;
  }

  &__unit {
    font-size: $text-xs;
    color: $ink-muted;
    margin-top: 0.2rem;
  }

  &__list {
    list-style: none;
    @include flex(column, stretch, flex-start, 0.9rem);
    margin-top: 1.1rem;
  }

  &__head {
    @include flex(row, baseline, space-between, 1rem);
    font-size: $text-sm;
    margin-bottom: 0.3rem;
  }

  &__label {
    color: $ink-soft;
  }

  &__value {
    font-family: $font-display;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  &__track {
    display: flex;
    height: 0.75rem;
    background: $sand;
  }

  &__fill {
    display: block;
    background: $ink;
    transform-origin: left center;
    animation: grow 0.7s $ease both;

    &--top {
      background: $accent;
    }
  }
}

@keyframes grow {
  from {
    transform: scaleX(0);
  }
}
</style>
