<script setup lang="ts">
import { site } from '@/config/site'
import { ui } from './uiCopy'
import type { ArticleCard } from '@/types'

defineProps<{ items: ArticleCard[] }>()
</script>

<template>
  <section class="breaking" :aria-label="ui.feed.breakingAria">
    <div class="breaking__inner">
      <p class="breaking__label">
        <span class="breaking__dot" aria-hidden="true"></span>
        {{ site.labels.breaking }}
      </p>
      <ul class="breaking__list">
        <li v-for="item in items" :key="item.id">
          <RouterLink :to="`/nota/${item.slug}`" class="breaking__link">{{ item.title }}</RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.breaking {
  background: $ink;
  color: $paper;

  &__inner {
    @include container;
    @include flex(column, flex-start, flex-start, 0.5rem);
    padding-block: 0.85rem;

    @include from('md') {
      flex-direction: row;
      align-items: baseline;
      gap: 1.5rem;
    }
  }

  &__label {
    @include flex(row, center, flex-start, 0.45rem);
    flex-shrink: 0;
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: $paper;
    background: $stamp;
    padding: 0.25rem 0.5rem;
  }

  &__dot {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: $paper;
    animation: blink 1.6s ease-in-out infinite;
  }

  &__list {
    list-style: none;
    @include flex(column, stretch, flex-start, 0.45rem);

    @include from('md') {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.4rem 1.5rem;
    }
  }

  &__link {
    font-family: $font-display;
    font-weight: 700;
    font-size: $text-base;
    line-height: 1.3;

    &:hover {
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  }
}

@keyframes blink {
  50% {
    opacity: 0.25;
  }
}
</style>
