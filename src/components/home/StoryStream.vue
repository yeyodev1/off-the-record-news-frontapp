<script setup lang="ts">
import { computed, ref } from 'vue'
import { ui } from '@/config/site'
import { useStream } from '@/composables/useStream'
import { useProTeasers } from '@/composables/useProTeasers'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import StreamStory from './StreamStory.vue'
import ProTeaserCard from './ProTeaserCard.vue'
import OtherSideBox from './OtherSideBox.vue'
import SkeletonStory from '@/components/news/SkeletonStory.vue'
import type { ArticleCard, ProTeaser, StreamOrder } from '@/types'

/**
 * Stream de la portada: Principales (orden del modo), Más leídas y Lo último.
 * Cada cuatro notas entra un tráiler de OTR PRO (el primero, después de la
 * primera nota) y, en noboísta o correísta, "Lo que tu orilla no está mirando"
 * después de la segunda.
 */
const props = withDefaults(defineProps<{ otherSide: ArticleCard[]; topIds?: string[] }>(), {
  topIds: () => [],
})

const TABS: StreamOrder[] = ['principales', 'leidas', 'ultimo']
const PRO_EVERY = 4

const order = ref<StreamOrder>('principales')
const { items, hasMore, loading, loadingMore, error, loadMore, reload } = useStream(order)
const { teasers, sealedThisWeek } = useProTeasers()

// En "Principales" el stream comparte el orden del modo con "Las 5 cosas": sin
// esto, las primeras notas repetirían la caja de arriba. En las otras pestañas
// el orden es distinto, así que no se filtra.
const visibleItems = computed(() => {
  if (order.value !== 'principales' || !props.topIds.length) return items.value
  const top = new Set(props.topIds)
  return items.value.filter((article) => !top.has(article.id))
})
const scroll = useInfiniteScroll(() => loadMore())

type Row =
  | { kind: 'story'; key: string; article: ArticleCard }
  | { kind: 'pro'; key: string; teaser: ProTeaser }
  | { kind: 'other'; key: string }

const rows = computed<Row[]>(() => {
  const out: Row[] = []
  let nextTeaser = 0
  visibleItems.value.forEach((article, index) => {
    out.push({ kind: 'story', key: article.id, article })
    const isProSlot = index === 0 || (index > 0 && index % PRO_EVERY === 0)
    if (isProSlot && nextTeaser < teasers.value.length) {
      const teaser = teasers.value[nextTeaser++]!
      out.push({ kind: 'pro', key: `pro-${teaser.id}`, teaser })
    }
    if (index === 1 && props.otherSide.length) out.push({ kind: 'other', key: 'other-side' })
  })
  return out
})
</script>

<template>
  <section class="stream">
    <div class="stream__tabs" role="tablist" :aria-label="ui.home.tabsAria">
      <button
        v-for="tab in TABS"
        :key="tab"
        type="button"
        role="tab"
        class="stream__tab"
        :class="{ 'stream__tab--on': order === tab }"
        :aria-selected="order === tab"
        @click="order = tab"
      >
        {{ ui.home.tabs[tab] }}
      </button>
    </div>

    <SkeletonStory v-if="loading && !items.length" :count="2" with-image />
    <p v-else-if="error && !items.length" class="stream__error" role="alert">
      {{ error }} <button type="button" @click="reload">{{ ui.feed.retry }}</button>
    </p>

    <Transition name="reorder" mode="out-in">
      <div :key="order" class="stream__list">
        <div
          v-for="row in rows"
          :key="row.key"
          class="stream__row"
          :class="`stream__row--${row.kind}`"
        >
          <StreamStory v-if="row.kind === 'story'" :article="row.article" />
          <ProTeaserCard
            v-else-if="row.kind === 'pro'"
            :teaser="row.teaser"
            :sealed="sealedThisWeek"
          />
          <OtherSideBox v-else :items="otherSide" />
        </div>
      </div>
    </Transition>

    <div
      :ref="(el) => (scroll.sentinel.value = el as HTMLElement | null)"
      class="stream__sentinel"
      aria-hidden="true"
    ></div>
    <div v-if="hasMore" class="stream__more">
      <button type="button" class="stream__more-btn" :disabled="loadingMore" @click="loadMore">
        {{ loadingMore ? ui.feed.loadingMore : ui.home.seeMore }}
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.stream {
  font-family: $font-display;

  &__tabs {
    display: flex;
    gap: 18px;
    border-bottom: 1px solid $line;
    margin-bottom: 16px;

    @include from('md') {
      gap: 28px;
      margin-bottom: 0;
    }
  }

  &__tab {
    padding: 0 0 8px;
    margin-bottom: -1px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $ink-faint;
    border-bottom: 2px solid transparent;
    @include transition(color);
    @include focus-ring;

    @include from('md') {
      padding-bottom: 10px;
      font-size: 13px;
    }

    &:hover {
      color: $ink;
    }

    &--on {
      color: $ink;
      border-bottom-color: $ink;
    }
  }

  &__row {
    &--story + &--story :deep(.story) {
      padding-top: 22px;

      @include from('md') {
        padding-top: 28px;
      }
    }

    &--pro,
    &--other {
      margin: 22px 0;

      @include from('md') {
        margin: 28px 0 0;
      }
    }
  }

  &__error {
    padding: 24px 0;
    color: $ink-soft;

    button {
      color: $accent;
      font-weight: 700;
    }
  }

  &__sentinel {
    height: 1px;
  }

  &__more {
    text-align: center;
    padding: 32px 0 0;
  }

  &__more-btn {
    border: 1px solid $ink;
    padding: 11px 22px;
    font-weight: 700;
    font-size: 14px;
    border-radius: 3px;
    @include transition(background);
    @include focus-ring;

    &:hover {
      background: $ink;
      color: $paper;
    }

    &:disabled {
      opacity: 0.5;
    }
  }
}
</style>
