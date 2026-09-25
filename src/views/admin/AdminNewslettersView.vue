<script setup lang="ts">
import { ref } from 'vue'
import { admin } from '@/config/admin'
import { site } from '@/config/site'
import { useNewsletters } from '@/composables/admin/useNewsletters'
import { formatDateTime } from '@/composables/admin/format'
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue'
import AdminState from '@/components/admin/AdminState.vue'
import AdminPagination from '@/components/admin/AdminPagination.vue'
import AdminBadge from '@/components/admin/AdminBadge.vue'
import NewsletterPreview from '@/components/admin/NewsletterPreview.vue'
import BaseModal from '@/components/ui/BaseModal.vue'

const t = admin.newsletters
const { history, edition, current, generating, sending, generate, send, show } = useNewsletters()
const { items, page, pages, loading, error, load } = history

const confirmOpen = ref(false)

function confirmSend() {
  confirmOpen.value = false
  send()
}
</script>

<template>
  <section class="newsletters">
    <AdminPageHeader :title="t.title" :subtitle="t.subtitle" />

    <form class="newsletters__generator" @submit.prevent="generate">
      <div class="newsletters__field">
        <label for="nl-edition">{{ t.edition }}</label>
        <select id="nl-edition" v-model="edition" :disabled="generating">
          <option v-for="(meta, key) in site.editions" :key="key" :value="key">
            {{ meta.name }} ({{ meta.time }})
          </option>
        </select>
      </div>
      <button class="btn btn--dark newsletters__generate" type="submit" :disabled="generating">
        <i class="fa-solid" :class="generating ? 'fa-spinner fa-spin' : 'fa-eye'"></i>
        {{ generating ? t.generating : t.preview }}
      </button>
    </form>

    <NewsletterPreview
      v-if="current"
      :issue="current"
      :sending="sending"
      @send="confirmOpen = true"
    />
    <AdminState v-else empty :empty-text="t.noPreview" empty-icon="fa-regular fa-envelope" />

    <h2 class="newsletters__h2">{{ t.history }}</h2>
    <AdminState
      :loading="loading && !items.length"
      :error="error"
      :empty="!items.length"
      :empty-text="t.empty"
      @retry="load(page)"
    />
    <ul v-if="items.length" class="newsletters__history">
      <li v-for="issue in items" :key="issue.id">
        <button
          type="button"
          class="newsletters__item"
          :class="{ 'newsletters__item--on': current?.id === issue.id }"
          @click="show(issue)"
        >
          <span class="newsletters__item-main">
            <strong>{{ issue.subject }}</strong>
            <small>
              {{ site.editions[issue.edition].name }} ·
              {{ formatDateTime(issue.sentAt || issue.createdAt) }}
              <template v-if="issue.status === 'sent'">
                · {{ issue.recipients }} {{ t.recipients }}</template
              >
            </small>
          </span>
          <AdminBadge :tone="issue.status === 'sent' ? 'success' : 'warning'">
            {{ issue.status === 'sent' ? t.statusSent : t.statusDraft }}
          </AdminBadge>
        </button>
      </li>
    </ul>
    <AdminPagination :page="page" :pages="pages" @go="load" />

    <BaseModal
      :open="confirmOpen"
      :title="t.sendTitle"
      :message="t.sendMessage"
      :confirm-label="t.send"
      @confirm="confirmSend"
      @cancel="confirmOpen = false"
    />
  </section>
</template>

<style scoped lang="scss">
.newsletters {
  @include flex(column, stretch, flex-start, 1rem);

  &__generator {
    @include card;
    @include flex(column, stretch, flex-start, 0.75rem);
    padding: 1rem;

    @include from('md') {
      flex-direction: row;
      align-items: flex-end;
    }
  }

  &__field {
    flex: 1;
  }

  &__generate {
    padding: 0.75rem 1.4rem;
  }

  &__h2 {
    margin-top: 0.75rem;
    font-family: $font-principal;
    font-size: $text-sm;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: $ink-muted;
  }

  &__history {
    @include card;
    list-style: none;
    overflow: hidden;

    li + li {
      border-top: 1px solid $line;
    }
  }

  &__item {
    @include flex(row, center, space-between, 0.75rem);
    width: 100%;
    padding: 0.8rem 1rem;
    text-align: left;
    background: $surface;

    &:hover {
      background: $sand;
    }

    &--on {
      box-shadow: inset 3px 0 0 $ink;
    }
  }

  &__item-main {
    @include flex(column, stretch, flex-start, 0.1rem);
    min-width: 0;
    font-size: $text-sm;

    strong {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    small {
      color: $ink-muted;
      font-size: $text-xs;
    }
  }
}
</style>
