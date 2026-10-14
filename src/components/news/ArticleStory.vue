<script setup lang="ts">
import { computed } from 'vue'
import { site } from '@/config/site'
import { visibleImage } from '@/utils/media'
import ArticleHeader from './ArticleHeader.vue'
import ArticleUpdates from './ArticleUpdates.vue'
import ArticleFigure from './ArticleFigure.vue'
import ArticleBody from './ArticleBody.vue'
import SourcesList from './SourcesList.vue'
import ShareBar from './ShareBar.vue'
import type { Article } from '@/types'

/** Una nota completa. La página de nota encadena varias, una debajo de otra. */
const props = withDefaults(defineProps<{ article: Article; eager?: boolean }>(), { eager: false })

// El enlace que se comparte es el canónico del sitio, no el del túnel de desarrollo.
const shareUrl = computed(() => `${site.url}/nota/${props.article.slug}`)
const image = computed(() => visibleImage(props.article.image))
</script>

<template>
  <article class="story" :data-slug="article.slug" :data-title="article.title">
    <ArticleHeader :article="article" />
    <ArticleUpdates v-if="article.updates?.length" :updates="article.updates" />
    <ArticleFigure v-if="image" :image="image" :alt="article.title" :eager="eager" />
    <ArticleBody :article="article" />
    <SourcesList v-if="article.sources?.length" :sources="article.sources" />
    <ShareBar :url="shareUrl" :title="article.title" />
  </article>
</template>

<style scoped lang="scss">
.story {
  @include flex(column, stretch, flex-start, 1.75rem);
}
</style>
