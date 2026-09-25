<script setup lang="ts">
import { toRef } from 'vue'
import { useBodyScroll } from '@/composables/useBodyScroll'
import { admin } from '@/config/admin'

/**
 * Diálogo con formulario. BaseModal sirve para confirmar; acá hace falta
 * poder deshabilitar el botón hasta que el formulario sea válido y mostrar
 * un spinner mientras el API responde.
 */
const props = defineProps<{
  open: boolean
  title: string
  confirmLabel: string
  confirmDisabled?: boolean
  busy?: boolean
  busyLabel?: string
}>()

const emit = defineEmits<{ confirm: []; cancel: [] }>()

useBodyScroll(toRef(props, 'open'))

function close() {
  if (!props.busy) emit('cancel')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="dialog" @click.self="close">
        <form
          class="dialog__box"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
          @submit.prevent="emit('confirm')"
        >
          <header class="dialog__head">
            <h3 class="dialog__title">{{ title }}</h3>
            <button
              class="dialog__close"
              type="button"
              aria-label="Cerrar"
              :disabled="busy"
              @click="close"
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          </header>
          <div class="dialog__body">
            <slot />
          </div>
          <footer class="dialog__actions">
            <button
              class="btn btn--ghost dialog__btn"
              type="button"
              :disabled="busy"
              @click="close"
            >
              {{ admin.cancel }}
            </button>
            <button
              class="btn btn--primary dialog__btn"
              type="submit"
              :disabled="confirmDisabled || busy"
            >
              <i v-if="busy" class="fa-solid fa-spinner fa-spin"></i>
              {{ busy && busyLabel ? busyLabel : confirmLabel }}
            </button>
          </footer>
        </form>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.dialog {
  position: fixed;
  inset: 0;
  z-index: 210;
  background: $overlay;
  @include flex(column, stretch, flex-end);

  @include from('md') {
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  &__box {
    @include flex(column, stretch, flex-start);
    background: $surface;
    width: 100%;
    max-height: 92vh;
    border-radius: $radius-md $radius-md 0 0;
    box-shadow: $shadow-lg;

    @include from('md') {
      max-width: 520px;
      border-radius: $radius-md;
    }
  }

  &__head {
    @include flex(row, center, space-between, 1rem);
    padding: 1rem 1.25rem;
    border-bottom: 1px solid $line;
  }

  &__title {
    @include display($text-lg, 700);
  }

  &__close {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    color: $ink-muted;

    &:hover {
      background: $sand;
    }
  }

  &__body {
    @include flex(column, stretch, flex-start, 0.9rem);
    padding: 1.1rem 1.25rem;
    overflow-y: auto;
  }

  &__actions {
    @include flex(row, center, flex-end, 0.5rem);
    padding: 0.9rem 1.25rem;
    border-top: 1px solid $line;
  }

  &__btn {
    padding: 0.7rem 1.3rem;
    flex: 1;

    @include from('md') {
      flex: 0 0 auto;
    }
  }
}
</style>
