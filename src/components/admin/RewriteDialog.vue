<script setup lang="ts">
import { ref, watch } from 'vue'
import { admin } from '@/config/admin'
import AdminDialog from './AdminDialog.vue'

const props = defineProps<{ open: boolean; busy?: boolean; articleTitle?: string }>()
const emit = defineEmits<{ confirm: [instructions: string]; cancel: [] }>()

const instructions = ref('')

watch(
  () => props.open,
  (open) => {
    if (open) instructions.value = ''
  },
)
</script>

<template>
  <AdminDialog
    :open="open"
    :title="admin.rewrite.title"
    :confirm-label="admin.rewrite.confirm"
    :busy="busy"
    :busy-label="admin.rewrite.working"
    :confirm-disabled="instructions.trim().length < 3"
    @confirm="emit('confirm', instructions.trim())"
    @cancel="emit('cancel')"
  >
    <p v-if="articleTitle" class="rewrite__article">{{ articleTitle }}</p>
    <div>
      <label for="rewrite-instructions">{{ admin.rewrite.help }}</label>
      <textarea
        id="rewrite-instructions"
        v-model="instructions"
        rows="5"
        :placeholder="admin.rewrite.placeholder"
        :disabled="busy"
      ></textarea>
    </div>
  </AdminDialog>
</template>

<style scoped lang="scss">
.rewrite__article {
  font-family: $font-display;
  font-weight: 700;
  font-size: $text-base;
}
</style>
