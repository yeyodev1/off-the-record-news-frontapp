<script setup lang="ts">
import { site } from '@/config/site'

withDefaults(defineProps<{ inverted?: boolean; size?: 'md' | 'lg' }>(), {
  inverted: false,
  size: 'md',
})
</script>

<template>
  <span class="brand" :class="[`brand--${size}`, { 'brand--inverted': inverted }]">
    <span class="brand__name">{{ site.name }}</span>
    <!-- El sello: lo que se dice "off the record" lleva timbre. -->
    <span class="brand__stamp" aria-hidden="true">EC</span>
  </span>
</template>

<style scoped lang="scss">
.brand {
  display: inline-flex;
  align-items: flex-start;
  gap: 0.3rem;
  color: $ink;
  line-height: 1;

  &__name {
    font-family: $font-display;
    font-weight: 900;
    font-size: 1.35rem;
    letter-spacing: -0.035em;
    white-space: nowrap;
  }

  &__stamp {
    font-family: $font-display;
    font-weight: 800;
    font-size: 0.5rem;
    letter-spacing: 0.08em;
    color: $stamp;
    border: 1.5px solid $stamp;
    border-radius: 3px;
    padding: 0.14rem 0.22rem 0.1rem;
    transform: rotate(-9deg) translateY(-0.12rem);
  }

  &--lg &__name {
    font-size: 1.5rem;

    @include from('sm') {
      font-size: 1.9rem;
    }

    @include from('md') {
      font-size: 2.4rem;
    }
  }

  &--lg &__stamp {
    font-size: 0.62rem;
  }

  &--inverted {
    color: $paper;
  }
}
</style>
