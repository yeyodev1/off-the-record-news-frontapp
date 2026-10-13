<script setup lang="ts">
import { site, ui } from '@/config/site'
import { useProTeasers } from '@/composables/useProTeasers'
import ProForm from '@/components/news/ProForm.vue'
import ProTeaserCard from '@/components/home/ProTeaserCard.vue'

const pro = site.pro
const { teasers, sealedThisWeek } = useProTeasers()
</script>

<template>
  <div class="pro">
    <section class="pro__hero">
      <div class="pro__inner">
        <p class="pro__badge">● {{ pro.eyebrow }}</p>
        <h1 class="pro__title">{{ pro.title }}</h1>
        <p class="pro__lede">{{ pro.subtitle }}</p>
        <p class="pro__why">
          <b>{{ site.labels.whyItMatters }}:</b> {{ pro.why }}
        </p>

        <div class="pro__plans">
          <article v-for="plan in pro.plans" :key="plan.key" class="pro__plan">
            <p class="pro__plan-name">{{ plan.name }}</p>
            <p class="pro__plan-price">
              {{ plan.price }} <span>{{ plan.per }}</span>
            </p>
            <ul>
              <li v-for="item in plan.items" :key="item">{{ item }}</li>
            </ul>
          </article>
        </div>
        <p class="pro__terms">{{ pro.terms }}</p>
      </div>
    </section>

    <div class="pro__body">
      <section class="pro__what">
        <h2 class="pro__h2">{{ ui.proPage.whatTitle }}</h2>
        <ul class="pro__features">
          <li v-for="feature in pro.features" :key="feature">{{ feature }}</li>
        </ul>
        <p class="pro__text">{{ pro.unpublished }}</p>
        <p class="pro__text">{{ pro.delivery }}</p>

        <template v-if="teasers.length">
          <h2 class="pro__h2">{{ ui.proPage.teasersTitle }}</h2>
          <div class="pro__teasers">
            <ProTeaserCard
              v-for="teaser in teasers.slice(0, 3)"
              :key="teaser.id"
              :teaser="teaser"
              :sealed="sealedThisWeek"
            />
          </div>
        </template>
      </section>

      <section id="activar" class="pro__form">
        <h2 class="pro__h2">{{ ui.proPage.formTitle }}</h2>
        <ProForm />
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pro {
  font-family: $font-display;

  &__hero {
    background: $navy;
    color: $paper;
  }

  &__inner {
    @include container(1080px);
    padding-block: 36px 40px;

    @include from('md') {
      padding: 56px 40px;
    }
  }

  &__badge {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: $navy-text;
  }

  &__title {
    margin: 10px 0 14px;
    font-size: 36px;
    line-height: 1;
    letter-spacing: -0.04em;

    @include from('md') {
      font-size: 52px;
    }
  }

  &__lede {
    font-family: $font-serif;
    font-size: 18px;
    line-height: 1.5;
    color: $navy-soft;
    max-width: 680px;
  }

  &__why {
    margin-top: 14px;
    font-size: 16px;
    line-height: 1.5;
    color: $navy-soft;
    max-width: 680px;

    b {
      color: $paper;
    }
  }

  &__plans {
    @include flex-cards(260px, 16px);
    margin-top: 28px;
  }

  &__plan {
    border: 1px solid rgba($navy-text, 0.35);
    border-radius: 6px;
    padding: 20px 22px;

    ul {
      list-style: none;
      @include flex(column, stretch, flex-start, 6px);
      margin-top: 12px;
      font-size: 14px;
      color: $navy-soft;
    }

    li::before {
      content: '●';
      color: $navy-text;
      margin-right: 8px;
      font-size: 9px;
      vertical-align: middle;
    }
  }

  &__plan-name {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $navy-text;
  }

  &__plan-price {
    margin-top: 6px;
    font-size: 30px;
    font-weight: 700;
    letter-spacing: -0.03em;

    span {
      font-size: 14px;
      font-weight: 400;
      color: $navy-text;
    }
  }

  &__terms {
    margin-top: 14px;
    font-size: 13px;
    color: $navy-text;
  }

  &__body {
    @include container(1080px);
    @include flex(column, stretch, flex-start, 40px);
    padding-block: 40px 0;

    @include from('lg') {
      flex-direction: row;
      align-items: flex-start;
      gap: 56px;
      padding: 56px 40px 0;
    }
  }

  &__what {
    flex: 1 1 55%;
    min-width: 0;
    @include flex(column, stretch, flex-start, 16px);
  }

  &__h2 {
    font-size: 28px;
    letter-spacing: -0.03em;
    padding-top: 12px;
    border-top: 4px solid $ink;
  }

  &__features {
    list-style: none;

    li {
      padding: 14px 0;
      border-bottom: 1px solid $line;
      font-size: 18px;
      font-weight: 700;
      line-height: 1.3;
      letter-spacing: -0.015em;
    }
  }

  &__text {
    font-family: $font-serif;
    font-size: 17px;
    line-height: 1.55;
    color: $ink-2;
  }

  &__teasers {
    @include flex(column, stretch, flex-start, 16px);
  }

  &__form {
    flex: 1 1 45%;
    min-width: 0;
    @include flex(column, stretch, flex-start, 18px);
    background: $cream;
    border: 1px solid $box-line;
    padding: 20px 16px 24px;

    @include from('md') {
      padding: 26px 28px;
    }

    .pro__h2 {
      border-top: 0;
      padding-top: 0;
    }
  }
}
</style>
