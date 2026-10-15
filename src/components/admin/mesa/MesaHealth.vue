<script setup lang="ts">
import { computed } from 'vue'
import { admin } from '@/config/admin'
import { timeAgo } from '@/composables/admin/format'
import type { MesaLive } from '@/types'

const props = defineProps<{ health: MesaLive['health'] }>()
const t = admin.mesa.health

const items = computed(() => [
  {
    key: 'ai',
    ok: props.health.ai.ok,
    label: props.health.ai.ok ? t.aiOk : t.aiDown,
    detail: props.health.ai.message,
    icon: 'fa-solid fa-microchip',
  },
  {
    key: 'search',
    ok: props.health.search.ok,
    label: props.health.search.ok ? t.searchOk : t.searchDown,
    detail: props.health.search.message,
    icon: 'fa-solid fa-magnifying-glass',
  },
  {
    key: 'run',
    ok: Boolean(props.health.lastRunAt),
    label: props.health.lastRunAt ? `${t.lastRun}: ${timeAgo(props.health.lastRunAt)}` : t.noRun,
    detail: props.health.withinSchedule ? t.inSchedule : t.offSchedule,
    icon: 'fa-regular fa-clock',
  },
])
</script>

<template>
  <ul class="health" :aria-label="t.title">
    <li
      v-for="item in items"
      :key="item.key"
      class="health__item"
      :class="item.ok ? 'health__item--ok' : 'health__item--down'"
    >
      <span class="health__icon"><i :class="item.icon"></i></span>
      <span class="health__text">
        <strong>{{ item.label }}</strong>
        <span v-if="item.detail">{{ item.detail }}</span>
      </span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.health {
  @include flex-cards(220px, 0.6rem);

  &__item {
    @include card;
    @include flex(row, flex-start, flex-start, 0.7rem);
    padding: 0.8rem 0.9rem;
    border-left: 4px solid $line;

    &--ok {
      border-left-color: $success;

      .health__icon {
        color: $success;
        background: $success-bg;
      }
    }

    &--down {
      border-left-color: $stamp;

      .health__icon {
        color: $stamp;
        background: $stamp-soft;
      }
    }
  }

  &__icon {
    @include flex(row, center, center);
    flex: 0 0 2.1rem;
    height: 2.1rem;
    border-radius: 50%;
  }

  &__text {
    @include flex(column, flex-start, flex-start, 0.15rem);
    min-width: 0;
    font-size: $text-sm;

    span {
      font-size: $text-xs;
      color: $ink-muted;
      overflow-wrap: anywhere;
    }
  }
}
</style>
