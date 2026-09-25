<script setup lang="ts">
import { computed } from 'vue'
import type { ArticleImage } from '@/types'

const props = withDefaults(defineProps<{ image: ArticleImage; alt: string; eager?: boolean }>(), {
  eager: false,
})

const prefixes: Record<ArticleImage['kind'], string> = {
  photo: 'Foto',
  illustration: 'Ilustración',
  infographic: 'Infografía',
}

// Las fotos de terceros siempre llevan crédito visible: "Foto: Primicias".
const credit = computed(() => {
  if (props.image.credit) return props.image.credit
  if (props.image.sourceName) return `${prefixes[props.image.kind] ?? 'Foto'}: ${props.image.sourceName}`
  return ''
})
</script>

<template>
  <figure class="figure">
    <div class="figure__frame">
      <img
        class="figure__img"
        :src="image.url"
        :alt="alt"
        :loading="eager ? 'eager' : 'lazy'"
        decoding="async"
      />
    </div>
    <figcaption v-if="credit" class="figure__credit">
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

  &__credit {
    font-size: $text-xs;
    color: $ink-muted;
    margin-top: 0.4rem;
    text-align: right;

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
