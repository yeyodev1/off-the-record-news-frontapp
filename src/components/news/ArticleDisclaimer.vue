<script setup lang="ts">
import { ui } from '@/config/site'
import SmartLabel from './SmartLabel.vue'

defineProps<{ text: string }>()
</script>

<template>
  <aside class="disclaimer">
    <SmartLabel tag="h2" tone="muted">
      <i class="fa-solid fa-robot" aria-hidden="true"></i> {{ ui.article.disclaimerTitle }}
    </SmartLabel>
    <p>{{ text }}</p>
    <RouterLink to="/nosotros">{{ ui.footer.about }}</RouterLink>
  </aside>
</template>

<style scoped lang="scss">
.disclaimer {
  @include flex(column, flex-start, flex-start, 0.4rem);
  padding: 1rem;
  background: $sand;
  font-size: $text-sm;
  color: $ink-soft;

  a {
    font-weight: 600;
    color: $accent-deep;
    text-decoration: underline;
    text-underline-offset: 3px;
    @include focus-ring;
  }
}
</style>
