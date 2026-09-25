<script setup lang="ts">
import { site } from '@/config/site'
import BrandMark from './BrandMark.vue'
import { ui } from './uiCopy'
</script>

<template>
  <aside class="lock">
    <BrandMark inverted />
    <p class="lock__title">{{ ui.article.lockedTitle }}</p>
    <p class="lock__text">{{ ui.article.lockedText }}</p>
    <ul class="lock__features">
      <li v-for="feature in site.pro.features.slice(0, 3)" :key="feature">
        <i class="fa-solid fa-check" aria-hidden="true"></i> {{ feature }}
      </li>
    </ul>
    <RouterLink to="/pro" class="btn btn--primary lock__cta">
      {{ ui.article.lockedCta }} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
    </RouterLink>
  </aside>
</template>

<style scoped lang="scss">
.lock {
  @include flex(column, flex-start, flex-start, 0.8rem);
  background: $ink;
  color: $paper;
  padding: 1.75rem 1.25rem;

  @include from('md') {
    padding: 2.25rem;
  }

  &__title {
    font-family: $font-display;
    font-weight: 800;
    font-size: $text-xl;
    line-height: 1.15;
  }

  &__text {
    color: rgba($paper, 0.78);
  }

  &__features {
    list-style: none;
    @include flex(column, stretch, flex-start, 0.4rem);
    font-size: $text-sm;
    color: rgba($paper, 0.9);

    i {
      color: $accent-soft;
      margin-right: 0.35rem;
    }
  }

  &__cta {
    margin-top: 0.4rem;
    border-radius: 0;
  }
}
</style>
