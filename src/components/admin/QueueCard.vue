<script setup lang="ts">
import { admin, originLabels } from '@/config/admin'
import { site } from '@/config/site'
import { timeAgo } from '@/composables/admin/format'
import AdminBadge from './AdminBadge.vue'
import ScoreBadge from './ScoreBadge.vue'
import ScoreBreakdown from './ScoreBreakdown.vue'
import ArticlePreview from './ArticlePreview.vue'
import type { Article } from '@/types'

defineProps<{ article: Article; busy?: boolean }>()
const emit = defineEmits<{ publish: []; reject: []; rewrite: [] }>()
</script>

<template>
  <article class="queue-card" :class="{ 'queue-card--busy': busy }">
    <header class="queue-card__meta">
      <ScoreBadge :score="article.score" />
      <AdminBadge tone="muted" :icon="originLabels[article.origin].icon">{{
        originLabels[article.origin].label
      }}</AdminBadge>
      <AdminBadge tone="accent">{{ site.sections[article.section] }}</AdminBadge>
      <AdminBadge v-if="article.isBreaking" tone="stamp" icon="fa-solid fa-bolt">{{
        site.labels.breaking
      }}</AdminBadge>
      <AdminBadge v-if="article.isPro" tone="warning" icon="fa-solid fa-lock">{{
        site.labels.pro
      }}</AdminBadge>
      <span class="queue-card__time">{{ timeAgo(article.createdAt) }}</span>
    </header>

    <ScoreBreakdown v-if="article.score" :score="article.score" />

    <ArticlePreview :article="article" />

    <footer class="queue-card__actions">
      <button
        class="queue-card__btn queue-card__btn--publish"
        type="button"
        :disabled="busy"
        @click="emit('publish')"
      >
        <i class="fa-solid" :class="busy ? 'fa-spinner fa-spin' : 'fa-check'"></i>
        {{ admin.queue.publish }}
      </button>
      <RouterLink :to="`/admin/notas/${article.id}`" class="queue-card__btn">
        <i class="fa-solid fa-pen"></i> {{ admin.queue.edit }}
      </RouterLink>
      <button class="queue-card__btn" type="button" :disabled="busy" @click="emit('rewrite')">
        <i class="fa-solid fa-wand-magic-sparkles"></i> {{ admin.queue.rewrite }}
      </button>
      <button
        class="queue-card__btn queue-card__btn--reject"
        type="button"
        :disabled="busy"
        @click="emit('reject')"
      >
        <i class="fa-solid fa-xmark"></i> {{ admin.queue.reject }}
      </button>
    </footer>
  </article>
</template>

<style scoped lang="scss">
.queue-card {
  @include card;
  @include flex(column, stretch, flex-start, 0.9rem);
  padding: 1rem;
  @include transition(opacity);

  @include from('md') {
    padding: 1.4rem 1.5rem;
  }

  &--busy {
    opacity: 0.7;
  }

  &__meta {
    @include flex(row, center, flex-start, 0.4rem);
    flex-wrap: wrap;
  }

  &__time {
    margin-left: auto;
    font-size: $text-xs;
    color: $ink-muted;
  }

  &__actions {
    @include flex-cards(130px, 0.5rem);
    padding-top: 0.9rem;
    border-top: 1px solid $line;

    @include from('md') {
      > * {
        flex: 0 0 auto;
      }
    }
  }

  &__btn {
    @include flex(row, center, center, 0.45rem);
    min-height: 2.75rem;
    padding: 0.55rem 1rem;
    font-size: $text-sm;
    font-weight: 600;
    border: 1px solid $line;
    border-radius: $radius-pill;
    background: $surface;
    @include transition(background);

    &:hover {
      background: $sand;
    }

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &--publish {
      background: $success;
      border-color: $success;
      color: $surface;

      &:hover {
        background: darken($success, 8%);
      }
    }

    &--reject {
      color: $stamp;
      border-color: rgba($stamp, 0.35);

      &:hover {
        background: $stamp-soft;
      }
    }
  }
}
</style>
