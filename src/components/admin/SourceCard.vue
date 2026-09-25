<script setup lang="ts">
import { admin, sourceCategoryLabels, sourceKindLabels } from '@/config/admin'
import { timeAgo } from '@/composables/admin/format'
import AdminBadge from './AdminBadge.vue'
import type { Source } from '@/types'

defineProps<{ source: Source }>()
const emit = defineEmits<{ edit: []; toggle: []; remove: [] }>()
</script>

<template>
  <article class="source" :class="{ 'source--off': !source.isActive }">
    <header class="source__head">
      <h3 class="source__name">{{ source.name }}</h3>
      <label class="source__switch" :title="admin.sources.isActive">
        <input type="checkbox" :checked="source.isActive" @click.prevent="emit('toggle')" />
        <span class="source__track"></span>
        <span class="visually-hidden">{{ admin.sources.isActive }}</span>
      </label>
    </header>

    <div class="source__tags">
      <AdminBadge tone="accent">{{ sourceKindLabels[source.kind] }}</AdminBadge>
      <AdminBadge tone="muted">{{ sourceCategoryLabels[source.category] }}</AdminBadge>
      <AdminBadge tone="info">x{{ source.weight }}</AdminBadge>
    </div>

    <p class="source__target">
      <template v-if="source.kind === 'perplexity'"
        ><i class="fa-solid fa-magnifying-glass"></i> {{ source.query }}</template
      >
      <a v-else :href="source.url" target="_blank" rel="noopener">{{ source.url }}</a>
    </p>

    <p class="source__checked">
      <i class="fa-regular fa-clock"></i> {{ admin.sources.lastChecked }}:
      {{ source.lastCheckedAt ? timeAgo(source.lastCheckedAt) : admin.sources.never }}
    </p>
    <p v-if="source.lastError" class="source__error">
      <i class="fa-solid fa-triangle-exclamation"></i> {{ source.lastError }}
    </p>

    <footer class="source__actions">
      <button type="button" @click="emit('edit')">
        <i class="fa-solid fa-pen"></i> {{ admin.sources.editTitle }}
      </button>
      <button type="button" class="source__delete" @click="emit('remove')">
        <i class="fa-solid fa-trash"></i> {{ admin.delete }}
      </button>
    </footer>
  </article>
</template>

<style scoped lang="scss">
.source {
  @include card;
  @include flex(column, stretch, flex-start, 0.55rem);
  padding: 0.9rem 1rem;

  &--off {
    opacity: 0.65;
  }

  &__head {
    @include flex(row, flex-start, space-between, 0.75rem);
  }

  &__name {
    font-size: $text-base;
    font-weight: 700;
    line-height: 1.25;
  }

  &__switch {
    position: relative;
    margin: 0;
    flex: 0 0 auto;
    cursor: pointer;

    input {
      position: absolute;
      opacity: 0;
      width: 1px;
      height: 1px;
    }
  }

  &__track {
    display: block;
    width: 2.4rem;
    height: 1.35rem;
    border-radius: $radius-pill;
    background: $line;
    position: relative;
    @include transition(background);

    &::after {
      content: '';
      position: absolute;
      top: 0.15rem;
      left: 0.15rem;
      width: 1.05rem;
      height: 1.05rem;
      border-radius: 50%;
      background: $surface;
      box-shadow: $shadow-sm;
      @include transition(transform);
    }
  }

  &__switch input:checked + &__track {
    background: $success;

    &::after {
      transform: translateX(1.05rem);
    }
  }

  &__switch input:focus-visible + &__track {
    outline: 2px solid $accent;
    outline-offset: 2px;
  }

  &__tags {
    @include flex(row, center, flex-start, 0.35rem);
    flex-wrap: wrap;
  }

  &__target {
    font-size: $text-xs;
    color: $ink-soft;
    word-break: break-all;

    a {
      color: $accent-deep;
    }
  }

  &__checked {
    font-size: $text-xs;
    color: $ink-muted;
  }

  &__error {
    font-size: $text-xs;
    color: $stamp;
    background: $stamp-soft;
    padding: 0.4rem 0.6rem;
    border-radius: 8px;
  }

  &__actions {
    @include flex(row, center, flex-start, 1rem);
    margin-top: auto;
    padding-top: 0.55rem;
    border-top: 1px solid $line;

    button {
      font-size: $text-sm;
      font-weight: 600;
      color: $ink-soft;
      padding: 0.3rem 0;
    }
  }

  &__delete {
    color: $stamp !important;
    margin-left: auto;
  }
}
</style>
