<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { admin } from '@/config/admin'

const props = defineProps<{ index: number; total: number; disabled?: boolean }>()
const text = defineModel<string>({ required: true })
const emit = defineEmits<{ up: []; down: []; remove: [] }>()
const t = admin.mesa.agents

const area = ref<HTMLTextAreaElement | null>(null)

// Crece con el texto: una regla larga se lee entera sin scroll interno.
function fit() {
  const el = area.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight + 2}px`
}

onMounted(fit)
watch(text, () => nextTick(fit))
</script>

<template>
  <li class="rule">
    <span class="rule__num" aria-hidden="true">{{ index + 1 }}</span>
    <textarea
      ref="area"
      v-model="text"
      class="rule__text"
      rows="1"
      :disabled="disabled"
      :aria-label="`${t.rule} ${index + 1}`"
      maxlength="800"
    ></textarea>
    <div class="rule__tools">
      <button
        type="button"
        class="rule__tool"
        :aria-label="t.moveUp"
        :title="t.moveUp"
        :disabled="disabled || props.index === 0"
        @click="emit('up')"
      >
        <i class="fa-solid fa-arrow-up"></i>
      </button>
      <button
        type="button"
        class="rule__tool"
        :aria-label="t.moveDown"
        :title="t.moveDown"
        :disabled="disabled || props.index === props.total - 1"
        @click="emit('down')"
      >
        <i class="fa-solid fa-arrow-down"></i>
      </button>
      <button
        type="button"
        class="rule__tool rule__tool--danger"
        :aria-label="t.removeRule"
        :title="t.removeRule"
        :disabled="disabled"
        @click="emit('remove')"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </li>
</template>

<style scoped lang="scss">
.rule {
  @include flex(row, flex-start, flex-start, 0.5rem);
  flex-wrap: wrap;

  @include from('md') {
    flex-wrap: nowrap;
  }

  &__num {
    flex: 0 0 1.5rem;
    padding-top: 0.6rem;
    font-size: $text-xs;
    font-weight: 700;
    color: $ink-muted;
    text-align: right;
  }

  &__text {
    flex: 1 1 calc(100% - 2rem);
    min-width: 0;
    resize: none;
    overflow: hidden;
    font-size: $text-sm;
    line-height: 1.45;
  }

  &__tools {
    @include flex(row, center, flex-end, 0.2rem);
    flex: 1 0 100%;

    @include from('md') {
      flex: 0 0 auto;
      flex-direction: column;
    }
  }

  &__tool {
    @include flex(row, center, center);
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    color: $ink-muted;

    &:hover {
      background: $sand;
      color: $ink;
    }

    &:disabled {
      opacity: 0.35;
      pointer-events: none;
    }

    &--danger:hover {
      color: $stamp;
      background: $stamp-soft;
    }
  }
}
</style>
