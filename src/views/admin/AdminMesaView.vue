<script setup lang="ts">
import { admin } from '@/config/admin'
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue'

const t = admin.mesa
const tabs = [
  { to: '/admin/mesa', label: t.tabs.live, icon: 'fa-solid fa-tower-broadcast' },
  { to: '/admin/mesa/entrenar', label: t.tabs.train, icon: 'fa-solid fa-brain' },
]
</script>

<template>
  <section class="mesa">
    <AdminPageHeader :title="t.title" :subtitle="t.subtitle" />

    <nav class="mesa__tabs" aria-label="Secciones de la mesa">
      <RouterLink
        v-for="tab in tabs"
        :key="tab.to"
        :to="tab.to"
        class="mesa__tab"
        exact-active-class="mesa__tab--active"
      >
        <i :class="tab.icon"></i> {{ tab.label }}
      </RouterLink>
    </nav>

    <RouterView />
  </section>
</template>

<style scoped lang="scss">
.mesa {
  &__tabs {
    @include flex(row, stretch, flex-start, 0.4rem);
    margin-bottom: 1.25rem;
    border-bottom: 1px solid $line;
  }

  &__tab {
    @include flex(row, center, center, 0.45rem);
    flex: 1;
    min-height: 2.75rem;
    padding: 0.5rem 1rem;
    font-size: $text-sm;
    font-weight: 700;
    color: $ink-muted;
    border-bottom: 3px solid transparent;
    margin-bottom: -1px;

    @include from('md') {
      flex: 0 0 auto;
    }

    &:hover {
      color: $ink;
    }

    &--active {
      color: $ink;
      border-bottom-color: $accent;
    }
  }
}
</style>
