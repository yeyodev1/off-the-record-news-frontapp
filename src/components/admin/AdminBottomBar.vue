<script setup lang="ts">
import { computed } from 'vue'
import { admin, adminNav } from '@/config/admin'

defineProps<{ pending: number }>()
const emit = defineEmits<{ more: [] }>()

const primary = computed(() => adminNav.filter((item) => item.primary))
</script>

<template>
  <nav class="bottom-bar" aria-label="Navegación de la mesa">
    <RouterLink
      v-for="item in primary"
      :key="item.to"
      :to="item.to"
      class="bottom-bar__item"
      :exact-active-class="item.exact ? 'bottom-bar__item--active' : ''"
      :active-class="item.exact ? '' : 'bottom-bar__item--active'"
    >
      <span class="bottom-bar__icon">
        <i :class="item.icon"></i>
        <span v-if="item.badge === 'pending' && pending > 0" class="bottom-bar__badge">{{
          pending
        }}</span>
      </span>
      <span class="bottom-bar__label">{{ item.label }}</span>
    </RouterLink>
    <button class="bottom-bar__item" type="button" @click="emit('more')">
      <span class="bottom-bar__icon"><i class="fa-solid fa-bars"></i></span>
      <span class="bottom-bar__label">{{ admin.more }}</span>
    </button>
  </nav>
</template>

<style scoped lang="scss">
.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  @include flex(row, stretch, space-around);
  background: $surface;
  border-top: 1px solid $line;
  padding-bottom: env(safe-area-inset-bottom);

  @include from('lg') {
    display: none;
  }

  &__item {
    @include flex(column, center, center, 0.15rem);
    flex: 1;
    min-height: 3.6rem;
    font-size: 0.66rem;
    font-weight: 600;
    color: $ink-muted;

    &--active {
      color: $ink;

      .bottom-bar__icon {
        background: $sand;
      }
    }
  }

  &__icon {
    position: relative;
    font-size: 1.05rem;
    padding: 0.2rem 0.9rem;
    border-radius: $radius-pill;
  }

  &__badge {
    position: absolute;
    top: -0.3rem;
    right: 0.2rem;
    min-width: 1.1rem;
    padding: 0 0.3rem;
    border-radius: $radius-pill;
    background: $stamp;
    color: $surface;
    font-size: 0.62rem;
    line-height: 1.1rem;
    text-align: center;
  }

  &__label {
    white-space: nowrap;
  }
}
</style>
