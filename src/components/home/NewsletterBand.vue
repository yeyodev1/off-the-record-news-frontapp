<script setup lang="ts">
import { ui } from '@/config/site'
</script>

<template>
  <section class="band">
    <div class="band__inner">
      <div>
        <p class="band__title">{{ ui.newsletterBand.title }}</p>
        <p class="band__text">{{ ui.newsletterBand.text }}</p>
      </div>
      <RouterLink to="/boletines" class="band__cta">{{ ui.newsletterBand.cta }}</RouterLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
.band {
  background: $ink;
  color: $paper;
  font-family: $font-display;

  &__inner {
    @include container(1080px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding-block: 24px;

    @include from('md') {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
      padding: 28px 40px;
    }
  }

  &__title {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.2;

    @include from('md') {
      font-size: 22px;
    }
  }

  &__text {
    font-size: 14px;
    color: #bbbbbb;
    margin-top: 4px;
  }

  &__cta {
    border: 1px solid $paper;
    padding: 10px 18px;
    font-weight: 700;
    font-size: 14px;
    white-space: nowrap;
    @include transition(background);
    @include focus-ring($paper);

    &:hover {
      background: $paper;
      color: $ink;
    }
  }
}
</style>
