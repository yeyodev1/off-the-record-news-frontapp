<script setup lang="ts">
import { computed } from 'vue'
import { admin } from '@/config/admin'
import { useTryHeadline } from '@/composables/admin/useTryHeadline'
import AdminBadge from '../AdminBadge.vue'

const t = admin.mesa.tryIt
const { title, summary, result, running, run } = useTryHeadline()

const parts = computed(() => {
  const r = result.value
  if (!r) return []
  return (Object.keys(t.parts) as (keyof typeof t.parts)[]).map((key) => ({
    label: t.parts[key],
    value: r.score[key],
  }))
})

const flags = computed(() => {
  const r = result.value
  if (!r) return []
  return [
    { on: r.notNews, label: t.notNews },
    { on: r.duplicate, label: t.duplicate },
    { on: r.accusation, label: t.accusation },
    { on: r.familyVeto, label: t.family },
  ].filter((f) => f.on)
})
</script>

<template>
  <section class="try">
    <h2 class="try__title"><i class="fa-solid fa-flask"></i> {{ t.title }}</h2>
    <p class="try__hint">{{ t.hint }}</p>
    <form class="try__form" @submit.prevent="run">
      <div>
        <label for="try-title">{{ t.headline }}</label>
        <input id="try-title" v-model="title" type="text" required />
      </div>
      <div>
        <label for="try-summary">{{ t.summary }}</label>
        <textarea id="try-summary" v-model="summary" rows="2"></textarea>
      </div>
      <button
        class="btn btn--primary try__run"
        type="submit"
        :disabled="running || title.trim().length < 5"
      >
        <i class="fa-solid" :class="running ? 'fa-spinner fa-spin' : 'fa-play'"></i>
        {{ running ? t.running : t.run }}
      </button>
    </form>

    <div
      v-if="result"
      class="try__result"
      :class="result.wouldDraft ? 'try__result--yes' : 'try__result--no'"
      aria-live="polite"
    >
      <p class="try__verdict">
        <i class="fa-solid" :class="result.wouldDraft ? 'fa-circle-check' : 'fa-circle-xmark'"></i>
        {{ result.wouldDraft ? t.wouldDraft : t.wouldNot }}
      </p>
      <p class="try__score">
        {{ t.score }} <strong>{{ result.score.total.toFixed(1) }}</strong> / {{ t.threshold }}
        {{ result.threshold }} · {{ t.section }}: {{ result.section }}
      </p>
      <div v-if="flags.length" class="try__flags">
        <AdminBadge v-for="f in flags" :key="f.label" tone="stamp">{{ f.label }}</AdminBadge>
      </div>
      <ul class="try__parts">
        <li v-for="p in parts" :key="p.label">
          <span>{{ p.label }}</span> <strong>{{ p.value.toFixed(1) }}</strong>
        </li>
      </ul>
      <p v-if="result.score.reasoning" class="try__reasoning">{{ result.score.reasoning }}</p>
      <p class="try__lessons">{{ result.lessonsUsed }} {{ t.lessons }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.try {
  @include card;
  @include flex(column, stretch, flex-start, 0.7rem);
  padding: 1rem;

  &__title {
    @include display($text-base, 700);

    i {
      color: $accent-deep;
      margin-right: 0.3rem;
    }
  }

  &__hint {
    font-size: $text-xs;
    color: $ink-muted;
  }

  &__form {
    @include flex(column, stretch, flex-start, 0.6rem);
  }

  &__run {
    padding: 0.7rem 1.3rem;
    gap: 0.4rem;

    @include from('md') {
      align-self: flex-start;
    }
  }

  &__result {
    @include flex(column, stretch, flex-start, 0.5rem);
    padding: 0.8rem 0.9rem;
    border-radius: $radius-sm;
    border-left: 4px solid $line;
    background: $sand;

    &--yes {
      border-left-color: $success;

      .try__verdict {
        color: darken($success, 12%);
      }
    }

    &--no {
      border-left-color: $stamp;

      .try__verdict {
        color: $stamp;
      }
    }
  }

  &__verdict {
    font-weight: 800;
  }

  &__score {
    font-size: $text-sm;
  }

  &__flags {
    @include flex(row, center, flex-start, 0.35rem);
    flex-wrap: wrap;
  }

  &__parts {
    @include flex(row, center, flex-start, 0.3rem 1rem);
    flex-wrap: wrap;
    font-size: $text-xs;
    color: $ink-muted;

    strong {
      color: $ink;
    }
  }

  &__reasoning,
  &__lessons {
    font-size: $text-xs;
    color: $ink-soft;
  }
}
</style>
