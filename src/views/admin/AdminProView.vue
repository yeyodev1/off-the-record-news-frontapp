<script setup lang="ts">
import { ref } from 'vue'
import { admin } from '@/config/admin'
import { site } from '@/config/site'
import { useAdminPro } from '@/composables/admin/useAdminPro'
import { formatDateTime } from '@/composables/admin/format'
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue'
import AdminState from '@/components/admin/AdminState.vue'
import type { ProLead } from '@/types'

const t = admin.pro
const tab = ref<'teasers' | 'leads'>('teasers')
const {
  teasers,
  leads,
  loading,
  error,
  text,
  generating,
  load,
  generate,
  saveTeaser,
  removeTeaser,
  setLeadStatus,
} = useAdminPro()
const leadStatuses = Object.keys(t.leadStatus) as ProLead['status'][]
</script>

<template>
  <section class="apro">
    <AdminPageHeader :title="t.title" :subtitle="t.subtitle" />

    <div class="apro__tabs">
      <button type="button" :class="{ on: tab === 'teasers' }" @click="tab = 'teasers'">
        {{ t.tabTeasers }}
      </button>
      <button type="button" :class="{ on: tab === 'leads' }" @click="tab = 'leads'">
        {{ t.tabLeads }} ({{ leads.length }})
      </button>
    </div>

    <AdminState :loading="loading" :error="error" @retry="load" />

    <template v-if="tab === 'teasers'">
      <form class="apro__paste" @submit.prevent="generate">
        <label for="pro-text">{{ t.pasteLabel }}</label>
        <textarea
          id="pro-text"
          v-model="text"
          rows="5"
          :placeholder="t.pastePlaceholder"
        ></textarea>
        <button
          type="submit"
          class="btn btn--dark"
          :disabled="generating || text.trim().length < 40"
        >
          <i
            class="fa-solid"
            :class="generating ? 'fa-spinner fa-spin' : 'fa-wand-magic-sparkles'"
          ></i>
          {{ generating ? t.generating : t.generate }}
        </button>
      </form>

      <p v-if="!loading && !teasers.length" class="apro__empty">{{ t.emptyTeasers }}</p>
      <article v-for="teaser in teasers" :key="teaser.id" class="apro__card">
        <div class="apro__meta">
          <span class="apro__status" :class="`apro__status--${teaser.status}`">
            {{ t.teaserStatus[teaser.status ?? 'draft'] }}
          </span>
          <select
            :value="teaser.section"
            @change="
              saveTeaser(teaser, {
                section: ($event.target as HTMLSelectElement).value as typeof teaser.section,
              })
            "
          >
            <option v-for="(label, key) in site.sections" :key="key" :value="key">
              {{ label }}
            </option>
          </select>
          <span>{{ formatDateTime(teaser.createdAt) }}</span>
        </div>
        <label :for="`tt-${teaser.id}`">{{ t.titleLabel }}</label>
        <input
          :id="`tt-${teaser.id}`"
          :value="teaser.title"
          @change="saveTeaser(teaser, { title: ($event.target as HTMLInputElement).value })"
        />
        <label :for="`tw-${teaser.id}`">{{ t.whyLabel }}</label>
        <textarea
          :id="`tw-${teaser.id}`"
          :value="teaser.whyItMatters"
          rows="2"
          @change="
            saveTeaser(teaser, { whyItMatters: ($event.target as HTMLTextAreaElement).value })
          "
        ></textarea>
        <div class="apro__actions">
          <button
            v-if="teaser.status !== 'published'"
            type="button"
            class="btn btn--primary"
            @click="saveTeaser(teaser, { status: 'published' }, t.published)"
          >
            {{ t.publish }}
          </button>
          <button
            v-else
            type="button"
            class="btn btn--ghost"
            @click="saveTeaser(teaser, { status: 'archived' }, t.archived)"
          >
            {{ t.unpublish }}
          </button>
          <button type="button" class="apro__delete" @click="removeTeaser(teaser)">
            {{ admin.delete }}
          </button>
        </div>
      </article>
    </template>

    <template v-else>
      <p v-if="!loading && !leads.length" class="apro__empty">{{ t.emptyLeads }}</p>
      <article v-for="lead in leads" :key="lead.id" class="apro__card">
        <div class="apro__meta">
          <b>{{ lead.company }}</b>
          <span>{{ t.plans[lead.plan] }}</span>
          <span v-if="lead.wantsMeeting" class="apro__status apro__status--published">{{
            t.meeting
          }}</span>
          <span>{{ formatDateTime(lead.createdAt) }}</span>
        </div>
        <p>
          {{ lead.name }}<template v-if="lead.role"> · {{ lead.role }}</template> ·
          <a :href="`mailto:${lead.email}`">{{ lead.email }}</a>
          <template v-if="lead.phone"> · {{ lead.phone }}</template>
        </p>
        <p v-if="lead.message" class="apro__msg">{{ lead.message }}</p>
        <select
          :value="lead.status"
          @change="
            setLeadStatus(lead, ($event.target as HTMLSelectElement).value as ProLead['status'])
          "
        >
          <option v-for="status in leadStatuses" :key="status" :value="status">
            {{ t.leadStatus[status] }}
          </option>
        </select>
      </article>
    </template>
  </section>
</template>

<style scoped lang="scss">
.apro {
  @include flex(column, stretch, flex-start, 14px);

  &__tabs {
    @include flex(row, center, flex-start, 8px);

    button {
      padding: 8px 14px;
      border: 1px solid $line;
      font-weight: 700;
      font-size: $text-sm;

      &.on {
        background: $ink;
        color: $paper;
        border-color: $ink;
      }
    }
  }

  &__paste,
  &__card {
    @include flex(column, stretch, flex-start, 8px);
    padding: 16px;
    background: $surface;
    border: 1px solid $line;

    label {
      margin: 0;
    }

    .btn {
      align-self: flex-start;
      border-radius: 4px;
      padding: 0.6rem 1.1rem;
    }
  }

  &__meta {
    @include flex(row, center, flex-start, 6px 12px);
    flex-wrap: wrap;
    font-size: $text-sm;
    color: $ink-muted;

    select {
      width: auto;
      padding: 0.3rem 0.5rem;
    }
  }

  &__status {
    padding: 2px 8px;
    font-size: 12px;
    font-weight: 700;
    background: $sand;
    color: $ink;

    &--published {
      background: $navy;
      color: $paper;
    }
  }

  &__actions {
    @include flex(row, center, flex-start, 12px);
  }

  &__delete {
    color: $stamp;
    font-weight: 600;
    font-size: $text-sm;
  }

  &__msg {
    color: $ink-soft;
    font-size: $text-sm;
  }

  &__empty {
    color: $ink-muted;
  }
}
</style>
