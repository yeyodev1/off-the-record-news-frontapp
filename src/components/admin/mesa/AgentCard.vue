<script setup lang="ts">
import RuleSectionEditor from './RuleSectionEditor.vue'
import type { AgentConfig } from '@/types'

defineProps<{ agent: AgentConfig; busy: string | null }>()
const emit = defineEmits<{
  save: [section: string, rules: string[]]
  restore: [section: string]
}>()
</script>

<template>
  <article class="agent">
    <header class="agent__head">
      <h2 class="agent__name"><i class="fa-solid fa-robot"></i> {{ agent.name }}</h2>
      <p class="agent__desc">{{ agent.description }}</p>
    </header>
    <RuleSectionEditor
      v-for="section in agent.sections"
      :key="section.key"
      :section="section"
      :busy="busy === `${agent.key}/${section.key}`"
      @save="emit('save', section.key, $event)"
      @restore="emit('restore', section.key)"
    />
  </article>
</template>

<style scoped lang="scss">
.agent {
  @include card;
  padding: 1rem 1rem 0.2rem;

  &__head {
    @include flex(column, stretch, flex-start, 0.25rem);
    padding-bottom: 0.8rem;
  }

  &__name {
    @include display($text-lg, 700);

    i {
      color: $accent-deep;
      margin-right: 0.3rem;
    }
  }

  &__desc {
    font-size: $text-sm;
    color: $ink-soft;
  }
}
</style>
