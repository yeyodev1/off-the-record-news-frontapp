<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { admin } from '@/config/admin'
import { site } from '@/config/site'
import { adminService } from '@/services/admin.service'
import { READING_MODES } from '@/composables/useReadingMode'
import type { ModeStats } from '@/types'

/**
 * Cuántos lectores eligen cada modo y qué lee cada orilla. Todo es agregado y
 * anónimo. El % partidista es el que decide si la pantalla de entrada sirve.
 */
const t = admin.modes
const stats = ref<ModeStats | null>(null)
const failed = ref(false)

const total = computed(() => stats.value?.distribution.reduce((n, d) => n + d.elegir, 0) ?? 0)
const rows = computed(() =>
  READING_MODES.map((mode) => {
    const d = stats.value?.distribution.find((x) => x.modo === mode)
    const chosen = d?.elegir ?? 0
    return {
      mode,
      name: site.modes[mode].name,
      chosen,
      changed: d?.cambiar ?? 0,
      views: d?.vistas ?? 0,
      share: total.value ? Math.round((chosen / total.value) * 100) : 0,
    }
  }),
)
const partisan = computed(() => Math.round((stats.value?.partisanShare ?? 0) * 100))

onMounted(async () => {
  try {
    stats.value = await adminService.modeStats(60)
  } catch {
    failed.value = true
  }
})
</script>

<template>
  <section class="modes-card">
    <h2 class="modes-card__h2">{{ t.title }}</h2>
    <p v-if="failed" class="modes-card__muted">{{ t.error }}</p>

    <template v-else-if="stats">
      <p class="modes-card__muted">{{ t.subtitle(stats.days) }}</p>

      <ul class="modes-card__dist">
        <li v-for="row in rows" :key="row.mode">
          <span class="modes-card__name">{{ row.name }}</span>
          <span class="modes-card__track"><span :style="{ width: `${row.share}%` }"></span></span>
          <span class="modes-card__num">{{ row.share }}%</span>
          <small>{{ row.chosen }} {{ t.choose }} · {{ row.changed }} {{ t.change }} · {{ row.views }} {{ t.views }}</small>
        </li>
      </ul>

      <p class="modes-card__partisan" :class="{ 'modes-card__partisan--low': partisan < 20 }">
        <strong>{{ partisan }}%</strong> {{ t.partisan }}
        <small>{{ t.partisanGoal }}</small>
      </p>

      <div class="modes-card__thermo">
        <h3>{{ t.thermometer }}</h3>
        <div v-for="mode in READING_MODES" :key="mode" class="modes-card__side">
          <strong>{{ site.modes[mode].name }}</strong>
          <ol v-if="stats.thermometer[mode]?.length">
            <li v-for="item in stats.thermometer[mode]" :key="item.slug">
              <a :href="`/nota/${item.slug}`" target="_blank" rel="noopener">{{ item.title }}</a>
              <span>{{ item.views }}</span>
            </li>
          </ol>
          <p v-else class="modes-card__muted">{{ t.nothing }}</p>
        </div>
      </div>

      <p class="modes-card__muted">{{ t.golden(stats.golden.corrected, stats.golden.total) }}</p>
    </template>
  </section>
</template>

<style scoped lang="scss">
.modes-card {
  @include card;
  @include flex(column, stretch, flex-start, 0.8rem);
  padding: 1rem;

  @include from('md') {
    padding: 1.4rem;
  }

  &__h2 {
    font-size: $text-sm;
    font-family: $font-principal;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: $ink-muted;
  }

  &__muted {
    font-size: $text-xs;
    color: $ink-muted;
  }

  &__dist {
    list-style: none;
    @include flex(column, stretch, flex-start, 0.55rem);

    li {
      @include flex(row, center, flex-start, 0.25rem 0.6rem);
      flex-wrap: wrap;
      font-size: $text-sm;
    }

    small {
      flex-basis: 100%;
      font-size: $text-xs;
      color: $ink-muted;
    }
  }

  &__name {
    flex: 0 0 7rem;
    font-weight: 600;
  }

  &__track {
    flex: 1;
    min-width: 4rem;
    height: 8px;
    background: $sand;
    border-radius: $radius-pill;
    overflow: hidden;

    span {
      display: block;
      height: 100%;
      background: $ink;
    }
  }

  &__num {
    flex: 0 0 3rem;
    text-align: right;
    font-weight: 700;
  }

  &__partisan {
    @include flex(row, baseline, flex-start, 0.25rem 0.5rem);
    flex-wrap: wrap;
    padding: 0.7rem 0.9rem;
    background: $success-bg;
    border-radius: $radius-sm;
    font-size: $text-sm;

    &--low {
      background: $warning-bg;
    }

    small {
      flex-basis: 100%;
      font-size: $text-xs;
      color: $ink-soft;
    }
  }

  &__thermo {
    @include flex-cards(220px, 0.8rem 1.2rem);

    h3 {
      flex-basis: 100%;
      font-size: $text-xs;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
  }

  &__side {
    @include flex(column, stretch, flex-start, 0.35rem);
    font-size: $text-sm;

    ol {
      padding-left: 1.1rem;
      @include flex(column, stretch, flex-start, 0.25rem);
    }

    li {
      font-size: $text-xs;

      a {
        color: $ink;

        &:hover {
          color: $accent-deep;
        }
      }

      span {
        margin-left: 0.35rem;
        color: $ink-muted;
      }
    }
  }
}
</style>
