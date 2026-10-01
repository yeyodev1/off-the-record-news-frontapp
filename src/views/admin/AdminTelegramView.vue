<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { admin, telegramRoleLabels } from '@/config/admin'
import { adminService } from '@/services/admin.service'
import { timeAgo } from '@/composables/admin/format'
import { useToastStore } from '@/stores/toast'
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue'
import AdminState from '@/components/admin/AdminState.vue'
import AdminBadge from '@/components/admin/AdminBadge.vue'
import type { ApiError, TelegramMember, TelegramRole, TelegramTeam } from '@/types'

const t = admin.telegram
const toast = useToastStore()

const team = ref<TelegramTeam | null>(null)
const loading = ref(true)
const error = ref('')
const configuring = ref(false)
const busyId = ref<string | null>(null)

async function load() {
  loading.value = true
  error.value = ''
  try {
    team.value = await adminService.telegram()
  } catch (e) {
    error.value = (e as ApiError).message
  } finally {
    loading.value = false
  }
}

async function configure() {
  configuring.value = true
  try {
    team.value = await adminService.configureTelegram()
    toast.success(t.configured)
  } catch (e) {
    toast.error((e as ApiError).message)
  } finally {
    configuring.value = false
  }
}

async function setRole(member: TelegramMember, role: TelegramRole) {
  if (role === member.role || !team.value) return
  busyId.value = member.id
  try {
    const updated = await adminService.setTelegramRole(member.id, role)
    team.value.members = team.value.members.map((m) => (m.id === updated.id ? updated : m))
    toast.success(t.roleSaved)
  } catch (e) {
    toast.error((e as ApiError).message)
  } finally {
    busyId.value = null
  }
}

async function remove(member: TelegramMember) {
  if (!team.value) return
  busyId.value = member.id
  try {
    await adminService.removeTelegramMember(member.id)
    team.value.members = team.value.members.filter((m) => m.id !== member.id)
    toast.info(t.removed)
  } catch (e) {
    toast.error((e as ApiError).message)
  } finally {
    busyId.value = null
  }
}

onMounted(load)
</script>

<template>
  <section class="tg">
    <AdminPageHeader :title="t.title" :subtitle="t.subtitle">
      <button class="btn btn--ghost" type="button" :disabled="configuring || !team?.configured" @click="configure">
        <i class="fa-solid" :class="configuring ? 'fa-spinner fa-spin' : 'fa-rotate'"></i>
        {{ configuring ? t.configuring : t.configure }}
      </button>
    </AdminPageHeader>

    <AdminState v-if="loading || error" :loading="loading" :error="error" @retry="load" />

    <template v-else-if="team">
      <div class="tg__grid">
        <article class="tg__card">
          <h3 class="tg__label">{{ t.bot }}</h3>
          <template v-if="team.bot">
            <p class="tg__big">@{{ team.bot.username }}</p>
            <a :href="`https://t.me/${team.bot.username}`" target="_blank" rel="noopener" class="tg__link">
              <i class="fa-brands fa-telegram"></i> {{ t.open }}
            </a>
          </template>
          <p v-else class="tg__warn">{{ t.notConfigured }}</p>
        </article>

        <article class="tg__card">
          <h3 class="tg__label">{{ t.webhook }}</h3>
          <p v-if="team.webhook?.url" class="tg__ok">
            <i class="fa-solid fa-circle-check"></i> {{ t.webhookOk }}
          </p>
          <p v-else class="tg__warn"><i class="fa-solid fa-plug-circle-xmark"></i> {{ t.webhookMissing }}</p>
          <p v-if="team.webhook?.pendingUpdates" class="tg__muted">{{ t.pending(team.webhook.pendingUpdates) }}</p>
          <p v-if="team.webhook?.lastError" class="tg__muted">
            {{ t.lastError }}: {{ team.webhook.lastError }}
          </p>
        </article>

        <article class="tg__card">
          <h3 class="tg__label">{{ t.mesa }}</h3>
          <p v-if="team.mesa.chatId" class="tg__ok">
            <i class="fa-solid fa-circle-check"></i> {{ t.mesaSet(team.mesa.title) }}
          </p>
          <p v-else class="tg__warn">{{ t.mesaMissing }}</p>
        </article>
      </div>

      <article class="tg__card">
        <h3 class="tg__label">{{ t.team }}</h3>
        <p v-if="!team.members.length" class="tg__muted">{{ t.teamEmpty }}</p>
        <ul v-else class="tg__members">
          <li v-for="member in team.members" :key="member.id" class="tg__member">
            <div class="tg__who">
              <strong>{{ member.name || member.telegramId }}</strong>
              <span>
                <template v-if="member.username">@{{ member.username }} · </template>id {{ member.telegramId }} ·
                {{ timeAgo(member.createdAt) }}
              </span>
            </div>
            <AdminBadge :tone="telegramRoleLabels[member.role].tone">{{
              telegramRoleLabels[member.role].label
            }}</AdminBadge>
            <select
              :value="member.role"
              :aria-label="t.role"
              :disabled="busyId === member.id"
              @change="setRole(member, ($event.target as HTMLSelectElement).value as TelegramRole)"
            >
              <option v-for="(meta, key) in telegramRoleLabels" :key="key" :value="key">
                {{ meta.label }}
              </option>
            </select>
            <button class="tg__remove" type="button" :disabled="busyId === member.id" @click="remove(member)">
              <i class="fa-solid fa-xmark"></i> {{ t.remove }}
            </button>
          </li>
        </ul>
        <p v-if="team.envEditors.length || team.envReporters.length" class="tg__muted">
          {{ t.fromEnv }}: {{ [...team.envEditors, ...team.envReporters].join(', ') }}
        </p>
      </article>

      <article class="tg__card">
        <ol class="tg__steps">
          <li v-for="(step, i) in t.steps" :key="i">{{ step }}</li>
        </ol>
      </article>
    </template>
  </section>
</template>

<style scoped lang="scss">
.tg {
  @include flex(column, stretch, flex-start, 1rem);

  &__grid {
    @include flex-cards(220px, 1rem);
  }

  &__card {
    @include card;
    @include flex(column, stretch, flex-start, 0.5rem);
    padding: 1rem 1.2rem;
    font-size: $text-sm;
  }

  &__label {
    font-family: $font-principal;
    font-size: $text-xs;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  &__big {
    font-family: $font-display;
    font-size: $text-lg;
    font-weight: 800;
  }

  &__link {
    font-weight: 600;
    color: $accent-deep;
  }

  &__ok i {
    color: $success;
  }

  &__warn {
    color: $stamp;
  }

  &__muted {
    color: $ink-muted;
  }

  &__members {
    list-style: none;
    @include flex(column, stretch, flex-start, 0);
  }

  &__member {
    @include flex(row, center, flex-start, 0.6rem);
    flex-wrap: wrap;
    padding: 0.7rem 0;

    & + & {
      border-top: 1px solid $line;
    }

    select {
      width: auto;
      padding: 0.45rem 0.7rem;
      font-size: $text-sm;
    }
  }

  &__who {
    @include flex(column, flex-start, flex-start, 0.1rem);
    flex: 1 1 200px;
    min-width: 0;

    span {
      font-size: $text-xs;
      color: $ink-muted;
    }
  }

  &__remove {
    font-size: $text-xs;
    font-weight: 600;
    color: $stamp;
    padding: 0.4rem 0.6rem;

    &:disabled {
      opacity: 0.5;
    }
  }

  &__steps {
    padding-left: 1.1rem;
    @include flex(column, stretch, flex-start, 0.4rem);
    color: $ink-soft;
  }
}
</style>
