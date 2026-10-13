<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { ui } from '@/config/site'
import { useReadingMode } from '@/composables/useReadingMode'
import { useBodyScroll } from '@/composables/useBodyScroll'
import ModePills from './ModePills.vue'
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
        <div
          class="chooser__box"
          role="dialog"
          aria-modal="true"
          :aria-label="ui.modes.chooserTitle"
        >
          <button
            type="button"
            class="chooser__close"
            :aria-label="ui.modes.chooserSkip"
            @click="dismiss"
          >
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
          <h2 class="chooser__title">{{ ui.modes.chooserTitle }}</h2>
          <p class="chooser__subtitle">{{ ui.modes.chooserSubtitle }}</p>
          <ModePills
            size="lg"
            :current="hasChosen ? mode : null"
            :label="ui.modes.selectorAria"
            @pick="pick"
          />
          <p class="chooser__note">{{ ui.modes.chooserNote }}</p>
          <RouterLink to="/modos" class="chooser__how" @click="dismiss">{{
            ui.modes.howLink
          }}</RouterLink>
        </div>
      </div>
    </Transition>

    <Transition name="rise">
      <aside v-if="variant === 'sheet'" class="sheet" :aria-label="ui.modes.sheetTitle">
        <div class="sheet__head">
          <p class="sheet__title">{{ ui.modes.sheetTitle }}</p>
          <button type="button" class="sheet__skip" @click="dismiss">
            {{ ui.modes.chooserSkip }}
          </button>
        </div>
        <div class="sheet__pills no-scrollbar">
          <ModePills size="sm" :label="ui.modes.selectorAria" @pick="pick" />
        </div>
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
    @include flex(column, center, flex-start, 14px);
    width: 100%;
    max-width: 680px;
    max-height: calc(100vh - 2rem);
    overflow-y: auto;
    padding: 40px 20px 28px;
    background: $paper;
    border-top: 4px solid $ink;
    box-shadow: $shadow-lg;
    text-align: center;
    font-family: $font-display;

    @include from('md') {
      padding: 56px 48px 40px;
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
    font-size: 30px;
    font-weight: 700;
    letter-spacing: -0.035em;
    line-height: 1.05;

    @include from('md') {
      font-size: 40px;
    }
  }

  &__subtitle {
    font-family: $font-serif;
    font-style: italic;
    font-size: 18px;
    color: $ink-body;
    margin: -4px 0 10px;
  }

  &__note {
    font-family: $font-serif;
    font-size: 15px;
    line-height: 1.45;
    color: $ink-2;
    max-width: 440px;
    margin-top: 8px;
  }

  &__how {
    font-size: 13px;
    font-weight: 600;
    color: $accent;

    &:hover {
      color: $accent-deep;
    }
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
    font-weight: 700;
  }

  &__pills {
    overflow-x: auto;
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
