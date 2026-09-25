<script setup lang="ts">
import { site } from '@/config/site'
import SmartLabel from './SmartLabel.vue'
import type { ArticleSource } from '@/types'

defineProps<{ sources: ArticleSource[] }>()
</script>

<template>
  <section class="sources">
    <SmartLabel tag="h2" tone="muted">{{ site.labels.sources }}</SmartLabel>
    <ul class="sources__list">
      <li v-for="source in sources" :key="source.url || source.name">
        <a v-if="source.url" :href="source.url" target="_blank" rel="noopener noreferrer">
          {{ source.name }} <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
        </a>
        <span v-else>{{ source.name }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.sources {
  @include flex(column, stretch, flex-start, 0.6rem);

  &__list {
    list-style: none;
    @include flex(row, center, flex-start, 0.5rem 1.25rem);
    flex-wrap: wrap;
    font-size: $text-sm;
    color: $ink-soft;

    a {
      text-decoration: underline;
      text-decoration-color: $line;
      text-underline-offset: 3px;

      &:hover {
        color: $ink;
        text-decoration-color: $ink;
      }
    }

    i {
      font-size: 0.65rem;
      margin-left: 0.15rem;
    }
  }
}
</style>
