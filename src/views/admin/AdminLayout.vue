<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useBodyScroll } from '@/composables/useBodyScroll'
import { useAdminStats } from '@/composables/admin/useAdminStats'
import { admin, adminNav } from '@/config/admin'
import { site } from '@/config/site'
import AdminNavList from '@/components/admin/AdminNavList.vue'
import AdminBottomBar from '@/components/admin/AdminBottomBar.vue'
import AdminUserBox from '@/components/admin/AdminUserBox.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { pending, refreshStats } = useAdminStats()

const drawerOpen = ref(false)
useBodyScroll(drawerOpen)

const userName = computed(() => userStore.user?.name || '')
const userEmail = computed(() => userStore.user?.email || '')

function logout() {
  userStore.clear()
  router.replace('/login')
}

onMounted(refreshStats)
// El badge de pendientes se mantiene fresco al moverse por el panel.
watch(
  () => route.path,
  () => {
    drawerOpen.value = false
    refreshStats()
  },
)
</script>

<template>
  <div class="admin">
    <aside class="admin__sidebar">
      <RouterLink to="/admin" class="admin__brand">
        <span class="admin__brand-name">{{ site.name }}</span>
        <span class="admin__brand-tag">{{ admin.brand }}</span>
      </RouterLink>
      <AdminNavList :items="adminNav" :pending="pending" class="admin__nav" />
      <AdminUserBox :name="userName" :email="userEmail" @logout="logout" />
    </aside>

    <header class="admin__topbar">
      <RouterLink to="/admin" class="admin__brand admin__brand--compact">
        <span class="admin__brand-name">{{ site.name }}</span>
        <span class="admin__brand-tag">{{ admin.brand }}</span>
      </RouterLink>
      <RouterLink v-if="pending > 0" to="/admin/cola" class="admin__pending">
        <i class="fa-solid fa-inbox"></i> {{ pending }}
      </RouterLink>
    </header>

    <main class="admin__main">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </Transition>
      </RouterView>
    </main>

    <AdminBottomBar :pending="pending" @more="drawerOpen = true" />

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="drawerOpen" class="drawer" @click.self="drawerOpen = false">
          <div class="drawer__panel" role="dialog" aria-modal="true" aria-label="Menú">
            <div class="drawer__head">
              <strong>{{ admin.brand }}</strong>
              <button type="button" aria-label="Cerrar menú" @click="drawerOpen = false">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <AdminNavList :items="adminNav" :pending="pending" @navigate="drawerOpen = false" />
            <AdminUserBox :name="userName" :email="userEmail" @logout="logout" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.admin {
  @include flex(column, stretch, flex-start);
  flex: 1;
  min-height: 100vh;
  background: $sand;
  font-family: $font-principal;

  @include from('lg') {
    flex-direction: row;
  }

  &__sidebar {
    display: none;

    @include from('lg') {
      @include flex(column, stretch, flex-start, 1.5rem);
      position: sticky;
      top: 0;
      height: 100vh;
      flex: 0 0 248px;
      padding: 1.5rem 1rem;
      background: $surface;
      border-right: 1px solid $line;
      overflow-y: auto;
    }
  }

  &__nav {
    flex: 1;
  }

  &__brand {
    @include flex(column, flex-start, flex-start);
    padding-inline: 0.85rem;
    line-height: 1.1;

    &--compact {
      padding-inline: 0;
    }
  }

  &__brand-name {
    @include display($text-lg, 900);
    text-transform: uppercase;
    letter-spacing: -0.01em;
  }

  &__brand-tag {
    font-size: 0.66rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: $stamp;
  }

  &__topbar {
    @include flex(row, center, space-between, 1rem);
    position: sticky;
    top: 0;
    z-index: 90;
    padding: 0.75rem 1rem;
    background: $surface;
    border-bottom: 1px solid $line;

    @include from('lg') {
      display: none;
    }
  }

  &__pending {
    @include flex(row, center, center, 0.4rem);
    font-size: $text-sm;
    font-weight: 700;
    color: $stamp;
    background: $stamp-soft;
    padding: 0.35rem 0.75rem;
    border-radius: $radius-pill;
  }

  &__main {
    flex: 1;
    min-width: 0;
    padding: 1.25rem 1rem calc(5rem + env(safe-area-inset-bottom));

    @include from('md') {
      padding-inline: 1.75rem;
    }

    @include from('lg') {
      padding: 2rem 2.5rem 3rem;
      max-width: 1180px;
    }
  }
}

.drawer {
  position: fixed;
  inset: 0;
  z-index: 150;
  background: $overlay;
  @include flex(row, stretch, flex-end);

  &__panel {
    @include flex(column, stretch, flex-start, 1rem);
    width: min(320px, 86vw);
    height: 100%;
    background: $surface;
    padding: 1rem;
    overflow-y: auto;
  }

  &__head {
    @include flex(row, center, space-between);
    padding: 0.25rem 0.85rem;

    button {
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;

      &:hover {
        background: $sand;
      }
    }
  }
}
</style>
