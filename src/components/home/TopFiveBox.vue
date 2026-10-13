<script setup lang="ts">
import { computed } from 'vue'
import { site, ui } from '@/config/site'
import { useReadingMode } from '@/composables/useReadingMode'
import { formatRelative, formatTime } from '@/utils/format'
import StoryPhoto from '@/components/news/StoryPhoto.vue'
import ReadMore from '@/components/news/ReadMore.vue'
import Byline from '@/components/news/Byline.vue'
import type { ArticleCard } from '@/types'

/** "Las 5 cosas que tienes que saber": la historia del día y cuatro más, en el orden del modo. */
const props = defineProps<{ items: ArticleCard[] }>()
const { info } = useReadingMode()

const first = computed(() => props.items[0])
const rest = computed(() => props.items.slice(1, 5))
const when = (a: ArticleCard) => a.publishedAt ?? a.createdAt
const updated = computed(() => {
  const latest = props.items.map(when).sort().at(-1)
  return latest ? formatTime(latest) : ''
})
const minutes = computed(() => props.items.reduce((sum, a) => sum + (a.readingMinutes || 1), 0))
</script>

<template>
  <section v-if="first" class="five" :aria-label="ui.home.topFiveTitle">
    <header class="five__head">
      <h2 class="five__title">{{ ui.home.topFiveTitle }}</h2>
      <span class="five__updated five__updated--lg">{{ ui.home.updated(updated, minutes) }}</span>
      <span class="five__order">
        {{ ui.home.orderFor }} <b :style="{ color: info.color }">{{ info.short }}</b>
      </span>
      <span class="five__updated five__updated--sm">
        {{ ui.home.updatedShort(updated, minutes) }} · modo
        <b :style="{ color: info.color }">{{ info.short }}</b>
      </span>
    </header>

    <div class="five__grid">
      <article class="five__lead">
        <StoryPhoto
          :image="first.image"
          :section="first.section"
          :alt="first.title"
          :height="300"
          :mobile-height="180"
          eager
        />
        <div class="five__meta">
          <span class="five__num">1</span>
          <span v-if="first.isBreaking" class="five__breaking">{{ site.labels.breaking }}</span>
          <RouterLink :to="`/seccion/${first.section}`" class="five__section five__section--lead">
            {{ site.sections[first.section] }}
          </RouterLink>
          <span class="five__time">{{ formatRelative(when(first)) }}</span>
        </div>
        <h2 class="five__h">
          <RouterLink :to="`/nota/${first.slug}`" class="headline-link">{{
            first.title
          }}</RouterLink>
        </h2>
        <p class="five__lede">{{ first.lede }}</p>
        <div class="five__foot">
          <Byline class="five__by" :author="first.author" :size="22" :prefix="ui.home.by" />
          <ReadMore :slug="first.slug" :minutes="first.readingMinutes" short />
        </div>
      </article>

      <ol class="five__list">
        <li v-for="(item, index) in rest" :key="item.id" class="five__item">
          <span class="five__n">{{ index + 2 }}</span>
          <div class="five__body">
            <RouterLink :to="`/seccion/${item.section}`" class="five__section">
              {{ site.sections[item.section] }}
            </RouterLink>
            <h3 class="five__t">
              <RouterLink :to="`/nota/${item.slug}`" class="headline-link">{{
                item.title
              }}</RouterLink>
            </h3>
            <p class="five__sub">{{ item.lede }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped lang="scss" src="./TopFiveBox.scss"></style>
