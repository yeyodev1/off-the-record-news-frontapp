<script setup lang="ts">
import BrandMark from '@/components/news/BrandMark.vue'
import { ui } from '@/config/site'
</script>

<template>
  <section class="not-found">
    <p class="not-found__code">{{ ui.notFound.code }}</p>
    <h1 class="not-found__title">{{ ui.notFound.title }}</h1>
    <p class="not-found__text">{{ ui.notFound.text }}</p>
    <RouterLink to="/" class="btn btn--dark not-found__cta">{{ ui.notFound.cta }}</RouterLink>
    <BrandMark class="not-found__brand" />
  </section>
</template>

<style scoped lang="scss">
.not-found {
  @include container(640px);
  @include flex(column, flex-start, center, 1rem);
  flex: 1;
  padding-block: $space-xl;

  &__code {
    font-family: $font-display;
    font-weight: 900;
    font-size: $display-lg;
    line-height: 0.9;
    color: $stamp;
    letter-spacing: -0.04em;
  }

  &__title {
    font-size: $display-sm;
    font-weight: 900;
    letter-spacing: -0.03em;
    border-top: 4px solid $ink;
    padding-top: 0.75rem;
    align-self: stretch;
  }

  &__text {
    color: $ink-soft;
  }

  &__cta {
    border-radius: 0;
    margin-top: 0.5rem;
  }

  &__brand {
    margin-top: 2rem;
    opacity: 0.35;
  }
}
</style>
