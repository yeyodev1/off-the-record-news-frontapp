<script setup lang="ts">
import { admin } from '@/config/admin'
import type { MesaLive } from '@/types'

defineProps<{ funnel: MesaLive['funnel'] }>()
const t = admin.mesa.funnel
</script>

<template>
  <section class="funnel">
    <h2 class="funnel__title">{{ t.title }}</h2>
    <ol class="funnel__steps">
      <li v-for="(step, i) in t.steps" :key="step.key" class="funnel__step">
        <span class="funnel__icon"><i :class="step.icon"></i></span>
        <div class="funnel__body">
          <p class="funnel__head">
            <strong class="funnel__value">{{ funnel[step.key as keyof typeof funnel] }}</strong>
            <span class="funnel__label">{{ i + 1 }}. {{ step.label }}</span>
            <span v-if="step.key === 'scored' && funnel.discarded" class="funnel__aside">
              · {{ funnel.discarded }} {{ t.discarded }}
            </span>
          </p>
          <p class="funnel__agent">{{ step.agent }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

<style scoped lang="scss">
.funnel {
  @include card;
  padding: 0.9rem 1rem;

  &__title {
    @include display($text-base, 700);
    margin-bottom: 0.8rem;
  }

  &__steps {
    @include flex(column, stretch, flex-start, 0);
  }

  &__step {
    @include flex(row, flex-start, flex-start, 0.8rem);
    position: relative;
    padding-bottom: 0.9rem;

    // El riel que une los pasos: se lee como una línea de producción.
    &:not(:last-child)::before {
      content: '';
      position: absolute;
      left: calc(1.05rem - 1px);
      top: 2.1rem;
      bottom: 0;
      width: 2px;
      background: $line;
    }
  }

  &__icon {
    @include flex(row, center, center);
    flex: 0 0 2.1rem;
    height: 2.1rem;
    border-radius: 50%;
    background: $accent-soft;
    color: $accent-deep;
    font-size: $text-sm;
  }

  &__body {
    min-width: 0;
  }

  &__head {
    @include flex(row, baseline, flex-start, 0.45rem);
    flex-wrap: wrap;
  }

  &__value {
    font-family: $font-display;
    font-size: $text-lg;
  }

  &__label {
    font-weight: 700;
    font-size: $text-sm;
  }

  &__aside {
    font-size: $text-xs;
    color: $ink-muted;
  }

  &__agent {
    font-size: $text-xs;
    color: $ink-muted;
    margin-top: 0.15rem;
  }
}
</style>
