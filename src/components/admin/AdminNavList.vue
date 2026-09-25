<script setup lang="ts">
import type { AdminNavItem } from '@/config/admin'

defineProps<{ items: AdminNavItem[]; pending: number }>()
const emit = defineEmits<{ navigate: [] }>()
</script>

<template>
  <ul class="nav-list">
    <li v-for="item in items" :key="item.to">
      <RouterLink
        :to="item.to"
        class="nav-list__link"
        :exact-active-class="item.exact ? 'nav-list__link--active' : ''"
        :active-class="item.exact ? '' : 'nav-list__link--active'"
        @click="emit('navigate')"
      >
        <i :class="item.icon" class="nav-list__icon"></i>
        <span class="nav-list__label">{{ item.label }}</span>
        <span v-if="item.badge === 'pending' && pending > 0" class="nav-list__badge">{{
          pending
        }}</span>
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.nav-list {
  list-style: none;
  @include flex(column, stretch, flex-start, 0.15rem);

  &__link {
    @include flex(row, center, flex-start, 0.75rem);
    padding: 0.6rem 0.85rem;
    border-radius: $radius-sm;
    font-size: $text-sm;
    font-weight: 500;
    color: $ink-soft;
    @include transition(background);

    &:hover {
      background: rgba($ink, 0.05);
    }

    &--active {
      background: $ink;
      color: $surface;

      &:hover {
        background: $ink;
      }
    }
  }

  &__icon {
    width: 1.1rem;
    text-align: center;
  }

  &__label {
    flex: 1;
  }

  &__badge {
    min-width: 1.4rem;
    padding: 0.05rem 0.4rem;
    border-radius: $radius-pill;
    background: $stamp;
    color: $surface;
    font-size: 0.7rem;
    font-weight: 700;
    text-align: center;
  }
}
</style>
