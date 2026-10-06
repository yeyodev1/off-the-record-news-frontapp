<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { ui } from '@/config/site'
import { useReadingMode } from '@/composables/useReadingMode'
import { useBodyScroll } from '@/composables/useBodyScroll'
import ModeOptions from './ModeOptions.vue'
import type { ReadingMode } from '@/types'

/**
 * Primera visita y "Cambiar". En la portada la primera visita es una pantalla
 * completa; en una nota o sección es una hoja abajo que no tapa la lectura: quien
 * llega por un enlace compartido lee primero y elige después.
 */
const route = useRoute()
const { mode, hasChosen, pickerOpen, setMode, closePicker } = useReadingMode()

const isPublic = computed(() => !route.meta.admin && route.name !== 'Login')
const firstVisit = computed(() => isPublic.value && !hasChosen.value)

const variant = computed<'modal' | 'sheet' | null>(() => {
  if (pickerOpen.value) return 'modal'
  if (!firstVisit.value) return null
  return route.name === 'Home' ? 'modal' : 'sheet'
})

useBodyScroll(computed(() => variant.value === 'modal'))

function pick(next: ReadingMode) {
  setMode(next, hasChosen.value ? 'cambiar' : 'elegir')
}

// Cerrar sin elegir es elegir independiente (§4 del spec).
function dismiss() {
  if (!hasChosen.value) setMode('independiente', 'elegir')
  else closePicker()
}

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape' && variant.value) dismiss()
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="variant === 'modal'" class="chooser" @click.self="dismiss">
        <div class="chooser__box" role="dialog" aria-modal="true" :aria-label="ui.modes.chooserTitle">
          <button type="button" class="chooser__close" :aria-label="ui.modes.chooserSkip" @click="dismiss">
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
          <h2 class="chooser__title">{{ ui.modes.chooserTitle }}</h2>
          <p class="chooser__subtitle">{{ ui.modes.chooserSubtitle }}</p>
          <ModeOptions :current="hasChosen ? mode : null" @pick="pick" />
          <p class="chooser__note">{{ ui.modes.chooserNote }}</p>
          <RouterLink to="/modos" class="chooser__how" @click="dismiss">{{ ui.modes.howLink }}</RouterLink>
        </div>
      </div>
    </Transition>

    <Transition name="rise">
      <aside v-if="variant === 'sheet'" class="sheet" :aria-label="ui.modes.sheetTitle">
        <div class="sheet__head">
          <p class="sheet__title">{{ ui.modes.sheetTitle }}</p>
          <button type="button" class="sheet__skip" @click="dismiss">{{ ui.modes.chooserSkip }}</button>
        </div>
        <ModeOptions compact @pick="pick" />
        <p class="sheet__note">
          {{ ui.modes.chooserNote }}
          <RouterLink to="/modos">{{ ui.modes.howLink }}</RouterLink>
        </p>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.chooser {
  position: fixed;
  inset: 0;
  z-index: 300;
  background: $overlay;
  @include flex(row, center, center);
  padding: 1rem;
  overflow-y: auto;

  &__box {
    position: relative;
    @include flex(column, stretch, flex-start, 0.9rem);
    width: 100%;
    max-width: 640px;
    max-height: calc(100vh - 2rem);
    overflow-y: auto;
    padding: 2rem 1.25rem 1.5rem;
    background: $paper;
    border-top: 6px solid $ink;
    box-shadow: $shadow-lg;

    @include from('md') {
      padding: 2.5rem 2.25rem 2rem;
    }
  }

  &__close {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    width: 2.25rem;
    height: 2.25rem;
    color: $ink-muted;
    @include focus-ring;

    &:hover {
      color: $ink;
    }
  }

  &__title {
    font-size: $display-sm;
    font-weight: 900;
    letter-spacing: -0.03em;
    line-height: 1.05;
    padding-right: 2rem;
  }

  &__subtitle {
    color: $ink-soft;
    margin-top: -0.4rem;
  }

  &__note {
    font-size: $text-sm;
    color: $ink-soft;
    border-left: 3px solid $accent;
    padding-left: 0.7rem;
  }

  &__how {
    align-self: flex-start;
    font-size: $text-sm;
    font-weight: 600;
    color: $accent-deep;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
}

.sheet {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 250;
  @include flex(column, stretch, flex-start, 0.6rem);
  padding: 0.9rem 1rem calc(0.9rem + env(safe-area-inset-bottom));
  background: $paper;
  border-top: 3px solid $ink;
  box-shadow: $shadow-lg;

  @include from('md') {
    left: auto;
    right: 1.5rem;
    bottom: 1.5rem;
    max-width: 640px;
    border: 1px solid $ink;
    border-top-width: 3px;
  }

  &__head {
    @include flex(row, center, space-between, 1rem);
  }

  &__title {
    font-weight: 800;
  }

  &__skip {
    font-size: $text-sm;
    font-weight: 600;
    color: $ink-muted;
    @include focus-ring;

    &:hover {
      color: $ink;
    }
  }

  &__note {
    font-size: $text-xs;
    color: $ink-muted;

    a {
      color: $accent-deep;
      text-decoration: underline;
    }
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
