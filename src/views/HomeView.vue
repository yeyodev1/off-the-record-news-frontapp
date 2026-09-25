<script setup lang="ts">
import { site } from '@/config/site'
import { useHomeFeed } from '@/composables/useHomeFeed'
import BreakingBar from '@/components/news/BreakingBar.vue'
import LeadStory from '@/components/news/LeadStory.vue'
import ArticleCard from '@/components/news/ArticleCard.vue'
import SectionBlock from '@/components/news/SectionBlock.vue'
import SectionHeading from '@/components/news/SectionHeading.vue'
import SubscribeBox from '@/components/news/SubscribeBox.vue'
import SkeletonStory from '@/components/news/SkeletonStory.vue'
import StateMessage from '@/components/news/StateMessage.vue'
import { ui } from '@/config/site'
import { computed } from 'vue'

const { feed, latest, sections, loading, error, isEmpty, reload } = useHomeFeed()

// La columna lateral se corta para que no quede más alta que la principal;
// el resto baja bajo la nota principal como tarjetas con foto.
const SIDEBAR_COUNT = 5
const sidebar = computed(() => latest.value.slice(0, SIDEBAR_COUNT))
const more = computed(() => latest.value.slice(SIDEBAR_COUNT))
</script>

<template>
  <div class="home">
    <BreakingBar v-if="feed?.breaking?.length" :items="feed.breaking" />

    <h1 class="visually-hidden">{{ site.name }} — {{ site.tagline }}</h1>

    <div class="home__inner">
      <div v-if="loading" class="home__top">
        <div class="home__lead"><SkeletonStory :count="1" with-image /></div>
        <div class="home__latest"><SkeletonStory :count="3" /></div>
      </div>

      <StateMessage
        v-else-if="error"
        :title="ui.feed.errorTitle"
        :text="error"
        :action-label="ui.feed.retry"
        @action="reload"
      />

      <StateMessage v-else-if="isEmpty" icon="fa-regular fa-newspaper" :text="ui.feed.empty" />

      <template v-else>
        <div class="home__top">
          <div v-if="feed?.lead || more.length" class="home__lead">
            <LeadStory v-if="feed?.lead" :article="feed.lead" />

            <section v-if="more.length" class="home__more" :aria-label="ui.feed.more">
              <SectionHeading :title="ui.feed.more" tag="h2" />
              <div class="home__grid">
                <ArticleCard v-for="item in more" :key="item.id" :article="item" with-image />
              </div>
            </section>
          </div>

          <section v-if="sidebar.length" class="home__latest" :aria-label="site.labels.latest">
            <SectionHeading :title="site.labels.latest" tag="h2" />
            <ol class="home__stream">
              <li v-for="item in sidebar" :key="item.id">
                <ArticleCard :article="item" variant="brief" />
              </li>
            </ol>
          </section>
        </div>

        <SubscribeBox class="home__subscribe" />

        <SectionBlock
          v-for="block in sections"
          :key="block.section"
          :section="block.section"
          :items="block.items"
          class="home__section"
        />
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  &__inner {
    @include container;
    @include flex(column, stretch, flex-start, $space-xl);
    padding-top: 1.75rem;

    @include from('md') {
      padding-top: 2.5rem;
    }
  }

  &__top {
    @include flex(column, stretch, flex-start, $space-lg);

    @include from('lg') {
      flex-direction: row;
      align-items: flex-start;
      gap: 3rem;
    }
  }

  &__lead {
    flex: 1 1 62%;
    min-width: 0;
    @include flex(column, stretch, flex-start, $space-xl);
  }

  &__more {
    @include flex(column, stretch, flex-start, 1.25rem);
  }

  &__grid {
    @include flex-cards(260px, 2rem 1.75rem);
  }

  &__latest {
    flex: 1 1 38%;
    min-width: 0;

    @include from('lg') {
      padding-left: 3rem;
      border-left: 1px solid $line;
    }
  }

  &__stream {
    list-style: none;
    @include flex(column, stretch, flex-start, 1.5rem);

    > li + li {
      padding-top: 1.5rem;
      border-top: 1px solid $line;
    }
  }
}
</style>
