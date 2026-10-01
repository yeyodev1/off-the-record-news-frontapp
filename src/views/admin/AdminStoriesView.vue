<script setup lang="ts">
import { ref } from 'vue'
import { admin, storyStatusLabels } from '@/config/admin'
import { adminService } from '@/services/admin.service'
import { usePagedList } from '@/composables/admin/usePagedList'
import { useAdminStats } from '@/composables/admin/useAdminStats'
import { useToastStore } from '@/stores/toast'
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue'
import AdminFilters from '@/components/admin/AdminFilters.vue'
import AdminState from '@/components/admin/AdminState.vue'
import AdminPagination from '@/components/admin/AdminPagination.vue'
import StoryCard from '@/components/admin/StoryCard.vue'
import type { ApiError, Story } from '@/types'

const toast = useToastStore()
const { refreshStats } = useAdminStats()

// Arranca en la watchlist: es lo que necesita ojo humano.
const { filters, items, page, pages, total, loading, error, load, replace } = usePagedList<
  Story,
  { status: string }
>((f, page) => adminService.stories({ ...f, page }), { status: 'watchlist' })

const busy = ref<{ id: string; action: 'draft' | 'discard' } | null>(null)

async function draft(story: Story) {
  busy.value = { id: story.id, action: 'draft' }
  try {
    const article = await adminService.draftStory(story.id)
    replace({ ...story, status: 'covered', articleId: article.id, reason: 'Nota por aprobar' })
    toast.success(admin.stories.drafted)
    refreshStats()
  } catch (e) {
    toast.error((e as ApiError).message)
  } finally {
    busy.value = null
  }
}

async function discard(story: Story) {
  busy.value = { id: story.id, action: 'discard' }
  try {
    replace(await adminService.discardStory(story.id))
    toast.info(admin.stories.discarded)
  } catch (e) {
    toast.error((e as ApiError).message)
  } finally {
    busy.value = null
  }
}
</script>

<template>
  <section>
    <AdminPageHeader :title="admin.stories.title" :subtitle="admin.stories.subtitle" />

    <AdminFilters>
      <select v-model="filters.status" :aria-label="admin.status">
        <option value="">{{ admin.status }}: {{ admin.all }}</option>
        <option v-for="(meta, key) in storyStatusLabels" :key="key" :value="key">
          {{ meta.label }}
        </option>
      </select>
    </AdminFilters>

    <AdminState
      :loading="loading && !items.length"
      :error="error"
      :empty="!items.length"
      :empty-text="admin.stories.empty"
      empty-icon="fa-solid fa-layer-group"
      @retry="load(page)"
    />

    <div v-if="items.length" class="stories__list">
      <StoryCard
        v-for="story in items"
        :key="story.id"
        :story="story"
        :busy="busy?.id === story.id ? busy.action : null"
        @draft="draft(story)"
        @discard="discard(story)"
      />
    </div>

    <AdminPagination :page="page" :pages="pages" :total="total" @go="load" />
  </section>
</template>

<style scoped lang="scss">
.stories__list {
  @include flex(column, stretch, flex-start, 0.7rem);
}
</style>
