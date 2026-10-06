<script setup lang="ts">
import { site, ui } from '@/config/site'
import { READING_MODES, useReadingMode } from '@/composables/useReadingMode'

/**
 * Etiqueta siempre visible del lente con el que se lee (transparencia, §3.6) y
 * selector. En pantallas anchas los cuatro modos van en línea; en el celular,
 * "Cambiar" abre la pantalla de elección.
 */
const { mode, info, hasChosen, setMode, openPicker } = useReadingMode()
</script>

<template>
  <div class="modebar" role="region" :aria-label="ui.modes.selectorAria">
    <div class="modebar__inner">
      <p class="modebar__label">
        <i :class="info.icon" aria-hidden="true"></i>
        <span>{{ ui.modes.label(info.short) }}</span>
        <span class="modebar__sep" aria-hidden="true">·</span>
        <button type="button" class="modebar__change" @click="openPicker">{{ ui.modes.change }}</button>
      </p>

      <ul class="modebar__chips" :aria-label="ui.modes.selectorAria">
        <li v-for="key in READING_MODES" :key="key">
          <button
            type="button"
            class="modebar__chip"
            :class="{ 'modebar__chip--on': mode === key }"
            :aria-pressed="mode === key"
            @click="setMode(key, hasChosen ? 'cambiar' : 'elegir')"
          >
            {{ site.modes[key].name }}
          </button>
        </li>
        <li>
          <RouterLink to="/modos" class="modebar__how" :title="ui.modes.howLink" :aria-label="ui.modes.howLink">
            <i class="fa-regular fa-circle-question" aria-hidden="true"></i>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modebar {
  background: $sand;
  border-top: 1px solid $line;

  &__inner {
    @include container;
    @include flex(row, center, space-between, 0.5rem 1rem);
    flex-wrap: wrap;
    padding-block: 0.4rem;
  }

  &__label {
    @include flex(row, center, flex-start, 0.4rem);
    flex-wrap: wrap;
    min-width: 0;
    font-size: $text-xs;
    color: $ink-soft;

    i {
      color: $ink;
    }
  }

  &__sep {
    color: $ink-muted;
  }

  &__change {
    font-size: $text-xs;
    font-weight: 700;
    color: $accent-deep;
    text-decoration: underline;
    text-underline-offset: 3px;
    @include focus-ring;

    &:hover {
      color: $ink;
    }
  }

  &__chips {
    display: none;
    list-style: none;

    @include from('md') {
      @include flex(row, center, flex-end, 0.3rem);
    }
  }

  &__chip {
    padding: 0.25rem 0.6rem;
    font-size: $text-xs;
    font-weight: 700;
    letter-spacing: 0.03em;
    color: $ink-soft;
    border: 1px solid transparent;
    @include transition(background);
    @include focus-ring;

    &:hover {
      color: $ink;
      border-color: $ink;
    }

    &--on,
    &--on:hover {
      background: $ink;
      color: $paper;
      border-color: $ink;
    }
  }

  &__how {
    display: inline-flex;
    padding: 0.25rem 0.4rem;
    color: $ink-muted;

    &:hover {
      color: $ink;
    }
  }
}
</style>
