<script setup lang="ts">
import { ref } from 'vue'
import { admin } from '@/config/admin'
import BaseModal from '@/components/ui/BaseModal.vue'

/** Kill switch con motivo opcional: la nota queda retirada con aviso en su URL. */
const open = defineModel<boolean>('open', { required: true })
const emit = defineEmits<{ confirm: [reason: string] }>()

const reason = ref('')

function confirm() {
  open.value = false
  emit('confirm', reason.value.trim())
  reason.value = ''
}
</script>

<template>
  <BaseModal
    :open="open"
    :title="admin.retract.title"
    :message="admin.retract.message"
    :confirm-label="admin.retract.button"
    danger
    @confirm="confirm"
    @cancel="open = false"
  >
    <div class="retract">
      <label for="retract-reason">{{ admin.retract.reason }}</label>
      <textarea
        id="retract-reason"
        v-model="reason"
        rows="3"
        :placeholder="admin.retract.reasonPlaceholder"
      ></textarea>
    </div>
  </BaseModal>
</template>

<style scoped lang="scss">
.retract {
  text-align: left;
  width: 100%;
}
</style>
