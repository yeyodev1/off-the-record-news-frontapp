<script setup lang="ts">
import type { Tone } from '@/config/admin'

defineProps<{ tone?: Tone; icon?: string }>()
</script>

<template>
  <span class="badge" :class="`badge--${tone || 'muted'}`">
    <i v-if="icon" :class="icon"></i>
    <slot />
  </span>
</template>

<style scoped lang="scss">
.badge {
  @include flex(row, center, flex-start, 0.3rem);
  display: inline-flex;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 0.2rem 0.55rem;
  border-radius: $radius-pill;
  white-space: nowrap;

  &--success {
    color: darken($success, 12%);
    background: $success-bg;
  }

  &--warning {
    color: darken($warning, 14%);
    background: $warning-bg;
  }

  &--muted {
    color: $ink-muted;
    background: $sand;
  }

  &--stamp {
    color: $stamp;
    background: $stamp-soft;
  }

  &--accent {
    color: $accent-deep;
    background: $accent-soft;
  }

  &--info {
    color: darken($info, 10%);
    background: $info-bg;
  }
}
</style>
