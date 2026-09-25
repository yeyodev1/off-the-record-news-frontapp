<script setup lang="ts">
import { site } from '@/config/site'
import StoryMeta from './StoryMeta.vue'
import SmartLabel from './SmartLabel.vue'
import ReadMore from './ReadMore.vue'
import CoverFallback from './CoverFallback.vue'
import type { ArticleCard } from '@/types'

/**
 * brief: estilo Axios, la nota se entiende sin abrirla (titular, lede y
 * "Por qué importa"). compact: para rejillas por sección.
 */
withDefaults(
  defineProps<{ article: ArticleCard; variant?: 'brief' | 'compact'; withImage?: boolean; showSection?: boolean }>(),
  { variant: 'compact', withImage: false, showSection: true },
)
</script>

<template>
  <article class="card" :class="`card--${variant}`">
    <RouterLink
      v-if="withImage"
      :to="`/nota/${article.slug}`"
      class="card__thumb"
      tabindex="-1"
      aria-hidden="true"
    >
      <img v-if="article.image" :src="article.image.url" alt="" loading="lazy" decoding="async" />
      <CoverFallback v-else :section="article.section" />
    </RouterLink>

    <div class="card__body">
      <StoryMeta :article="article" :show-section="showSection" />
      <h3 class="card__title">
        <RouterLink :to="`/nota/${article.slug}`">{{ article.title }}</RouterLink>
      </h3>
      <p class="card__lede">{{ article.lede }}</p>

      <div v-if="article.whyItMatters" class="card__why">
        <SmartLabel>{{ site.labels.whyItMatters }}</SmartLabel>
        <p>{{ article.whyItMatters }}</p>
      </div>

      <ReadMore :slug="article.slug" :minutes="article.readingMinutes" />
    </div>
  </article>
</template>

<style scoped lang="scss">
.card {
  @include flex(column, stretch, flex-start, 0.9rem);

  &__thumb {
    display: block;
    aspect-ratio: 16 / 9;
    background: $sand;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      @include transition(transform);
    }

    &:hover img {
      transform: scale(1.02);
    }
  }

  &__body {
    @include flex(column, stretch, flex-start, 0.55rem);
  }

  &__title {
    font-size: $text-lg;
    line-height: 1.15;
    letter-spacing: -0.02em;

    a {
      background-image: linear-gradient($ink, $ink);
      background-size: 0 1.5px;
      background-position: 0 100%;
      background-repeat: no-repeat;
      @include transition(background-size);

      &:hover {
        background-size: 100% 1.5px;
      }
    }
  }

  &__lede {
    color: $ink-soft;
    font-size: $text-sm;
    line-height: 1.55;
  }

  &--brief &__title {
    font-size: $text-xl;
  }

  &--brief &__lede {
    font-size: $text-base;
    color: $ink;
  }

  &__why {
    @include flex(column, stretch, flex-start, 0.3rem);
    padding-left: 0.85rem;
    border-left: 2px solid $accent;
    font-size: $text-sm;
    color: $ink-soft;
    line-height: 1.55;
  }
}
</style>
