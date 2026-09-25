<script setup lang="ts">
import { admin } from '@/config/admin'
import { site } from '@/config/site'
import { formatDateTime } from '@/composables/admin/format'
import AdminBadge from './AdminBadge.vue'
import type { NewsletterIssue } from '@/types'

defineProps<{ issue: NewsletterIssue; sending?: boolean }>()
const emit = defineEmits<{ send: [] }>()

const t = admin.newsletters
</script>

<template>
  <article class="nl-preview">
    <header class="nl-preview__head">
      <div class="nl-preview__info">
        <div class="nl-preview__tags">
          <AdminBadge tone="accent">{{ site.editions[issue.edition].name }}</AdminBadge>
          <AdminBadge :tone="issue.status === 'sent' ? 'success' : 'warning'">
            {{ issue.status === 'sent' ? t.statusSent : t.statusDraft }}
          </AdminBadge>
          <span v-if="issue.status === 'sent'" class="nl-preview__sent">
            {{ formatDateTime(issue.sentAt) }} · {{ issue.recipients }} {{ t.recipients }}
          </span>
        </div>
        <h2 class="nl-preview__subject">{{ issue.subject }}</h2>
        <p v-if="issue.intro" class="nl-preview__intro">{{ issue.intro }}</p>
      </div>
      <button
        v-if="issue.status === 'draft'"
        class="btn btn--primary nl-preview__send"
        type="button"
        :disabled="sending"
        @click="emit('send')"
      >
        <i class="fa-solid" :class="sending ? 'fa-spinner fa-spin' : 'fa-paper-plane'"></i>
        {{ sending ? t.sending : t.send }}
      </button>
    </header>
    <!-- sandbox sin scripts: el HTML del boletín se muestra, no se ejecuta -->
    <iframe
      class="nl-preview__frame"
      :srcdoc="issue.html"
      sandbox="allow-popups"
      title="Vista previa del boletín"
    ></iframe>
  </article>
</template>

<style scoped lang="scss">
.nl-preview {
  @include card;
  overflow: hidden;

  &__head {
    @include flex(column, stretch, flex-start, 0.8rem);
    padding: 1rem;
    border-bottom: 1px solid $line;

    @include from('md') {
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
    }
  }

  &__info {
    @include flex(column, stretch, flex-start, 0.4rem);
    min-width: 0;
  }

  &__tags {
    @include flex(row, center, flex-start, 0.4rem);
    flex-wrap: wrap;
  }

  &__sent {
    font-size: $text-xs;
    color: $ink-muted;
  }

  &__subject {
    @include display($text-lg, 800);
  }

  &__intro {
    font-size: $text-sm;
    color: $ink-soft;
  }

  &__send {
    flex: 0 0 auto;
    padding: 0.75rem 1.3rem;
  }

  &__frame {
    display: block;
    width: 100%;
    height: 70vh;
    min-height: 480px;
    border: none;
    background: $surface;
  }
}
</style>
