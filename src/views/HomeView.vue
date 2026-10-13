<script setup lang="ts">
import { site, ui } from '@/config/site'
import { useHomeFeed } from '@/composables/useHomeFeed'
import TopFiveBox from '@/components/home/TopFiveBox.vue'
import StoryStream from '@/components/home/StoryStream.vue'
import NewsletterBand from '@/components/home/NewsletterBand.vue'
import SkeletonStory from '@/components/news/SkeletonStory.vue'
import StateMessage from '@/components/news/StateMessage.vue'

const { feed, topFive, otherSide, loading, error, isEmpty, reload } = useHomeFeed()
</script>

<template>
  <div class="home">
    <h1 class="visually-hidden">{{ site.name }} — {{ site.tagline }}</h1>

    <div class="home__box">
      <SkeletonStory v-if="loading" :count="1" with-image />
      <StateMessage
        v-else-if="error"
        :title="ui.feed.errorTitle"
        :text="error"
        :action-label="ui.feed.retry"
        @action="reload"
      />
      <StateMessage v-else-if="isEmpty" icon="fa-regular fa-newspaper" :text="ui.feed.empty" />
      <Transition v-else name="reorder" mode="out-in">
        <TopFiveBox :key="feed?.modo" :items="topFive" />
      </Transition>
    </div>

    <div class="home__stream">
      <StoryStream :other-side="otherSide" />
    </div>

    <NewsletterBand class="home__band" />
  </div>
</template>

<style scoped lang="scss">
.home {
  &__box {
    @include container(1080px);
    padding: 14px 12px 0;

    @include from('md') {
      padding: 32px 40px 0;
    }
  }

  &__stream {
    max-width: 712px;
    margin: 0 auto;
    padding: 18px 16px 16px;

    @include from('md') {
      margin-top: 40px;
      padding: 0 16px 44px;
    }
  }

  // La banda negra empalma con el pie: sin el margen que el pie deja arriba.
  &__band {
    margin-bottom: calc(-1 * #{$space-xl});
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }
}
</style>
