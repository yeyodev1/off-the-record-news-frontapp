<script setup lang="ts">
import { site } from '@/config/site'
import type { Edition } from '@/types'

const model = defineModel<Edition[]>({ required: true })

const editions = Object.entries(site.editions) as [Edition, (typeof site.editions)[Edition]][]
</script>

<template>
  <div class="picker">
    <label v-for="[key, edition] in editions" :key="key" class="picker__item">
      <input v-model="model" type="checkbox" :value="key" class="picker__input" />
      <span class="picker__box" aria-hidden="true"><i class="fa-solid fa-check"></i></span>
      <span class="picker__body">
        <span class="picker__time"><i class="fa-regular fa-clock" aria-hidden="true"></i> {{ edition.time }}</span>
        <span class="picker__name">{{ edition.name }}</span>
        <span class="picker__blurb">{{ edition.blurb }}</span>
      </span>
    </label>
  </div>
</template>

<style scoped lang="scss">
// Cada edición es una tarjeta-checkbox: el lector elige mirando lo que recibe.
.picker {
  @include flex-cards(240px, 0.75rem);

  &__item {
    position: relative;
    @include flex(row, flex-start, flex-start, 0.85rem);
    margin: 0;
    padding: 1.1rem;
    border: 1px solid $line;
    background: $paper;
    cursor: pointer;
    @include transition(border-color);

    &:hover {
      border-color: $ink;
    }

    &:has(.picker__input:checked) {
      border-color: $accent;
      box-shadow: inset 0 0 0 1px $accent;
    }

    &:has(.picker__input:focus-visible) {
      outline: 2px solid $accent;
      outline-offset: 2px;
    }
  }

  &__input {
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
  }

  &__box {
    flex-shrink: 0;
    @include flex(row, center, center);
    width: 1.3rem;
    height: 1.3rem;
    border: 1.5px solid $ink;
    color: transparent;
    font-size: 0.7rem;
    margin-top: 0.1rem;
  }

  &__input:checked + &__box {
    background: $accent;
    border-color: $accent;
    color: $paper;
  }

  &__body {
    @include flex(column, stretch, flex-start, 0.25rem);
  }

  &__time {
    font-size: $text-xs;
    font-weight: 600;
    color: $ink-muted;
  }

  &__name {
    font-family: $font-display;
    font-weight: 800;
    font-size: $text-lg;
    color: $ink;
    line-height: 1.15;
  }

  &__blurb {
    font-size: $text-sm;
    font-weight: 400;
    color: $ink-soft;
    line-height: 1.5;
  }
}
</style>
