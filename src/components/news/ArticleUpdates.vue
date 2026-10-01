<script setup lang="ts">
import { computed } from 'vue'
import { ui } from '@/config/site'
import { formatDate, formatTime } from '@/utils/format'
import SmartLabel from './SmartLabel.vue'
import type { ArticleUpdate } from '@/types'

const props = defineProps<{ updates: ArticleUpdate[] }>()

// Lo más reciente arriba: quien vuelve a la nota busca qué cambió.
const ordered = computed(() =>
  [...props.updates]
    .filter((u) => u.publishedAt)
    .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime()),
)
</script>

<template>
  <section v-if="ordered.length" class="updates" :aria-label="ui.article.updatesTitle">
    <article v-for="update in ordered" :key="update.id" class="updates__item">
      <SmartLabel tone="stamp">
        <i class="fa-solid fa-rotate" aria-hidden="true"></i>
        {{ ui.article.updateLabel(formatTime(update.publishedAt!)) }}
        <time :datetime="update.publishedAt!" class="updates__date">· {{ formatDate(update.publishedAt!) }}</time>
      </SmartLabel>
      <p class="updates__text">{{ update.text }}</p>
      <p v-if="update.sources.length" class="updates__sources">
        <template v-for="(source, i) in update.sources" :key="source.url || source.name">
          <a v-if="source.url" :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.name }}</a>
          <span v-else>{{ source.name }}</span><span v-if="i < update.sources.length - 1">, </span>
        </template>
      </p>
    </article>
  </section>
</template>

<style scoped lang="scss">
.updates {
  @include flex(column, stretch, flex-start, 0);
  border-left: 3px solid $stamp;

  &__item {
    @include flex(column, stretch, flex-start, 0.4rem);
    padding: 0.2rem 0 0.2rem 1rem;

    & + & {
      margin-top: 1.1rem;
    }
  }

  &__date {
    color: $ink-muted;
    letter-spacing: 0.06em;
  }

  &__text {
    line-height: 1.55;
  }

  &__sources {
    font-size: $text-sm;
    color: $ink-muted;

    a {
      color: $accent-deep;
      text-decoration: underline;
      text-underline-offset: 3px;
      @include focus-ring;
    }
  }
}
</style>
