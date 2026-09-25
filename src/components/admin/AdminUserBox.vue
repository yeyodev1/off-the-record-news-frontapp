<script setup lang="ts">
import { admin } from '@/config/admin'

defineProps<{ name: string; email: string }>()
const emit = defineEmits<{ logout: [] }>()
</script>

<template>
  <div class="user-box">
    <RouterLink to="/" class="user-box__site" target="_blank">
      <i class="fa-solid fa-arrow-up-right-from-square"></i> {{ admin.viewSite }}
    </RouterLink>
    <div class="user-box__who">
      <span class="user-box__avatar">{{ (name || email).charAt(0).toUpperCase() }}</span>
      <span class="user-box__text">
        <strong>{{ name || email }}</strong>
        <small v-if="name">{{ email }}</small>
      </span>
    </div>
    <button class="user-box__logout" type="button" @click="emit('logout')">
      <i class="fa-solid fa-right-from-bracket"></i> {{ admin.logout }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.user-box {
  @include flex(column, stretch, flex-start, 0.6rem);
  padding-top: 1rem;
  border-top: 1px solid $line;

  &__site,
  &__logout {
    @include flex(row, center, flex-start, 0.6rem);
    font-size: $text-sm;
    color: $ink-soft;
    padding: 0.45rem 0.85rem;
    border-radius: $radius-sm;

    &:hover {
      background: rgba($ink, 0.05);
    }
  }

  &__logout {
    color: $stamp;
  }

  &__who {
    @include flex(row, center, flex-start, 0.6rem);
    padding: 0.3rem 0.85rem;
    min-width: 0;
  }

  &__avatar {
    @include flex(row, center, center);
    flex: 0 0 2rem;
    height: 2rem;
    border-radius: 50%;
    background: $ink;
    color: $surface;
    font-weight: 700;
    font-size: $text-sm;
  }

  &__text {
    @include flex(column, flex-start, flex-start);
    min-width: 0;
    line-height: 1.3;
    font-size: $text-sm;

    strong,
    small {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    small {
      color: $ink-muted;
      font-size: $text-xs;
    }
  }
}
</style>
