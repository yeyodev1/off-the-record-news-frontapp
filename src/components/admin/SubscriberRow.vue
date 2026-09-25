<script setup lang="ts">
import { admin, planLabels, subscriberStatusLabels } from '@/config/admin'
import { site } from '@/config/site'
import { formatDate } from '@/utils/format'
import AdminBadge from './AdminBadge.vue'
import type { Subscriber } from '@/types'

defineProps<{ subscriber: Subscriber; busy?: boolean }>()
const emit = defineEmits<{ activate: []; cancel: [] }>()
</script>

<template>
  <article class="sub">
    <div class="sub__main">
      <div class="sub__who">
        <strong>{{ subscriber.name || subscriber.email }}</strong>
        <span v-if="subscriber.name">{{ subscriber.email }}</span>
        <span v-if="subscriber.company"
          ><i class="fa-solid fa-building"></i> {{ subscriber.company }}</span
        >
      </div>
      <div class="sub__meta">
        <AdminBadge :tone="subscriberStatusLabels[subscriber.status].tone">
          {{ subscriberStatusLabels[subscriber.status].label }}
        </AdminBadge>
        <AdminBadge :tone="subscriber.plan === 'pro' ? 'warning' : 'accent'">{{
          planLabels[subscriber.plan]
        }}</AdminBadge>
        <span v-if="subscriber.editions.length">
          {{ subscriber.editions.map((e) => site.editions[e].name).join(' · ') }}
        </span>
        <span v-if="subscriber.status === 'active'">
          {{ admin.subscribers.paidUntil }}:
          {{
            subscriber.paidUntil
              ? formatDate(subscriber.paidUntil)
              : admin.subscribers.noExpiryLabel
          }}
        </span>
        <span>{{ formatDate(subscriber.createdAt) }}</span>
      </div>
    </div>
    <div class="sub__actions">
      <button
        class="sub__btn sub__btn--primary"
        type="button"
        :disabled="busy"
        @click="emit('activate')"
      >
        <i class="fa-solid fa-check"></i> {{ admin.subscribers.activate }}
      </button>
      <button
        v-if="subscriber.status === 'active' || subscriber.status === 'pending_payment'"
        class="sub__btn sub__btn--danger"
        type="button"
        :disabled="busy"
        @click="emit('cancel')"
      >
        <i class="fa-solid fa-ban"></i>
        <span class="visually-hidden">{{ admin.subscribers.cancel }}</span>
      </button>
    </div>
  </article>
</template>

<style scoped lang="scss">
.sub {
  @include flex(column, stretch, flex-start, 0.7rem);
  padding: 0.85rem 1rem;
  background: $surface;

  & + & {
    border-top: 1px solid $line;
  }

  @include from('md') {
    flex-direction: row;
    align-items: center;
  }

  &__main {
    flex: 1;
    min-width: 0;
    @include flex(column, stretch, flex-start, 0.35rem);
  }

  &__who {
    @include flex(row, baseline, flex-start, 0.2rem 0.7rem);
    flex-wrap: wrap;
    font-size: $text-sm;

    span {
      color: $ink-muted;
      font-size: $text-xs;
      word-break: break-all;
    }
  }

  &__meta {
    @include flex(row, center, flex-start, 0.3rem 0.7rem);
    flex-wrap: wrap;
    font-size: $text-xs;
    color: $ink-muted;
  }

  &__actions {
    @include flex(row, center, flex-end, 0.4rem);
  }

  &__btn {
    @include flex(row, center, center, 0.4rem);
    min-height: 2.5rem;
    min-width: 2.5rem;
    padding: 0.4rem 0.9rem;
    font-size: $text-sm;
    font-weight: 600;
    border: 1px solid $line;
    border-radius: $radius-pill;

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &--primary {
      background: $ink;
      border-color: $ink;
      color: $surface;
      flex: 1;

      @include from('md') {
        flex: 0 0 auto;
      }
    }

    &--danger {
      color: $stamp;
      border-color: rgba($stamp, 0.35);
      padding-inline: 0.7rem;

      &:hover {
        background: $stamp-soft;
      }
    }
  }
}
</style>
