<script setup lang="ts">
import { site } from '@/config/site'
import StoryMeta from './StoryMeta.vue'
import SmartLabel from './SmartLabel.vue'
import ArticleFigure from './ArticleFigure.vue'
import ReadMore from './ReadMore.vue'
import CoverFallback from './CoverFallback.vue'
import type { ArticleCard } from '@/types'

defineProps<{ article: ArticleCard }>()
</script>

<template>
  <article class="lead">
    <StoryMeta :article="article" />
    <h2 class="lead__title">
      <RouterLink :to="`/nota/${article.slug}`">{{ article.title }}</RouterLink>
    </h2>

    <ArticleFigure v-if="article.image" :image="article.image" :alt="article.title" eager class="lead__figure" />
    <CoverFallback v-else :section="article.section" class="lead__figure" />

    <p class="lead__lede">{{ article.lede }}</p>

    <div v-if="article.whyItMatters" class="lead__block">
      <SmartLabel>{{ site.labels.whyItMatters }}</SmartLabel>
      <p>{{ article.whyItMatters }}</p>
    </div>

    <div v-if="article.keyPoints?.length" class="lead__block">
      <SmartLabel>{{ site.labels.keyPoints }}</SmartLabel>
      <ul class="lead__points">
        <li v-for="point in article.keyPoints.slice(0, 3)" :key="point">{{ point }}</li>
      </ul>
    </div>

    <ReadMore :slug="article.slug" :minutes="article.readingMinutes" />
  </article>
</template>

<style scoped lang="scss">
.lead {
  @include flex(column, stretch, flex-start, 1rem);

  &__title {
    font-size: $display-md;
    font-weight: 900;
    line-height: 1.02;
    letter-spacing: -0.035em;

    a:hover {
      color: $accent-deep;
    }
  }

  &__figure {
    margin-block: 0.25rem;
  }

  &__lede {
    font-size: $text-lg;
    line-height: 1.5;
    font-weight: 500;
  }

  &__block {
    @include flex(column, stretch, flex-start, 0.35rem);
    color: $ink-soft;
  }

  &__points {
    padding-left: 1.1rem;
    @include flex(column, stretch, flex-start, 0.35rem);

    li::marker {
      color: $accent;
    }
  }

}
</style>
