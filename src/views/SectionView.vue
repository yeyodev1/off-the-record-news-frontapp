<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { site } from '@/config/site'
import { useSectionFeed } from '@/composables/useSectionFeed'
import ArticleCard from '@/components/news/ArticleCard.vue'
import SkeletonStory from '@/components/news/SkeletonStory.vue'
import StateMessage from '@/components/news/StateMessage.vue'
import SmartLabel from '@/components/news/SmartLabel.vue'
import { ui } from '@/components/news/uiCopy'
import type { Section } from '@/types'

const route = useRoute()
const section = computed(() => String(route.params.section ?? ''))
const { items, name, isValid, hasMore, loading, loadingMore, error, reload, loadMore } = useSectionFeed(section)

const allSections = Object.entries(site.sections) as [Section, string][]
</script>

<template>
  <div class="section-page">
    <StateMessage
      v-if="!isValid"
      icon="fa-regular fa-compass"
      :title="ui.section.notFoundTitle"
      :text="ui.section.notFoundText"
    >
      <ul class="section-page__all">
        <li v-for="[slug, label] in allSections" :key="slug">
          <RouterLink :to="`/seccion/${slug}`">{{ label }}</RouterLink>
        </li>
      </ul>
    </StateMessage>

    <template v-else>
      <header class="section-page__head">
        <SmartLabel>{{ site.name }}</SmartLabel>
        <h1 class="section-page__title">{{ name }}</h1>
      </header>

      <SkeletonStory v-if="loading" :count="4" />

      <StateMessage
        v-else-if="error && !items.length"
        :title="ui.feed.errorTitle"
        :text="error"
        :action-label="ui.feed.retry"
        @action="reload"
      />

      <StateMessage v-else-if="!items.length" icon="fa-regular fa-newspaper" :text="ui.feed.empty" />

      <template v-else>
        <ol class="section-page__list">
          <li v-for="item in items" :key="item.id">
            <ArticleCard :article="item" variant="brief" with-image :show-section="false" />
          </li>
        </ol>

        <p v-if="error" class="section-page__error" role="alert">{{ error }}</p>

        <button
          v-if="hasMore"
          type="button"
          class="btn btn--ghost section-page__more"
          :disabled="loadingMore"
          @click="loadMore"
        >
          {{ loadingMore ? ui.feed.loadingMore : ui.feed.loadMore }}
        </button>
      </template>
    </template>
  </div>
</template>

<style scoped lang="scss">
.section-page {
  @include container(760px);
  @include flex(column, stretch, flex-start, 2rem);
  padding-top: 2rem;

  @include from('md') {
    padding-top: 3rem;
  }

  &__head {
    @include flex(column, stretch, flex-start, 0.4rem);
    border-bottom: 4px solid $ink;
    padding-bottom: 1rem;
  }

  &__title {
    font-size: $display-lg;
    font-weight: 900;
    letter-spacing: -0.04em;
    line-height: 0.95;
  }

  &__list {
    list-style: none;
    @include flex(column, stretch, flex-start, 2rem);

    > li + li {
      padding-top: 2rem;
      border-top: 1px solid $line;
    }
  }

  &__error {
    color: $ink;
    border-left: 3px solid $stamp;
    padding-left: 0.6rem;
    font-weight: 600;
    align-self: flex-start;
  }

  &__more {
    align-self: center;
    border-radius: 0;
    min-width: 12rem;
  }

  &__all {
    list-style: none;
    @include flex(row, center, center, 0.5rem);
    flex-wrap: wrap;
    margin-top: 0.5rem;

    a {
      display: inline-block;
      padding: 0.45rem 0.8rem;
      border: 1px solid $ink;
      font-size: $text-sm;
      font-weight: 600;

      &:hover {
        background: $ink;
        color: $paper;
      }
    }
  }
}
</style>
