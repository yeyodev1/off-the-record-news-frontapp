<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { admin, lessonAreas } from '@/config/admin'
import { useMesaChat } from '@/composables/admin/useMesaChat'
import type { LessonArea } from '@/types'

const t = admin.mesa.chat
const { turns, draft, sending, applying, proposal, send, apply, dismiss, reset } = useMesaChat()

const agentNames: Record<string, string> = {
  valorador: 'el valorador',
  redactor: 'el redactor',
  modos: 'los modos',
  fotos: 'las fotos',
}

const log = ref<HTMLElement | null>(null)
watch(
  () => turns.value.length,
  async () => {
    await nextTick()
    if (log.value) log.value.scrollTop = log.value.scrollHeight
  },
)

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    send()
  }
}
</script>

<template>
  <div class="chat">
    <p class="chat__intro"><i class="fa-solid fa-comments"></i> {{ t.intro }}</p>

    <div ref="log" class="chat__log">
      <div
        v-for="(turn, i) in turns"
        :key="i"
        class="chat__msg"
        :class="`chat__msg--${turn.role}`"
      >
        {{ turn.text }}
      </div>

      <div v-if="sending" class="chat__msg chat__msg--mesa chat__msg--typing">
        {{ t.sending }}
      </div>

      <div v-if="proposal" class="chat__proposal">
        <p class="chat__proposal-tag">
          <i
            :class="proposal.kind === 'lesson' ? 'fa-solid fa-lightbulb' : 'fa-solid fa-list-check'"
          ></i>
          <span v-if="proposal.kind === 'lesson'">
            {{ t.proposeLesson }} {{ t.forArea }}
            <strong>{{ lessonAreas[proposal.area as LessonArea]?.label ?? proposal.area }}</strong>
          </span>
          <span v-else>
            {{ t.proposeRule }} {{ t.forAgent }}
            <strong>{{ agentNames[proposal.agent ?? ''] ?? proposal.agent }}</strong>
          </span>
        </p>
        <p class="chat__proposal-text">
          {{ proposal.kind === 'lesson' ? proposal.instruction : proposal.newRule }}
        </p>
        <div class="chat__proposal-actions">
          <button class="btn btn--primary" :disabled="applying" @click="apply">
            {{ applying ? t.applying : t.apply }}
          </button>
          <button class="btn btn--ghost" :disabled="applying" @click="dismiss">
            {{ t.dismiss }}
          </button>
        </div>
      </div>
    </div>

    <form class="chat__form" @submit.prevent="send">
      <textarea
        v-model="draft"
        class="chat__input"
        rows="2"
        :placeholder="t.placeholder"
        :disabled="sending"
        @keydown="onKeydown"
      ></textarea>
      <div class="chat__form-actions">
        <button type="button" class="chat__reset" @click="reset">
          <i class="fa-solid fa-rotate-left"></i> {{ t.reset }}
        </button>
        <button type="submit" class="btn btn--primary" :disabled="sending || !draft.trim()">
          {{ sending ? t.sending : t.send }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.chat {
  @include flex(column, stretch, flex-start, 1rem);

  &__intro {
    font-size: $text-sm;
    color: $ink-soft;
    background: $accent-soft;
    border-radius: $radius-sm;
    padding: 0.8rem 0.9rem;

    i {
      color: $accent-deep;
      margin-right: 0.3rem;
    }
  }

  &__log {
    @include flex(column, stretch, flex-start, 0.7rem);
    min-height: 16rem;
    max-height: 26rem;
    overflow-y: auto;
    padding: 0.4rem;
  }

  &__msg {
    max-width: 85%;
    padding: 0.65rem 0.85rem;
    border-radius: $radius-md;
    font-size: $text-sm;
    line-height: 1.5;
    white-space: pre-wrap;

    &--editor {
      align-self: flex-end;
      background: $accent;
      color: #fff;
    }

    &--mesa {
      align-self: flex-start;
      background: $canvas;
      color: $ink;
    }

    &--typing {
      color: $ink-muted;
      font-style: italic;
    }
  }

  &__proposal {
    align-self: stretch;
    border: 1px solid $accent;
    border-radius: $radius-md;
    padding: 0.85rem;
    background: $surface;
    @include flex(column, stretch, flex-start, 0.6rem);
  }

  &__proposal-tag {
    font-size: $text-xs;
    color: $ink-muted;

    i {
      color: $accent-deep;
      margin-right: 0.35rem;
    }

    strong {
      color: $ink;
    }
  }

  &__proposal-text {
    font-size: $text-sm;
    color: $ink;
    line-height: 1.5;
  }

  &__proposal-actions {
    @include flex(row, center, flex-start, 0.6rem);
  }

  &__form {
    @include flex(column, stretch, flex-start, 0.5rem);
  }

  &__input {
    width: 100%;
    resize: vertical;
    padding: 0.7rem 0.85rem;
    font: inherit;
    font-size: $text-sm;
    color: $ink;
    background: $surface;
    border: 1px solid $line;
    border-radius: $radius-sm;

    &:focus {
      outline: none;
      border-color: $accent;
    }
  }

  &__form-actions {
    @include flex(row, center, space-between, 0.6rem);
  }

  &__reset {
    font-size: $text-xs;
    color: $ink-muted;

    &:hover {
      color: $ink;
    }
  }
}
</style>
