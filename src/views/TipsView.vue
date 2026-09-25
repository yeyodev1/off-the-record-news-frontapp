<script setup lang="ts">
import { site, telegramLink } from '@/config/site'
import PageIntro from '@/components/news/PageIntro.vue'
import TipForm from '@/components/news/TipForm.vue'
import { ui } from '@/config/site'

const telegram = telegramLink()
</script>

<template>
  <div class="tips">
    <PageIntro :title="site.tips.title" :subtitle="site.tips.subtitle" />

    <div v-if="telegram" class="tips__telegram">
      <a :href="telegram" target="_blank" rel="noopener noreferrer" class="btn btn--primary tips__tg-btn">
        <i class="fa-brands fa-telegram" aria-hidden="true"></i> {{ site.tips.telegramCta }}
      </a>
      <span class="tips__or">{{ ui.forms.tipsOr }}</span>
    </div>

    <TipForm class="tips__form" />
  </div>
</template>

<style scoped lang="scss">
.tips {
  @include container(760px);
  @include flex(column, stretch, flex-start, 2rem);
  padding-top: 2rem;

  @include from('md') {
    padding-top: 3.5rem;
  }

  &__telegram {
    @include flex(column, flex-start, flex-start, 0.75rem);

    @include from('sm') {
      flex-direction: row;
      align-items: center;
      gap: 1.25rem;
    }
  }

  &__tg-btn {
    border-radius: 0;
  }

  &__or {
    font-size: $text-sm;
    color: $ink-muted;
  }

  &__form {
    padding-top: 2rem;
    border-top: 4px solid $ink;
  }
}
</style>
