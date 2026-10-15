<script setup lang="ts">
import { computed } from 'vue'
import { admin } from '@/config/admin'
import type { MesaLive } from '@/types'

const props = defineProps<{ sources: MesaLive['sources'] }>()
const t = admin.mesa.sources

const numbers = computed(() => [
  { value: props.sources.active, label: t.active },
  { value: props.sources.rss, label: t.rss },
  { value: props.sources.search, label: t.search },
  { value: props.sources.checked24h, label: t.checked },
])
</script>

<template>
  <section class="msources">
    <header class="msources__head">
      <h2 class="msources__title">{{ t.title }}</h2>
      <RouterLink to="/admin/fuentes" class="msources__link">
        {{ t.manage }} <i class="fa-solid fa-arrow-right"></i>
      </RouterLink>
    </header>
    <ul class="msources__numbers">
      <li v-for="n in numbers" :key="n.label">
        <strong>{{ n.value }}</strong> <span>{{ n.label }}</span>
      </li>
    </ul>
    <details v-if="sources.withErrors.length" class="msources__errors">
      <summary>
        <i class="fa-solid fa-triangle-exclamation"></i> {{ t.errors }} ({{
          sources.withErrors.length
        }})
      </summary>
      <ul>
        <li v-for="s in sources.withErrors" :key="s.name">
          <strong>{{ s.name }}</strong
          >: {{ s.lastError }}
        </li>
      </ul>
    </details>
  </section>
</template>

<style scoped lang="scss">
.msources {
  @include card;
  @include flex(column, stretch, flex-start, 0.7rem);
  padding: 0.9rem 1rem;

  &__head {
    @include flex(row, center, space-between, 0.5rem);
  }

  &__title {
    @include display($text-base, 700);
  }

  &__link {
    font-size: $text-xs;
    font-weight: 600;
    color: $accent-deep;
  }

  &__numbers {
    @include flex(row, baseline, flex-start, 0.4rem 1.2rem);
    flex-wrap: wrap;
    font-size: $text-sm;
    color: $ink-muted;

    strong {
      font-family: $font-display;
      font-size: $text-lg;
      color: $ink;
    }
  }

  &__errors {
    font-size: $text-xs;
    color: $ink-soft;

    summary {
      cursor: pointer;
      font-weight: 700;
      color: darken($warning, 14%);
    }

    ul {
      @include flex(column, stretch, flex-start, 0.3rem);
      margin-top: 0.5rem;
      max-height: 12rem;
      overflow-y: auto;
    }
  }
}
</style>
