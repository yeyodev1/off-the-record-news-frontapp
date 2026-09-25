<script setup lang="ts">
import { site } from '@/config/site'
import StoryMeta from './StoryMeta.vue'
import SmartLabel from './SmartLabel.vue'
import ArticleFigure from './ArticleFigure.vue'
import { ui } from '@/config/site'
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

    <RouterLink :to="`/nota/${article.slug}`" class="lead__more">
      {{ ui.feed.readStory }} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
    </RouterLink>
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

  &__more {
    align-self: flex-start;
    font-weight: 700;
    font-size: $text-sm;
    color: $accent;
    @include flex(row, center, flex-start, 0.4rem);
    border-bottom: 1.5px solid currentColor;
    padding-bottom: 0.1rem;

    i {
      @include transition(transform);
    }

    &:hover i {
      transform: translateX(3px);
    }
  }
}
</style>
