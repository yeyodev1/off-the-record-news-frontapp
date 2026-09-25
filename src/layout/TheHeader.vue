<script setup lang="ts">
import { onMounted } from 'vue'
import { site } from '@/config/site'
import { useUserStore } from '@/stores/user'
import { formatToday } from '@/utils/format'
import BrandMark from '@/components/news/BrandMark.vue'
import { ui } from '@/config/site'

const userStore = useUserStore()
const today = formatToday()

// Solo se consulta /auth/me si hay token guardado: el visitante común no paga esa llamada.
onMounted(() => {
  if (userStore.hasToken) userStore.restore()
})
</script>

<template>
  <header class="masthead">
    <div class="masthead__top">
      <p class="masthead__date">{{ today }}</p>

      <RouterLink to="/" class="masthead__logo" :aria-label="`${site.name} — ${ui.nav.home}`">
        <BrandMark size="lg" />
      </RouterLink>

      <div class="masthead__actions">
        <RouterLink v-if="userStore.isAdmin" to="/admin" class="masthead__desk">
          <i class="fa-solid fa-newspaper" aria-hidden="true"></i> {{ ui.nav.desk }}
        </RouterLink>
        <RouterLink to="/boletines" class="btn btn--primary masthead__cta">{{ ui.nav.subscribe }}</RouterLink>
      </div>
    </div>

    <nav class="masthead__nav" :aria-label="ui.nav.sectionsAria">
      <ul class="masthead__links">
        <li v-for="link in site.nav" :key="link.to">
          <RouterLink :to="link.to" class="masthead__link">{{ link.label }}</RouterLink>
        </li>
        <li class="masthead__divider" aria-hidden="true"></li>
        <li>
          <RouterLink to="/boletines" class="masthead__link masthead__link--extra">{{ ui.nav.newsletters }}</RouterLink>
        </li>
        <li>
          <RouterLink to="/pro" class="masthead__link masthead__link--extra">{{ ui.nav.pro }}</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.masthead {
  position: sticky;
  top: 0;
  z-index: 100;
  background: $paper;
  border-bottom: 1px solid $ink;

  &__top {
    @include container;
    @include flex(row, center, space-between, 0.75rem);
    padding-block: 0.8rem;

    @include from('md') {
      padding-block: 1.1rem;
    }
  }

  &__date {
    display: none;
    flex: 1 1 0;
    font-size: $text-xs;
    color: $ink-muted;

    &::first-letter {
      text-transform: uppercase;
    }

    @include from('md') {
      display: block;
    }
  }

  &__logo {
    flex-shrink: 0;
  }

  &__actions {
    @include flex(row, center, flex-end, 0.9rem);

    @include from('md') {
      flex: 1 1 0;
    }
  }

  &__desk {
    display: none;
    font-size: $text-xs;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: $ink;

    @include from('sm') {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
    }

    &:hover {
      color: $accent;
    }
  }

  &__cta {
    padding: 0.5rem 0.75rem;
    border-radius: 0;
    white-space: nowrap;

    @include from('sm') {
      padding: 0.55rem 1rem;
    }
    font-size: $text-xs;
    letter-spacing: 0.06em;
  }

  &__nav {
    border-top: 1px solid $line;
  }

  &__links {
    @include container;
    @include flex(row, center, flex-start, 1.4rem);
    list-style: none;
    overflow-x: auto;
    scrollbar-width: none;
    white-space: nowrap;
    // En móvil el borde derecho se desvanece: indica que hay más secciones.
    mask-image: linear-gradient(to right, #000 85%, transparent);

    &::-webkit-scrollbar {
      display: none;
    }

    @include from('lg') {
      justify-content: center;
      mask-image: none;
    }
  }

  &__link {
    display: inline-block;
    padding: 0.7rem 0;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: $ink-soft;
    border-bottom: 3px solid transparent;
    @include transition(color);

    &:hover {
      color: $ink;
    }

    &.router-link-active {
      color: $ink;
      border-color: $accent;
    }

    &--extra {
      color: $accent;
    }
  }

  &__divider {
    width: 1px;
    height: 1rem;
    background: $line;
    flex-shrink: 0;
  }
}
</style>
