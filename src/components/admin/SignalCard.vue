<script setup lang="ts">
import { ref } from 'vue'
import { admin, signalStatusLabels } from '@/config/admin'
import { timeAgo } from '@/composables/admin/format'
import AdminBadge from './AdminBadge.vue'
import ScoreBadge from './ScoreBadge.vue'
import ScoreBreakdown from './ScoreBreakdown.vue'
import type { Signal } from '@/types'

defineProps<{ signal: Signal; busy?: 'draft' | 'discard' | null }>()
const emit = defineEmits<{ draft: []; discard: [] }>()

const showScore = ref(false)
</script>

<template>
  <article class="signal">
    <div class="signal__top">
      <ScoreBadge
        :score="signal.score"
        :clickable="Boolean(signal.score)"
        :open="showScore"
        @toggle="showScore = !showScore"
      />
      <AdminBadge :tone="signalStatusLabels[signal.status].tone">{{
        signalStatusLabels[signal.status].label
      }}</AdminBadge>
      <span class="signal__source">{{ signal.sourceName }}</span>
      <span class="signal__time">{{ timeAgo(signal.publishedAt || signal.createdAt) }}</span>
    </div>

    <ScoreBreakdown v-if="showScore && signal.score" :score="signal.score" />

    <div class="signal__body">
      <img
        v-if="signal.imageUrl"
        :src="signal.imageUrl"
        alt=""
        class="signal__img"
        loading="lazy"
      />
      <div class="signal__text">
        <h3 class="signal__title">{{ signal.title }}</h3>
        <p v-if="signal.summary" class="signal__summary">{{ signal.summary }}</p>
      </div>
    </div>

    <footer class="signal__actions">
      <a v-if="signal.url" :href="signal.url" target="_blank" rel="noopener" class="signal__link">
        <i class="fa-solid fa-arrow-up-right-from-square"></i> {{ admin.signals.openSource }}
      </a>
      <RouterLink
        v-if="signal.articleId"
        :to="`/admin/notas/${signal.articleId}`"
        class="signal__link"
      >
        <i class="fa-solid fa-newspaper"></i> {{ admin.signals.openArticle }}
      </RouterLink>
      <span class="signal__spacer"></span>
      <template v-if="!signal.articleId && signal.status !== 'discarded'">
        <button
          class="signal__btn"
          type="button"
          :disabled="Boolean(busy)"
          @click="emit('discard')"
        >
          <i class="fa-solid" :class="busy === 'discard' ? 'fa-spinner fa-spin' : 'fa-ban'"></i>
          {{ admin.signals.discard }}
        </button>
        <button
          class="signal__btn signal__btn--primary"
          type="button"
          :disabled="Boolean(busy)"
          @click="emit('draft')"
        >
          <i class="fa-solid" :class="busy === 'draft' ? 'fa-spinner fa-spin' : 'fa-pen-nib'"></i>
          {{ busy === 'draft' ? admin.signals.drafting : admin.signals.draft }}
        </button>
      </template>
    </footer>
  </article>
</template>

<style scoped lang="scss">
.signal {
  @include card;
  @include flex(column, stretch, flex-start, 0.7rem);
  padding: 0.9rem 1rem;

  &__top {
    @include flex(row, center, flex-start, 0.45rem);
    flex-wrap: wrap;
    font-size: $text-xs;
  }

  &__source {
    font-weight: 700;
    color: $ink-soft;
  }

  &__time {
    margin-left: auto;
    color: $ink-muted;
  }

  &__body {
    @include flex(row, flex-start, flex-start, 0.8rem);
  }

  &__img {
    flex: 0 0 72px;
    width: 72px;
    height: 72px;
    object-fit: cover;
    border-radius: $radius-sm;
    background: $sand;

    @include from('md') {
      flex-basis: 112px;
      width: 112px;
      height: 80px;
    }
  }

  &__text {
    flex: 1;
    min-width: 0;
  }

  &__title {
    font-family: $font-display;
    font-size: $text-base;
    font-weight: 700;
    line-height: 1.25;
  }

  &__summary {
    font-size: $text-sm;
    color: $ink-soft;
    margin-top: 0.3rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__actions {
    @include flex(row, center, flex-start, 0.5rem);
    flex-wrap: wrap;
    padding-top: 0.7rem;
    border-top: 1px solid $line;
  }

  &__link {
    font-size: $text-xs;
    font-weight: 600;
    color: $accent-deep;
  }

  &__spacer {
    flex: 1;
  }

  &__btn {
    @include flex(row, center, center, 0.4rem);
    min-height: 2.5rem;
    padding: 0.45rem 0.95rem;
    font-size: $text-sm;
    font-weight: 600;
    border: 1px solid $line;
    border-radius: $radius-pill;

    &:hover {
      background: $sand;
    }

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &--primary {
      background: $ink;
      border-color: $ink;
      color: $surface;

      &:hover {
        background: $accent-deep;
      }
    }
  }
}
</style>
