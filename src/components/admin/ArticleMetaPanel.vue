<script setup lang="ts">
import { admin, articleStatusLabels, originLabels } from '@/config/admin'
import { site } from '@/config/site'
import { formatDateTime } from '@/composables/admin/format'
import AdminBadge from './AdminBadge.vue'
import ScoreBadge from './ScoreBadge.vue'
import ScoreBreakdown from './ScoreBreakdown.vue'
import type { Article, Section } from '@/types'

/** Columna lateral del editor: clasificación, banderas y datos de la IA. */
defineProps<{ article: Article | null }>()
const section = defineModel<Section>('section', { required: true })
const tags = defineModel<string>('tags', { required: true })
const isPro = defineModel<boolean>('isPro', { required: true })
const isBreaking = defineModel<boolean>('isBreaking', { required: true })

const f = admin.editor.fields
</script>

<template>
  <div class="meta">
    <div v-if="article" class="meta__status">
      <AdminBadge :tone="articleStatusLabels[article.status].tone">{{
        articleStatusLabels[article.status].label
      }}</AdminBadge>
      <AdminBadge tone="muted" :icon="originLabels[article.origin].icon">{{
        originLabels[article.origin].label
      }}</AdminBadge>
      <span class="meta__date">{{ formatDateTime(article.publishedAt || article.createdAt) }}</span>
    </div>

    <div>
      <label for="article-section">{{ f.section }}</label>
      <select id="article-section" v-model="section">
        <option v-for="(name, key) in site.sections" :key="key" :value="key">{{ name }}</option>
      </select>
    </div>

    <div>
      <label for="article-tags">{{ f.tags }}</label>
      <input id="article-tags" v-model="tags" type="text" placeholder="asamblea, presupuesto" />
    </div>

    <label class="meta__check">
      <input v-model="isBreaking" type="checkbox" />
      <span><i class="fa-solid fa-bolt"></i> {{ f.isBreaking }}</span>
    </label>
    <label class="meta__check">
      <input v-model="isPro" type="checkbox" />
      <span><i class="fa-solid fa-lock"></i> {{ f.isPro }}</span>
    </label>

    <div v-if="article?.score" class="meta__score">
      <div class="meta__score-head">
        <span>{{ admin.score.label }}</span>
        <ScoreBadge :score="article.score" />
      </div>
      <ScoreBreakdown :score="article.score" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.meta {
  @include flex(column, stretch, flex-start, 0.9rem);

  &__status {
    @include flex(row, center, flex-start, 0.4rem);
    flex-wrap: wrap;
  }

  &__date {
    font-size: $text-xs;
    color: $ink-muted;
  }

  &__check {
    @include flex(row, center, flex-start, 0.6rem);
    margin: 0;
    cursor: pointer;
    font-size: $text-sm;
    color: $ink;

    input {
      width: 1.1rem;
      height: 1.1rem;
      padding: 0;
      flex: 0 0 auto;
      accent-color: $ink;
    }

    i {
      color: $ink-muted;
      width: 1rem;
    }
  }

  &__score {
    @include flex(column, stretch, flex-start, 0.5rem);
    padding-top: 0.9rem;
    border-top: 1px solid $line;
  }

  &__score-head {
    @include flex(row, center, space-between);
    font-size: $text-sm;
    font-weight: 600;
  }
}
</style>
