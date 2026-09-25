<script setup lang="ts">
import { site } from '@/config/site'
import type { Section } from '@/types'

/** Portada de marca cuando ninguna fuente trae foto: la tarjeta nunca queda sin imagen. */
defineProps<{ section: Section }>()
</script>

<template>
  <div class="cover" aria-hidden="true">
    <span class="cover__stamp">{{ site.name }}</span>
    <span class="cover__section">{{ site.sections[section] ?? section }}</span>
  </div>
</template>

<style scoped lang="scss">
.cover {
  aspect-ratio: 16 / 9;
  max-width: 100%;
  background: $ink;
  color: $paper;
  padding: 1rem 1.1rem;
  @include flex(column, flex-start, space-between);

  &__stamp {
    font-family: $font-display;
    font-weight: 800;
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $stamp;
    border: 2px solid $stamp;
    padding: 0.1rem 0.4rem;
    transform: rotate(-4deg);
  }

  &__section {
    font-family: $font-display;
    font-weight: 900;
    font-size: clamp(1.6rem, 5vw, 2.4rem);
    letter-spacing: -0.03em;
    line-height: 1;
  }
}
</style>
