<script setup lang="ts">
import { ref } from 'vue'
import { admin } from '@/config/admin'
import { adminService } from '@/services/admin.service'
import { useMesaLive, type SignalFilter } from '@/composables/admin/useMesaLive'
import { useToastStore } from '@/stores/toast'
import AdminState from '@/components/admin/AdminState.vue'
import RunSummary from '@/components/admin/RunSummary.vue'
import MesaHealth from '@/components/admin/mesa/MesaHealth.vue'
import MesaSources from '@/components/admin/mesa/MesaSources.vue'
import MesaFunnel from '@/components/admin/mesa/MesaFunnel.vue'
import MesaSignalCard from '@/components/admin/mesa/MesaSignalCard.vue'
import CorrectionDialog from '@/components/admin/mesa/CorrectionDialog.vue'
import type { ApiError, LessonVerdict, MesaSignal } from '@/types'

const t = admin.mesa
const toast = useToastStore()
const { live, loading, error, filter, signals, load } = useMesaLive(12)

const filters = Object.entries(t.signals.filters) as [SignalFilter, string][]

const correcting = ref<MesaSignal | null>(null)
const verdict = ref<LessonVerdict>('')
const saving = ref(false)

function openCorrection(signal: MesaSignal, v: LessonVerdict) {
  correcting.value = signal
  verdict.value = v
}

async function saveCorrection(why: string) {
  const signal = correcting.value
  if (!signal) return
  saving.value = true
  try {
    await adminService.createLesson({
      area: 'valoracion',
      instruction: why,
      example: { title: signal.title, url: signal.url, verdict: verdict.value },
    })
    toast.success(t.correction.done)
    correcting.value = null
  } catch (e) {
    toast.error((e as ApiError).message)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="live">
    <div class="live__bar">
      <span class="live__hours">{{ t.lastHours }}</span>
      <button class="btn btn--ghost live__refresh" type="button" :disabled="loading" @click="load">
        <i class="fa-solid fa-rotate" :class="{ 'fa-spin': loading }"></i>
        {{ loading ? t.refreshing : t.refresh }}
      </button>
    </div>

    <AdminState
      :loading="loading && !live"
      :error="live ? '' : error"
      :empty="false"
      @retry="load"
    />

    <template v-if="live">
      <MesaHealth :health="live.health" />

      <div class="live__grid">
        <MesaFunnel :funnel="live.funnel" class="live__funnel" />
        <div class="live__side">
          <MesaSources :sources="live.sources" />
          <section class="live__runs">
            <h2 class="live__title">{{ t.runs.title }}</h2>
            <p v-if="!live.runs.length" class="live__empty">{{ t.runs.empty }}</p>
            <RunSummary v-for="run in live.runs.slice(0, 4)" :key="run.id" :run="run" compact />
          </section>
        </div>
      </div>

      <section class="live__signals">
        <header class="live__signals-head">
          <h2 class="live__title">{{ t.signals.title }}</h2>
          <div class="live__filters" role="group">
            <button
              v-for="[key, label] in filters"
              :key="key"
              type="button"
              class="live__filter"
              :class="{ 'live__filter--active': filter === key }"
              :aria-pressed="filter === key"
              @click="filter = key"
            >
              {{ label }}
            </button>
          </div>
        </header>
        <p v-if="!signals.length" class="live__empty">{{ t.signals.empty }}</p>
        <MesaSignalCard
          v-for="signal in signals"
          :key="signal.id"
          :signal="signal"
          @correct="openCorrection(signal, $event)"
        />
      </section>
    </template>

    <CorrectionDialog
      :signal="correcting"
      :verdict="verdict"
      :busy="saving"
      @save="saveCorrection"
      @cancel="correcting = null"
    />
  </div>
</template>

<style scoped lang="scss">
.live {
  @include flex(column, stretch, flex-start, 1rem);

  &__bar {
    @include flex(row, center, space-between, 0.5rem);
  }

  &__hours {
    font-size: $text-xs;
    font-weight: 700;
    color: $ink-muted;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  &__refresh {
    padding: 0.5rem 1rem;
    gap: 0.4rem;
  }

  &__grid {
    @include flex(column, stretch, flex-start, 1rem);

    @include from('lg') {
      flex-direction: row;
      align-items: flex-start;
    }
  }

  &__funnel {
    @include from('lg') {
      flex: 1 1 55%;
    }
  }

  &__side {
    @include flex(column, stretch, flex-start, 1rem);
    min-width: 0;

    @include from('lg') {
      flex: 1 1 45%;
    }
  }

  &__runs,
  &__signals {
    @include flex(column, stretch, flex-start, 0.6rem);
  }

  &__title {
    @include display($text-base, 700);
  }

  &__empty {
    font-size: $text-sm;
    color: $ink-muted;
  }

  &__signals-head {
    @include flex(column, stretch, flex-start, 0.5rem);

    @include from('md') {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__filters {
    @include flex(row, center, flex-start, 0.35rem);
    flex-wrap: wrap;
  }

  &__filter {
    min-height: 2.25rem;
    padding: 0.35rem 0.85rem;
    font-size: $text-xs;
    font-weight: 600;
    border: 1px solid $line;
    border-radius: $radius-pill;

    &:hover {
      background: $sand;
    }

    &--active {
      background: $ink;
      border-color: $ink;
      color: $surface;

      &:hover {
        background: $ink;
      }
    }
  }
}
</style>
