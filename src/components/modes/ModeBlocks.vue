<script setup lang="ts">
import { computed } from 'vue'
import { ui } from '@/config/site'
import { useReadingMode } from '@/composables/useReadingMode'
import SectionHeading from '@/components/news/SectionHeading.vue'
import ArticleCard from '@/components/news/ArticleCard.vue'
import type { ArticleCard as Card } from '@/types'

/** Bloques de portada que dependen del modo. Un bloque vacío no se pinta. */
const props = defineProps<{ forMode: Card[]; contradictions: Card[]; otherSide: Card[] }>()

const { mode, info, showOtherSide, toggleOtherSide } = useReadingMode()

const partisan = computed(() => mode.value === 'noboista' || mode.value === 'correista')
const showContradictions = computed(() => mode.value === 'anti_ambos' && props.contradictions.length > 0)
</script>

<template>
  <div class="mode-blocks">
    <section v-if="forMode.length" class="mode-blocks__block">
      <SectionHeading :title="ui.modes.forMode(info.short)" />
      <div class="mode-blocks__cards">
        <ArticleCard
          v-for="(item, index) in forMode.slice(0, 4)"
          :key="item.id"
          :article="item"
          :with-image="index === 0"
        />
      </div>
    </section>

    <section v-if="showContradictions" class="mode-blocks__block mode-blocks__block--alt">
      <SectionHeading :title="ui.modes.contradictions" />
      <p class="mode-blocks__note">{{ ui.modes.contradictionsNote }}</p>
      <div class="mode-blocks__cards">
        <ArticleCard v-for="item in contradictions.slice(0, 4)" :key="item.id" :article="item" />
      </div>
    </section>

    <template v-if="partisan && otherSide.length">
      <section v-if="showOtherSide" class="mode-blocks__block mode-blocks__block--alt">
        <SectionHeading :title="ui.modes.otherSide" />
        <div class="mode-blocks__row">
          <p class="mode-blocks__note">{{ ui.modes.otherSideNote }}</p>
          <button type="button" class="mode-blocks__toggle" @click="toggleOtherSide">
            <i class="fa-regular fa-eye-slash" aria-hidden="true"></i> {{ ui.modes.otherSideHide }}
          </button>
        </div>
        <div class="mode-blocks__cards">
          <ArticleCard v-for="item in otherSide.slice(0, 4)" :key="item.id" :article="item" />
        </div>
      </section>
      <button v-else type="button" class="mode-blocks__toggle mode-blocks__toggle--show" @click="toggleOtherSide">
        <i class="fa-regular fa-eye" aria-hidden="true"></i> {{ ui.modes.otherSideShow }}
      </button>
    </template>
  </div>
</template>

<style scoped lang="scss">
.mode-blocks {
  @include flex(column, stretch, flex-start, $space-lg);

  &__block {
    @include flex(column, stretch, flex-start, 0);

    &--alt {
      background: $sand;
      padding: 0 1rem 1.25rem;

      @include from('md') {
        padding: 0 1.5rem 1.5rem;
      }
    }
  }

  &__row {
    @include flex(row, flex-start, space-between, 0.5rem 1rem);
    flex-wrap: wrap;
  }

  &__note {
    font-size: $text-sm;
    color: $ink-soft;
    margin: -0.6rem 0 1.2rem;
    max-width: 60ch;
  }

  &__cards {
    @include flex-cards(230px, 1.75rem 2rem);
  }

  &__toggle {
    @include flex(row, center, flex-start, 0.4rem);
    font-size: $text-xs;
    font-weight: 700;
    color: $ink-muted;
    margin-top: -0.6rem;
    @include focus-ring;

    &:hover {
      color: $ink;
    }

    &--show {
      align-self: flex-start;
      margin-top: 0;
      color: $accent-deep;
    }
  }
}
</style>
