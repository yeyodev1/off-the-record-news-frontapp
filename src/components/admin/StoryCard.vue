<script setup lang="ts">
import { computed, ref } from 'vue'
import { admin, signalStatusLabels, storyStatusLabels } from '@/config/admin'
import { site } from '@/config/site'
import { timeAgo } from '@/composables/admin/format'
import { adminService } from '@/services/admin.service'
import AdminBadge from './AdminBadge.vue'
import ScoreBadge from './ScoreBadge.vue'
import ScoreBreakdown from './ScoreBreakdown.vue'
import type { Signal, Story } from '@/types'

const props = defineProps<{ story: Story; busy?: 'draft' | 'discard' | null }>()
const emit = defineEmits<{ draft: []; discard: [] }>()

const showScore = ref(false)
const pieces = ref<Signal[] | null>(null)
const loadingPieces = ref(false)
const piecesOpen = ref(false)

// El puntaje del hecho ya suma la corroboración; el desglose es el de su mejor pieza.
const score = computed(() =>
  props.story.bestScore ? { ...props.story.bestScore, total: props.story.score } : null,
)
const canDraft = computed(
  () => !props.story.articleId && !['discarded', 'covered'].includes(props.story.status),
)

async function togglePieces() {
  piecesOpen.value = !piecesOpen.value
  if (!piecesOpen.value || pieces.value) return
  loadingPieces.value = true
  try {
    pieces.value = (await adminService.story(props.story.id)).signals
  } catch {
    pieces.value = []
  } finally {
    loadingPieces.value = false
  }
}
</script>

<template>
  <article class="story">
    <div class="story__top">
      <ScoreBadge
        :score="score"
        :clickable="Boolean(score)"
        :open="showScore"
        @toggle="showScore = !showScore"
      />
      <AdminBadge :tone="storyStatusLabels[story.status].tone">{{
        storyStatusLabels[story.status].label
      }}</AdminBadge>
      <AdminBadge tone="accent">{{ site.sections[story.section] }}</AdminBadge>
      <AdminBadge v-if="story.hasOfficialSource" tone="info" icon="fa-solid fa-landmark">{{
        admin.stories.official
      }}</AdminBadge>
      <AdminBadge v-if="story.accusation" tone="stamp" icon="fa-solid fa-scale-balanced">{{
        admin.stories.accusation
      }}</AdminBadge>
      <AdminBadge v-if="story.familyVeto" tone="stamp" icon="fa-solid fa-user-shield">{{
        admin.stories.familyVeto
      }}</AdminBadge>
      <span class="story__time">{{ timeAgo(story.lastSignalAt) }}</span>
    </div>

    <ScoreBreakdown v-if="showScore && score" :score="score" />

    <h3 class="story__title">{{ story.title }}</h3>
    <p class="story__counts">
      {{ admin.stories.sources(story.sourceNames.length) }} ·
      {{ admin.stories.signals(story.signalCount) }}:
      {{ story.sourceNames.join(', ') }}
    </p>
    <p class="story__reason"><i class="fa-solid fa-circle-info"></i> {{ story.reason }}</p>

    <ul v-if="piecesOpen" class="story__pieces">
      <li v-if="loadingPieces"><i class="fa-solid fa-spinner fa-spin"></i></li>
      <li v-for="piece in pieces ?? []" :key="piece.id">
        <AdminBadge :tone="signalStatusLabels[piece.status].tone">{{
          signalStatusLabels[piece.status].label
        }}</AdminBadge>
        <strong>{{ piece.sourceName }}</strong>
        <a v-if="piece.url" :href="piece.url" target="_blank" rel="noopener">{{ piece.title }}</a>
        <span v-else>{{ piece.title }}</span>
      </li>
    </ul>

    <footer class="story__actions">
      <button class="story__link" type="button" @click="togglePieces">
        <i class="fa-solid fa-list"></i>
        {{ piecesOpen ? admin.stories.hidePieces : admin.stories.showPieces }}
      </button>
      <RouterLink v-if="story.articleId" :to="`/admin/notas/${story.articleId}`" class="story__link">
        <i class="fa-solid fa-newspaper"></i> {{ admin.stories.openArticle }}
      </RouterLink>
      <span class="story__spacer"></span>
      <template v-if="canDraft">
        <button class="story__btn" type="button" :disabled="Boolean(busy)" @click="emit('discard')">
          <i class="fa-solid" :class="busy === 'discard' ? 'fa-spinner fa-spin' : 'fa-ban'"></i>
          {{ admin.stories.discard }}
        </button>
        <button
          class="story__btn story__btn--primary"
          type="button"
          :disabled="Boolean(busy)"
          @click="emit('draft')"
        >
          <i class="fa-solid" :class="busy === 'draft' ? 'fa-spinner fa-spin' : 'fa-pen-nib'"></i>
          {{ busy === 'draft' ? admin.stories.drafting : admin.stories.draft }}
        </button>
      </template>
    </footer>
  </article>
</template>

<style scoped lang="scss">
.story {
  @include card;
  @include flex(column, stretch, flex-start, 0.6rem);
  padding: 0.9rem 1rem;

  &__top {
    @include flex(row, center, flex-start, 0.45rem);
    flex-wrap: wrap;
    font-size: $text-xs;
  }

  &__time {
    margin-left: auto;
    color: $ink-muted;
  }

  &__title {
    font-family: $font-display;
    font-size: $text-base;
    font-weight: 700;
    line-height: 1.25;
  }

  &__counts {
    font-size: $text-sm;
    color: $ink-soft;
  }

  &__reason {
    font-size: $text-xs;
    color: $ink-muted;

    i {
      margin-right: 0.25rem;
    }
  }

  &__pieces {
    list-style: none;
    @include flex(column, stretch, flex-start, 0.45rem);
    padding: 0.7rem;
    background: $sand;
    border-radius: $radius-sm;
    font-size: $text-sm;

    li {
      @include flex(row, center, flex-start, 0.45rem);
      flex-wrap: wrap;
    }

    a {
      color: $accent-deep;
      text-decoration: underline;
    }
  }

  &__actions {
    @include flex(row, center, flex-start, 0.5rem);
    flex-wrap: wrap;
    padding-top: 0.7rem;
    border-top: 1px solid $line;
  }

  &__link {
    font-size: $text-xs;
    font-weight: 600;
    color: $accent-deep;
  }

  &__spacer {
    flex: 1;
  }

  &__btn {
    @include flex(row, center, center, 0.4rem);
    min-height: 2.5rem;
    padding: 0.45rem 0.95rem;
    font-size: $text-sm;
    font-weight: 600;
    border: 1px solid $line;
    border-radius: $radius-pill;

    &:hover {
      background: $sand;
    }

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &--primary {
      background: $ink;
      border-color: $ink;
      color: $surface;

      &:hover {
        background: $accent-deep;
      }
    }
  }
}
</style>
