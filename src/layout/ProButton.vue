<script setup lang="ts">
import { ui } from '@/config/site'

/** Botón rojo de OTR PRO: el único elemento con sombra de la portada. */
withDefaults(defineProps<{ compact?: boolean }>(), { compact: false })
</script>

<template>
  <RouterLink to="/pro" class="pro-btn" :class="{ 'pro-btn--compact': compact }">
    <template v-if="compact">● {{ ui.header.proShort }}</template>
    <template v-else>
      <span class="pro-btn__dot" aria-hidden="true"></span>
      {{ ui.header.pro }}
    </template>
  </RouterLink>
</template>

<style scoped lang="scss">
.pro-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: $stamp;
  color: $paper;
  padding: 10px 18px;
  border-radius: 4px;
  font-family: $font-display;
  font-weight: 700;
  font-size: 14px;
  line-height: 1.2;
  white-space: nowrap;
  box-shadow: 0 4px 14px rgba(200, 16, 46, 0.35);
  transition: background 0.2s ease;
  @include focus-ring($stamp);

  &:hover {
    background: $stamp-deep;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $paper;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.35);
  }

  &:hover &__dot {
    animation: pro-pulse 1.1s ease-in-out infinite;
  }

  &--compact {
    gap: 0;
    padding: 7px 11px;
    font-size: 12px;
    box-shadow: 0 3px 10px rgba(200, 16, 46, 0.35);
  }
}

@keyframes pro-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.35);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.1);
  }
}
</style>
