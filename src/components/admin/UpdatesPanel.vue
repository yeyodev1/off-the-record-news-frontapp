<script setup lang="ts">
import { computed } from 'vue'
import { admin } from '@/config/admin'
import { formatDateTime } from '@/composables/admin/format'
import AdminBadge from './AdminBadge.vue'
import VerificationPanel from './VerificationPanel.vue'
import type { ArticleUpdate } from '@/types'

/** Bloques "Actualización HH:MM" de la nota: los pendientes se aprueban aquí o en Telegram. */
const props = defineProps<{ updates: ArticleUpdate[]; busyId?: string | null }>()
const emit = defineEmits<{ publish: [id: string]; reject: [id: string] }>()

const ordered = computed(() =>
  [...props.updates].sort(
    (a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime(),
  ),
)

const tone = { pending: 'warning', published: 'success', rejected: 'muted' } as const
const label = { pending: admin.updates.pending, published: 'Publicada', rejected: 'Descartada' }
</script>

<template>
  <div class="updates">
    <h3 class="updates__title">{{ admin.updates.title }}</h3>
    <p v-if="!ordered.length" class="updates__empty">{{ admin.updates.empty }}</p>
    <article v-for="update in ordered" :key="update.id" class="updates__item">
      <header class="updates__meta">
        <AdminBadge :tone="tone[update.status ?? 'pending']">{{
          label[update.status ?? 'pending']
        }}</AdminBadge>
        <span>{{ formatDateTime(update.publishedAt || update.createdAt) }}</span>
      </header>
      <p>{{ update.text }}</p>
      <p class="updates__sources">{{ update.sources.map((s) => s.name).join(', ') }}</p>
      <VerificationPanel
        v-if="update.status === 'pending'"
        :verification="update.verification"
        compact
      />
      <div v-if="update.status === 'pending'" class="updates__actions">
        <button
          class="btn btn--ghost"
          type="button"
          :disabled="Boolean(busyId)"
          @click="emit('reject', update.id)"
        >
          {{ admin.updates.reject }}
        </button>
        <button
          class="btn btn--primary"
          type="button"
          :disabled="Boolean(busyId)"
          @click="emit('publish', update.id)"
        >
          <i v-if="busyId === update.id" class="fa-solid fa-spinner fa-spin"></i>
          {{ admin.updates.publish }}
        </button>
      </div>
    </article>
  </div>
</template>

<style scoped lang="scss">
.updates {
  @include flex(column, stretch, flex-start, 0.8rem);
  font-size: $text-sm;

  &__title {
    font-family: $font-principal;
    font-size: $text-xs;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  &__empty {
    color: $ink-muted;
  }

  &__item {
    @include flex(column, stretch, flex-start, 0.5rem);
    padding-top: 0.8rem;
    border-top: 1px solid $line;
  }

  &__meta {
    @include flex(row, center, space-between, 0.5rem);
    font-size: $text-xs;
    color: $ink-muted;
  }

  &__sources {
    font-size: $text-xs;
    color: $ink-muted;
  }

  &__actions {
    @include flex(row, center, flex-end, 0.5rem);

    .btn {
      padding: 0.5rem 0.9rem;
      font-size: $text-sm;
    }
  }
}
</style>
