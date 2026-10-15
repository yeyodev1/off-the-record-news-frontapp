<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { admin } from '@/config/admin'
import AdminDialog from '../AdminDialog.vue'
import type { LessonVerdict, MesaSignal } from '@/types'

const props = defineProps<{
  signal: MesaSignal | null
  verdict: LessonVerdict
  busy?: boolean
}>()
const emit = defineEmits<{ save: [why: string]; cancel: [] }>()
const t = admin.mesa.correction

const why = ref('')
watch(
  () => props.signal,
  () => (why.value = ''),
)

const title = computed(() => (props.verdict === 'es_noticia' ? t.titleYes : t.titleNo))
</script>

<template>
  <AdminDialog
    :open="Boolean(signal)"
    :title="title"
    :confirm-label="t.save"
    :busy-label="t.saving"
    :confirm-disabled="why.trim().length < 5"
    :busy="busy"
    @confirm="emit('save', why.trim())"
    @cancel="emit('cancel')"
  >
    <p v-if="signal" class="correction__signal">“{{ signal.title }}” · {{ signal.sourceName }}</p>
    <div>
      <label for="correction-why">{{ t.label }}</label>
      <textarea
        id="correction-why"
        v-model="why"
        rows="4"
        :placeholder="t.placeholder"
        required
      ></textarea>
    </div>
  </AdminDialog>
</template>

<style scoped lang="scss">
.correction__signal {
  font-size: $text-sm;
  font-weight: 600;
  color: $ink-soft;
}
</style>
