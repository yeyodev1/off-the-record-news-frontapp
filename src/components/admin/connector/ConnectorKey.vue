<script setup lang="ts">
import { ref } from 'vue'
import { admin } from '@/config/admin'
import { formatDateTime } from '@/composables/admin/format'
import type { McpAccess } from '@/types'

const props = defineProps<{
  access: McpAccess | null
  ready: boolean
  busy: boolean
  freshUrl: string
}>()
const emit = defineEmits<{ generate: []; revoke: [] }>()

const t = admin.connector
const confirming = ref<'generate' | 'revoke' | null>(null)
const copied = ref(false)

function ask(action: 'generate' | 'revoke') {
  // Sin llave no hay nada que perder: se genera directo.
  if (action === 'generate' && !props.access) return emit('generate')
  confirming.value = action
}

function confirm() {
  if (confirming.value === 'generate') emit('generate')
  if (confirming.value === 'revoke') emit('revoke')
  confirming.value = null
}

async function copy() {
  try {
    await navigator.clipboard.writeText(props.freshUrl)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    // Sin permiso de portapapeles el campo queda seleccionable a mano.
  }
}
</script>

<template>
  <section class="key">
    <h2 class="key__title"><i class="fa-solid fa-key"></i> {{ t.keyTitle }}</h2>

    <p v-if="!ready" class="key__warn">
      <i class="fa-solid fa-triangle-exclamation"></i> {{ t.notReady }}
    </p>

    <div v-if="freshUrl" class="key__fresh">
      <label for="connector-url" class="key__label">{{ t.urlLabel }}</label>
      <div class="key__url">
        <input
          id="connector-url"
          :value="freshUrl"
          readonly
          @focus="($event.target as HTMLInputElement).select()"
        />
        <button class="btn btn--dark" type="button" @click="copy">
          <i :class="copied ? 'fa-solid fa-check' : 'fa-regular fa-copy'"></i>
          {{ copied ? t.copied : t.copy }}
        </button>
      </div>
      <p class="key__once"><i class="fa-solid fa-eye-slash"></i> {{ t.urlOnce }}</p>
    </div>

    <p v-if="access" class="key__meta">
      {{ t.keyActive }} <code>…{{ access.tokenHint }}</code> · {{ t.keyCreated }}
      {{ formatDateTime(access.createdAt) }} · {{ t.keyUsed }}:
      {{ access.lastUsedAt ? formatDateTime(access.lastUsedAt) : t.keyNeverUsed }}
    </p>
    <p v-else class="key__meta">{{ t.keyNone }}</p>

    <div v-if="confirming" class="key__confirm">
      <p>{{ confirming === 'generate' ? t.regenerateConfirm : t.revokeConfirm }}</p>
      <div class="key__actions">
        <button class="btn btn--dark" type="button" :disabled="busy" @click="confirm">
          {{ confirming === 'generate' ? t.regenerate : t.revoke }}
        </button>
        <button class="btn btn--ghost" type="button" @click="confirming = null">
          {{ admin.cancel }}
        </button>
      </div>
    </div>
    <div v-else class="key__actions">
      <button
        class="btn btn--dark"
        type="button"
        :disabled="busy || !ready"
        @click="ask('generate')"
      >
        <i class="fa-solid fa-wand-magic-sparkles"></i> {{ access ? t.regenerate : t.generate }}
      </button>
      <button
        v-if="access"
        class="btn btn--ghost"
        type="button"
        :disabled="busy"
        @click="ask('revoke')"
      >
        <i class="fa-solid fa-power-off"></i> {{ t.revoke }}
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.key {
  @include card;
  @include flex(column, stretch, flex-start, 0.9rem);
  padding: 1.1rem 1.2rem;

  &__title {
    @include display($text-lg, 800);

    i {
      color: $accent;
      margin-right: 0.3rem;
    }
  }

  &__warn {
    font-size: $text-sm;
    color: $ink-2;
    background: $warning-bg;
    border-radius: $radius-sm;
    padding: 0.7rem 0.85rem;
  }

  &__fresh {
    @include flex(column, stretch, flex-start, 0.45rem);
    background: $accent-soft;
    border-radius: $radius-sm;
    padding: 0.85rem;
  }

  &__label {
    font-size: $text-sm;
    font-weight: 700;
  }

  &__url {
    @include flex(row, stretch, flex-start, 0.5rem);
    flex-wrap: wrap;

    input {
      flex: 1 1 260px;
      min-width: 0;
      font-family: ui-monospace, Menlo, monospace;
      font-size: $text-sm;
      padding: 0.55rem 0.7rem;
      border: 1px solid $box-line;
      border-radius: $radius-sm;
      background: $surface;
    }
  }

  &__once {
    font-size: $text-xs;
    color: $ink-soft;
  }

  &__meta {
    font-size: $text-sm;
    color: $ink-body;
  }

  &__confirm p {
    font-size: $text-sm;
    margin-bottom: 0.6rem;
  }

  &__actions {
    @include flex(row, center, flex-start, 0.5rem);
    flex-wrap: wrap;
  }
}
</style>
