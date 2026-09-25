<script setup lang="ts">
import SmartLabel from './SmartLabel.vue'

withDefaults(defineProps<{ eyebrow?: string; title: string; subtitle?: string; inverted?: boolean }>(), {
  eyebrow: '',
  subtitle: '',
  inverted: false,
})
</script>

<template>
  <header class="intro" :class="{ 'intro--inverted': inverted }">
    <SmartLabel v-if="eyebrow">{{ eyebrow }}</SmartLabel>
    <h1 class="intro__title">{{ title }}</h1>
    <p v-if="subtitle" class="intro__subtitle">{{ subtitle }}</p>
    <slot />
  </header>
</template>

<style scoped lang="scss">
.intro {
  @include flex(column, stretch, flex-start, 0.8rem);

  &__title {
    font-size: $display-md;
    font-weight: 900;
    letter-spacing: -0.035em;
    line-height: 1;
  }

  &__subtitle {
    font-size: $text-lg;
    color: $ink-soft;
    max-width: 52ch;
    line-height: 1.5;
  }

  &--inverted {
    color: $paper;

    :deep(.label) {
      color: $accent-soft;
    }
  }

  &--inverted &__subtitle {
    color: rgba($paper, 0.78);
  }
}
</style>
