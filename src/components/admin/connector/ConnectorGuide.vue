<script setup lang="ts">
import { admin } from '@/config/admin'

const t = admin.connector
</script>

<template>
  <section class="guide">
    <h2 class="guide__title">{{ t.stepsTitle }}</h2>

    <div class="guide__cols">
      <div class="guide__block">
        <h3><i class="fa-solid fa-comment-dots"></i> {{ t.claudeAi.title }}</h3>
        <ol>
          <li v-for="step in t.claudeAi.steps" :key="step">{{ step }}</li>
        </ol>
      </div>
      <div class="guide__block">
        <h3><i class="fa-solid fa-terminal"></i> {{ t.claudeCode.title }}</h3>
        <pre><code>{{ t.claudeCode.command }}</code></pre>
      </div>
    </div>

    <div class="guide__cols">
      <div class="guide__block">
        <h3><i class="fa-solid fa-lightbulb"></i> {{ t.examplesTitle }}</h3>
        <ul>
          <li v-for="example in t.examples" :key="example">"{{ example }}"</li>
        </ul>
      </div>
      <div class="guide__block">
        <h3><i class="fa-solid fa-shield-halved"></i> {{ t.rulesTitle }}</h3>
        <ul>
          <li v-for="rule in t.rules" :key="rule">{{ rule }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.guide {
  @include flex(column, stretch, flex-start, 1rem);

  &__title {
    @include display($text-lg, 800);
  }

  &__cols {
    @include flex-cards(300px, 0.9rem);
  }

  &__block {
    @include card;
    padding: 1rem 1.1rem;
    min-width: 0;

    h3 {
      font-size: $text-sm;
      font-weight: 800;
      margin-bottom: 0.55rem;

      i {
        color: $accent;
        margin-right: 0.3rem;
      }
    }

    ol,
    ul {
      @include flex(column, stretch, flex-start, 0.35rem);
      padding-left: 1.1rem;
      font-size: $text-sm;
      color: $ink-body;
    }

    ol {
      list-style: decimal;
    }

    ul {
      list-style: disc;
    }

    pre {
      overflow-x: auto;
      background: $cream-2;
      border-radius: $radius-sm;
      padding: 0.7rem 0.8rem;
      font-size: $text-xs;
    }
  }
}
</style>
