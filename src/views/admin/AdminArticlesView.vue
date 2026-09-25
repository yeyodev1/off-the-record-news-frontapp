<script setup lang="ts">
import { ref } from 'vue'
import { admin, articleStatusLabels } from '@/config/admin'
import { site } from '@/config/site'
import { adminService } from '@/services/admin.service'
import { usePagedList } from '@/composables/admin/usePagedList'
import { useToastStore } from '@/stores/toast'
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue'
import AdminFilters from '@/components/admin/AdminFilters.vue'
import AdminState from '@/components/admin/AdminState.vue'
import AdminPagination from '@/components/admin/AdminPagination.vue'
import ArticleRow from '@/components/admin/ArticleRow.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import type { ApiError, Article } from '@/types'

const toast = useToastStore()

const { filters, items, page, pages, total, loading, error, load, remove } = usePagedList<
  Article,
  { status: string; section: string; q: string }
>((f, page) => adminService.articles({ ...f, page }), { status: '', section: '', q: '' })

const toDelete = ref<Article | null>(null)

async function confirmDelete() {
  const article = toDelete.value
  toDelete.value = null
  if (!article) return
  try {
    await adminService.deleteArticle(article.id)
    remove(article.id)
    toast.success(admin.articles.deleted)
  } catch (e) {
    toast.error((e as ApiError).message)
  }
}
</script>

<template>
  <section>
    <AdminPageHeader :title="admin.articles.title" :subtitle="admin.articles.subtitle">
      <RouterLink to="/admin/notas/nueva" class="btn btn--dark articles__new">
        <i class="fa-solid fa-plus"></i> {{ admin.articles.new }}
      </RouterLink>
    </AdminPageHeader>

    <AdminFilters>
      <input
        v-model="filters.q"
        class="filters__search"
        type="search"
        :placeholder="admin.searchPlaceholder"
        aria-label="Buscar"
      />
      <select v-model="filters.status" :aria-label="admin.articles.status">
        <option value="">{{ admin.articles.status }}: {{ admin.all }}</option>
        <option v-for="(meta, key) in articleStatusLabels" :key="key" :value="key">
          {{ meta.label }}
        </option>
      </select>
      <select v-model="filters.section" :aria-label="admin.articles.section">
        <option value="">{{ admin.articles.section }}: {{ admin.all }}</option>
        <option v-for="(name, key) in site.sections" :key="key" :value="key">{{ name }}</option>
      </select>
    </AdminFilters>

    <AdminState
      :loading="loading && !items.length"
      :error="error"
      :empty="!items.length"
      :empty-text="admin.articles.empty"
      @retry="load(page)"
    />

    <div v-if="items.length" class="articles__list" :class="{ 'articles__list--loading': loading }">
      <ArticleRow
        v-for="article in items"
        :key="article.id"
        :article="article"
        @remove="toDelete = article"
      />
    </div>

    <AdminPagination :page="page" :pages="pages" :total="total" @go="load" />

    <BaseModal
      :open="Boolean(toDelete)"
      :title="admin.articles.deleteTitle"
      :message="admin.articles.deleteMessage"
      :confirm-label="admin.delete"
      danger
      @confirm="confirmDelete"
      @cancel="toDelete = null"
    />
  </section>
</template>

<style scoped lang="scss">
.articles {
  &__new {
    width: 100%;
    padding: 0.7rem 1.4rem;

    @include from('md') {
      width: auto;
    }
  }

  &__list {
    @include card;
    overflow: hidden;
    @include transition(opacity);

    &--loading {
      opacity: 0.6;
    }
  }
}
</style>
