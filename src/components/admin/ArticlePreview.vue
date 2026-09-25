<script setup lang="ts">
import { site } from '@/config/site'
import type { Article } from '@/types'

/** La nota tal como la verá el lector, en formato smart brevity completo. */
defineProps<{ article: Article }>()
</script>

<template>
  <div class="preview">
    <figure v-if="article.image?.url" class="preview__figure">
      <img :src="article.image.url" :alt="article.title" loading="lazy" />
      <figcaption v-if="article.image.credit">{{ article.image.credit }}</figcaption>
    </figure>

    <h2 class="preview__title">{{ article.title }}</h2>
    <p class="preview__lede">{{ article.lede }}</p>

    <div v-if="article.whyItMatters" class="preview__block">
      <h3 class="preview__label">{{ site.labels.whyItMatters }}</h3>
      <p>{{ article.whyItMatters }}</p>
    </div>

    <div v-if="article.bigPicture" class="preview__block">
      <h3 class="preview__label">{{ site.labels.bigPicture }}</h3>
      <p>{{ article.bigPicture }}</p>
    </div>

    <div v-if="article.keyPoints.length" class="preview__block">
      <h3 class="preview__label">{{ site.labels.keyPoints }}</h3>
      <ul class="preview__points">
        <li v-for="(point, i) in article.keyPoints" :key="i">{{ point }}</li>
      </ul>
    </div>

    <div v-if="article.whatsNext" class="preview__block">
      <h3 class="preview__label">{{ site.labels.whatsNext }}</h3>
      <p>{{ article.whatsNext }}</p>
    </div>

    <details v-if="article.body.length" class="preview__deeper">
      <summary class="preview__label">
        {{ site.labels.goDeeper }} ({{ article.body.length }})
      </summary>
      <p v-for="(paragraph, i) in article.body" :key="i">{{ paragraph }}</p>
    </details>

    <div v-if="article.sources.length" class="preview__sources">
      <span class="preview__label">{{ site.labels.sources }}:</span>
      <a
        v-for="src in article.sources"
        :key="src.url || src.name"
        :href="src.url"
        target="_blank"
        rel="noopener"
      >
        {{ src.name }} <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.preview {
  @include flex(column, stretch, flex-start, 0.75rem);
  font-size: $text-sm;
  color: $ink-soft;

  &__figure {
    img {
      width: 100%;
      max-height: 240px;
      object-fit: cover;
      border-radius: $radius-sm;
    }

    figcaption {
      font-size: $text-xs;
      color: $ink-muted;
      margin-top: 0.25rem;
    }
  }

  &__title {
    @include display($text-xl, 800);
    color: $ink;
  }

  &__lede {
    font-size: $text-base;
    color: $ink;
  }

  &__label {
    font-family: $font-principal;
    font-size: $text-xs;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: $ink;
  }

  &__points {
    padding-left: 1.1rem;
    @include flex(column, stretch, flex-start, 0.25rem);
  }

  &__deeper {
    border-top: 1px dashed $line;
    padding-top: 0.6rem;

    summary {
      cursor: pointer;
    }

    p {
      margin-top: 0.5rem;
    }
  }

  &__sources {
    @include flex(row, center, flex-start, 0.4rem 0.8rem);
    flex-wrap: wrap;
    font-size: $text-xs;

    a {
      color: $accent-deep;
      text-decoration: underline;

      i {
        font-size: 0.6rem;
      }
    }
  }
}
</style>
