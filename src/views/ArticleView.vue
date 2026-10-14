<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ui } from '@/config/site'
import { useArticle } from '@/composables/useArticle'
import { useArticleChain } from '@/composables/useArticleChain'
import { useActiveStory } from '@/composables/useActiveStory'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import ArticleStory from '@/components/news/ArticleStory.vue'
import SkeletonStory from '@/components/news/SkeletonStory.vue'
import StateMessage from '@/components/news/StateMessage.vue'
import RetractionNotice from '@/components/news/RetractionNotice.vue'

/**
 * Página de nota con lectura continua: debajo de la nota sigue la siguiente
 * completa, sin fin, en el orden del modo del lector. La dirección sigue a la
 * nota que se está leyendo.
 */
const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))
const { article, retracted, loading, notFound, error, reload } = useArticle(slug)
const { chain, loading: loadingNext, done, next } = useArticleChain(slug)

const page = ref<HTMLElement | null>(null)
useActiveStory(page)
const scroll = useInfiniteScroll(() => {
  if (article.value) next()
})
// La siguiente nota se pide apenas abre esta: cuando el lector llega al final ya está.
watch(article, (current) => current && next())
</script>

<template>
  <div ref="page" class="article-page">
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

    <div v-else-if="retracted" class="article-page__col">
      <RetractionNotice :article="retracted" />
    </div>

    <template v-else-if="article">
      <ArticleStory class="article-page__col" :article="article" eager />

      <template v-for="item in chain" :key="item.id">
        <p class="article-page__col article-page__next">{{ ui.article.nextStory }}</p>
        <ArticleStory class="article-page__col" :article="item" />
      </template>

      <div v-if="!done" class="article-page__col article-page__more">
        <SkeletonStory v-if="loadingNext" :count="1" />
        <button v-else type="button" class="article-page__more-btn" @click="next">
          {{ ui.article.keepReading }}
        </button>
      </div>
    </template>

    <!-- Fuera de los v-if: el observador lo toma al montar la página. -->
    <div
      :ref="(el) => (scroll.sentinel.value = el as HTMLElement | null)"
      class="article-page__sentinel"
      aria-hidden="true"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.article-page {
  padding-top: 1.75rem;
  padding-bottom: $space-xl;

  @include from('md') {
    padding-top: 3rem;
  }

  // Columna de lectura angosta: ~65 caracteres por línea.
  &__col {
    @include container(760px);
  }

  // Corte entre una nota y la siguiente: una regla gruesa, como en la portada.
  &__next {
    margin-top: 3rem;
    margin-bottom: 1.75rem;
    padding-top: 0.9rem;
    border-top: 3px solid $ink;
    font-family: $font-display;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: $ink-muted;
  }

  &__sentinel {
    height: 1px;
  }

  &__more {
    margin-top: 2rem;
    text-align: center;
  }

  &__more-btn {
    border: 1px solid $ink;
    padding: 11px 22px;
    font-family: $font-display;
    font-weight: 700;
    font-size: 14px;
    border-radius: 3px;
    @include transition(background);
    @include focus-ring;

    &:hover {
      background: $ink;
      color: $paper;
    }
  }
}
</style>
