<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { admin } from '@/config/admin'
import { toInputDate } from '@/composables/admin/format'
import AdminDialog from './AdminDialog.vue'
import type { Subscriber } from '@/types'

/**
 * Activar exige una decisión explícita: fecha de vencimiento o "No vence".
 * No hay opción preseleccionada para que nadie regale acceso indefinido
 * por dejar el formulario como vino.
 */
const props = defineProps<{ open: boolean; subscriber: Subscriber | null; busy?: boolean }>()
const emit = defineEmits<{ confirm: [paidUntil: string | null, noExpiry: boolean]; cancel: [] }>()

const t = admin.subscribers
const mode = ref<'' | 'date' | 'none'>('')
const date = ref('')
const today = toInputDate(new Date())

const presets = t.presets

watch(
  () => props.open,
  (open) => {
    if (!open) return
    mode.value = ''
    date.value = ''
  },
)

function preset(months: number) {
  const d = new Date()
  d.setMonth(d.getMonth() + months)
  mode.value = 'date'
  date.value = toInputDate(d)
}

const valid = computed(
  () =>
    mode.value === 'none' || (mode.value === 'date' && Boolean(date.value) && date.value >= today),
)

function submit() {
  if (!valid.value) return
  if (mode.value === 'none') emit('confirm', null, true)
  // Fin del día en Ecuador: la suscripción vale todo el día elegido.
  else emit('confirm', new Date(`${date.value}T23:59:59-05:00`).toISOString(), false)
}
</script>

<template>
  <AdminDialog
    :open="open"
    :title="t.activateTitle"
    :confirm-label="t.activate"
    :confirm-disabled="!valid"
    :busy="busy"
    @confirm="submit"
    @cancel="emit('cancel')"
  >
    <p v-if="subscriber" class="activate__who">
      <strong>{{ subscriber.name || subscriber.email }}</strong>
      <span v-if="subscriber.name">{{ subscriber.email }}</span>
    </p>
    <p class="activate__help">{{ t.activateHelp }}</p>

    <label class="activate__option" :class="{ 'activate__option--on': mode === 'date' }">
      <input v-model="mode" type="radio" name="activate-mode" value="date" />
      <span>{{ t.optionDate }}</span>
    </label>
    <div v-if="mode === 'date'" class="activate__date">
      <input v-model="date" type="date" :min="today" :aria-label="t.dateLabel" />
      <div class="activate__presets">
        <button v-for="p in presets" :key="p.months" type="button" @click="preset(p.months)">
          {{ p.label }}
        </button>
      </div>
    </div>

    <label class="activate__option" :class="{ 'activate__option--on': mode === 'none' }">
      <input v-model="mode" type="radio" name="activate-mode" value="none" />
      <span>{{ t.optionNoExpiry }}</span>
    </label>
  </AdminDialog>
</template>

<style scoped lang="scss">
.activate {
  &__who {
    @include flex(column, flex-start, flex-start);
    font-size: $text-sm;

    span {
      color: $ink-muted;
    }
  }

  &__help {
    font-size: $text-sm;
    color: $ink-soft;
  }

  &__option {
    @include flex(row, center, flex-start, 0.65rem);
    margin: 0;
    padding: 0.8rem 0.9rem;
    border: 1px solid $line;
    border-radius: $radius-sm;
    font-size: $text-sm;
    font-weight: 600;
    color: $ink;
    cursor: pointer;

    input {
      width: 1.1rem;
      height: 1.1rem;
      padding: 0;
      flex: 0 0 auto;
      accent-color: $ink;
    }

    &--on {
      border-color: $ink;
      background: $sand;
    }
  }

  &__date {
    @include flex(column, stretch, flex-start, 0.5rem);
    padding-left: 0.5rem;
  }

  &__presets {
    @include flex(row, center, flex-start, 0.4rem);
    flex-wrap: wrap;

    button {
      font-size: $text-xs;
      font-weight: 600;
      padding: 0.35rem 0.7rem;
      border: 1px solid $line;
      border-radius: $radius-pill;

      &:hover {
        background: $sand;
      }
    }
  }
}
</style>
