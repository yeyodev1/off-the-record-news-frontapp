<script setup lang="ts">
import { admin, articleStatusLabels, signalStatusLabels, storyStatusLabels } from '@/config/admin'
import { timeAgo } from '@/composables/admin/format'
import AdminBadge from '../AdminBadge.vue'
import type { LessonVerdict, MesaSignal } from '@/types'

defineProps<{ signal: MesaSignal }>()
const emit = defineEmits<{ correct: [verdict: LessonVerdict] }>()
const t = admin.mesa.signals
</script>

<template>
  <article class="msignal">
    <div class="msignal__top">
      <AdminBadge :tone="signalStatusLabels[signal.status].tone">
        {{ signalStatusLabels[signal.status].label }}
      </AdminBadge>
      <span v-if="signal.score" class="msignal__score">
        {{ t.score }} <strong>{{ signal.score.total.toFixed(1) }}</strong>
      </span>
      <span class="msignal__source">{{ signal.sourceName }}</span>
      <span class="msignal__time">{{ timeAgo(signal.createdAt) }}</span>
    </div>

    <h3 class="msignal__title">
      <a v-if="signal.url" :href="signal.url" target="_blank" rel="noopener">{{ signal.title }}</a>
      <template v-else>{{ signal.title }}</template>
    </h3>

    <p v-if="signal.decision" class="msignal__decision">
      <i class="fa-solid fa-comment-dots"></i> {{ signal.decision }}
    </p>

    <ul v-if="signal.story || signal.article" class="msignal__links">
      <li v-if="signal.story">
        <RouterLink to="/admin/hechos">
          <i class="fa-solid fa-layer-group"></i> {{ t.story }}:
          {{ signal.story.title }}
        </RouterLink>
        <AdminBadge :tone="storyStatusLabels[signal.story.status].tone">
          {{ storyStatusLabels[signal.story.status].label }}
        </AdminBadge>
      </li>
      <li v-if="signal.article">
        <RouterLink :to="`/admin/notas/${signal.article.id}`">
          <i class="fa-solid fa-newspaper"></i> {{ t.article }}: {{ signal.article.title }}
        </RouterLink>
        <AdminBadge :tone="articleStatusLabels[signal.article.status].tone">
          {{ articleStatusLabels[signal.article.status].label }}
        </AdminBadge>
      </li>
    </ul>

    <footer class="msignal__actions">
      <button class="msignal__btn" type="button" @click="emit('correct', 'no_es_noticia')">
        <i class="fa-solid fa-thumbs-down"></i> {{ t.notNews }}
      </button>
      <button class="msignal__btn" type="button" @click="emit('correct', 'es_noticia')">
        <i class="fa-solid fa-thumbs-up"></i> {{ t.yesNews }}
      </button>
    </footer>
  </article>
</template>

<style scoped lang="scss">
.msignal {
  @include card;
  @include flex(column, stretch, flex-start, 0.55rem);
  padding: 0.85rem 1rem;

  &__top {
    @include flex(row, center, flex-start, 0.45rem);
    flex-wrap: wrap;
    font-size: $text-xs;
  }

  &__score {
    color: $ink-muted;

    strong {
      color: $ink;
    }
  }

  &__source {
    font-weight: 700;
    color: $ink-soft;
  }

  &__time {
    margin-left: auto;
    color: $ink-muted;
  }

  &__title {
    font-family: $font-display;
    font-size: $text-base;
    font-weight: 700;
    line-height: 1.25;

    a:hover {
      color: $accent-deep;
    }
  }

  &__decision {
    font-size: $text-sm;
    color: $ink-soft;
    background: $sand;
    border-radius: $radius-sm;
    padding: 0.5rem 0.65rem;

    i {
      color: $ink-muted;
      margin-right: 0.2rem;
    }
  }

  &__links {
    @include flex(column, stretch, flex-start, 0.3rem);
    font-size: $text-xs;

    li {
      @include flex(row, center, flex-start, 0.4rem);
      flex-wrap: wrap;
    }

    a {
      font-weight: 600;
      color: $accent-deep;
    }
  }

  &__actions {
    @include flex(row, center, flex-end, 0.4rem);
    flex-wrap: wrap;
    padding-top: 0.55rem;
    border-top: 1px solid $line;
  }

  &__btn {
    @include flex(row, center, center, 0.4rem);
    flex: 1;
    min-height: 2.4rem;
    padding: 0.4rem 0.8rem;
    font-size: $text-xs;
    font-weight: 600;
    border: 1px solid $line;
    border-radius: $radius-pill;

    @include from('md') {
      flex: 0 0 auto;
    }

    &:hover {
      background: $sand;
    }
  }
}
</style>
