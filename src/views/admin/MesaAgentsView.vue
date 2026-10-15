<script setup lang="ts">
import { admin } from '@/config/admin'
import { useAgents } from '@/composables/admin/useAgents'
import AdminState from '@/components/admin/AdminState.vue'
import AgentCard from '@/components/admin/mesa/AgentCard.vue'

const t = admin.mesa.agents
const { agents, loading, error, busy, load, save, restore } = useAgents()
</script>

<template>
  <div class="agents">
    <p class="agents__intro"><i class="fa-solid fa-circle-info"></i> {{ t.intro }}</p>

    <AdminState
      :loading="loading && !agents.length"
      :error="error"
      :empty="!loading && !error && !agents.length"
      :empty-text="t.empty"
      empty-icon="fa-solid fa-robot"
      @retry="load"
    />

    <AgentCard
      v-for="agent in agents"
      :key="agent.key"
      :agent="agent"
      :busy="busy"
      @save="(section, rules) => save(agent.key, section, rules)"
      @restore="(section) => restore(agent.key, section)"
    />
  </div>
</template>

<style scoped lang="scss">
.agents {
  @include flex(column, stretch, flex-start, 1rem);

  &__intro {
    font-size: $text-sm;
    color: $ink-soft;
    background: $accent-soft;
    border-radius: $radius-sm;
    padding: 0.8rem 0.9rem;

    i {
      color: $accent-deep;
      margin-right: 0.3rem;
    }
  }
}
</style>
