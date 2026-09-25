<script setup lang="ts">
import { admin } from '@/config/admin'
import type { ArticleSource } from '@/types'

const sources = defineModel<ArticleSource[]>({ required: true })
const f = admin.editor.fields

function add() {
  sources.value = [...sources.value, { name: '', url: '' }]
}

function removeAt(index: number) {
  sources.value = sources.value.filter((_, i) => i !== index)
}
</script>

<template>
  <fieldset class="sources-editor">
    <legend class="sources-editor__label">{{ f.sources }}</legend>
    <div v-for="(src, i) in sources" :key="i" class="sources-editor__item">
      <input
        v-model="src.name"
        type="text"
        :placeholder="f.sourceName"
        :aria-label="f.sourceName"
      />
      <input v-model="src.url" type="url" :placeholder="f.sourceUrl" :aria-label="f.sourceUrl" />
      <button
        type="button"
        class="sources-editor__remove"
        aria-label="Quitar fuente"
        @click="removeAt(i)"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <button type="button" class="sources-editor__add" @click="add">
      <i class="fa-solid fa-plus"></i> {{ f.addItem }}
    </button>
  </fieldset>
</template>

<style scoped lang="scss">
.sources-editor {
  border: none;
  @include flex(column, stretch, flex-start, 0.5rem);

  &__label {
    font-size: 0.82rem;
    font-weight: 500;
    color: $ink-soft;
    margin-bottom: 0.35rem;
  }

  &__item {
    @include flex(row, center, flex-start, 0.4rem);
    flex-wrap: wrap;

    input {
      flex: 1 1 180px;
      min-width: 0;
    }
  }

  &__remove {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    color: $ink-muted;

    &:hover {
      color: $stamp;
      background: $stamp-soft;
    }
  }

  &__add {
    align-self: flex-start;
    font-size: $text-sm;
    font-weight: 600;
    color: $accent-deep;
    padding: 0.3rem 0;
  }
}
</style>
