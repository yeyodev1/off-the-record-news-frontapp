<script setup lang="ts">
import { site } from '@/config/site'
import { READING_MODES } from '@/composables/useReadingMode'
import type { ReadingMode } from '@/types'

/**
 * Las miradas como píldoras (portada v2). Activa: fondo del color del modo y
 * texto blanco. Iconos en CSS: punto noboísta, punto correísta y círculo medio
 * lleno para independientes.
 */
withDefaults(
  defineProps<{ current?: ReadingMode | null; size?: 'md' | 'sm' | 'lg'; label?: string }>(),
  {
    current: null,
    size: 'md',
    label: '',
  },
)
const emit = defineEmits<{ pick: [mode: ReadingMode] }>()
</script>

<template>
  <div class="pills" :class="`pills--${size}`" role="group" :aria-label="label || undefined">
    <button
      v-for="key in READING_MODES"
      :key="key"
      type="button"
      class="pills__pill"
      :class="[`pills__pill--${key}`, { 'pills__pill--on': current === key }]"
      :style="{ '--mode': site.modes[key].color }"
      :aria-pressed="current === key"
      @click="emit('pick', key)"
    >
      <span class="pills__icon" :class="`pills__icon--${key}`" aria-hidden="true"></span>
      <span class="pills__full">{{ site.modes[key].name }}</span>
      <span class="pills__abbr">{{ site.modes[key].abbr }}</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.pills {
  display: flex;
  flex: none;
  gap: 4px;
  background: $paper;
  padding: 3px;
  border-radius: 999px;
  border: 1px solid $pill-line;

  &__pill {
    display: flex;
    align-items: center;
    gap: 7px;
    color: $ink;
    padding: 7px 13px;
    border-radius: 999px;
    font-family: $font-display;
    font-weight: 600;
    font-size: 13px;
    line-height: 1.2;
    white-space: nowrap;
    transition:
      background 0.25s ease,
      color 0.25s ease;
    @include focus-ring;

    &:hover:not(&--on) {
      background: $cream-2;
    }

    &--on {
      background: var(--mode);
      color: $paper;
      font-weight: 700;
    }
  }

  &__abbr {
    display: none;
  }

  &__icon {
    flex: none;

    &--noboista,
    &--correista {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--mode);
    }

    &--independiente {
      width: 11px;
      height: 11px;
      border: 1.5px solid $ink;
      border-radius: 50%;
      background: linear-gradient(90deg, $ink 50%, transparent 50%);
    }
  }

  &__pill--on &__icon--noboista,
  &__pill--on &__icon--correista {
    background: $paper;
    opacity: 0.9;
  }

  &__pill--on &__icon--independiente {
    border-color: $paper;
    background: linear-gradient(90deg, $paper 50%, transparent 50%);
  }

  // Celular: 12px, padding 6/9 y "Indep." abreviado.
  &--sm &__pill {
    gap: 5px;
    padding: 6px 9px;
    font-size: 12px;
  }

  &--sm &__full {
    display: none;
  }

  &--sm &__abbr {
    display: inline;
  }

  // Pantalla de primera visita: píldoras grandes.
  &--lg {
    flex-wrap: wrap;
    justify-content: center;
    border-radius: 28px;
    padding: 5px;
    gap: 6px;
  }

  &--lg &__pill {
    gap: 9px;
    padding: 13px 20px;
    font-size: 16px;
  }

  &--lg &__icon--noboista,
  &--lg &__icon--correista {
    width: 11px;
    height: 11px;
  }

  &--lg &__icon--independiente {
    width: 13px;
    height: 13px;
  }
}
</style>
