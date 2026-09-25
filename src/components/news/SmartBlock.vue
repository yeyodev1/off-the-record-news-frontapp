<script setup lang="ts">
import SmartLabel from './SmartLabel.vue'

withDefaults(defineProps<{ label: string; text?: string; items?: string[] }>(), {
  text: '',
  items: () => [],
})
</script>

<template>
  <section class="smart">
    <SmartLabel tag="h2">{{ label }}</SmartLabel>
    <p v-if="text" class="smart__text">{{ text }}</p>
    <ul v-if="items.length" class="smart__list">
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
    <slot />
  </section>
</template>

<style scoped lang="scss">
.smart {
  @include flex(column, stretch, flex-start, 0.5rem);

  &__text {
    font-size: $text-base;
    line-height: 1.65;
  }

  &__list {
    list-style: none;
    @include flex(column, stretch, flex-start, 0.6rem);

    li {
      position: relative;
      padding-left: 1.2rem;
      line-height: 1.6;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.62em;
        width: 0.45rem;
        height: 0.45rem;
        background: $accent;
      }
    }
  }
}
</style>
