<script setup lang="ts">
import { site, ui } from '@/config/site'
import { useReadingMode } from '@/composables/useReadingMode'
import ModePills from './ModePills.vue'

/**
 * Barra de modo de la portada v2: la etiqueta del lente siempre visible
 * (transparencia, §3.6) y el selector. En el celular quedan solo las píldoras.
 */
const { mode, hasChosen, setMode } = useReadingMode()
const hosts = site.hosts
</script>

<template>
  <div class="modebar" role="region" :aria-label="ui.modes.selectorAria">
    <div class="modebar__inner">
      <span class="modebar__label">{{ ui.modes.barLabel }}</span>

      <div class="modebar__pills no-scrollbar">
        <ModePills
          class="modebar__pills-md"
          :current="mode"
          :label="ui.modes.selectorAria"
          @pick="(m) => setMode(m, hasChosen ? 'cambiar' : 'elegir')"
        />
        <ModePills
          class="modebar__pills-sm"
          size="sm"
          :current="mode"
          :label="ui.modes.selectorAria"
          @pick="(m) => setMode(m, hasChosen ? 'cambiar' : 'elegir')"
        />
      </div>

      <span class="modebar__help">
        {{ ui.modes.barHelp }}
        <RouterLink to="/modos" class="modebar__how">{{ ui.modes.barHow }}</RouterLink>
      </span>

      <div class="modebar__hosts">
        <div class="modebar__faces">
          <img :src="hosts.boscan.photo" :alt="hosts.boscan.name" width="44" height="44" />
          <img :src="hosts.moni.photo" :alt="hosts.moni.name" width="44" height="44" />
        </div>
        <div class="modebar__service">
          <div>{{ ui.modes.serviceOf }}</div>
          <div>{{ hosts.names }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modebar {
  background: $sand;
  border-bottom: 1px solid $line;

  &__inner {
    @include container(1080px);
    display: flex;
    align-items: center;
    gap: 8px;
    padding-block: 10px;
    padding-inline: 12px;
    font-size: 13px;
    color: $ink-soft;
    overflow: hidden;

    @include from('md') {
      gap: 14px;
      padding: 14px 40px;
    }
  }

  &__label,
  &__help,
  &__hosts,
  &__pills-md {
    display: none !important;
  }

  &__pills {
    overflow-x: auto;
    min-width: 0;
  }

  @include from('md') {
    &__label {
      display: inline !important;
      white-space: nowrap;
    }

    &__pills-md {
      display: flex !important;
    }

    &__pills-sm {
      display: none !important;
    }

    &__help {
      display: inline !important;
      flex: 1;
      min-width: 0;
      max-width: 260px;
      color: $ink-faint;
      font-size: 12px;
      line-height: 1.35;
    }

    &__hosts {
      display: flex !important;
      align-items: center;
      gap: 12px;
      flex: none;
      margin-left: auto;
    }
  }

  // Entre tablet y escritorio angosto los retratos no caben con el texto de ayuda.
  @media (min-width: 768px) and (max-width: 1023px) {
    &__help {
      display: none !important;
    }
  }

  &__how {
    color: $accent;
    font-weight: 600;
    white-space: nowrap;

    &:hover {
      color: $accent-deep;
    }
  }

  &__faces {
    display: flex;

    img {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid $sand;
      filter: grayscale(1) contrast(1.25);

      & + img {
        margin-left: -12px;
      }
    }
  }

  &__service {
    font-size: 12px;
    line-height: 1.3;
    font-weight: 700;
    color: $ink;
  }
}
</style>
