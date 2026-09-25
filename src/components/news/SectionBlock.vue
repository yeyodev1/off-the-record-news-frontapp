<script setup lang="ts">
import { site } from '@/config/site'
import SectionHeading from './SectionHeading.vue'
import ArticleCard from './ArticleCard.vue'
import { ui } from '@/config/site'
import type { ArticleCard as Card, Section } from '@/types'

defineProps<{ section: Section; items: Card[] }>()
</script>

<template>
  <section class="block">
    <SectionHeading
      :title="site.sections[section] ?? section"
      :to="`/seccion/${section}`"
      :link-label="ui.feed.seeSection"
    />
    <div class="block__cards">
      <ArticleCard
        v-for="(item, index) in items.slice(0, 4)"
        :key="item.id"
        :article="item"
        :with-image="index === 0"
        :show-section="false"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.block {
  &__cards {
    @include flex-cards(230px, 1.75rem 2rem);

    > * + * {
      padding-top: 1.5rem;
      border-top: 1px solid $line;

      @include from('md') {
        padding-top: 0;
        border-top: 0;
      }
    }
  }
}
</style>
