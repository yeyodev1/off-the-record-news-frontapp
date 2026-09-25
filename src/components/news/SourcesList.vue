<script setup lang="ts">
import { computed } from 'vue'
import { ui } from '@/config/site'
import { groupSources } from '@/utils/sources'
import SmartLabel from './SmartLabel.vue'
import type { ArticleSource } from '@/types'

const props = defineProps<{ sources: ArticleSource[] }>()

const groups = computed(() => groupSources(props.sources))
</script>

<template>
  <section class="sources" :aria-label="ui.sources.title">
    <div class="sources__head">
      <SmartLabel tag="h2">
        <i class="fa-solid fa-circle-check" aria-hidden="true"></i> {{ ui.sources.title }}
      </SmartLabel>
      <p class="sources__note">{{ ui.sources.note(groups.length) }}</p>
    </div>

    <ul class="sources__list">
      <li v-for="group in groups" :key="group.name" class="sources__group">
        <div class="sources__who">
          <strong>{{ group.name }}</strong>
          <span v-if="group.domain">{{ group.domain }}</span>
        </div>

        <div v-for="item in group.items" :key="item.url || group.name" class="sources__item">
          <p v-if="item.summary" class="sources__quote">{{ item.summary }}</p>
          <p v-else class="sources__empty">{{ ui.sources.noSummary }}</p>
          <a v-if="item.url" :href="item.url" target="_blank" rel="noopener noreferrer">
            {{ ui.sources.readAt(group.name) }}
            <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
          </a>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.sources {
  @include flex(column, stretch, flex-start, 1rem);

  &__head {
    @include flex(column, flex-start, flex-start, 0.35rem);

    i {
      color: $success;
      margin-right: 0.2rem;
    }
  }

  &__note {
    font-size: $text-sm;
    color: $ink-soft;
    max-width: 60ch;
  }

  &__list {
    list-style: none;
    @include flex(column, stretch, flex-start, 0);
    border: 1px solid $line;
  }

  &__group {
    @include flex(column, stretch, flex-start, 0.75rem);
    padding: 1rem;

    & + & {
      border-top: 1px solid $line;
    }

    @include from('md') {
      padding: 1.1rem 1.25rem;
    }
  }

  &__who {
    @include flex(row, baseline, flex-start, 0.25rem 0.6rem);
    flex-wrap: wrap;

    strong {
      font-weight: 700;
    }

    span {
      font-size: $text-xs;
      color: $ink-muted;
    }
  }

  &__item {
    @include flex(column, flex-start, flex-start, 0.4rem);
    padding-left: 0.9rem;
    border-left: 2px solid $line;

    a {
      font-size: $text-sm;
      font-weight: 600;
      color: $accent-deep;
      text-decoration: underline;
      text-underline-offset: 3px;
      @include focus-ring;

      &:hover {
        color: $ink;
      }
    }

    i {
      font-size: 0.65rem;
      margin-left: 0.15rem;
    }
  }

  &__quote {
    font-size: $text-sm;
    color: $ink-soft;
    line-height: 1.55;
    max-width: 62ch;

    &::before {
      content: '«';
      margin-right: 0.1em;
    }

    &::after {
      content: '»';
      margin-left: 0.1em;
    }
  }

  &__empty {
    font-size: $text-xs;
    color: $ink-muted;
    font-style: italic;
  }
}
</style>
