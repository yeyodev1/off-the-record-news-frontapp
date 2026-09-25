<script setup lang="ts">
import { admin, scoreKeys, scoreTone } from '@/config/admin'
import type { ScoreBreakdown } from '@/types'

defineProps<{ score: ScoreBreakdown }>()
</script>

<template>
  <div class="breakdown">
    <ul class="breakdown__list">
      <li v-for="key in scoreKeys" :key="key" class="breakdown__row">
        <span class="breakdown__label">{{ admin.score[key] }}</span>
        <span class="breakdown__track">
          <span
            class="breakdown__bar"
            :class="`breakdown__bar--${scoreTone(score[key])}`"
            :style="{ width: `${Math.min(10, Math.max(0, score[key])) * 10}%` }"
          ></span>
        </span>
        <span class="breakdown__num">{{ score[key].toFixed(1) }}</span>
      </li>
    </ul>
    <p v-if="score.reasoning" class="breakdown__reason">
      <i class="fa-solid fa-quote-left"></i> {{ score.reasoning }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.breakdown {
  @include flex(column, stretch, flex-start, 0.6rem);
  background: $sand;
  border-radius: $radius-sm;
  padding: 0.75rem 0.9rem;

  &__list {
    list-style: none;
    @include flex(column, stretch, flex-start, 0.35rem);

    @include from('md') {
      @include flex-cards(220px, 0.35rem 1.25rem);
      flex-direction: row;
    }
  }

  &__row {
    @include flex(row, center, flex-start, 0.6rem);
    font-size: $text-xs;
  }

  &__label {
    flex: 0 0 5.8rem;
    color: $ink-soft;
    font-weight: 600;
  }

  &__track {
    flex: 1;
    height: 6px;
    background: $line;
    border-radius: $radius-pill;
    overflow: hidden;
  }

  &__bar {
    display: block;
    height: 100%;
    border-radius: inherit;

    &--success {
      background: $success;
    }

    &--warning {
      background: $warning;
    }

    &--muted {
      background: $ink-muted;
    }
  }

  &__num {
    flex: 0 0 2rem;
    text-align: right;
    font-variant-numeric: tabular-nums;
    font-weight: 700;
  }

  &__reason {
    font-size: $text-sm;
    color: $ink-soft;
    font-style: italic;

    i {
      font-size: 0.7rem;
      color: $ink-muted;
      margin-right: 0.2rem;
    }
  }
}
</style>
