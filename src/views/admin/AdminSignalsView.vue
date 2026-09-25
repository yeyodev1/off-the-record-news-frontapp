<script setup lang="ts">
import { ref } from 'vue'
import { admin, signalStatusLabels } from '@/config/admin'
import { adminService } from '@/services/admin.service'
import { usePagedList } from '@/composables/admin/usePagedList'
import { useAdminStats } from '@/composables/admin/useAdminStats'
import { useToastStore } from '@/stores/toast'
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue'
import AdminFilters from '@/components/admin/AdminFilters.vue'
import AdminState from '@/components/admin/AdminState.vue'
import AdminPagination from '@/components/admin/AdminPagination.vue'
import SignalCard from '@/components/admin/SignalCard.vue'
import type { ApiError, Signal } from '@/types'

const toast = useToastStore()
const { refreshStats } = useAdminStats()

const { filters, items, page, pages, total, loading, error, load, replace } = usePagedList<
  Signal,
  { status: string; minScore: string }
>((f, page) => adminService.signals({ ...f, page }), { status: '', minScore: '' })

const minScores = ['5', '6', '7', '8']
const busy = ref<{ id: string; action: 'draft' | 'discard' } | null>(null)

async function draft(signal: Signal) {
  busy.value = { id: signal.id, action: 'draft' }
  try {
    const article = await adminService.draftSignal(signal.id)
    replace({ ...signal, status: 'drafted', articleId: article.id })
    toast.success(admin.signals.drafted)
    refreshStats()
  } catch (e) {
    toast.error((e as ApiError).message)
  } finally {
    busy.value = null
  }
}

async function discard(signal: Signal) {
  busy.value = { id: signal.id, action: 'discard' }
  try {
    replace(await adminService.discardSignal(signal.id))
    toast.info(admin.signals.discarded)
  } catch (e) {
    toast.error((e as ApiError).message)
  } finally {
    busy.value = null
  }
}
</script>

<template>
  <section>
    <AdminPageHeader :title="admin.signals.title" :subtitle="admin.signals.subtitle" />

    <AdminFilters>
      <select v-model="filters.status" :aria-label="admin.status">
        <option value="">{{ admin.status }}: {{ admin.all }}</option>
        <option v-for="(meta, key) in signalStatusLabels" :key="key" :value="key">
          {{ meta.label }}
        </option>
      </select>
      <select v-model="filters.minScore" :aria-label="admin.signals.minScore">
        <option value="">{{ admin.signals.minScore }}: {{ admin.all }}</option>
        <option v-for="score in minScores" :key="score" :value="score">
          {{ admin.signals.minScore }}: {{ score }}+
        </option>
      </select>
    </AdminFilters>

    <AdminState
      :loading="loading && !items.length"
      :error="error"
      :empty="!items.length"
      :empty-text="admin.signals.empty"
      empty-icon="fa-solid fa-satellite-dish"
      @retry="load(page)"
    />

    <div v-if="items.length" class="signals__list">
      <SignalCard
        v-for="signal in items"
        :key="signal.id"
        :signal="signal"
        :busy="busy?.id === signal.id ? busy.action : null"
        @draft="draft(signal)"
        @discard="discard(signal)"
      />
    </div>

    <AdminPagination :page="page" :pages="pages" :total="total" @go="load" />
  </section>
</template>

<style scoped lang="scss">
.signals__list {
  @include flex(column, stretch, flex-start, 0.7rem);
}
</style>
