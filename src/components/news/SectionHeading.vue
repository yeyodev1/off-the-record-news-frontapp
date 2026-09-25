<script setup lang="ts">
withDefaults(defineProps<{ title: string; to?: string; linkLabel?: string; tag?: string }>(), {
  to: '',
  linkLabel: '',
  tag: 'h2',
})
</script>

<template>
  <header class="heading">
    <component :is="tag" class="heading__title">{{ title }}</component>
    <RouterLink v-if="to && linkLabel" :to="to" class="heading__link">
      {{ linkLabel }} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
    </RouterLink>
  </header>
</template>

<style scoped lang="scss">
// Filete grueso arriba: separa bloques como en una página impresa.
.heading {
  @include flex(row, baseline, space-between, 1rem);
  border-top: 4px solid $ink;
  padding-top: 0.6rem;
  margin-bottom: 1.4rem;

  &__title {
    font-size: $text-xl;
    font-weight: 900;
    letter-spacing: -0.02em;
  }

  &__link {
    font-size: $text-xs;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: $accent;
    white-space: nowrap;

    &:hover {
      color: $accent-deep;
    }
  }
}
</style>
