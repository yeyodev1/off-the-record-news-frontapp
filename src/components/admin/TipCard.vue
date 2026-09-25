<script setup lang="ts">
import { admin, tipStatusLabels } from '@/config/admin'
import { formatDateTime } from '@/composables/admin/format'
import AdminBadge from './AdminBadge.vue'
import type { Tip } from '@/types'

defineProps<{ tip: Tip; busy?: 'status' | 'draft' | null }>()
const emit = defineEmits<{ status: [status: Tip['status']]; draft: [] }>()

const t = admin.tips
</script>

<template>
  <article class="tip" :class="{ 'tip--new': tip.status === 'new' }">
    <header class="tip__head">
      <AdminBadge :tone="tipStatusLabels[tip.status].tone">{{
        tipStatusLabels[tip.status].label
      }}</AdminBadge>
      <span class="tip__channel">
        <i :class="tip.channel === 'telegram' ? 'fa-brands fa-telegram' : 'fa-solid fa-globe'"></i>
        {{ tip.channel === 'telegram' ? 'Telegram' : 'Web' }}
      </span>
      <span class="tip__date">{{ formatDateTime(tip.createdAt) }}</span>
    </header>

    <p class="tip__who">
      <strong>{{ tip.name || t.anonymous }}</strong>
      <span v-if="tip.contact">{{ tip.contact }}</span>
    </p>

    <p class="tip__text">{{ tip.text }}</p>

    <div v-if="tip.mediaUrls.length" class="tip__media">
      <span>{{ t.media }}:</span>
      <a v-for="(url, i) in tip.mediaUrls" :key="url" :href="url" target="_blank" rel="noopener">
        <i class="fa-solid fa-paperclip"></i> {{ i + 1 }}
      </a>
    </div>

    <footer class="tip__actions">
      <select
        :value="tip.status"
        :aria-label="t.changeStatus"
        :disabled="Boolean(busy)"
        class="tip__select"
        @change="emit('status', ($event.target as HTMLSelectElement).value as Tip['status'])"
      >
        <option v-for="(meta, key) in tipStatusLabels" :key="key" :value="key">
          {{ meta.label }}
        </option>
      </select>
      <button
        class="tip__btn"
        type="button"
        :disabled="Boolean(busy) || tip.status === 'used'"
        @click="emit('draft')"
      >
        <i class="fa-solid" :class="busy === 'draft' ? 'fa-spinner fa-spin' : 'fa-pen-nib'"></i>
        {{ busy === 'draft' ? t.converting : t.toArticle }}
      </button>
    </footer>
  </article>
</template>

<style scoped lang="scss">
.tip {
  @include card;
  @include flex(column, stretch, flex-start, 0.6rem);
  padding: 0.9rem 1rem;

  &--new {
    border-left: 3px solid $stamp;
  }

  &__head {
    @include flex(row, center, flex-start, 0.5rem);
    flex-wrap: wrap;
    font-size: $text-xs;
  }

  &__channel {
    color: $ink-soft;
    font-weight: 600;
  }

  &__date {
    margin-left: auto;
    color: $ink-muted;
  }

  &__who {
    @include flex(row, baseline, flex-start, 0.2rem 0.6rem);
    flex-wrap: wrap;
    font-size: $text-sm;

    span {
      color: $ink-muted;
      font-size: $text-xs;
    }
  }

  &__text {
    font-size: $text-sm;
    white-space: pre-line;
  }

  &__media {
    @include flex(row, center, flex-start, 0.6rem);
    flex-wrap: wrap;
    font-size: $text-xs;
    color: $ink-muted;

    a {
      color: $accent-deep;
      font-weight: 600;
    }
  }

  &__actions {
    @include flex(row, center, flex-start, 0.5rem);
    flex-wrap: wrap;
    padding-top: 0.6rem;
    border-top: 1px solid $line;
  }

  &__select {
    flex: 1 1 140px;
    width: auto;
    padding: 0.5rem 0.7rem;
    font-size: $text-sm;
  }

  &__btn {
    @include flex(row, center, center, 0.4rem);
    flex: 1 1 180px;
    min-height: 2.5rem;
    padding: 0.45rem 1rem;
    font-size: $text-sm;
    font-weight: 600;
    background: $ink;
    color: $surface;
    border-radius: $radius-pill;

    &:disabled {
      opacity: 0.45;
      pointer-events: none;
    }
  }
}
</style>
