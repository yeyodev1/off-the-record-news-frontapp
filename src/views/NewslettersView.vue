<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { site, ui } from '@/config/site'
import PageIntro from '@/components/news/PageIntro.vue'
import NewsletterForm from '@/components/news/NewsletterForm.vue'

const route = useRoute()
// Vuelve aquí desde el enlace "Borrar mi modo de lectura" de cada correo.
const modeForgotten = computed(() => route.query.modo_borrado === '1')
</script>

<template>
  <div class="newsletters">
    <PageIntro :eyebrow="site.newsletter.price" :title="site.newsletter.title" :subtitle="site.newsletter.subtitle" />
    <p v-if="modeForgotten" class="newsletters__notice" role="status">
      <i class="fa-solid fa-circle-check" aria-hidden="true"></i> {{ ui.modes.forgotten }}
    </p>
    <NewsletterForm class="newsletters__form" />
  </div>
</template>

<style scoped lang="scss">
.newsletters {
  @include container(880px);
  @include flex(column, stretch, flex-start, 2.5rem);
  padding-top: 2rem;

  @include from('md') {
    padding-top: 3.5rem;
  }

  &__notice {
    @include flex(row, center, flex-start, 0.5rem);
    padding: 0.75rem 1rem;
    background: $success-bg;
    font-size: $text-sm;
    font-weight: 600;

    i {
      color: $success;
    }
  }

  &__form {
    padding-top: 2rem;
    border-top: 4px solid $ink;
  }
}
</style>
