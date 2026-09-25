<script setup lang="ts">
import { ref, watch } from 'vue'
import { admin } from '@/config/admin'
import type { ArticleImage } from '@/types'

const props = defineProps<{ image: ArticleImage | null; disabled?: boolean; uploading?: boolean }>()
const emit = defineEmits<{ upload: [file: File, credit: string] }>()

const f = admin.editor.fields
const file = ref<File | null>(null)
const credit = ref(props.image?.credit || '')
const localPreview = ref('')

watch(
  () => props.image?.url,
  () => {
    // Imagen nueva desde el API: se suelta la vista previa local.
    file.value = null
    if (localPreview.value) URL.revokeObjectURL(localPreview.value)
    localPreview.value = ''
    credit.value = props.image?.credit || credit.value
  },
)

function pick(event: Event) {
  const selected = (event.target as HTMLInputElement).files?.[0] || null
  file.value = selected
  if (localPreview.value) URL.revokeObjectURL(localPreview.value)
  localPreview.value = selected ? URL.createObjectURL(selected) : ''
}

function upload() {
  if (file.value) emit('upload', file.value, credit.value.trim())
}
</script>

<template>
  <fieldset class="image-field" :disabled="disabled">
    <legend class="image-field__label">{{ f.image }}</legend>
    <p v-if="disabled" class="image-field__hint">
      <i class="fa-solid fa-circle-info"></i> {{ f.imageNeedsSave }}
    </p>
    <template v-else>
      <figure v-if="localPreview || image?.url" class="image-field__preview">
        <img :src="localPreview || image?.url" alt="" />
        <figcaption v-if="!localPreview && image?.credit">{{ image.credit }}</figcaption>
      </figure>
      <input type="file" accept="image/*" :aria-label="f.upload" @change="pick" />
      <div>
        <label for="image-credit">{{ f.credit }}</label>
        <input id="image-credit" v-model="credit" type="text" placeholder="Foto: Primicias" />
      </div>
      <button
        type="button"
        class="btn btn--ghost image-field__btn"
        :disabled="!file || uploading"
        @click="upload"
      >
        <i class="fa-solid" :class="uploading ? 'fa-spinner fa-spin' : 'fa-upload'"></i>
        {{ uploading ? f.uploading : f.upload }}
      </button>
    </template>
  </fieldset>
</template>

<style scoped lang="scss">
.image-field {
  border: none;
  @include flex(column, stretch, flex-start, 0.6rem);

  &__label {
    font-size: 0.82rem;
    font-weight: 500;
    color: $ink-soft;
    margin-bottom: 0.35rem;
  }

  &__hint {
    font-size: $text-sm;
    color: $ink-muted;
  }

  &__preview {
    img {
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      border-radius: $radius-sm;
      background: $sand;
    }

    figcaption {
      font-size: $text-xs;
      color: $ink-muted;
      margin-top: 0.25rem;
    }
  }

  input[type='file'] {
    padding: 0.5rem;
    font-size: $text-sm;
  }

  &__btn {
    padding: 0.6rem 1.2rem;
  }
}
</style>
