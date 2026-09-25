<script setup lang="ts">
import { site } from '@/config/site'
import PageIntro from '@/components/news/PageIntro.vue'
import ProForm from '@/components/news/ProForm.vue'
import SmartLabel from '@/components/news/SmartLabel.vue'
import { ui } from '@/components/news/uiCopy'
</script>

<template>
  <div class="pro">
    <section class="pro__hero">
      <div class="pro__inner">
        <div class="pro__pitch">
          <PageIntro inverted :eyebrow="ui.pro.eyebrow" :title="site.pro.title" :subtitle="site.pro.subtitle" />

          <div class="pro__features">
            <SmartLabel tag="h2">{{ ui.pro.featuresTitle }}</SmartLabel>
            <ul>
              <li v-for="feature in site.pro.features" :key="feature">
                <i class="fa-solid fa-check" aria-hidden="true"></i>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="pro__form">
          <h2 class="pro__form-title">{{ ui.pro.formTitle }}</h2>
          <ProForm />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.pro {
  &__hero {
    background: $ink;
    color: $paper;
    // El pie oscuro sigue a esta sección: sin margen blanco entre ambos se lee como un bloque.
    margin-bottom: calc(-1 * #{$space-xl});
  }

  &__inner {
    @include container;
    @include flex(column, stretch, flex-start, 3rem);
    padding-block: 2.5rem $space-xl;

    @include from('lg') {
      flex-direction: row;
      align-items: flex-start;
      gap: 4rem;
      padding-top: 4rem;
    }
  }

  &__pitch {
    flex: 1 1 58%;
    @include flex(column, stretch, flex-start, 2.5rem);
  }

  &__features {
    @include flex(column, stretch, flex-start, 1rem);

    :deep(.label) {
      color: $accent-soft;
    }

    ul {
      list-style: none;
      @include flex(column, stretch, flex-start, 0);
    }

    li {
      @include flex(row, baseline, flex-start, 0.8rem);
      padding-block: 0.9rem;
      border-top: 1px solid rgba($paper, 0.16);
      font-family: $font-display;
      font-weight: 700;
      font-size: $text-lg;
      line-height: 1.3;
    }

    i {
      color: $accent-soft;
      font-size: 0.9rem;
    }
  }

  &__form {
    flex: 1 1 42%;
    @include flex(column, stretch, flex-start, 1.25rem);
    padding: 1.5rem 1.25rem;
    border: 1px solid rgba($paper, 0.25);

    @include from('md') {
      padding: 2rem;
    }

    :deep(input) {
      background: $paper;
    }

    :deep(:focus-visible) {
      outline-color: $paper;
    }
  }

  &__form-title {
    font-size: $text-xl;
    font-weight: 900;
  }
}
</style>
