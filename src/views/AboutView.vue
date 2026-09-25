<script setup lang="ts">
import { site } from '@/config/site'
import PageIntro from '@/components/news/PageIntro.vue'
import { ui } from '@/components/news/uiCopy'
</script>

<template>
  <div class="about">
    <PageIntro :eyebrow="site.name" :title="site.about.title" :subtitle="site.tagline" />

    <div class="about__body">
      <p v-for="paragraph in site.about.paragraphs" :key="paragraph">{{ paragraph }}</p>
    </div>

    <div class="about__actions">
      <RouterLink to="/boletines" class="btn btn--primary">{{ ui.about.ctaNewsletters }}</RouterLink>
      <RouterLink to="/denuncias" class="btn btn--ghost">{{ ui.about.ctaTips }}</RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about {
  @include container(760px);
  @include flex(column, stretch, flex-start, 2rem);
  padding-top: 2rem;

  @include from('md') {
    padding-top: 3.5rem;
  }

  &__body {
    @include flex(column, stretch, flex-start, 1.25rem);
    padding-top: 2rem;
    border-top: 4px solid $ink;
    font-size: $text-lg;
    line-height: 1.65;

    // La primera frase abre como un lede.
    p:first-child {
      font-family: $font-display;
      font-weight: 700;
      font-size: $text-xl;
      line-height: 1.35;
    }
  }

  &__actions {
    @include flex(row, center, flex-start, 0.75rem);
    flex-wrap: wrap;

    .btn {
      border-radius: 0;
    }
  }
}
</style>
