<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { admin, articleStatusLabels } from '@/config/admin'
import { useArticleForm } from '@/composables/admin/useArticleForm'
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue'
import AdminState from '@/components/admin/AdminState.vue'
import ListEditor from '@/components/admin/ListEditor.vue'
import SourcesEditor from '@/components/admin/SourcesEditor.vue'
import ImageField from '@/components/admin/ImageField.vue'
import FromTextPanel from '@/components/admin/FromTextPanel.vue'
import ArticleMetaPanel from '@/components/admin/ArticleMetaPanel.vue'

const route = useRoute()
const id = typeof route.params.id === 'string' ? route.params.id : undefined
const f = admin.editor.fields

const {
  form,
  article,
  loading,
  loadError,
  saving,
  publishing,
  uploading,
  isNew,
  load,
  save,
  publish,
  uploadImage,
} = useArticleForm(id)

const busy = computed(() => saving.value || publishing.value)
const canPublish = computed(() => article.value?.status !== 'published')

onMounted(load)
</script>

<template>
  <section class="editor">
    <RouterLink to="/admin/notas" class="editor__back">
      <i class="fa-solid fa-arrow-left"></i> {{ admin.editor.back }}
    </RouterLink>

    <AdminPageHeader :title="isNew ? admin.editor.newTitle : admin.editor.editTitle">
      <a
        v-if="article?.status === 'published'"
        :href="`/nota/${article.slug}`"
        target="_blank"
        rel="noopener"
        class="editor__view"
      >
        <i class="fa-solid fa-arrow-up-right-from-square"></i> {{ admin.viewSite }}
      </a>
    </AdminPageHeader>

    <AdminState v-if="loading || loadError" :loading="loading" :error="loadError" @retry="load" />

    <template v-else>
      <FromTextPanel v-if="isNew" class="editor__from-text" />

      <form class="editor__layout" @submit.prevent="save()">
        <div class="editor__main editor__card">
          <div>
            <label for="article-title">{{ f.title }}</label>
            <input
              id="article-title"
              v-model="form.title"
              class="editor__title"
              type="text"
              maxlength="120"
              required
            />
            <small class="editor__count" :class="{ 'editor__count--over': form.title.length > 70 }">
              {{ form.title.length }}/70
            </small>
          </div>
          <div>
            <label for="article-lede">{{ f.lede }}</label>
            <textarea id="article-lede" v-model="form.lede" rows="2"></textarea>
          </div>
          <div>
            <label for="article-why">{{ f.whyItMatters }}</label>
            <textarea id="article-why" v-model="form.whyItMatters" rows="2"></textarea>
          </div>
          <div>
            <label for="article-big">{{ f.bigPicture }}</label>
            <textarea id="article-big" v-model="form.bigPicture" rows="2"></textarea>
          </div>
          <ListEditor v-model="form.keyPoints" :label="f.keyPoints" />
          <ListEditor v-model="form.body" :label="f.body" :rows="4" />
          <div>
            <label for="article-next">{{ f.whatsNext }}</label>
            <textarea id="article-next" v-model="form.whatsNext" rows="2"></textarea>
          </div>
          <SourcesEditor v-model="form.sources" />
        </div>

        <aside class="editor__side">
          <div class="editor__card">
            <ArticleMetaPanel
              v-model:section="form.section"
              v-model:tags="form.tags"
              v-model:is-pro="form.isPro"
              v-model:is-breaking="form.isBreaking"
              :article="article"
            />
          </div>
          <div class="editor__card">
            <ImageField
              :image="article?.image || null"
              :disabled="!article"
              :uploading="uploading"
              @upload="uploadImage"
            />
          </div>
        </aside>

        <div class="editor__bar">
          <button class="btn btn--ghost editor__btn" type="submit" :disabled="busy">
            <i class="fa-solid" :class="saving ? 'fa-spinner fa-spin' : 'fa-floppy-disk'"></i>
            {{ admin.editor.save }}
          </button>
          <button
            v-if="canPublish"
            class="btn btn--primary editor__btn"
            type="button"
            :disabled="busy"
            @click="publish"
          >
            <i class="fa-solid" :class="publishing ? 'fa-spinner fa-spin' : 'fa-check'"></i>
            {{ admin.editor.publish }}
          </button>
          <span v-else class="editor__published"
            ><i class="fa-solid fa-circle-check"></i>
            {{ articleStatusLabels.published.label }}</span
          >
        </div>
      </form>
    </template>
  </section>
</template>

<style scoped lang="scss">
.editor {
  @include flex(column, stretch, flex-start);

  &__back {
    @include flex(row, center, flex-start, 0.4rem);
    font-size: $text-sm;
    color: $ink-muted;
    margin-bottom: 0.75rem;

    &:hover {
      color: $ink;
    }
  }

  &__view {
    font-size: $text-sm;
    font-weight: 600;
    color: $accent-deep;
  }

  &__from-text {
    margin-bottom: 1rem;
  }

  &__layout {
    @include flex(column, stretch, flex-start, 1rem);

    @include from('lg') {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: flex-start;
    }
  }

  &__card {
    @include card;
    padding: 1rem;

    @include from('md') {
      padding: 1.4rem;
    }
  }

  &__main {
    @include flex(column, stretch, flex-start, 1.1rem);

    @include from('lg') {
      flex: 1 1 0;
      min-width: 0;
    }
  }

  &__side {
    @include flex(column, stretch, flex-start, 1rem);

    @include from('lg') {
      flex: 0 0 320px;
      position: sticky;
      top: 1.5rem;
    }
  }

  &__title {
    font-family: $font-display;
    font-weight: 700;
    font-size: $text-lg;
  }

  &__count {
    display: block;
    text-align: right;
    font-size: $text-xs;
    color: $ink-muted;

    &--over {
      color: $stamp;
    }
  }

  &__bar {
    @include flex(row, center, flex-end, 0.5rem);
    position: sticky;
    bottom: calc(3.8rem + env(safe-area-inset-bottom));
    z-index: 5;
    flex-basis: 100%;
    padding: 0.7rem;
    background: rgba($surface, 0.94);
    backdrop-filter: blur(6px);
    border: 1px solid $line;
    border-radius: $radius-md;
    box-shadow: $shadow-sm;

    @include from('lg') {
      bottom: 1rem;
    }
  }

  &__btn {
    flex: 1;
    padding: 0.75rem 1.2rem;

    @include from('md') {
      flex: 0 0 auto;
    }
  }

  &__published {
    font-size: $text-sm;
    font-weight: 600;
    color: $success;
  }
}
</style>
