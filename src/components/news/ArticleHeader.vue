<script setup lang="ts">
import { computed } from 'vue'
import { site } from '@/config/site'
import { formatDateTime } from '@/utils/format'
import { ui } from './uiCopy'
import type { Article } from '@/types'

const props = defineProps<{ article: Article }>()

const published = computed(() => props.article.publishedAt ?? props.article.createdAt)
</script>

<template>
  <header class="head">
    <p class="head__kicker">
      <span v-if="article.isBreaking" class="head__breaking">{{ site.labels.breaking }}</span>
      <RouterLink :to="`/seccion/${article.section}`" class="head__section">
        {{ site.sections[article.section] ?? article.section }}
      </RouterLink>
      <span v-if="article.isPro" class="head__pro">
        <i class="fa-solid fa-lock" aria-hidden="true"></i> {{ ui.article.proBadge }}
      </span>
    </p>

    <h1 class="head__title">{{ article.title }}</h1>

    <p class="head__meta">
      <span class="head__author">{{ ui.article.by }} {{ article.author }}</span>
      <time :datetime="published">{{ formatDateTime(published) }}</time>
      <span v-if="article.readingMinutes">
        <i class="fa-regular fa-clock" aria-hidden="true"></i> {{ ui.article.minutes(article.readingMinutes) }}
      </span>
    </p>
  </header>
</template>

<style scoped lang="scss">
.head {
  @include flex(column, stretch, flex-start, 0.9rem);

  &__kicker {
    @include flex(row, center, flex-start, 0.6rem);
    flex-wrap: wrap;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  &__section {
    color: $accent;

    &:hover {
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  }

  &__breaking {
    color: $paper;
    background: $stamp;
    padding: 0.2rem 0.45rem;
  }

  &__pro {
    border: 1px solid $ink;
    padding: 0.1rem 0.4rem;
    font-size: 0.64rem;
  }

  &__title {
    font-size: $display-md;
    font-weight: 900;
    line-height: 1.02;
    letter-spacing: -0.035em;
  }

  &__meta {
    @include flex(row, center, flex-start, 0.3rem 1rem);
    flex-wrap: wrap;
    font-size: $text-sm;
    color: $ink-muted;
    padding-bottom: 1rem;
    border-bottom: 1px solid $line;
  }

  &__author {
    color: $ink;
    font-weight: 700;
  }
}
</style>
