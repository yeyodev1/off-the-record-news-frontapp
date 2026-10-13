<script setup lang="ts">
import { computed } from 'vue'
import { site } from '@/config/site'
import { admin } from '@/config/admin'
import type { Article } from '@/types'

/**
 * Lo que la IA propone a la Mesa y el lector no ve tal cual: las "patitas"
 * (seguimientos posibles) y el titular de cada mirada.
 */
const props = defineProps<{ article: Article }>()
const t = admin.followUps

const framings = computed(() =>
  (['noboista', 'correista'] as const).map((mode) => ({
    mode,
    name: site.modes[mode].name,
    color: site.modes[mode].color,
    title: props.article.framing?.[mode]?.title ?? '',
  })),
)
</script>

<template>
  <div class="follow">
    <h3 class="follow__title">{{ t.title }}</h3>
    <ul v-if="article.followUps?.length" class="follow__list">
      <li v-for="idea in article.followUps" :key="idea">{{ idea }}</li>
    </ul>
    <p v-else class="follow__empty">{{ t.empty }}</p>

    <h3 class="follow__title">{{ t.framingTitle }}</h3>
    <p v-for="f in framings" :key="f.mode" class="follow__frame" :style="{ borderColor: f.color }">
      <b>{{ f.name }}:</b> {{ f.title || t.framingPending }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.follow {
  @include flex(column, stretch, flex-start, 8px);
  font-size: $text-sm;

  &__title {
    font-size: $text-base;
    font-weight: 700;
  }

  &__list {
    padding-left: 1.1rem;
    @include flex(column, stretch, flex-start, 6px);
  }

  &__empty {
    color: $ink-muted;
  }

  &__frame {
    border-left: 3px solid;
    padding-left: 8px;
  }
}
</style>
