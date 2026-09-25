<script setup lang="ts">
withDefaults(defineProps<{ count?: number; withImage?: boolean }>(), { count: 3, withImage: false })
</script>

<template>
  <div class="skeleton" aria-busy="true" aria-live="polite">
    <span class="visually-hidden">Cargando…</span>
    <div v-for="n in count" :key="n" class="skeleton__item">
      <div v-if="withImage" class="skeleton__block skeleton__block--image"></div>
      <div class="skeleton__block skeleton__block--label"></div>
      <div class="skeleton__block skeleton__block--title"></div>
      <div class="skeleton__block skeleton__block--title skeleton__block--short"></div>
      <div class="skeleton__block"></div>
      <div class="skeleton__block skeleton__block--short"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.skeleton {
  @include flex(column, stretch, flex-start, 2rem);

  &__item {
    @include flex(column, stretch, flex-start, 0.55rem);
    padding-bottom: 2rem;
    border-bottom: 1px solid $line;
  }

  &__block {
    height: 0.8rem;
    background: $sand;
    animation: pulse 1.4s ease-in-out infinite;

    &--image {
      aspect-ratio: 16 / 9;
      height: auto;
      margin-bottom: 0.5rem;
    }

    &--label {
      width: 6rem;
      height: 0.6rem;
    }

    &--title {
      height: 1.4rem;
    }

    &--short {
      width: 60%;
    }
  }
}

@keyframes pulse {
  50% {
    opacity: 0.45;
  }
}
</style>
