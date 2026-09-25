<script setup lang="ts">
withDefaults(defineProps<{ tag?: string; tone?: 'accent' | 'stamp' | 'muted' }>(), {
  tag: 'p',
  tone: 'accent',
})
</script>

<template>
  <component :is="tag" class="label" :class="`label--${tone}`"><slot /></component>
</template>

<style scoped lang="scss">
// Rótulo del formato: versalitas chicas, como el antetítulo de un diario.
.label {
  font-family: $font-principal;
  font-size: 0.7rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  &--accent {
    color: $accent;
  }

  &--stamp {
    color: $stamp;
  }

  &--muted {
    color: $ink-muted;
  }
}
</style>
