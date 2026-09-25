<script setup lang="ts">
import { ui } from '@/config/site'

defineProps<{ slug: string; minutes: number }>()
</script>

<template>
  <RouterLink :to="`/nota/${slug}`" class="more">
    {{ ui.feed.readStory }}
    <span v-if="minutes" class="more__time">· {{ ui.article.minutes(minutes) }}</span>
    <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
  </RouterLink>
</template>

<style scoped lang="scss">
.more {
  @include flex(row, center, flex-start, 0.4rem);
  align-self: flex-start;
  font-size: $text-sm;
  font-weight: 700;
  color: $accent-deep;
  border-bottom: 2px solid $accent;
  padding-bottom: 0.1rem;
  @include focus-ring;

  &__time {
    font-weight: 500;
    color: $ink-soft;
  }

  i {
    font-size: 0.75rem;
    @include transition(transform);
  }

  &:hover i {
    transform: translateX(3px);
  }
}
</style>
