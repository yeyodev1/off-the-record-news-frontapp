<script setup lang="ts">
import { site, ui } from '@/config/site'
import type { ProTeaser } from '@/types'

/**
 * Nota sellada de OTR PRO en el stream. El cuerpo son líneas difuminadas
 * hechas en CSS: el texto reservado nunca llega al navegador.
 */
defineProps<{ teaser: ProTeaser; sealed: number }>()
</script>

<template>
  <article class="pro-card">
    <div class="pro-card__head">
      <span class="pro-card__badge">● {{ ui.proCard.badge }}</span>
      <span class="pro-card__plan">{{ ui.proCard.plan }}</span>
    </div>
    <h3 class="pro-card__title">
      <RouterLink to="/pro" class="headline-link">{{ teaser.title }}</RouterLink>
    </h3>
    <p v-if="teaser.whyItMatters" class="pro-card__why">
      <b>{{ site.labels.whyItMatters }}:</b> {{ teaser.whyItMatters }}
    </p>
    <div class="pro-card__blur" role="img" :aria-label="ui.proCard.lockedAria">
      <span style="width: 95%"></span>
      <span style="width: 100%"></span>
      <span style="width: 60%"></span>
    </div>
    <div class="pro-card__foot">
      <RouterLink to="/pro" class="pro-card__cta">{{ ui.proCard.unlock }}</RouterLink>
      <span class="pro-card__note">{{ ui.proCard.footnote(Math.max(sealed, 1)) }}</span>
    </div>
  </article>
</template>

<style scoped lang="scss">
.pro-card {
  background: $navy;
  color: $paper;
  border-radius: 6px;
  padding: 18px;
  font-family: $font-display;

  @include from('md') {
    padding: 26px 28px;
  }

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    margin-bottom: 10px;
    color: $navy-text;
  }

  &__badge {
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  &__plan {
    display: none;

    @include from('md') {
      display: inline;
    }
  }

  &__title {
    margin: 0 0 10px;
    max-width: 540px;
    font-size: 22px;
    line-height: 1.06;
    letter-spacing: -0.025em;
    font-weight: 700;

    @include from('md') {
      font-size: 28px;
    }
  }

  &__why {
    font-size: 15px;
    line-height: 1.5;
    margin: 0 0 12px;
    color: $navy-soft;

    @include from('md') {
      font-size: 17px;
    }

    b {
      color: $paper;
    }
  }

  &__blur {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 520px;
    filter: blur(5px);
    opacity: 0.5;
    user-select: none;

    span {
      height: 11px;
      background: $paper;
      border-radius: 2px;
    }
  }

  &__foot {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
    margin-top: 16px;
  }

  &__cta {
    background: $paper;
    color: $navy;
    padding: 10px 16px;
    border-radius: 999px;
    font-weight: 700;
    font-size: 13px;
    @include transition(background);
    @include focus-ring($paper);

    &:hover {
      background: $navy-soft;
    }
  }

  &__note {
    font-size: 12px;
    color: $navy-text;
  }
}
</style>
