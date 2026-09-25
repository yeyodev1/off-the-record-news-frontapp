<script setup lang="ts">
import { ref } from 'vue'
import { admin, planLabels, subscriberStatusLabels } from '@/config/admin'
import { adminService } from '@/services/admin.service'
import { usePagedList } from '@/composables/admin/usePagedList'
import { useToastStore } from '@/stores/toast'
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue'
import AdminFilters from '@/components/admin/AdminFilters.vue'
import AdminState from '@/components/admin/AdminState.vue'
import AdminPagination from '@/components/admin/AdminPagination.vue'
import SubscriberRow from '@/components/admin/SubscriberRow.vue'
import ActivateDialog from '@/components/admin/ActivateDialog.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import type { ApiError, Subscriber } from '@/types'

const toast = useToastStore()
const t = admin.subscribers

const { filters, items, page, pages, total, loading, error, load, replace } = usePagedList<
  Subscriber,
  { status: string; plan: string; q: string }
>((f, page) => adminService.subscribers({ ...f, page }), { status: '', plan: '', q: '' })

const toActivate = ref<Subscriber | null>(null)
const toCancel = ref<Subscriber | null>(null)
const busyId = ref<string | null>(null)

async function confirmActivate(paidUntil: string | null, noExpiry: boolean) {
  const sub = toActivate.value
  if (!sub) return
  busyId.value = sub.id
  try {
    replace(await adminService.activateSubscriber(sub.id, paidUntil, noExpiry))
    toast.success(t.activated)
    toActivate.value = null
  } catch (e) {
    toast.error((e as ApiError).message)
  } finally {
    busyId.value = null
  }
}

async function confirmCancel() {
  const sub = toCancel.value
  toCancel.value = null
  if (!sub) return
  busyId.value = sub.id
  try {
    replace(await adminService.cancelSubscriber(sub.id))
    toast.success(t.canceled)
  } catch (e) {
    toast.error((e as ApiError).message)
  } finally {
    busyId.value = null
  }
}
</script>

<template>
  <section>
    <AdminPageHeader :title="t.title" :subtitle="t.subtitle" />

    <AdminFilters>
      <input
        v-model="filters.q"
        class="filters__search"
        type="search"
        :placeholder="t.searchPlaceholder"
        aria-label="Buscar"
      />
      <select v-model="filters.status" :aria-label="admin.status">
        <option value="">{{ admin.status }}: {{ admin.all }}</option>
        <option v-for="(meta, key) in subscriberStatusLabels" :key="key" :value="key">
          {{ meta.label }}
        </option>
      </select>
      <select v-model="filters.plan" :aria-label="t.plan">
        <option value="">{{ t.plan }}: {{ admin.all }}</option>
        <option v-for="(label, key) in planLabels" :key="key" :value="key">{{ label }}</option>
      </select>
    </AdminFilters>

    <AdminState
      :loading="loading && !items.length"
      :error="error"
      :empty="!items.length"
      :empty-text="t.empty"
      empty-icon="fa-solid fa-users"
      @retry="load(page)"
    />

    <div v-if="items.length" class="subscribers__list">
      <SubscriberRow
        v-for="sub in items"
        :key="sub.id"
        :subscriber="sub"
        :busy="busyId === sub.id"
        @activate="toActivate = sub"
        @cancel="toCancel = sub"
      />
    </div>

    <AdminPagination :page="page" :pages="pages" :total="total" @go="load" />

    <ActivateDialog
      :open="Boolean(toActivate)"
      :subscriber="toActivate"
      :busy="Boolean(toActivate) && busyId === toActivate?.id"
      @confirm="confirmActivate"
      @cancel="toActivate = null"
    />

    <BaseModal
      :open="Boolean(toCancel)"
      :title="t.cancelTitle"
      :message="t.cancelMessage"
      :confirm-label="t.cancel"
      danger
      @confirm="confirmCancel"
      @cancel="toCancel = null"
    />
  </section>
</template>

<style scoped lang="scss">
.subscribers__list {
  @include card;
  overflow: hidden;
}
</style>
