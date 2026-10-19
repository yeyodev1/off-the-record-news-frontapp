<script setup lang="ts">
import { admin } from '@/config/admin'
import { formatDateTime } from '@/composables/admin/format'
import type { McpChange, McpRepo } from '@/types'

defineProps<{ changes: McpChange[]; repos: Record<McpRepo, string> }>()

const t = admin.connector
</script>

<template>
  <section class="log">
    <h2 class="log__title">{{ t.logTitle }}</h2>
    <p v-if="!changes.length" class="log__empty">{{ t.logEmpty }}</p>
    <ul v-else class="log__list">
      <li v-for="change in changes" :key="change.id" class="log__item">
        <div class="log__head">
          <span class="log__repo" :class="`log__repo--${change.repo}`">{{ change.repo }}</span>
          <span v-if="change.kind === 'deshacer'" class="log__undo">{{ t.undo }}</span>
          <b class="log__message">{{ change.message }}</b>
        </div>
        <p class="log__meta">
          {{ change.email }} · {{ formatDateTime(change.createdAt) }} ·
          <a :href="change.url" target="_blank" rel="noopener"
            >{{ t.viewCommit }} ({{ change.sha.slice(0, 7) }})</a
          >
        </p>
        <p class="log__files" :title="repos[change.repo]">{{ change.files.join(' · ') }}</p>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.log {
  @include flex(column, stretch, flex-start, 0.8rem);

  &__title {
    @include display($text-lg, 800);
  }

  &__empty {
    font-size: $text-sm;
    color: $ink-muted;
  }

  &__list {
    @include card;
    list-style: none;
    padding: 0;
  }

  &__item {
    @include flex(column, stretch, flex-start, 0.25rem);
    padding: 0.8rem 1rem;
    min-width: 0;

    & + & {
      border-top: 1px solid $line;
    }
  }

  &__head {
    @include flex(row, center, flex-start, 0.45rem);
    flex-wrap: wrap;
  }

  &__repo,
  &__undo {
    font-size: $text-xs;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 0.15rem 0.45rem;
    border-radius: 6px;
    background: $cream-2;
  }

  &__repo--front {
    color: $accent-deep;
    background: $accent-soft;
  }

  &__undo {
    color: $stamp-deep;
    background: $stamp-soft;
  }

  &__message {
    font-size: $text-sm;
    min-width: 0;
  }

  &__meta,
  &__files {
    font-size: $text-xs;
    color: $ink-muted;
    overflow-wrap: anywhere;
  }

  &__meta a {
    color: $accent;
  }
}
</style>
