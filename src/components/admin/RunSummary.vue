<script setup lang="ts">
import { computed } from 'vue'
import { admin } from '@/config/admin'
import { duration, formatDateTime } from '@/composables/admin/format'
import AdminBadge from './AdminBadge.vue'
import type { PipelineRun } from '@/types'

const props = defineProps<{ run: PipelineRun; compact?: boolean }>()

const metrics = computed(() => [
  { label: admin.run.found, value: props.run.signalsFound },
  { label: admin.run.fresh, value: props.run.signalsNew },
  { label: admin.run.scored, value: props.run.scored },
  { label: admin.run.drafted, value: props.run.drafted },
])
</script>

<template>
  <article class="run" :class="{ 'run--compact': compact }">
    <header class="run__head">
      <AdminBadge :tone="run.trigger === 'manual' ? 'accent' : 'muted'">
        {{ run.trigger === 'manual' ? admin.run.manual : admin.run.cron }}
      </AdminBadge>
      <span class="run__date">{{ formatDateTime(run.startedAt) }}</span>
      <span class="run__duration">
        <template v-if="run.finishedAt"
          ><i class="fa-regular fa-clock"></i>
          {{ duration(run.startedAt, run.finishedAt) }}</template
        >
        <template v-else
          ><i class="fa-solid fa-spinner fa-spin"></i> {{ admin.run.inProgress }}</template
        >
      </span>
    </header>

    <p v-if="run.skippedReason" class="run__skipped">
      <i class="fa-solid fa-moon"></i> {{ run.skippedReason }}
    </p>

    <ul class="run__metrics">
      <li v-for="m in metrics" :key="m.label" class="run__metric">
        <strong>{{ m.value }}</strong>
        <span>{{ m.label }}</span>
      </li>
    </ul>

    <details v-if="run.errors.length" class="run__errors">
      <summary>
        <i class="fa-solid fa-triangle-exclamation"></i> {{ admin.run.errors }} ({{
          run.errors.length
        }})
      </summary>
      <ul>
        <li v-for="(err, i) in run.errors" :key="i">{{ err }}</li>
      </ul>
    </details>
  </article>
</template>

<style scoped lang="scss">
.run {
  @include card;
  @include flex(column, stretch, flex-start, 0.7rem);
  padding: 1rem;

  &__head {
    @include flex(row, center, flex-start, 0.6rem);
    flex-wrap: wrap;
    font-size: $text-sm;
  }

  &__date {
    font-weight: 600;
  }

  &__duration {
    margin-left: auto;
    color: $ink-muted;
    font-size: $text-xs;
  }

  &__skipped {
    font-size: $text-sm;
    color: $ink-muted;
  }

  &__metrics {
    list-style: none;
    @include flex-cards(90px, 0.5rem);
  }

  &__metric {
    @include flex(column, flex-start, flex-start);
    background: $sand;
    border-radius: $radius-sm;
    padding: 0.45rem 0.65rem;
    line-height: 1.25;

    strong {
      font-family: $font-display;
      font-size: 1.15rem;
      font-variant-numeric: tabular-nums;
    }

    span {
      font-size: 0.68rem;
      color: $ink-muted;
    }
  }

  &--compact &__metric {
    padding: 0.3rem 0.55rem;

    strong {
      font-size: 1rem;
    }
  }

  &__errors {
    font-size: $text-sm;
    color: $stamp;

    summary {
      cursor: pointer;
      font-weight: 600;
    }

    ul {
      margin: 0.4rem 0 0 1.1rem;
      color: $ink-soft;
      font-size: $text-xs;
    }
  }
}
</style>
