<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { admin, tipStatusLabels } from '@/config/admin'
import { adminService } from '@/services/admin.service'
import { usePagedList } from '@/composables/admin/usePagedList'
import { useAdminStats } from '@/composables/admin/useAdminStats'
import { useToastStore } from '@/stores/toast'
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue'
import AdminFilters from '@/components/admin/AdminFilters.vue'
import AdminState from '@/components/admin/AdminState.vue'
import AdminPagination from '@/components/admin/AdminPagination.vue'
import TipCard from '@/components/admin/TipCard.vue'
import type { ApiError, Tip } from '@/types'

const router = useRouter()
const toast = useToastStore()
const { refreshStats } = useAdminStats()
const t = admin.tips

const { filters, items, page, pages, total, loading, error, load, replace } = usePagedList<
  Tip,
  { status: string }
>((f, page) => adminService.tips({ ...f, page }), { status: '' })

const busy = ref<{ id: string; action: 'status' | 'draft' } | null>(null)

async function changeStatus(tip: Tip, status: Tip['status']) {
  busy.value = { id: tip.id, action: 'status' }
  try {
    replace(await adminService.updateTip(tip.id, status))
    toast.success(t.updated)
    refreshStats()
  } catch (e) {
    toast.error((e as ApiError).message)
  } finally {
    busy.value = null
  }
}

async function toArticle(tip: Tip) {
  busy.value = { id: tip.id, action: 'draft' }
  try {
    const article = await adminService.draftTip(tip.id)
    toast.success(t.converted)
    refreshStats()
    router.push(`/admin/notas/${article.id}`)
  } catch (e) {
    toast.error((e as ApiError).message)
  } finally {
    busy.value = null
  }
}
</script>

<template>
  <section>
    <AdminPageHeader :title="t.title" :subtitle="t.subtitle" />

    <AdminFilters>
      <select v-model="filters.status" :aria-label="admin.status">
        <option value="">{{ admin.status }}: {{ admin.all }}</option>
        <option v-for="(meta, key) in tipStatusLabels" :key="key" :value="key">
          {{ meta.label }}
        </option>
      </select>
    </AdminFilters>

    <AdminState
      :loading="loading && !items.length"
      :error="error"
      :empty="!items.length"
      :empty-text="t.empty"
      empty-icon="fa-solid fa-user-secret"
      @retry="load(page)"
    />

    <div v-if="items.length" class="tips__list">
      <TipCard
        v-for="tip in items"
        :key="tip.id"
        :tip="tip"
        :busy="busy?.id === tip.id ? busy.action : null"
        @status="(status) => changeStatus(tip, status)"
        @draft="toArticle(tip)"
      />
    </div>

    <AdminPagination :page="page" :pages="pages" :total="total" @go="load" />
  </section>
</template>

<style scoped lang="scss">
.tips__list {
  @include flex-cards(320px, 0.75rem);
}
</style>
