<script setup lang="ts">
import { ref } from 'vue'
import { admin } from '@/config/admin'
import { adminService } from '@/services/admin.service'
import { usePagedList } from '@/composables/admin/usePagedList'
import { useArticleActions } from '@/composables/admin/useArticleActions'
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue'
import AdminState from '@/components/admin/AdminState.vue'
import AdminPagination from '@/components/admin/AdminPagination.vue'
import QueueCard from '@/components/admin/QueueCard.vue'
import RewriteDialog from '@/components/admin/RewriteDialog.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import type { Article } from '@/types'

const list = usePagedList<Article, { status: string }>(
  (f, page) => adminService.articles({ status: f.status, page }),
  { status: 'pending' },
)
const { items, page, pages, total, loading, error, load, remove, replace } = list
const { busyId, publish, reject, rewrite } = useArticleActions()

const toReject = ref<Article | null>(null)
const toRewrite = ref<Article | null>(null)

async function onPublish(article: Article) {
  if (await publish(article)) afterLeave(article.id)
}

async function confirmReject() {
  const article = toReject.value
  toReject.value = null
  if (article && (await reject(article))) afterLeave(article.id)
}

async function confirmRewrite(instructions: string) {
  const article = toRewrite.value
  if (!article) return
  const updated = await rewrite(article, instructions)
  if (updated) replace(updated)
  toRewrite.value = null
}

// Al vaciar la página actual, se trae la siguiente tanda.
function afterLeave(id: string) {
  remove(id)
  if (!items.value.length && total.value > 0) load(1)
}
</script>

<template>
  <section class="queue">
    <AdminPageHeader :title="admin.queue.title" :subtitle="admin.queue.subtitle">
      <span v-if="total" class="queue__count">{{ total }}</span>
    </AdminPageHeader>

    <AdminState
      :loading="loading && !items.length"
      :error="error"
      :empty="!items.length"
      :empty-text="admin.queue.empty"
      empty-icon="fa-solid fa-mug-hot"
      @retry="load(page)"
    />

    <TransitionGroup v-if="items.length" name="rise" tag="div" class="queue__list">
      <QueueCard
        v-for="article in items"
        :key="article.id"
        :article="article"
        :busy="busyId === article.id"
        @publish="onPublish(article)"
        @reject="toReject = article"
        @rewrite="toRewrite = article"
      />
    </TransitionGroup>

    <AdminPagination :page="page" :pages="pages" :total="total" @go="load" />

    <BaseModal
      :open="Boolean(toReject)"
      :title="admin.queue.rejectTitle"
      :message="admin.queue.rejectMessage"
      :confirm-label="admin.queue.reject"
      danger
      @confirm="confirmReject"
      @cancel="toReject = null"
    />

    <RewriteDialog
      :open="Boolean(toRewrite)"
      :busy="Boolean(toRewrite) && busyId === toRewrite?.id"
      :article-title="toRewrite?.title"
      @confirm="confirmRewrite"
      @cancel="toRewrite = null"
    />
  </section>
</template>

<style scoped lang="scss">
.queue {
  &__count {
    font-family: $font-display;
    font-weight: 800;
    font-size: $text-lg;
    color: $stamp;
    background: $stamp-soft;
    padding: 0.2rem 0.8rem;
    border-radius: $radius-pill;
  }

  &__list {
    @include flex(column, stretch, flex-start, 1rem);
  }
}
</style>
