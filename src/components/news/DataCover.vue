<script setup lang="ts">
import { computed } from 'vue'
import { ui } from '@/config/site'
import type { Infographic } from '@/types'

/**
 * Lenguaje ANALÍTICO en el hueco de la foto: cuando la nota no tiene una foto
 * que aporte pero sí cifras verificadas, se ven las cifras. HTML, no imagen:
 * se lee en el celular y se puede seleccionar.
 */
const props = defineProps<{ data: Infographic }>()

const number = new Intl.NumberFormat('es-EC', { maximumFractionDigits: 2 })
const rows = computed(() => {
  const items = props.data.items.slice(0, 4)
  const max = Math.max(...items.map((i) => Math.abs(i.value)), 0) || 1
  return items.map((i) => ({
    label: i.label,
    width: Math.max((Math.abs(i.value) / max) * 100, 2),
    display: `${number.format(i.value)}${props.data.unit ? ` ${props.data.unit}` : ''}`,
  }))
})
</script>

<template>
  <div
    class="data"
    role="img"
    :aria-label="`${data.title}: ${rows.map((r) => `${r.label} ${r.display}`).join(', ')}`"
  >
    <span class="data__tag">{{ ui.home.data }}</span>
    <p class="data__title">{{ data.title }}</p>
    <ul class="data__list" aria-hidden="true">
      <li v-for="row in rows" :key="row.label" class="data__row">
        <span class="data__label">{{ row.label }}</span>
        <span class="data__track"
          ><span class="data__fill" :style="{ width: `${row.width}%` }"></span
        ></span>
        <span class="data__value">{{ row.display }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.data {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 18px;
  background: $navy;
  color: $paper;
  font-family: $font-display;
  overflow: hidden;

  &__tag {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba($paper, 0.7);
  }

  &__title {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.15;

    @include from('md') {
      font-size: 22px;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: auto;
  }

  &__row {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
  }

  &__label {
    flex: 0 0 34%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__track {
    flex: 1;
    height: 8px;
    background: rgba($paper, 0.12);
  }

  &__fill {
    display: block;
    height: 100%;
    background: $accent;
  }

  &__value {
    flex: 0 0 auto;
    font-weight: 700;
  }
}
</style>
