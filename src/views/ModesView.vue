<script setup lang="ts">
import { site, ui } from '@/config/site'
import { READING_MODES, useReadingMode } from '@/composables/useReadingMode'
import PageIntro from '@/components/news/PageIntro.vue'
import ModeOptions from '@/components/modes/ModeOptions.vue'
import type { ReadingMode } from '@/types'

const { mode, hasChosen, setMode } = useReadingMode()
const how = site.howModes

function pick(next: ReadingMode) {
  setMode(next, hasChosen.value ? 'cambiar' : 'elegir')
}
</script>

<template>
  <div class="modes-page">
    <PageIntro :eyebrow="site.name" :title="how.title" :subtitle="how.subtitle" />

    <section class="modes-page__block">
      <h2 class="modes-page__h2">{{ ui.modes.current }}</h2>
      <ModeOptions :current="mode" @pick="pick" />
    </section>

    <section class="modes-page__block">
      <h2 class="modes-page__h2">{{ ui.modes.chooserTitle }}</h2>
      <dl class="modes-page__modes">
        <div v-for="key in READING_MODES" :key="key" class="modes-page__mode">
          <dt><i :class="site.modes[key].icon" aria-hidden="true"></i> {{ site.modes[key].name }}</dt>
          <dd>{{ site.modes[key].shows }}</dd>
        </div>
      </dl>
    </section>

    <section class="modes-page__block">
      <h2 class="modes-page__h2">{{ how.changesTitle }}</h2>
      <ul class="modes-page__list">
        <li v-for="item in how.changes" :key="item">{{ item }}</li>
      </ul>
    </section>

    <section class="modes-page__block modes-page__block--never">
      <h2 class="modes-page__h2">{{ how.neverTitle }}</h2>
      <ul class="modes-page__list">
        <li v-for="item in how.never" :key="item">{{ item }}</li>
      </ul>
    </section>

    <section class="modes-page__block">
      <h2 class="modes-page__h2">{{ how.privacyTitle }}</h2>
      <ul class="modes-page__list">
        <li v-for="item in how.privacy" :key="item">{{ item }}</li>
      </ul>
    </section>
  </div>
</template>

<style scoped lang="scss">
.modes-page {
  @include container(760px);
  @include flex(column, stretch, flex-start, 2.25rem);
  padding-top: 2rem;

  @include from('md') {
    padding-top: 3.5rem;
  }

  &__block {
    @include flex(column, stretch, flex-start, 1rem);
    padding-top: 1rem;
    border-top: 4px solid $ink;

    &--never {
      background: $sand;
      padding: 1.25rem;
      border-top-color: $accent;
    }
  }

  &__h2 {
    font-size: $text-xl;
    font-weight: 900;
    letter-spacing: -0.02em;
  }

  &__modes {
    @include flex(column, stretch, flex-start, 1rem);
  }

  &__mode {
    dt {
      font-weight: 800;
    }

    dd {
      color: $ink-soft;
      line-height: 1.55;
    }
  }

  &__list {
    @include flex(column, stretch, flex-start, 0.7rem);
    padding-left: 1.2rem;
    line-height: 1.6;
  }
}
</style>
