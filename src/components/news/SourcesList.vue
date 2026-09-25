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
      <li v-for="group in groups" :key="group.name" class="sources__item">
        <div class="sources__who">
          <strong>{{ group.name }}</strong>
          <span v-if="group.domain">{{ group.domain }}</span>
        </div>
        <div v-if="group.urls.length" class="sources__links">
          <a
            v-for="(url, i) in group.urls"
            :key="url"
            :href="url"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ group.urls.length > 1 ? ui.sources.nth(i + 1) : ui.sources.open }}
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

  &__item {
    @include flex(column, flex-start, flex-start, 0.5rem);
    padding: 0.85rem 1rem;

    & + & {
      border-top: 1px solid $line;
    }

    @include from('sm') {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
  }

  &__who {
    @include flex(column, flex-start, flex-start, 0.1rem);
    min-width: 0;

    strong {
      font-weight: 700;
    }

    span {
      font-size: $text-xs;
      color: $ink-muted;
    }
  }

  &__links {
    @include flex(row, center, flex-start, 0.4rem 1rem);
    flex-wrap: wrap;
    font-size: $text-sm;
    font-weight: 600;

    a {
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
}
</style>
