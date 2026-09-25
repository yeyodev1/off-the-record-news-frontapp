<script setup lang="ts">
import { computed } from 'vue'
import { admin, scoreTone } from '@/config/admin'
import type { ScoreBreakdown } from '@/types'

const props = defineProps<{ score: ScoreBreakdown | null; open?: boolean; clickable?: boolean }>()
const emit = defineEmits<{ toggle: [] }>()

const tone = computed(() => (props.score ? scoreTone(props.score.total) : 'none'))
const value = computed(() => (props.score ? props.score.total.toFixed(1) : '—'))
</script>

<template>
  <component
    :is="clickable ? 'button' : 'span'"
    class="score"
    :class="[`score--${tone}`, { 'score--clickable': clickable }]"
    :type="clickable ? 'button' : undefined"
    :aria-expanded="clickable ? open : undefined"
    :title="score ? `${admin.score.label}: ${value} / 10` : admin.score.none"
    @click="clickable && emit('toggle')"
  >
    <span class="score__value">{{ value }}</span>
    <span class="score__max">/10</span>
    <i
      v-if="clickable"
      class="fa-solid score__chevron"
      :class="open ? 'fa-chevron-up' : 'fa-chevron-down'"
    ></i>
  </component>
</template>

<style scoped lang="scss">
.score {
  @include flex(row, baseline, center, 0.1rem);
  display: inline-flex;
  padding: 0.25rem 0.6rem;
  border-radius: $radius-sm;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  color: $surface;
  flex-shrink: 0;

  &__value {
    font-family: $font-display;
    font-weight: 800;
    font-size: 1.05rem;
  }

  &__max {
    font-size: 0.68rem;
    opacity: 0.8;
  }

  &__chevron {
    font-size: 0.6rem;
    margin-left: 0.3rem;
    align-self: center;
  }

  &--success {
    background: $success;
  }

  &--warning {
    background: $warning;
  }

  &--muted {
    background: $ink-muted;
  }

  &--none {
    background: $sand;
    color: $ink-muted;
  }

  &--clickable {
    cursor: pointer;
    @include focus-ring;
  }
}
</style>
