<script setup lang="ts">
import { computed } from 'vue'
import { site, ui } from '@/config/site'
import { useReadingMode } from '@/composables/useReadingMode'
import type { ArticleCard, ReadingMode } from '@/types'

/**
 * "Lo que tu orilla no está mirando": hechos con alta relevancia en la orilla
 * contraria. Solo en noboísta y correísta; encendido por defecto y apagable.
 */
defineProps<{ items: ArticleCard[] }>()
const { mode, showOtherSide, toggleOtherSide } = useReadingMode()

const opposite = computed<ReadingMode | null>(() =>
  mode.value === 'noboista' ? 'correista' : mode.value === 'correista' ? 'noboista' : null,
)
</script>

<template>
  <aside
    v-if="opposite && items.length && showOtherSide"
    class="other"
    :style="{ '--side': site.modes[opposite].color }"
  >
    <div class="other__head">
      <span class="other__title">{{ ui.modes.otherSide }}</span>
      <span class="other__meta">
        {{ ui.modes.otherSideFor(site.modes[opposite].short) }} ·
        <button type="button" class="other__hide" @click="toggleOtherSide">
          {{ ui.modes.otherSideHide }}
        </button>
      </span>
    </div>
    <div class="other__items">
      <RouterLink
        v-for="item in items.slice(0, 2)"
        :key="item.id"
        :to="`/nota/${item.slug}`"
        class="other__item headline-link"
      >
        {{ item.title }}
      </RouterLink>
    </div>
  </aside>
  <button
    v-else-if="opposite && items.length"
    type="button"
    class="other__show"
    @click="toggleOtherSide"
  >
    {{ ui.modes.otherSideShow }}
  </button>
</template>

<style scoped lang="scss">
.other {
  border: 1px solid $box-line;
  border-left: 4px solid var(--side);
  padding: 16px 16px;
  background: $cream;
  font-family: $font-display;

  @include from('md') {
    padding: 18px 22px;
  }

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px 12px;
    margin-bottom: 8px;
  }

  &__title {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  &__meta {
    font-size: 12px;
    color: $ink-quiet;
  }

  &__hide {
    font-size: 12px;
    font-weight: 600;
    color: $accent;

    &:hover {
      color: $accent-deep;
    }
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 12px;

    @include from('md') {
      flex-direction: row;
      gap: 18px;
    }
  }

  &__item {
    flex: 1 1 0;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.015em;
  }

  &__show {
    align-self: flex-start;
    font-size: 12px;
    font-weight: 600;
    color: $accent;
  }
}
</style>
