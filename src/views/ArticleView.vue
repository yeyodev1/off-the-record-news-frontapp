<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { site } from '@/config/site'
import { useArticle } from '@/composables/useArticle'
import ArticleHeader from '@/components/news/ArticleHeader.vue'
import ArticleFigure from '@/components/news/ArticleFigure.vue'
import ArticleBody from '@/components/news/ArticleBody.vue'
import SourcesList from '@/components/news/SourcesList.vue'
import ShareBar from '@/components/news/ShareBar.vue'
import ArticleCard from '@/components/news/ArticleCard.vue'
import SectionHeading from '@/components/news/SectionHeading.vue'
import SkeletonStory from '@/components/news/SkeletonStory.vue'
import StateMessage from '@/components/news/StateMessage.vue'
import { ui } from '@/config/site'

const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))
const { article, related, loading, notFound, error, reload } = useArticle(slug)

// El enlace que se comparte es el canónico del sitio, no el del túnel de desarrollo.
const shareUrl = computed(() => `${site.url}/nota/${slug.value}`)
const sectionName = computed(() => (article.value ? site.sections[article.value.section] : ''))
</script>

<template>
  <div class="article-page">
    <div v-if="loading" class="article-page__col">
      <SkeletonStory :count="1" with-image />
    </div>

    <StateMessage
      v-else-if="notFound"
      class="article-page__col"
      icon="fa-regular fa-file-lines"
      :title="ui.article.notFoundTitle"
      :text="ui.article.notFoundText"
    >
      <RouterLink to="/" class="btn btn--dark">{{ ui.article.backHome }}</RouterLink>
    </StateMessage>

    <StateMessage
      v-else-if="error"
      class="article-page__col"
      :title="ui.feed.errorTitle"
      :text="error"
      :action-label="ui.feed.retry"
      @action="reload"
    />

    <template v-else-if="article">
      <article class="article-page__col article-page__story">
        <ArticleHeader :article="article" />
        <ArticleFigure v-if="article.image" :image="article.image" :alt="article.title" eager />
        <ArticleBody :article="article" />
        <SourcesList v-if="article.sources?.length" :sources="article.sources" />
        <ShareBar :url="shareUrl" :title="article.title" />
      </article>

      <section v-if="related.length" class="article-page__related">
        <SectionHeading
          :title="`${ui.article.related} ${sectionName}`"
          :to="`/seccion/${article.section}`"
          :link-label="ui.feed.seeSection"
        />
        <div class="article-page__cards">
          <ArticleCard v-for="item in related" :key="item.id" :article="item" with-image :show-section="false" />
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped lang="scss">
.article-page {
  padding-top: 1.75rem;

  @include from('md') {
    padding-top: 3rem;
  }

  // Columna de lectura angosta: ~65 caracteres por línea.
  &__col {
    @include container(760px);
  }

  &__story {
    @include flex(column, stretch, flex-start, 1.75rem);
  }

  &__related {
    @include container;
    margin-top: $space-xl;
  }

  &__cards {
    @include flex-cards(220px, 2rem);
  }
}
</style>
