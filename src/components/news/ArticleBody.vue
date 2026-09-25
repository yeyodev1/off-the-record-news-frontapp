<script setup lang="ts">
import { site } from '@/config/site'
import SmartBlock from './SmartBlock.vue'
import InfographicBars from './InfographicBars.vue'
import GoDeeper from './GoDeeper.vue'
import type { Article } from '@/types'

defineProps<{ article: Article }>()
</script>

<template>
  <div class="body">
    <p class="body__lede">{{ article.lede }}</p>

    <SmartBlock v-if="article.whyItMatters" :label="site.labels.whyItMatters" :text="article.whyItMatters" />
    <SmartBlock v-if="article.bigPicture" :label="site.labels.bigPicture" :text="article.bigPicture" />
    <SmartBlock v-if="article.keyPoints?.length" :label="site.labels.keyPoints" :items="article.keyPoints" />
    <InfographicBars v-if="article.infographic?.items?.length" :data="article.infographic" />
    <SmartBlock v-if="article.whatsNext" :label="site.labels.whatsNext" :text="article.whatsNext" />

    <GoDeeper
      v-if="article.locked || article.body?.length"
      :body="article.body ?? []"
      :locked="Boolean(article.locked)"
    />
  </div>
</template>

<style scoped lang="scss">
.body {
  @include flex(column, stretch, flex-start, 1.75rem);

  &__lede {
    font-size: $text-lg;
    line-height: 1.5;
    font-weight: 500;
  }
}
</style>
