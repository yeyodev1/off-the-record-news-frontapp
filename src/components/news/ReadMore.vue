<script setup lang="ts">
import { ui } from '@/config/site'

/** Botón "Profundiza · N min de lectura →": lleva a la página del hecho. */
withDefaults(defineProps<{ slug: string; minutes: number; short?: boolean }>(), { short: false })
</script>

<template>
  <RouterLink :to="`/nota/${slug}`" class="deeper-btn">
    {{ short ? ui.home.profundizaShort(minutes || 1) : ui.home.profundiza(minutes || 1) }}
    <span class="deeper-btn__arrow" aria-hidden="true">→</span>
  </RouterLink>
</template>

<style scoped lang="scss">
.deeper-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  background: $accent;
  color: $paper;
  padding: 10px 16px;
  border-radius: 3px;
  font-family: $font-display;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  @include transition(background);
  @include focus-ring;

  &:hover {
    background: $accent-deep;
  }

  &__arrow {
    font-size: 16px;
    line-height: 1;
    @include transition(transform);
  }

  &:hover &__arrow {
    transform: translateX(2px);
  }
}
</style>
