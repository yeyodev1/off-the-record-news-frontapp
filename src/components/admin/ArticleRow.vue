<script setup lang="ts">
import { articleStatusLabels, originLabels } from '@/config/admin'
import { site } from '@/config/site'
import { formatDateTime } from '@/composables/admin/format'
import AdminBadge from './AdminBadge.vue'
import ScoreBadge from './ScoreBadge.vue'
import type { Article } from '@/types'

defineProps<{ article: Article }>()
const emit = defineEmits<{ remove: [] }>()
</script>

<template>
  <article class="row">
    <ScoreBadge :score="article.score" class="row__score" />
    <div class="row__main">
      <RouterLink :to="`/admin/notas/${article.id}`" class="row__title">{{
        article.title || '(sin titular)'
      }}</RouterLink>
      <div class="row__meta">
        <AdminBadge :tone="articleStatusLabels[article.status].tone">{{
          articleStatusLabels[article.status].label
        }}</AdminBadge>
        <span>{{ site.sections[article.section] }}</span>
        <span
          ><i :class="originLabels[article.origin].icon"></i>
          {{ originLabels[article.origin].label }}</span
        >
        <span v-if="article.isBreaking" class="row__breaking"
          ><i class="fa-solid fa-bolt"></i
        ></span>
        <span v-if="article.isPro"><i class="fa-solid fa-lock"></i></span>
        <span>{{ formatDateTime(article.publishedAt || article.createdAt) }}</span>
        <span v-if="article.status === 'published'"
          ><i class="fa-regular fa-eye"></i> {{ article.views }}</span
        >
      </div>
    </div>
    <div class="row__actions">
      <a
        v-if="article.status === 'published'"
        :href="`/nota/${article.slug}`"
        target="_blank"
        rel="noopener"
        class="row__icon"
        aria-label="Ver en el sitio"
      >
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
      <RouterLink :to="`/admin/notas/${article.id}`" class="row__icon" aria-label="Editar">
        <i class="fa-solid fa-pen"></i>
      </RouterLink>
      <button
        class="row__icon row__icon--danger"
        type="button"
        aria-label="Eliminar"
        @click="emit('remove')"
      >
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  </article>
</template>

<style scoped lang="scss">
.row {
  @include flex(row, flex-start, flex-start, 0.75rem);
  padding: 0.85rem 1rem;
  background: $surface;

  & + & {
    border-top: 1px solid $line;
  }

  &__score {
    margin-top: 0.15rem;
  }

  &__main {
    flex: 1;
    min-width: 0;
    @include flex(column, stretch, flex-start, 0.35rem);
  }

  &__title {
    font-family: $font-display;
    font-weight: 700;
    font-size: $text-base;
    line-height: 1.25;

    &:hover {
      text-decoration: underline;
    }
  }

  &__meta {
    @include flex(row, center, flex-start, 0.3rem 0.7rem);
    flex-wrap: wrap;
    font-size: $text-xs;
    color: $ink-muted;
  }

  &__breaking {
    color: $stamp;
  }

  &__actions {
    @include flex(column, center, flex-start, 0.2rem);

    @include from('md') {
      flex-direction: row;
    }
  }

  &__icon {
    @include flex(row, center, center);
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    color: $ink-muted;
    font-size: 0.85rem;

    &:hover {
      background: $sand;
      color: $ink;
    }

    &--danger:hover {
      color: $stamp;
      background: $stamp-soft;
    }
  }
}
</style>
