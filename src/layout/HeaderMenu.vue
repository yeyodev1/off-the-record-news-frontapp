<script setup lang="ts">
import { toRef } from 'vue'
import { site, ui } from '@/config/site'
import { useBodyScroll } from '@/composables/useBodyScroll'
import { useUserStore } from '@/stores/user'
import { formatToday } from '@/utils/format'

/** Menú del celular (☰): secciones, enlaces de la barra superior y OTR PRO. */
const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()
const userStore = useUserStore()
const today = formatToday()

useBodyScroll(toRef(props, 'open'))
</script>

<template>
  <Teleport to="body">
    <Transition name="menu">
      <div v-if="open" class="menu" @click.self="emit('close')" @keydown.esc="emit('close')">
        <nav class="menu__panel" :aria-label="ui.nav.sectionsAria">
          <div class="menu__head">
            <span class="menu__date">{{ today }}</span>
            <button
              type="button"
              class="menu__close"
              :aria-label="ui.header.closeMenu"
              @click="emit('close')"
            >
              <i class="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
          </div>
          <RouterLink v-for="link in site.nav" :key="link.to" :to="link.to" class="menu__section">
            {{ link.label }}
          </RouterLink>
          <div class="menu__links">
            <RouterLink v-for="link in site.topLinks" :key="link.to" :to="link.to">{{
              link.label
            }}</RouterLink>
            <RouterLink to="/modos">{{ ui.modes.howLink }}</RouterLink>
            <RouterLink v-if="userStore.isAdmin" to="/admin">{{ ui.nav.desk }}</RouterLink>
          </div>
          <RouterLink to="/pro" class="menu__pro">● {{ ui.header.pro }}</RouterLink>
        </nav>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.menu {
  position: fixed;
  inset: 0;
  z-index: 280;
  background: $overlay;

  &__panel {
    display: flex;
    flex-direction: column;
    width: min(320px, 86vw);
    height: 100%;
    overflow-y: auto;
    background: $paper;
    padding: 14px 20px 24px;
    font-family: $font-display;
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  &__date {
    font-size: 13px;
    color: $ink-muted;

    &::first-letter {
      text-transform: uppercase;
    }
  }

  &__close {
    width: 32px;
    height: 32px;
    font-size: 18px;
  }

  &__section {
    padding: 12px 0;
    border-bottom: 1px solid $line;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;

    &.router-link-exact-active {
      color: $accent;
    }
  }

  &__links {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 18px 0;
    font-size: 14px;
    font-weight: 600;
    color: $ink-2;
  }

  &__pro {
    align-self: flex-start;
    background: $stamp;
    color: $paper;
    padding: 10px 16px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 700;
    box-shadow: 0 4px 14px rgba(200, 16, 46, 0.35);
  }
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.25s ease;

  .menu__panel {
    transition: transform 0.25s ease;
  }
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;

  .menu__panel {
    transform: translateX(-100%);
  }
}
</style>
