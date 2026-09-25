<script setup lang="ts">
import { site } from '@/config/site'
import PageIntro from '@/components/news/PageIntro.vue'
import NewsletterForm from '@/components/news/NewsletterForm.vue'
</script>

<template>
  <div class="newsletters">
    <PageIntro :eyebrow="site.newsletter.price" :title="site.newsletter.title" :subtitle="site.newsletter.subtitle" />
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

  &__form {
    padding-top: 2rem;
    border-top: 4px solid $ink;
  }
}
</style>
