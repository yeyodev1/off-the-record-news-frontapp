<script setup lang="ts">
import { computed } from 'vue'
import { admin } from '@/config/admin'
import { site } from '@/config/site'
import { READING_MODES } from '@/composables/useReadingMode'
import type { Article, ModeRelevance } from '@/types'

/**
 * Lente por modo: lo que la IA leyó del hecho y los cuatro números que ordenan
 * la portada en cada modo. El editor corrige los números; el propuesto queda al
 * lado para el golden set.
 */
const props = defineProps<{ article: Article; busy: boolean }>()
const relevance = defineModel<ModeRelevance | null>({ required: true })
const emit = defineEmits<{ recompute: [] }>()

const t = admin.lens
const lens = computed(() => props.article.lens ?? null)
const presence = computed(() =>
  lens.value
    ? (['oficialismo', 'correismo', 'oposicion', 'institucional'] as const).map((key) => ({
        key,
        label: t[key],
        value: lens.value![key],
      }))
    : [],
)

function setValue(mode: keyof ModeRelevance, raw: string) {
  const base = relevance.value ?? { noboista: 0, correista: 0, anti_ambos: 0, independiente: 0 }
  relevance.value = { ...base, [mode]: Number(raw) }
}
</script>

<template>
  <div class="lens">
    <div class="lens__head">
      <h3 class="lens__title">{{ t.title }}</h3>
      <button type="button" class="lens__btn" :disabled="busy" @click="emit('recompute')">
        <i class="fa-solid" :class="busy ? 'fa-spinner fa-spin' : 'fa-wand-magic-sparkles'"></i>
        {{ busy ? t.recomputing : t.recompute }}
      </button>
    </div>
    <p class="lens__help">{{ t.help }}</p>

    <p v-if="!lens" class="lens__empty">{{ t.none }}</p>

    <template v-else>
      <ul class="lens__presence" :aria-label="t.presence">
        <li v-for="row in presence" :key="row.key">
          <span>{{ row.label }}</span>
          <span class="lens__track"><span :style="{ width: `${row.value * 10}%` }"></span></span>
          <strong>{{ row.value }}</strong>
        </li>
      </ul>
      <div class="lens__flags">
        <span class="lens__flag">{{ t.solidez(lens.solidez) }}</span>
        <span v-if="lens.documentosPrimarios" class="lens__flag"><i class="fa-solid fa-file-lines"></i> {{ t.documents }}</span>
        <span v-if="lens.contradiccion" class="lens__flag lens__flag--alert"><i class="fa-solid fa-code-compare"></i> {{ t.contradiction }}</span>
      </div>
      <p v-if="lens.nota" class="lens__note">{{ lens.nota }}</p>
    </template>

    <fieldset class="lens__relevance">
      <legend>{{ t.relevance }}</legend>
      <label v-for="mode in READING_MODES" :key="mode" class="lens__row">
        <span>{{ site.modes[mode].name }}</span>
        <input
          type="number"
          min="0"
          max="100"
          step="1"
          :value="relevance?.[mode] ?? ''"
          @input="setValue(mode, ($event.target as HTMLInputElement).value)"
        />
        <small v-if="article.modeRelevanceAuto">{{ t.proposed }} {{ article.modeRelevanceAuto[mode] }}</small>
      </label>
    </fieldset>
    <p class="lens__help">{{ t.stanceSaveHint }}</p>
  </div>
</template>

<style scoped lang="scss">
.lens {
  @include flex(column, stretch, flex-start, 0.7rem);
  font-size: $text-sm;

  &__head {
    @include flex(row, center, space-between, 0.5rem);
    flex-wrap: wrap;
  }

  &__title {
    font-size: $text-sm;
    font-family: $font-principal;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  &__btn {
    @include flex(row, center, flex-start, 0.35rem);
    font-size: $text-xs;
    font-weight: 700;
    color: $accent-deep;

    &:disabled {
      opacity: 0.6;
    }
  }

  &__help,
  &__empty {
    font-size: $text-xs;
    color: $ink-muted;
  }

  &__presence {
    list-style: none;
    @include flex(column, stretch, flex-start, 0.3rem);

    li {
      @include flex(row, center, flex-start, 0.5rem);

      span:first-child {
        flex: 0 0 8.5rem;
        font-size: $text-xs;
      }
    }
  }

  &__track {
    flex: 1;
    height: 6px;
    background: $sand;
    border-radius: $radius-pill;
    overflow: hidden;

    span {
      display: block;
      height: 100%;
      background: $ink;
    }
  }

  &__flags {
    @include flex(row, center, flex-start, 0.35rem);
    flex-wrap: wrap;
  }

  &__flag {
    font-size: $text-xs;
    font-weight: 600;
    padding: 0.15rem 0.5rem;
    background: $sand;
    border-radius: $radius-pill;

    &--alert {
      background: $warning-bg;
    }
  }

  &__note {
    font-size: $text-xs;
    color: $ink-soft;
    font-style: italic;
  }

  &__relevance {
    border: 0;
    @include flex(column, stretch, flex-start, 0.4rem);

    legend {
      font-size: $text-xs;
      font-weight: 600;
      color: $ink-soft;
      margin-bottom: 0.3rem;
    }
  }

  &__row {
    @include flex(row, center, flex-start, 0.5rem);
    margin: 0;

    span {
      flex: 0 0 6.5rem;
      font-size: $text-xs;
    }

    input {
      width: 4.5rem;
      padding: 0.3rem 0.5rem;
    }

    small {
      font-size: $text-xs;
      color: $ink-muted;
    }
  }
}
</style>
