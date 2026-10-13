<script setup lang="ts">
import { site, ui } from '@/config/site'
</script>

<template>
  <section class="podcast">
    <div class="podcast__faces">
      <img :src="site.hosts.boscan.photo" :alt="site.hosts.boscan.name" />
      <img :src="site.hosts.moni.photo" :alt="site.hosts.moni.name" />
    </div>
    <h1 class="podcast__title">{{ ui.podcast.title }}</h1>
    <p class="podcast__text">{{ ui.podcast.text }}</p>
    <RouterLink to="/boletines" class="podcast__cta">{{ ui.podcast.cta }}</RouterLink>
  </section>
</template>

<style scoped lang="scss">
.podcast {
  @include container(680px);
  @include flex(column, center, flex-start, 16px);
  padding-top: 56px;
  text-align: center;
  font-family: $font-display;

  &__faces img {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid $paper;
    filter: grayscale(1) contrast(1.25);

    & + img {
      margin-left: -18px;
    }
  }

  &__title {
    font-size: 36px;
    letter-spacing: -0.04em;
  }

  &__text {
    font-family: $font-serif;
    font-size: 18px;
    line-height: 1.5;
    color: $ink-2;
  }

  &__cta {
    background: $accent;
    color: $paper;
    padding: 10px 16px;
    border-radius: 3px;
    font-weight: 700;
    font-size: 14px;

    &:hover {
      background: $accent-deep;
    }
  }
}
</style>
