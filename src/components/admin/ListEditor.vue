<script setup lang="ts">
import { admin } from '@/config/admin'

/** Lista de textos editable: viñetas o párrafos, con agregar, quitar y reordenar. */
const items = defineModel<string[]>({ required: true })
defineProps<{ label: string; rows?: number; placeholder?: string }>()

function add() {
  items.value = [...items.value, '']
}

function removeAt(index: number) {
  const next = items.value.filter((_, i) => i !== index)
  items.value = next.length ? next : ['']
}

function move(index: number, delta: number) {
  const target = index + delta
  if (target < 0 || target >= items.value.length) return
  const next = [...items.value]
  const [moved] = next.splice(index, 1)
  next.splice(target, 0, moved as string)
  items.value = next
}

function update(index: number, value: string) {
  items.value = items.value.map((it, i) => (i === index ? value : it))
}
</script>

<template>
  <fieldset class="list-editor">
    <legend class="list-editor__label">{{ label }}</legend>
    <div v-for="(item, i) in items" :key="i" class="list-editor__item">
      <span class="list-editor__num">{{ i + 1 }}</span>
      <textarea
        :value="item"
        :rows="rows || 2"
        :placeholder="placeholder"
        :aria-label="`${label} ${i + 1}`"
        @input="update(i, ($event.target as HTMLTextAreaElement).value)"
      ></textarea>
      <div class="list-editor__tools">
        <button type="button" aria-label="Subir" :disabled="i === 0" @click="move(i, -1)">
          <i class="fa-solid fa-arrow-up"></i>
        </button>
        <button
          type="button"
          aria-label="Bajar"
          :disabled="i === items.length - 1"
          @click="move(i, 1)"
        >
          <i class="fa-solid fa-arrow-down"></i>
        </button>
        <button type="button" aria-label="Quitar" class="list-editor__remove" @click="removeAt(i)">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
    <button type="button" class="list-editor__add" @click="add">
      <i class="fa-solid fa-plus"></i> {{ admin.editor.fields.addItem }}
    </button>
  </fieldset>
</template>

<style scoped lang="scss">
.list-editor {
  border: none;
  @include flex(column, stretch, flex-start, 0.5rem);

  &__label {
    font-size: 0.82rem;
    font-weight: 500;
    color: $ink-soft;
    margin-bottom: 0.35rem;
  }

  &__item {
    @include flex(row, flex-start, flex-start, 0.4rem);

    textarea {
      flex: 1;
      resize: vertical;
      min-width: 0;
    }
  }

  &__num {
    flex: 0 0 1.2rem;
    padding-top: 0.75rem;
    font-size: $text-xs;
    font-weight: 700;
    color: $ink-muted;
    text-align: right;
  }

  &__tools {
    @include flex(column, center, flex-start);

    button {
      width: 1.9rem;
      height: 1.6rem;
      font-size: 0.7rem;
      color: $ink-muted;
      border-radius: 6px;

      &:hover {
        background: $sand;
        color: $ink;
      }

      &:disabled {
        opacity: 0.3;
        pointer-events: none;
      }
    }
  }

  &__remove:hover {
    color: $stamp !important;
  }

  &__add {
    align-self: flex-start;
    font-size: $text-sm;
    font-weight: 600;
    color: $accent-deep;
    padding: 0.3rem 0.2rem;
    margin-left: 1.6rem;
  }
}
</style>
