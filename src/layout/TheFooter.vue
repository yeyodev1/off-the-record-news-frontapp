<script setup lang="ts">
import { site } from '@/config/site'
import BrandMark from '@/components/news/BrandMark.vue'
import { ui } from '@/components/news/uiCopy'
import type { Section } from '@/types'

const year = new Date().getFullYear()
const sections = Object.entries(site.sections) as [Section, string][]

const links = [
  { to: '/nosotros', label: ui.footer.about },
  { to: '/denuncias', label: ui.footer.tips },
  { to: '/pro', label: ui.footer.pro },
  { to: '/boletines', label: ui.footer.newsletters },
]
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__brand">
        <RouterLink to="/" :aria-label="site.name"><BrandMark inverted size="lg" /></RouterLink>
        <p class="footer__tagline">{{ site.tagline }}</p>
        <p class="footer__note">{{ site.footer.note }}</p>
      </div>

      <nav class="footer__col footer__col--sections" :aria-label="ui.footer.sections">
        <h2 class="footer__heading">{{ ui.footer.sections }}</h2>
        <ul>
          <li v-for="[slug, name] in sections" :key="slug">
            <RouterLink :to="`/seccion/${slug}`">{{ name }}</RouterLink>
          </li>
        </ul>
      </nav>

      <nav class="footer__col" :aria-label="ui.footer.brand">
        <h2 class="footer__heading">{{ ui.footer.brand }}</h2>
        <ul>
          <li v-for="link in links" :key="link.to">
            <RouterLink :to="link.to">{{ link.label }}</RouterLink>
          </li>
        </ul>
      </nav>

      <div class="footer__col">
        <h2 class="footer__heading">{{ ui.footer.contact }}</h2>
        <ul>
          <li>
            <a :href="`mailto:${site.email}`"><i class="fa-solid fa-envelope" aria-hidden="true"></i> {{ site.email }}</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer__bar">
      <span>© {{ year }} {{ site.name }}</span>
      <span>
        {{ ui.footer.madeBy }} <a href="https://bakano.ec" target="_blank" rel="noopener">Bakano</a>
      </span>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: $ink;
  color: rgba($paper, 0.85);
  margin-top: $space-xl;

  &__inner {
    @include container;
    @include flex-cards(180px, 2.25rem 2rem);
    padding-block: $space-lg 2rem;
  }

  &__brand {
    flex: 1 1 100%;
    @include flex(column, flex-start, flex-start, 0.75rem);

    @include from('lg') {
      flex: 2 1 300px;
    }
  }

  &__tagline {
    font-family: $font-display;
    font-weight: 700;
    font-size: $text-lg;
    color: $paper;
  }

  &__note {
    font-size: $text-sm;
    color: rgba($paper, 0.65);
    max-width: 40ch;
  }

  &__col {
    font-size: $text-sm;

    ul {
      list-style: none;
      @include flex(column, flex-start, flex-start, 0.5rem);
    }

    a {
      color: rgba($paper, 0.78);
      word-break: break-word;
      @include transition(color);

      &:hover {
        color: $paper;
        text-decoration: underline;
        text-underline-offset: 3px;
      }
    }

    &--sections ul {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.5rem 1.25rem;
      max-width: 22rem;
    }
  }

  &__heading {
    font-family: $font-principal;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: $accent-soft;
    margin-bottom: 0.8rem;
  }

  &__bar {
    @include container;
    @include flex(row, center, space-between, 0.5rem 1rem);
    flex-wrap: wrap;
    padding-block: 1.2rem;
    border-top: 1px solid rgba($paper, 0.12);
    font-size: $text-xs;
    color: rgba($paper, 0.6);

    a {
      color: rgba($paper, 0.85);
      text-decoration: underline;
      text-underline-offset: 2px;
    }
  }

  :focus-visible {
    outline-color: $paper;
  }
}
</style>
