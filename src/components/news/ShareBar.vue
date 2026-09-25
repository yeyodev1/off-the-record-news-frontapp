<script setup lang="ts">
import { toRef } from 'vue'
import { useShare } from '@/composables/useShare'
import SmartLabel from './SmartLabel.vue'
import { ui } from './uiCopy'

const props = defineProps<{ url: string; title: string }>()
const { whatsappUrl, xUrl, copied, copy } = useShare(toRef(props, 'url'), toRef(props, 'title'))
</script>

<template>
  <section class="share">
    <SmartLabel tag="h2" tone="muted">{{ ui.article.share }}</SmartLabel>
    <div class="share__actions">
      <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="share__btn">
        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> WhatsApp
      </a>
      <a :href="xUrl" target="_blank" rel="noopener noreferrer" class="share__btn">
        <i class="fa-brands fa-x-twitter" aria-hidden="true"></i> X
      </a>
      <button type="button" class="share__btn" @click="copy">
        <i :class="copied ? 'fa-solid fa-check' : 'fa-solid fa-link'" aria-hidden="true"></i>
        {{ copied ? ui.article.copied : ui.article.copyLink }}
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.share {
  @include flex(column, stretch, flex-start, 0.6rem);

  &__actions {
    @include flex(row, center, flex-start, 0.5rem);
    flex-wrap: wrap;
  }

  &__btn {
    @include flex(row, center, center, 0.45rem);
    min-height: 2.75rem;
    padding: 0 1rem;
    border: 1px solid $ink;
    font-size: $text-sm;
    font-weight: 600;
    @include transition;

    &:hover {
      background: $ink;
      color: $paper;
    }
  }
}
</style>
