<script setup lang="ts">
import { onMounted } from 'vue'
import { admin } from '@/config/admin'
import { useConnector } from '@/composables/admin/useConnector'
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue'
import AdminState from '@/components/admin/AdminState.vue'
import ConnectorKey from '@/components/admin/connector/ConnectorKey.vue'
import ConnectorGuide from '@/components/admin/connector/ConnectorGuide.vue'
import ConnectorLog from '@/components/admin/connector/ConnectorLog.vue'

const t = admin.connector
const { status, loading, error, busy, freshUrl, load, generate, revoke } = useConnector()

onMounted(load)
</script>

<template>
  <section class="connector">
    <AdminPageHeader :title="t.title" :subtitle="t.subtitle" />
    <p class="connector__private"><i class="fa-solid fa-lock"></i> {{ t.privateNote }}</p>

    <AdminState :loading="loading && !status" :error="error" @retry="load" />

    <template v-if="status">
      <ConnectorKey
        :access="status.access"
        :ready="status.ready"
        :busy="busy"
        :fresh-url="freshUrl"
        @generate="generate"
        @revoke="revoke"
      />
      <ConnectorGuide />
      <ConnectorLog :changes="status.changes" :repos="status.repos" />
    </template>
  </section>
</template>

<style scoped lang="scss">
.connector {
  @include flex(column, stretch, flex-start, 1.5rem);

  &__private {
    font-size: $text-sm;
    color: $ink-soft;
    margin-top: -1rem;

    i {
      color: $stamp;
      margin-right: 0.3rem;
    }
  }
}
</style>
