<script setup lang="ts">
import { computed } from 'vue'
import { site } from '@/config/site'

/**
 * Avatar y nombre de quien firma. Las notas de la mesa automática firman como
 * "Redacción OTR" con el sello; las de Boscán y La Moni llevan su retrato.
 */
const props = withDefaults(defineProps<{ author?: string; size?: number; prefix?: string }>(), {
  author: '',
  size: 28,
  prefix: '',
})

const photo = computed(() => site.authorPhotos[props.author.trim()] ?? '')
const name = computed(() => {
  const author = props.author.trim()
  if (!author || /mesa|redacci[oó]n/i.test(author)) return site.newsroomName
  return author
})
</script>

<template>
  <span class="byline">
    <img
      v-if="photo"
      class="byline__avatar"
      :src="photo"
      alt=""
      :style="{ width: `${size}px`, height: `${size}px` }"
      loading="lazy"
    />
    <span
      v-else
      class="byline__seal"
      :style="{ width: `${size}px`, height: `${size}px` }"
      aria-hidden="true"
    >
      OTR
    </span>
    <span class="byline__name">
      <template v-if="prefix"
        >{{ prefix }} <b>{{ name }}</b></template
      >
      <template v-else>{{ name }}</template>
    </span>
  </span>
</template>

<style scoped lang="scss">
.byline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;

  &__avatar {
    flex: none;
    border-radius: 50%;
    object-fit: cover;
    filter: grayscale(1) contrast(1.25);
  }

  &__seal {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: $ink;
    color: $paper;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0;
  }

  &__name b {
    color: $ink;
    font-weight: 700;
  }
}
</style>
