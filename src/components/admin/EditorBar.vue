<script setup lang="ts">
import { computed } from 'vue'
import { admin, articleStatusLabels } from '@/config/admin'
import type { Article } from '@/types'

/** Barra fija del editor: retirar, guardar (submit del form) y publicar. */
const props = defineProps<{
  article: Article | null
  saving: boolean
  publishing: boolean
  retracting: boolean
}>()
const emit = defineEmits<{ retract: []; publish: [] }>()

const busy = computed(() => props.saving || props.publishing || props.retracting)
const isPublished = computed(() => props.article?.status === 'published')
const canPublish = computed(
  () => props.article?.status !== 'published' && props.article?.status !== 'retracted',
)
</script>

<template>
  <div class="bar">
    <button
      v-if="isPublished"
      class="btn btn--ghost bar__btn bar__retract"
      type="button"
      :disabled="busy"
      @click="emit('retract')"
    >
      <i class="fa-solid" :class="retracting ? 'fa-spinner fa-spin' : 'fa-ban'"></i>
      {{ admin.retract.button }}
    </button>
    <button class="btn btn--ghost bar__btn" type="submit" :disabled="busy">
      <i class="fa-solid" :class="saving ? 'fa-spinner fa-spin' : 'fa-floppy-disk'"></i>
      {{ admin.editor.save }}
    </button>
    <button
      v-if="canPublish"
      class="btn btn--primary bar__btn"
      type="button"
      :disabled="busy"
      @click="emit('publish')"
    >
      <i class="fa-solid" :class="publishing ? 'fa-spinner fa-spin' : 'fa-check'"></i>
      {{ admin.editor.publish }}
    </button>
    <span v-else-if="article" class="bar__published"
      ><i class="fa-solid fa-circle-check"></i>
      {{ articleStatusLabels[article.status].label }}</span
    >
  </div>
</template>

<style scoped lang="scss">
.bar {
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

  &__btn {
    flex: 1;
    padding: 0.75rem 1.2rem;

    @include from('md') {
      flex: 0 0 auto;
    }
  }

  &__retract {
    color: $stamp;
    margin-right: auto;
  }

  &__published {
    font-size: $text-sm;
    font-weight: 600;
    color: $success;
  }
}
</style>
