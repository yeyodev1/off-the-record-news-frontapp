<script setup lang="ts">
import { computed } from 'vue'
import { ui } from '@/config/site'
import { formatDateTime } from '@/utils/format'
import SmartLabel from './SmartLabel.vue'
import type { RetractedArticle } from '@/types'

const props = defineProps<{ article: RetractedArticle }>()

const when = computed(() =>
  props.article.retraction.at ? formatDateTime(props.article.retraction.at) : '',
)
</script>

<template>
  <section class="retraction" role="status">
    <SmartLabel tone="stamp">
      <i class="fa-solid fa-ban" aria-hidden="true"></i> {{ ui.article.retractedTitle }}
    </SmartLabel>
    <h1 class="retraction__title">{{ article.title }}</h1>
    <p>{{ ui.article.retractedText(when) }}</p>
    <p v-if="article.retraction.reason">
      <strong>{{ ui.article.retractedReason }}:</strong> {{ article.retraction.reason }}
    </p>
    <RouterLink to="/" class="btn btn--dark">{{ ui.article.backHome }}</RouterLink>
  </section>
</template>

<style scoped lang="scss">
.retraction {
  @include flex(column, flex-start, flex-start, 1rem);
  padding: 1.5rem;
  border: 2px solid $stamp;
  background: $stamp-soft;

  &__title {
    font-size: $display-md;
    font-weight: 900;
    line-height: 1.05;
    letter-spacing: -0.03em;
    text-decoration: line-through;
    text-decoration-color: rgba($stamp, 0.6);
  }
}
</style>
