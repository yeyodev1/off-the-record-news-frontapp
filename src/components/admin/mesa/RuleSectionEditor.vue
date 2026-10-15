<script setup lang="ts">
import { ref, toRef } from 'vue'
import { admin } from '@/config/admin'
import { formatDateTime } from '@/composables/admin/format'
import { MAX_RULES, useRuleDraft } from '@/composables/admin/useRuleDraft'
import AdminBadge from '../AdminBadge.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import RuleField from './RuleField.vue'
import type { AgentSection } from '@/types'

const props = defineProps<{ section: AgentSection; busy?: boolean }>()
const emit = defineEmits<{ save: [rules: string[]]; restore: [] }>()
const t = admin.mesa.agents

const { rules, values, dirty, hasBlank, tooMany, reset, add, remove, move } = useRuleDraft(
  toRef(props, 'section'),
)
const confirmRestore = ref(false)

function onRestore() {
  confirmRestore.value = false
  emit('restore')
}
</script>

<template>
  <details class="rsection" :open="dirty || undefined">
    <summary class="rsection__summary">
      <span class="rsection__title">{{ section.title }}</span>
      <span class="rsection__count">{{ section.rules.length }} {{ t.rules }}</span>
      <AdminBadge v-if="section.isDefault" tone="muted">{{ t.original }}</AdminBadge>
      <AdminBadge v-else tone="accent">
        {{ t.modifiedBy }}
        <template v-if="section.updatedByName">{{ t.by }} {{ section.updatedByName }}</template>
        <template v-if="section.updatedAt"> · {{ formatDateTime(section.updatedAt) }}</template>
      </AdminBadge>
      <i class="fa-solid fa-chevron-down rsection__chevron" aria-hidden="true"></i>
    </summary>

    <div class="rsection__body">
      <p v-if="section.help" class="rsection__help">{{ section.help }}</p>

      <ol class="rsection__rules">
        <RuleField
          v-for="(rule, i) in rules"
          :key="rule.id"
          v-model="rule.text"
          :index="i"
          :total="rules.length"
          :disabled="busy"
          @up="move(i, -1)"
          @down="move(i, 1)"
          @remove="remove(i)"
        />
      </ol>

      <button
        type="button"
        class="rsection__add"
        :disabled="busy || rules.length >= MAX_RULES"
        @click="add"
      >
        <i class="fa-solid fa-plus"></i> {{ t.addRule }}
      </button>

      <p v-if="!rules.length" class="rsection__warn">
        <i class="fa-solid fa-triangle-exclamation"></i> {{ t.emptyWarning }}
      </p>
      <p v-else-if="hasBlank" class="rsection__warn">
        <i class="fa-solid fa-triangle-exclamation"></i> {{ t.blankWarning }}
      </p>
      <p v-if="tooMany" class="rsection__warn">
        <i class="fa-solid fa-triangle-exclamation"></i> {{ t.tooMany }}
      </p>

      <footer class="rsection__actions">
        <button
          v-if="!section.isDefault"
          type="button"
          class="btn btn--ghost rsection__restore"
          :disabled="busy"
          @click="confirmRestore = true"
        >
          <i class="fa-solid fa-clock-rotate-left"></i> {{ t.restore }}
        </button>
        <span class="rsection__spacer"></span>
        <button type="button" class="btn btn--ghost" :disabled="busy || !dirty" @click="reset">
          {{ t.discard }}
        </button>
        <button
          type="button"
          class="btn btn--primary"
          :disabled="busy || !dirty || hasBlank || tooMany"
          @click="emit('save', values)"
        >
          <i v-if="busy" class="fa-solid fa-spinner fa-spin"></i>
          {{ busy ? t.saving : t.save }}
        </button>
      </footer>
    </div>

    <BaseModal
      :open="confirmRestore"
      :title="t.restoreTitle"
      :message="t.restoreMessage"
      :confirm-label="t.restore"
      danger
      @confirm="onRestore"
      @cancel="confirmRestore = false"
    />
  </details>
</template>

<style scoped lang="scss">
.rsection {
  border-top: 1px solid $line;

  &__summary {
    @include flex(row, center, flex-start, 0.4rem 0.6rem);
    flex-wrap: wrap;
    padding: 0.8rem 0;
    cursor: pointer;
    list-style: none;

    &::-webkit-details-marker {
      display: none;
    }
  }

  &[open] &__chevron {
    transform: rotate(180deg);
  }

  &__title {
    font-weight: 700;
    font-size: $text-sm;
  }

  &__count {
    font-size: $text-xs;
    color: $ink-muted;
  }

  &__chevron {
    margin-left: auto;
    color: $ink-muted;
    @include transition(transform);
  }

  &__body {
    @include flex(column, stretch, flex-start, 0.7rem);
    padding-bottom: 1rem;
  }

  &__help {
    font-size: $text-xs;
    color: $ink-muted;
  }

  &__rules {
    @include flex(column, stretch, flex-start, 0.55rem);
  }

  &__add {
    @include flex(row, center, center, 0.4rem);
    align-self: flex-start;
    min-height: 2.4rem;
    padding: 0.4rem 0.9rem;
    font-size: $text-sm;
    font-weight: 600;
    color: $accent-deep;
    border: 1px dashed $accent;
    border-radius: $radius-pill;

    &:hover {
      background: $accent-soft;
    }

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  &__warn {
    font-size: $text-xs;
    font-weight: 600;
    color: darken($warning, 14%);
    background: $warning-bg;
    border-radius: $radius-sm;
    padding: 0.5rem 0.65rem;
  }

  &__actions {
    @include flex(row, center, flex-end, 0.5rem);
    flex-wrap: wrap;

    .btn {
      padding: 0.6rem 1.1rem;
      gap: 0.4rem;
    }
  }

  &__spacer {
    flex: 1;
  }
}
</style>
