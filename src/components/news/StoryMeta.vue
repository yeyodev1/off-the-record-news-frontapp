<script setup lang="ts">
import { computed } from 'vue'
import { site } from '@/config/site'
import { formatRelative } from '@/utils/format'
import { ui } from './uiCopy'
import type { ArticleCard } from '@/types'

const props = withDefaults(defineProps<{ article: ArticleCard; showSection?: boolean }>(), {
  showSection: true,
})

const when = computed(() => formatRelative(props.article.publishedAt ?? props.article.createdAt))
</script>

<template>
  <p class="meta">
    <span v-if="article.isBreaking" class="meta__breaking">{{ site.labels.breaking }}</span>
    <RouterLink v-if="showSection" :to="`/seccion/${article.section}`" class="meta__section">
      {{ site.sections[article.section] ?? article.section }}
    </RouterLink>
    <time v-if="when" class="meta__time" :datetime="article.publishedAt ?? article.createdAt">{{ when }}</time>
    <span v-if="article.isPro" class="meta__pro">
      <i class="fa-solid fa-lock" aria-hidden="true"></i> {{ ui.article.proBadge }}
    </span>
  </p>
</template>

<style scoped lang="scss">
.meta {
  @include flex(row, center, flex-start, 0.3rem 0.7rem);
  flex-wrap: wrap;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  line-height: 1.3;

  &__section {
    color: $accent;

    &:hover {
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  }

  &__time {
    color: $ink-muted;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: none;
    font-size: 0.78rem;
  }

  &__breaking {
    color: $paper;
    background: $stamp;
    padding: 0.18rem 0.4rem;
  }

  &__pro {
    color: $ink;
    border: 1px solid $ink;
    padding: 0.1rem 0.35rem;
    font-size: 0.62rem;
  }
}
</style>
