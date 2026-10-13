<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { site, ui } from '@/config/site'
import { useUserStore } from '@/stores/user'
import { formatToday } from '@/utils/format'
import ModeBar from '@/components/modes/ModeBar.vue'
import HeaderMenu from './HeaderMenu.vue'
import ProButton from './ProButton.vue'

const userStore = useUserStore()
const route = useRoute()
const today = formatToday()
const menuOpen = ref(false)

// Al navegar desde el menú del celular, se cierra.
watch(
  () => route.fullPath,
  () => (menuOpen.value = false),
)

// Solo se consulta /auth/me si hay token guardado: el visitante común no paga esa llamada.
onMounted(() => {
  if (userStore.hasToken) userStore.restore()
})

const isActive = (to: string) => (to === '/' ? route.path === '/' : route.path.startsWith(to))
</script>

<template>
  <header class="masthead">
    <!-- Escritorio: barra superior -->
    <div class="masthead__top">
      <div class="masthead__top-inner">
        <RouterLink
          v-for="link in site.topLinks"
          :key="link.to"
          :to="link.to"
          class="masthead__toplink"
        >
          {{ link.label }}
        </RouterLink>
        <RouterLink v-if="userStore.isAdmin" to="/admin" class="masthead__toplink">{{
          ui.nav.desk
        }}</RouterLink>
        <span class="masthead__date">{{ today }}</span>
        <ProButton />
      </div>
    </div>

    <!-- Celular: menú · logo · PRO -->
    <div class="masthead__mobile">
      <button
        type="button"
        class="masthead__burger"
        :aria-label="ui.header.menu"
        :aria-expanded="menuOpen"
        @click="menuOpen = true"
      >
        <i class="fa-solid fa-bars" aria-hidden="true"></i>
      </button>
      <RouterLink to="/" class="masthead__mlogo" :aria-label="`${site.name} — ${ui.nav.home}`">
        {{ site.name }} <span class="masthead__stamp masthead__stamp--sm">EC</span>
      </RouterLink>
      <ProButton compact />
    </div>

    <!-- Escritorio: logo, eslogan y secciones -->
    <div class="masthead__brand">
      <RouterLink to="/" class="masthead__logo" :aria-label="`${site.name} — ${ui.nav.home}`">
        <span class="masthead__name">{{ site.name }}</span>
        <span class="masthead__stamp" aria-hidden="true">EC</span>
      </RouterLink>
      <p class="masthead__tagline">{{ site.tagline }}</p>
    </div>

    <nav class="masthead__nav" :aria-label="ui.nav.sectionsAria">
      <RouterLink
        v-for="link in site.nav"
        :key="link.to"
        :to="link.to"
        class="masthead__link"
        :class="{ 'masthead__link--on': isActive(link.to) }"
      >
        {{ link.label }}
      </RouterLink>
    </nav>

    <ModeBar />
    <HeaderMenu :open="menuOpen" @close="menuOpen = false" />
  </header>
</template>

<style scoped lang="scss">
.masthead {
  background: $paper;
  color: $ink;
  font-family: $font-display;

  &__top {
    display: none;
    border-bottom: 1px solid $line;

    @include from('md') {
      display: block;
    }
  }

  &__top-inner {
    @include container(1080px);
    display: flex;
    align-items: center;
    gap: 22px;
    padding: 10px 40px !important;
    font-size: 13px;
    font-weight: 600;
    color: $ink-2;
  }

  &__toplink {
    white-space: nowrap;

    &:hover {
      color: $ink;
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  }

  &__date {
    margin-left: auto;
    font-size: 13px;
    font-weight: 400;
    color: $ink-muted;
    white-space: nowrap;

    &::first-letter {
      text-transform: uppercase;
    }
  }

  &__mobile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px 10px;
    border-bottom: 1px solid $line;

    @include from('md') {
      display: none;
    }
  }

  &__burger {
    font-size: 18px;
    line-height: 1;
    width: 28px;
    text-align: left;
    @include focus-ring;
  }

  &__mlogo {
    font-weight: 700;
    font-size: 24px;
    letter-spacing: -0.05em;
    line-height: 1;
    white-space: nowrap;
  }

  &__brand {
    display: none;
    text-align: center;
    padding: 26px 40px 20px;

    @include from('md') {
      display: block;
    }
  }

  &__logo {
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  &__name {
    font-weight: 700;
    font-size: 52px;
    letter-spacing: -0.05em;
    line-height: 1;
  }

  &__stamp {
    display: inline-block;
    border: 2px solid $stamp;
    color: $stamp;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0;
    padding: 1px 6px;
    transform: rotate(-6deg);
    border-radius: 2px;
    line-height: 1.3;

    &--sm {
      font-size: 9px;
      padding: 0 3px;
      vertical-align: middle;
    }
  }

  &__tagline {
    font-family: $font-serif;
    font-style: italic;
    font-size: 18px;
    color: $ink-body;
    margin-top: 8px;
    line-height: 1.4;
  }

  &__nav {
    display: none;
    justify-content: center;
    gap: 30px;
    padding: 0 40px 12px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;

    @include from('md') {
      display: flex;
    }
  }

  &__link {
    color: $ink-muted;
    padding-bottom: 6px;
    border-bottom: 2px solid transparent;
    line-height: 1.3;
    @include transition(color);

    &:hover {
      color: $ink;
    }

    &--on {
      color: $ink;
      border-bottom-color: $ink;
    }
  }
}
</style>
