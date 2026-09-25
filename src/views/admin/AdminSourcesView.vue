<script setup lang="ts">
import { ref } from 'vue'
import { admin, sourceCategoryLabels, sourceKindLabels } from '@/config/admin'
import { useSources } from '@/composables/admin/useSources'
import type { SourceInput } from '@/services/admin.service'
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue'
import AdminFilters from '@/components/admin/AdminFilters.vue'
import AdminState from '@/components/admin/AdminState.vue'
import SourceCard from '@/components/admin/SourceCard.vue'
import SourceDialog from '@/components/admin/SourceDialog.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import type { Source } from '@/types'

const { filters, items, loading, error, saving, load, save, toggle, remove } = useSources()

const dialogOpen = ref(false)
const editing = ref<Source | null>(null)
const toDelete = ref<Source | null>(null)

function openNew() {
  editing.value = null
  dialogOpen.value = true
}

function openEdit(source: Source) {
  editing.value = source
  dialogOpen.value = true
}

async function onSave(input: SourceInput) {
  if (await save(input, editing.value?.id)) dialogOpen.value = false
}

async function confirmDelete() {
  const source = toDelete.value
  toDelete.value = null
  if (source) await remove(source)
}
</script>

<template>
  <section>
    <AdminPageHeader :title="admin.sources.title" :subtitle="admin.sources.subtitle">
      <button class="btn btn--dark sources__new" type="button" @click="openNew">
        <i class="fa-solid fa-plus"></i> {{ admin.sources.add }}
      </button>
    </AdminPageHeader>

    <AdminFilters>
      <select v-model="filters.kind" :aria-label="admin.sources.kind">
        <option value="">{{ admin.sources.kind }}: {{ admin.all }}</option>
        <option v-for="(label, key) in sourceKindLabels" :key="key" :value="key">
          {{ label }}
        </option>
      </select>
      <select v-model="filters.category" :aria-label="admin.sources.category">
        <option value="">{{ admin.sources.category }}: {{ admin.all }}</option>
        <option v-for="(label, key) in sourceCategoryLabels" :key="key" :value="key">
          {{ label }}
        </option>
      </select>
    </AdminFilters>

    <AdminState
      :loading="loading && !items.length"
      :error="error"
      :empty="!items.length"
      :empty-text="admin.sources.empty"
      empty-icon="fa-solid fa-rss"
      @retry="load"
    />

    <div v-if="items.length" class="sources__list">
      <SourceCard
        v-for="source in items"
        :key="source.id"
        :source="source"
        @edit="openEdit(source)"
        @toggle="toggle(source)"
        @remove="toDelete = source"
      />
    </div>

    <SourceDialog
      :open="dialogOpen"
      :source="editing"
      :busy="saving"
      @save="onSave"
      @cancel="dialogOpen = false"
    />

    <BaseModal
      :open="Boolean(toDelete)"
      :title="admin.sources.deleteTitle"
      :message="admin.sources.deleteMessage"
      :confirm-label="admin.delete"
      danger
      @confirm="confirmDelete"
      @cancel="toDelete = null"
    />
  </section>
</template>

<style scoped lang="scss">
.sources {
  &__new {
    width: 100%;
    padding: 0.7rem 1.4rem;

    @include from('md') {
      width: auto;
    }
  }

  &__list {
    @include flex-cards(300px, 0.75rem);
  }
}
</style>
