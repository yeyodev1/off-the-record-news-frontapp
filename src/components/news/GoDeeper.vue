<script setup lang="ts">
import { ref, useId } from 'vue'
import { site } from '@/config/site'
import ProLock from './ProLock.vue'

defineProps<{ body: string[]; locked: boolean }>()

const open = ref(false)
const panelId = useId()
</script>

<template>
  <section class="deeper">
    <button
      type="button"
      class="deeper__toggle"
      :aria-expanded="open"
      :aria-controls="panelId"
      @click="open = !open"
    >
      <span>{{ site.labels.goDeeper }}</span>
      <i v-if="locked" class="fa-solid fa-lock deeper__lock" aria-hidden="true"></i>
      <i class="fa-solid fa-chevron-down deeper__chevron" :class="{ 'deeper__chevron--open': open }" aria-hidden="true"></i>
    </button>

    <Transition name="rise">
      <div v-show="open" :id="panelId" class="deeper__panel">
        <ProLock v-if="locked" />
        <p v-for="(paragraph, index) in body" v-else :key="index" class="deeper__p">{{ paragraph }}</p>
      </div>
    </Transition>
  </section>
</template>

<style scoped lang="scss">
.deeper {
  border-top: 1px solid $ink;
  border-bottom: 1px solid $ink;

  &__toggle {
    width: 100%;
    @include flex(row, center, flex-start, 0.6rem);
    padding: 1rem 0;
    font-family: $font-display;
    font-weight: 900;
    font-size: $text-xl;
    letter-spacing: -0.02em;
    text-align: left;

    &:hover {
      color: $accent-deep;
    }
  }

  &__lock {
    font-size: 0.85rem;
    color: $ink-muted;
  }

  &__chevron {
    margin-left: auto;
    font-size: 1rem;
    color: $accent;
    @include transition(transform);

    &--open {
      transform: rotate(180deg);
    }
  }

  &__panel {
    @include flex(column, stretch, flex-start, 1rem);
    padding-bottom: 1.5rem;
  }

  &__p {
    line-height: 1.75;
  }
}
</style>
