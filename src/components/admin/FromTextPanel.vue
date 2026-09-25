<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { admin } from '@/config/admin'
import { adminService } from '@/services/admin.service'
import { useToastStore } from '@/stores/toast'
import { useAdminStats } from '@/composables/admin/useAdminStats'
import type { ApiError } from '@/types'

const router = useRouter()
const toast = useToastStore()
const { refreshStats } = useAdminStats()
const t = admin.editor.fromText

const open = ref(false)
const text = ref('')
const sourceUrl = ref('')
const working = ref(false)

async function submit() {
  if (text.value.trim().length < 40) {
    toast.error(t.minLength)
    return
  }
  working.value = true
  try {
    const article = await adminService.articleFromText(
      text.value.trim(),
      sourceUrl.value.trim() || undefined,
    )
    toast.success(t.done)
    refreshStats()
    router.replace(`/admin/notas/${article.id}`)
  } catch (e) {
    toast.error((e as ApiError).message)
  } finally {
    working.value = false
  }
}
</script>

<template>
  <section class="from-text" :class="{ 'from-text--open': open }">
    <button class="from-text__toggle" type="button" :aria-expanded="open" @click="open = !open">
      <i class="fa-solid fa-wand-magic-sparkles"></i>
      <span>{{ t.toggle }}</span>
      <i
        class="fa-solid from-text__chevron"
        :class="open ? 'fa-chevron-up' : 'fa-chevron-down'"
      ></i>
    </button>

    <form v-if="open" class="from-text__form" @submit.prevent="submit">
      <p class="from-text__help">{{ t.help }}</p>
      <div>
        <label for="from-text-body">{{ t.text }}</label>
        <textarea id="from-text-body" v-model="text" rows="8" :disabled="working"></textarea>
      </div>
      <div>
        <label for="from-text-url">{{ t.sourceUrl }}</label>
        <input
          id="from-text-url"
          v-model="sourceUrl"
          type="url"
          placeholder="https://"
          :disabled="working"
        />
      </div>
      <button class="btn btn--primary from-text__submit" type="submit" :disabled="working">
        <i class="fa-solid" :class="working ? 'fa-spinner fa-spin' : 'fa-wand-magic-sparkles'"></i>
        {{ working ? t.working : t.submit }}
      </button>
    </form>
  </section>
</template>

<style scoped lang="scss">
.from-text {
  @include card;
  border-style: dashed;
  border-color: rgba($accent, 0.4);
  background: rgba($accent, 0.03);

  &--open {
    border-style: solid;
  }

  &__toggle {
    @include flex(row, center, flex-start, 0.6rem);
    width: 100%;
    padding: 0.9rem 1rem;
    font-weight: 600;
    font-size: $text-sm;
    color: $accent-deep;
    text-align: left;
  }

  &__chevron {
    margin-left: auto;
    font-size: 0.7rem;
  }

  &__form {
    @include flex(column, stretch, flex-start, 0.8rem);
    padding: 0 1rem 1rem;
  }

  &__help {
    font-size: $text-sm;
    color: $ink-muted;
  }

  &__submit {
    align-self: flex-start;
    padding: 0.7rem 1.4rem;
  }
}
</style>
