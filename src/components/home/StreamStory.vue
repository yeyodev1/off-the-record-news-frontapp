<script setup lang="ts">
import { computed } from 'vue'
import { site } from '@/config/site'
import { formatRelative } from '@/utils/format'
import StoryPhoto from '@/components/news/StoryPhoto.vue'
import ReadMore from '@/components/news/ReadMore.vue'
import Byline from '@/components/news/Byline.vue'
import type { ArticleCard } from '@/types'

/**
 * Nota del stream (portada v2): firma, titular, foto con crédito, entrada y
 * bloques etiquetados. Siempre "Por qué importa"; después el bloque que tenga
 * la nota: En cifras, Qué sigue o El contexto.
 */
const props = withDefaults(defineProps<{ article: ArticleCard; showSection?: boolean }>(), {
  showSection: true,
})

const when = computed(() => formatRelative(props.article.publishedAt ?? props.article.createdAt))

const extra = computed(() => {
  const a = props.article
  const numbers = a.infographic?.items?.length
    ? a.infographic.items
        .slice(0, 4)
        .map(
          (i) =>
            `${i.label}: ${i.value.toLocaleString('es-EC')}${a.infographic?.unit ? ` ${a.infographic.unit}` : ''}`,
        )
        .join('; ')
    : ''
  if (numbers) return { label: site.labels.inNumbers, text: `${numbers}.` }
  if (a.whatsNext) return { label: site.labels.whatsNext, text: a.whatsNext }
  if (a.bigPicture) return { label: site.labels.context, text: a.bigPicture }
  if (a.keyPoints?.length)
    return { label: site.labels.keyPoints, text: a.keyPoints.slice(0, 2).join(' ') }
  return null
})

const lowerFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1)
</script>

<template>
  <article class="story">
    <div class="story__by">
      <Byline :author="article.author" :size="28" />
      <span class="story__time">{{ when }}</span>
      <RouterLink v-if="showSection" :to="`/seccion/${article.section}`" class="story__section">
        {{ site.sections[article.section] }}
      </RouterLink>
    </div>

    <h3 class="story__title">
      <RouterLink :to="`/nota/${article.slug}`" class="headline-link">{{
        article.title
      }}</RouterLink>
    </h3>

    <StoryPhoto
      :image="article.image"
      :section="article.section"
      :alt="article.title"
      :height="360"
      :mobile-height="190"
      caption
    />

    <p class="story__p story__lede">{{ article.lede }}</p>
    <p v-if="article.whyItMatters" class="story__p">
      <b class="story__label">{{ site.labels.whyItMatters }}:</b>
      {{ lowerFirst(article.whyItMatters) }}
    </p>
    <p v-if="extra" class="story__p story__p--extra">
      <b class="story__label">{{ extra.label }}:</b> {{ lowerFirst(extra.text) }}
    </p>

    <ReadMore :slug="article.slug" :minutes="article.readingMinutes" />
  </article>
</template>

<style scoped lang="scss">
.story {
  display: flex;
  flex-direction: column;
  padding: 0 0 22px;
  border-bottom: 1px solid $line;
  font-family: $font-display;

  @include from('md') {
    padding: 28px 0;
  }

  &__by {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    color: $ink-muted;
    margin-bottom: 10px;

    @include from('md') {
      font-size: 13px;
    }

    :deep(.byline__name) {
      font-weight: 600;
      color: $ink;
    }
  }

  &__time {
    white-space: nowrap;
  }

  &__section {
    margin-left: auto;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $accent;
    white-space: nowrap;

    &:hover {
      color: $accent-deep;
    }
  }

  &__title {
    margin: 0 0 10px;
    font-size: 24px;
    line-height: 1.08;
    letter-spacing: -0.025em;
    font-weight: 700;

    @include from('md') {
      margin-bottom: 14px;
      font-size: 30px;
    }
  }

  &__p {
    font-family: $font-serif;
    font-size: 16px;
    line-height: 1.5;
    margin: 0 0 12px;

    @include from('md') {
      font-size: 18px;
    }

    // En el celular la nota se queda en entrada + "Por qué importa".
    &--extra {
      display: none;

      @include from('md') {
        display: block;
      }
    }
  }

  &__lede {
    margin-top: 12px;

    @include from('md') {
      margin-top: 16px;
    }
  }

  &__label {
    font-family: $font-display;
    font-size: 14px;
    font-weight: 700;

    @include from('md') {
      font-size: 16px;
    }
  }

  :deep(.deeper-btn) {
    margin-top: 2px;

    @include from('md') {
      margin-top: 6px;
    }
  }
}
</style>
