<script setup lang="ts">
import { computed, ref } from 'vue'
import { imageCredit } from '@/utils/media'
import type { ArticleImage } from '@/types'

const props = withDefaults(defineProps<{ image: ArticleImage; alt: string; eager?: boolean }>(), {
  eager: false,
})

// Pie con la naturaleza de la imagen (foto, archivo, gráfico) y su crédito visible.
const credit = computed(() => imageCredit(props.image))
// Si el medio bloquea la foto, no queda un ícono roto en medio de la nota.
const broken = ref(false)
</script>

<template>
  <figure v-if="!broken" class="figure">
    <div class="figure__frame">
      <img
        class="figure__img"
        :src="image.url"
        :alt="image.caption || alt"
        :loading="eager ? 'eager' : 'lazy'"
        decoding="async"
        referrerpolicy="no-referrer"
        @error="broken = true"
      />
    </div>
    <figcaption v-if="credit || image.caption" class="figure__credit">
      <span v-if="image.caption" class="figure__caption">{{ image.caption }}</span>
      <a v-if="image.sourceUrl" :href="image.sourceUrl" target="_blank" rel="noopener noreferrer">
        {{ credit }}
      </a>
      <span v-else>{{ credit }}</span>
    </figcaption>
  </figure>
</template>

<style scoped lang="scss">
.figure {
  &__frame {
    aspect-ratio: 16 / 9;
    background: $sand;
    overflow: hidden;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__caption {
    font-style: italic;
  }

  &__credit {
    font-size: $text-xs;
    color: $ink-muted;
    margin-top: 0.4rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.25rem 1rem;

    a {
      text-decoration: underline;
      text-decoration-color: $line;
      text-underline-offset: 2px;

      &:hover {
        color: $ink;
        text-decoration-color: $ink;
      }
    }
  }
}
</style>
