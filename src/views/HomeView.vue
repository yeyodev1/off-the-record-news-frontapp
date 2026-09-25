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

const { feed, latest, sections, loading, error, isEmpty, reload } = useHomeFeed()
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
          <div v-if="feed?.lead" class="home__lead">
            <LeadStory :article="feed.lead" />
          </div>

          <section v-if="latest.length" class="home__latest" :aria-label="site.labels.latest">
            <SectionHeading :title="site.labels.latest" tag="h2" />
            <ol class="home__stream">
              <li v-for="item in latest" :key="item.id">
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
