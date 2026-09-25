<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { admin } from '@/config/admin'
import { useAdminStats } from '@/composables/admin/useAdminStats'
import { useNewsroom } from '@/composables/admin/useNewsroom'
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue'
import AdminState from '@/components/admin/AdminState.vue'
import AdminPagination from '@/components/admin/AdminPagination.vue'
import StatCard from '@/components/admin/StatCard.vue'
import RunSummary from '@/components/admin/RunSummary.vue'

const { stats, loading, error, refreshStats } = useAdminStats()
const { running, lastResult, runs, page, pages, loadingRuns, runsError, loadRuns, runNow } =
  useNewsroom()

const labels = admin.dashboard.stats
const cards = computed(() => {
  const s = stats.value
  if (!s) return []
  return [
    {
      key: 'pending',
      label: labels.pending,
      value: s.pending,
      icon: 'fa-solid fa-inbox',
      to: '/admin/cola',
      highlight: s.pending > 0,
    },
    {
      key: 'publishedToday',
      label: labels.publishedToday,
      value: s.publishedToday,
      icon: 'fa-solid fa-bolt',
      to: '/admin/notas',
    },
    {
      key: 'publishedTotal',
      label: labels.publishedTotal,
      value: s.publishedTotal,
      icon: 'fa-solid fa-newspaper',
      to: '/admin/notas',
    },
    {
      key: 'signalsToday',
      label: labels.signalsToday,
      value: s.signalsToday,
      icon: 'fa-solid fa-satellite-dish',
      to: '/admin/senales',
    },
    {
      key: 'subscribersActive',
      label: labels.subscribersActive,
      value: s.subscribersActive,
      icon: 'fa-solid fa-users',
      to: '/admin/suscriptores',
    },
    {
      key: 'subscribersPending',
      label: labels.subscribersPending,
      value: s.subscribersPending,
      icon: 'fa-solid fa-hourglass-half',
      to: '/admin/suscriptores',
    },
    {
      key: 'tipsNew',
      label: labels.tipsNew,
      value: s.tipsNew,
      icon: 'fa-solid fa-user-secret',
      to: '/admin/denuncias',
      highlight: s.tipsNew > 0,
    },
  ]
})

// Tras correr la mesa, el resultado recién traído manda sobre el de /stats.
const latestRun = computed(() => lastResult.value || stats.value?.lastRun || null)

onMounted(() => loadRuns(1))
</script>

<template>
  <section class="dashboard">
    <AdminPageHeader :title="admin.dashboard.title" :subtitle="admin.dashboard.subtitle">
      <button
        class="btn btn--dark dashboard__run"
        type="button"
        :disabled="running"
        @click="runNow"
      >
        <i class="fa-solid" :class="running ? 'fa-spinner fa-spin' : 'fa-play'"></i>
        {{ admin.dashboard.runNow }}
      </button>
    </AdminPageHeader>

    <Transition name="rise">
      <p v-if="running" class="dashboard__running" role="status">
        <i class="fa-solid fa-gear fa-spin"></i> {{ admin.dashboard.running }}
      </p>
    </Transition>

    <AdminState v-if="!stats" :loading="loading" :error="error" @retry="refreshStats" />
    <div v-else class="dashboard__stats">
      <StatCard
        v-for="card in cards"
        :key="card.key"
        :label="card.label"
        :value="card.value"
        :icon="card.icon"
        :to="card.to"
        :highlight="card.highlight"
      />
    </div>

    <div class="dashboard__cols">
      <section class="dashboard__block">
        <h2 class="dashboard__h2">{{ admin.dashboard.lastRun }}</h2>
        <RunSummary v-if="latestRun" :run="latestRun" />
        <AdminState
          v-else-if="stats"
          empty
          :empty-text="admin.dashboard.noRuns"
          empty-icon="fa-solid fa-gears"
        />
      </section>

      <section class="dashboard__block">
        <h2 class="dashboard__h2">{{ admin.dashboard.history }}</h2>
        <AdminState
          :loading="loadingRuns && !runs.length"
          :error="runsError"
          :empty="!runs.length"
          :empty-text="admin.dashboard.noRuns"
          empty-icon="fa-solid fa-clock-rotate-left"
          @retry="loadRuns(page)"
        />
        <div v-if="runs.length" class="dashboard__runs">
          <RunSummary v-for="run in runs" :key="run.id" :run="run" compact />
        </div>
        <AdminPagination :page="page" :pages="pages" @go="loadRuns" />
      </section>
    </div>
  </section>
</template>

<style scoped lang="scss">
.dashboard {
  @include flex(column, stretch, flex-start, 1.25rem);

  &__run {
    width: 100%;

    @include from('md') {
      width: auto;
    }
  }

  &__running {
    @include flex(row, center, flex-start, 0.6rem);
    font-size: $text-sm;
    font-weight: 600;
    background: $accent-soft;
    color: $accent-deep;
    padding: 0.75rem 1rem;
    border-radius: $radius-sm;
  }

  &__stats {
    @include flex-cards(140px, 0.6rem);
  }

  &__cols {
    @include flex(column, stretch, flex-start, 1.25rem);

    @include from('lg') {
      flex-direction: row;
      align-items: flex-start;

      > * {
        flex: 1 1 0;
        min-width: 0;
      }
    }
  }

  &__block {
    @include flex(column, stretch, flex-start, 0.7rem);
  }

  &__h2 {
    font-size: $text-sm;
    font-family: $font-principal;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: $ink-muted;
  }

  &__runs {
    @include flex(column, stretch, flex-start, 0.6rem);
  }
}
</style>
