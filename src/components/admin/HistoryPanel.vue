<script setup lang="ts">
import { computed } from 'vue'
import { admin } from '@/config/admin'
import { formatDateTime } from '@/composables/admin/format'
import type { HistoryEntry } from '@/types'

/** Quién hizo qué con la nota. Es también el material del optimizador semanal. */
const props = defineProps<{ history: HistoryEntry[] }>()

const entries = computed(() => [...props.history].reverse())
</script>

<template>
  <details class="history">
    <summary>{{ admin.history.title }} ({{ history.length }})</summary>
    <ol>
      <li v-for="(entry, i) in entries" :key="i">
        <strong>{{ entry.action.replace(/_/g, ' ') }}</strong>
        · {{ entry.by }} · {{ formatDateTime(entry.at) }}
        <span v-if="entry.note" class="history__note">{{ entry.note }}</span>
      </li>
    </ol>
  </details>
</template>

<style scoped lang="scss">
.history {
  font-size: $text-xs;
  color: $ink-soft;

  summary {
    cursor: pointer;
    font-family: $font-principal;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: $ink;
  }

  ol {
    list-style: none;
    @include flex(column, stretch, flex-start, 0.45rem);
    margin-top: 0.7rem;
  }

  strong {
    text-transform: capitalize;
    color: $ink;
  }

  &__note {
    display: block;
    color: $ink-muted;
  }
}
</style>
