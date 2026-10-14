<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { site } from '@/config/site'
import { imageCredit, visibleImage } from '@/utils/media'
import DataCover from './DataCover.vue'
import type { ArticleImage, Infographic, Section } from '@/types'

/**
 * Foto de alto fijo (portada v2: 300/360 en escritorio, 180/190 en el celular)
 * con su crédito. La foto genérica no se muestra: si la nota tiene cifras se
 * ven las cifras; si no, la ficha de marca con la sección. Nunca un hueco.
 */
const props = withDefaults(
  defineProps<{
    image: ArticleImage | null
    section: Section
    infographic?: Infographic | null
    alt?: string
    height: number
    mobileHeight: number
    caption?: boolean
    eager?: boolean
  }>(),
  { alt: '', caption: false, eager: false, infographic: null },
)

// Si el medio bloquea la foto (hotlink), se ve la portada de marca y no un ícono roto.
const broken = ref(false)
watch(
  () => props.image?.url,
  () => (broken.value = false),
)

const shown = computed(() => (broken.value ? null : visibleImage(props.image)))
const credit = computed(() => imageCredit(shown.value))
const data = computed(() => (props.infographic?.items?.length ? props.infographic : null))
</script>

<template>
  <figure class="photo" :style="{ '--h': `${height}px`, '--mh': `${mobileHeight}px` }">
    <div class="photo__frame">
      <img
        v-if="shown"
        :src="shown.url"
        :alt="shown.caption || alt"
        :loading="eager ? 'eager' : 'lazy'"
        decoding="async"
        referrerpolicy="no-referrer"
        @error="broken = true"
      />
      <DataCover v-else-if="data" :data="data" />
      <div v-else class="photo__fallback" aria-hidden="true">
        <span class="photo__stamp">{{ site.name }}</span>
        <span class="photo__section">{{ site.sections[section] ?? section }}</span>
      </div>
    </div>
    <figcaption v-if="caption && credit" class="photo__credit">{{ credit }}</figcaption>
  </figure>
</template>

<style scoped lang="scss">
.photo {
  &__frame {
    height: var(--mh);
    background: $cream-2;
    overflow: hidden;

    @include from('md') {
      height: var(--h);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__fallback {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 16px 18px;
    background: $ink;
    color: $paper;
    font-family: $font-display;
  }

  &__stamp {
    border: 2px solid $stamp;
    color: $stamp;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 1px 6px;
    transform: rotate(-4deg);
  }

  &__section {
    font-size: clamp(28px, 5vw, 40px);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1;
  }

  &__credit {
    font-size: 12px;
    color: $ink-quiet;
    font-style: italic;
    margin: 6px 0 0;
    line-height: 1.4;
  }
}
</style>
