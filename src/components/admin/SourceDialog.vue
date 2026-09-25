<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { admin, sourceCategoryLabels, sourceKindLabels } from '@/config/admin'
import type { SourceInput } from '@/services/admin.service'
import type { Source } from '@/types'
import AdminDialog from './AdminDialog.vue'

const props = defineProps<{ open: boolean; source: Source | null; busy?: boolean }>()
const emit = defineEmits<{ save: [input: SourceInput]; cancel: [] }>()

const t = admin.sources
const form = reactive<SourceInput>({
  name: '',
  kind: 'rss',
  category: 'medio',
  url: '',
  query: '',
  weight: 1,
  isActive: true,
})

watch(
  () => props.open,
  (open) => {
    if (!open) return
    const s = props.source
    Object.assign(form, {
      name: s?.name ?? '',
      kind: s?.kind ?? 'rss',
      category: s?.category ?? 'medio',
      url: s?.url ?? '',
      query: s?.query ?? '',
      weight: s?.weight ?? 1,
      isActive: s?.isActive ?? true,
    })
  },
)

// Perplexity se alimenta de una consulta; RSS y web, de una URL.
const valid = computed(() => {
  if (!form.name.trim()) return false
  if (form.weight < 0.5 || form.weight > 2) return false
  return form.kind === 'perplexity' ? Boolean(form.query.trim()) : Boolean(form.url.trim())
})

function submit() {
  if (!valid.value) return
  emit('save', { ...form, name: form.name.trim(), url: form.url.trim(), query: form.query.trim() })
}
</script>

<template>
  <AdminDialog
    :open="open"
    :title="source ? t.editTitle : t.newTitle"
    :confirm-label="admin.save"
    :confirm-disabled="!valid"
    :busy="busy"
    @confirm="submit"
    @cancel="emit('cancel')"
  >
    <div>
      <label for="source-name">{{ t.name }}</label>
      <input id="source-name" v-model="form.name" type="text" required />
    </div>
    <div class="source-form__row">
      <div>
        <label for="source-kind">{{ t.kind }}</label>
        <select id="source-kind" v-model="form.kind">
          <option v-for="(label, key) in sourceKindLabels" :key="key" :value="key">
            {{ label }}
          </option>
        </select>
      </div>
      <div>
        <label for="source-category">{{ t.category }}</label>
        <select id="source-category" v-model="form.category">
          <option v-for="(label, key) in sourceCategoryLabels" :key="key" :value="key">
            {{ label }}
          </option>
        </select>
      </div>
    </div>
    <div v-if="form.kind === 'perplexity'">
      <label for="source-query">{{ t.query }}</label>
      <textarea id="source-query" v-model="form.query" rows="3"></textarea>
    </div>
    <div v-else>
      <label for="source-url">{{ t.url }}</label>
      <input id="source-url" v-model="form.url" type="url" placeholder="https://" />
    </div>
    <div class="source-form__row">
      <div>
        <label for="source-weight">{{ t.weight }}</label>
        <input
          id="source-weight"
          v-model.number="form.weight"
          type="number"
          min="0.5"
          max="2"
          step="0.1"
        />
      </div>
      <label class="source-form__check">
        <input v-model="form.isActive" type="checkbox" />
        {{ t.isActive }}
      </label>
    </div>
  </AdminDialog>
</template>

<style scoped lang="scss">
.source-form {
  &__row {
    @include flex-cards(140px, 0.75rem);
    align-items: flex-end;
  }

  &__check {
    @include flex(row, center, flex-start, 0.5rem);
    margin: 0;
    min-height: 2.9rem;
    font-size: $text-sm;
    color: $ink;

    input {
      width: 1.1rem;
      height: 1.1rem;
      padding: 0;
      accent-color: $ink;
    }
  }
}
</style>
